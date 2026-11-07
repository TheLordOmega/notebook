import React from "react";
import { Stage, Layer, Rect, Circle, Star, Text, Transformer } from "konva/lib/Stage";

const width = 760;
const height = 420;

const initialShapes = [
  { id: "card", type: "rect", x: 60, y: 60, width: 300, height: 300, fill: "#1e3a8a", cornerRadius: 16 },
  { id: "accent", type: "circle", x: 470, y: 150, radius: 74, fill: "#f59e0b" },
  { id: "badge", type: "star", x: 620, y: 300, numPoints: 5, innerRadius: 26, outerRadius: 58, fill: "#ec4899" },
  { id: "headline", type: "text", x: 92, y: 120, text: "Spring \n Sale", fontSize: 58, fontStyle: "bold", lineHeight: 1.1, fill: "#ffffff" },
  { id: "caption", type: "text", x: 92, y: 268, text: "up to 40% off", fontSize: 22, fill: "#bfdbfe" },
];


function useResponsiveWidth(maxWidth) {
  const containerRef = React.useRef(null)
  const [width, setWidth] = React.useState(1);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () =>
      setWidth(Math.max(1, Mathm.min(maxWidth, container.clientWidth)));
    update();
    const observer = new ResizeObserver(update);
    return () => observer.disconnect();
  }, [maxWidth])
  return { containerRef, width, scale: width / maxWidth };
}


function EditableShape({ shape, selected, onSelect, onCommit }) {
  const shapeRef = React.useRef(null);
  const transformerRef = React.useRef(null);

  React.useEffect(() => {
    if (selected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current])
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const average = (scaleX + scaleY) / 2;
    node.scaleX(1);
    node.scaleY(1);


    const base = { ...shape, x: node.x(), y: node.y(), rotation: node.rotation() }


    if (shape.type === "rect") {
      onCommit({
        ...base,
        width: Math.max(20, node.width() * scaleX),
        height: Math.max(20, node.height()*scaleY),
      })
    } else if (shape.type === "circle") {
      onCommit({...base, radius:Math.max(10, shape.radius * average)})
    } else if (shape.type === "star") {
      onCommit({
        ...base,
        innerRadius: Math.max(6, shape.innerRadius * average),
        outerRadius: Math.max(12,shape.outerRadius * average)
      })
    } else {
      onCommit({ ...base, fontSize: Math.max(8, shape.fontSize *average)})
    }
  }
  const common = {
    ref: shapeRef,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (event) =>
      onCommit({ ...shape, x: event.target.x(), y: event.target.y() }),
    onTransformEnd: handleTransformEnd,
  };

  const { id, type, ...props } = shape;
  return (
    <>
      {type === "rect" && <Rect {...props} {...common} />}
      {type === "circle" && <Circle {...props} {...common} />}
      {type === "star" && <Star {...props} {...common} />}
      {type === "text" && <Text {...props} {...common} />}


      {selected && (
        <Transformer
          ref={transformerRef}
          rotateMode="corners"
          anchorStroke="#2563eb"
          borderStrike="#2563eb"
          anchorSize={9}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width <20 || newBox.height <20 ? oldBox: newBox
          }
        />
      )}
    </>
  )
}


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
