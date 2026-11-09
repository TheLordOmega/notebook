import Konva from "konva"
import {useEffect, useRef} from "react"
import {Stage, Layer, Rect, Text, Arrow, Image} from 'react-konva'
import useImage from "use-image"
import {jsPDF} from "jspdf"


export const App = () => {
    const stageRef = useRef(null)
    const textRef = useRef(null)
    const [image] = useImage("https://konvajs.org/asset/darth-vader")
    const width= window.innerWidth
    const height= window.innerHeight


    useEffect(() => {
        textRef.current?.cache();
    }, [])

    const handleExport =() => {
        if (stageRef.current){
            const stage = stageRef.current;
            const pdf = new jsPDF({
                orientation: "landscape",
                unit:"px",
                format: [width, height],
                hotfixes: ["px_scaling"]
            });
            pdf.setTextColor("#000000")


            stage.find("Text").forEach((text) => {
                const size= text.fontSize() * 0.75;
                pdf.setFontSize(size)
                pdf.text(text.text(), text.x(), text.y(),{
                    baseline:"top",
                    angle: -text.getAbsoluteRotation()
                })
            })

            pdf.addImage(
             pdfstage.toDataURL({pixelRatio:2}),
             0,
             0,
             width,
             height
            )
        pdf.save("canvas.pdf")
        } else {
            console.error("Stage is not available")

        }

        }
        return(
            <div style={{position: "relative"}}>
                <button
                 style={{position: "absolute", top:"5px", left:"5px", zIndex:10}}
                onClick={handleExport}
                >Save as Pdf</button>

                <Stage width={width}  height={height}   ref={stageRef}>
                    <Layer>
                        <Rect
                        width={width}
                        height={height}
                        fill="rgba(200,200,200)"/>
                    </Layer>
                </Stage>
                 </div>

        )
    }
