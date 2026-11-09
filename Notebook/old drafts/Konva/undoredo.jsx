
export default function App() {
  const stageRef = React.useRef(null)
  const nextID = React.useRef(1)
  const { containerRef, width: displayWidth, scale } = useResponsiveWidth(width);
  const [selectedId, setSelectedId] = React.useState("headline")
  const [history, setHistory] = React.useState({
    past: [],
    present: initialShapes,
    future: [],
  })
  const updateShape = (next) =>
    commit(history.present.map((s) => (s.id === next.id ? next:s)))
  const addShape = (type) => {
    const id = '${type}-${nextId.current++}'
    const offset = history.present.length * 14;
    const presets = {
      rect: { width: 150, height: 100, fill:"#10b981", cornerRadius:10 },
      circle:{radius: 52, fill: "#8b5cf6"},
      text:{text: "Double-click to replace", fontSize:24, fill:"#0f172a"}
    }
    commit([
      ...history.present,
      {id, type, x:160 +offset, y:150 +offset, ...presets[type]}
    ])
    setSelectedId(id);
  }
  const undo = () =>
    setHistory((c) =>
      c.past.length === 0
      ? c
        : {
          past: c.past.slice(0, -1),
          present: c.past[c.past.length - 1],
          future: [c.present, ...c.future],
      })
  const redo = () =>
    setHistory((c) =>
      c.future.length ===0
      ?c
        : {
          past: [...c.past, c.present],
          present: c.future[0],
          future: c.future.slice(1),
      })
  const button = {
    padding: ,
    border:,
    borderRadius:,
    background:,
    cursor:,

  }
  return (
    <>
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button style={button} onClick={() => addShape("rect")}>Add Rectangle</button>
        <button style={button} onClick={() => addShape("circle")}>Add circle</button>
        <button style={button} onClick={() => addShape("text")}>Add text</button>
        <button style={button} onClick={undo} disabled={history.past.length ===0 }>undo</button>
        <button style={button} onClick={redo} disabled={history.future.length ===0}>redo</button>
      </div>
    </div>

      <div ref={containerRef} style = {{ width: "100%" , maxWidth: width }}>

      <Stage
         ref={stageRef}
         width={displayWidth}
         height={height * scale}
         scaleX={scale}
         scaleY={scale}
         style={{ background: '#f1f5f9', borderRadius: 8 }}
         onMouseDown={(e) => {
           if (e.target === e.target.getStage()) setSelectedId(null);
      }}
         onTouchStart={(e) => {
          if (e.target === e.target.getStage()) setSelectedId(null);
      }}
      >

          <Layer>
            {history.present.map((shape) => (
              <EditableShape
                key={shape.id}
                shape={shape}
                selected={shape.id === selectedId}
                onSelect={() => setSelectedId(shape.id)}
                onCommit={updateShape}
              />
            )
            )}
          </Layer>
      </Stage>
      </div>
      <p style={{display:"flex", gap:8, flexWrap:"wrap"}}>Objects:</p>
    </>
  )
}
