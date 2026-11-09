import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Text } from "konva/lib/Stage";


const App = () => {
  const [rectPosition, setRectPosition] = useState({ x: 20, y: 50 })
  const [circlePosition, setCirclePosition] = useState({x:200, y:100})
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={rectPosition.x}
          y={rectPosition.y}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
          draggable
          onDragEnd={(e) => setRectPosition(e.target.position())}
        />
        <Circle
          x={circlePosition.x}
          y={circlePosition.y}
          radius={50}
          fill="green"
          draggable
          onDragEnd={(e) => setCirclePosition(e.target.position())}
        />
      </Layer>
    </Stage>
  )
}
