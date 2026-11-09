import React, { useRef, useState } from "react";
import { stage, Layer, Line, Text, Stage } from "react-konva"


export const App = () => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = useState([])
  const isDrawing = useRef(false)


  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, {tool, points: [pos.x, pos.y]}])
  }

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]

    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }
  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value)
        }}
      >
        <option value="pen">Pen</option>
        <Option value= "eraser">Eraser</Option>
      </select>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={lines.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
            }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
