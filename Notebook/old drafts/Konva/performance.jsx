import {Stage, Layer, Star, Rect} from "react-konva"
import {Portal} from "react-konva-utils"
import {useState, useRef, useEffect} from "react"

export const App= () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x:200, y:200})
    const starRef= useRef(null)
    useEffect(()=> {
        if (starRef.current) {
            starRef.current.cache()
        }
    }, [])

    const handleDragStart = () => {
        setIsDragging(true)
    }

    const handleDragEnd = (event) => {
        setPosition (event.target.position())
        setIsDragging(false);
    }


    return(
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer listening={false}>
                <Rect
                x={0}
                y={0}
                width={window.innerWidth}
                height={window.innerHeight}
                fill="lightgray"
                />
            </Layer>
            <Layer>
                <Portal selector=".drag-layer" enabled={isDragging}>
                  <Star
                     ref={starRef}
                     x={position.x}
                     y={position.y}
                     numPoints={6}
                     innerRadius={40}
                     outerRadius={70}
                     fill="yellow"
                     stroke="black"
                     strokeWidth = {4}
                     draggable
                     perfectDrawEnabled={false}
                     onDragStart= {handleDragStart}
                     onDragEnd={handleDragEnd}
                     />

              </Portal>
            </Layer>
            <Layer name="drag-layer"/>
        </Stage>
    )
}
