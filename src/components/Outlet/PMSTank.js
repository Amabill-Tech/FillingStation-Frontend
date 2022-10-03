import React, {useRef, useEffect} from 'react';

const TankComponent = (props) => {

    const canvas = useRef();

    useEffect(()=>{
        createTankCanvas(10000, 33000, 1000);
    }, [])

    const createTankCanvas = (level, capacity, deadstock) => {

        let dpi = window.devicePixelRatio;
        let step = Math.floor((capacity - deadstock)/10);
        let current = (300*level)/capacity;

        const drawLine = (height, label) => {
            ctx.beginPath();
            ctx.moveTo(50, height + 3);
            ctx.lineWidth = 1;
            ctx.lineTo(70, height + 3);
            ctx.stroke();

            ctx.fillStyle = "#000";
            ctx.font = "10px Arial";
            ctx.fillText(label, 10, height + 8);
        }

        const drawSmallLine = (height) => {
            ctx.beginPath();
            ctx.moveTo(65, height + 3);
            ctx.lineWidth = 1;
            ctx.lineTo(70, height + 3);
            ctx.stroke();
        }

        const ctx = canvas.current.getContext('2d');

        let style_height = +getComputedStyle(canvas.current).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(canvas.current).getPropertyValue("width").slice(0, -2);

        canvas.current.setAttribute('height', style_height * dpi);
        canvas.current.setAttribute('width', style_width * dpi);

        ctx.beginPath();
        ctx.strokeRect(70, 0, 80, 300);

        let label = capacity;
        for(let i= 0; i < 300; i = i + 30){
            drawLine(i, label);
            label = label - step;
        }

        for(let i= 0; i < 300; i = i + 6){
            drawSmallLine(i);
        }

        ctx.fillStyle= "#399A19";
        ctx.fillRect(70, 300 - current , 230, current);
    }

    return(
        <div>
            <canvas style={{width:'150px', height:'300px'}} ref={canvas}></canvas>
        </div>
    )
}

export default TankComponent;