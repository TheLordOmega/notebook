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
      {type === "rect" && <Rect {...props} {...common}/>}
    </>
  )
}
