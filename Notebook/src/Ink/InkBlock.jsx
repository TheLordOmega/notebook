import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import { ink_width, min_H, max_H, paper_color, colors } from "./constants";
import { exportPng } from "./png";

function useResponsiveWidth(maxWidth) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () =>
      setWidth(Math.max(1, Math.min(maxWidth, container.clientWidth)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [maxWidth]);
  return { containerRef, width, scale: width / maxWidth };
}

export function InkBlock({ block, onChange, onRemove }) {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState(colors[0]);
  const [lines, setLines] = useState(block.items ?? []);
  const [height, setHeight] = useState(block.height ?? 560);
  const isDrawing = useRef(false);
  const resizeStart = useRef(null);
  const stageRef = useRef(null)
  const { containerRef, width, scale } = useResponsiveWidth(ink_width);

  // Drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getRelativePointerPosition();
    setLines([...lines, { tool, color, points: [Math.round(pos.x), Math.round(pos.y)] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const point = e.target.getStage().getRelativePointerPosition();
    const lastLine = lines[lines.length - 1];
    const updated = {
      ...lastLine,
      points: lastLine.points.concat([Math.round(point.x), Math.round(point.y)]),
    };
    setLines([...lines.slice(0, -1), updated]);
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) {
      return;
    }
    isDrawing.current = false;
    onChange({ items: lines });
  };

  const clear = () => {
    setLines([]);
    onChange({ items: [] });
  };

  // Resizing (drag the bar under the canvas)
  const startResize = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeStart.current = { y: e.clientY, height };
  };

  const moveResize = (e) => {
    if (!resizeStart.current) {
      return;
    }
    const dy = (e.clientY - resizeStart.current.y) / scale;
    const next = Math.round(resizeStart.current.height + dy);
    setHeight(Math.min(max_H, Math.max(min_H, next)));
  };

  const endResize = () => {
    if (!resizeStart.current) {
      return;
    }
    resizeStart.current = null;
    onChange({ height });
  };

  return (
    <div ref={containerRef} className="ink-block">
      <div className="ink-bar">
        <select value={tool} onChange={(e) => setTool(e.target.value)} aria-label="Tool">
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            className={c === color ? "ink-swatch ink-swatch-active" : "ink-swatch"}
            style={{ background: c }}
            aria-label={`Colour ${c}`}
            onClick={() => setColor(c)}
          />
        ))}
        <button type="button" onClick={clear}>Clear</button>
        <button type="button" onClick={onRemove}>Remove</button>
        <button type="button" onClick={ () => exportPng(stageRef.current, scale)}>Save PNG</button>
      </div>

      <div className="ink-paper">
        <Stage
          width={width}
          height={height * scale}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          ref={stageRef}
        >
          <Layer listening={false}>
            <Rect width={ink_width} height={height} fill={paper_color} />
          </Layer>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.tool === "eraser" ? 20 : 4}
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

      <div
        className="ink-resize"
        role="separator"
        aria-label="Drag to resize the drawing"
        onPointerDown={startResize}
        onPointerMove={moveResize}
        onPointerUp={endResize}
        onPointerCancel={endResize}
      />
    </div>
  );
}
