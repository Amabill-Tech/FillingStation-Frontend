import React, {useRef, useEffect} from 'react';
import { useState } from 'react';

const TankComponent = (props) => {

    const canvas = useRef();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [deadstock, setDeadStock] = useState(0);

    useEffect(()=>{
        createTankCanvas(currentLevel, capacity, deadstock);
    }, [capacity, currentLevel, deadstock]);

    useEffect(()=>{
        setCapacity(props.data.DPKTankCapacity);
        setCurrentLevel(props.data.totalDPK);
        setDeadStock(props.data.DPKDeadStock);
    }, [props.data.DPKTankCapacity, props.data.totalDPK, props.data.DPKDeadStock]);
    const createTankCanvas = (level, capacity, deadstock) => {

        let dpi = window.devicePixelRatio;
        let step = Math.floor((capacity - deadstock)/10);
        let current = (300*level)/capacity;

        const drawLine = (height, label) => {
            ctx.beginPath();
            ctx.moveTo(50*dpi, (height + 3)*dpi);
            ctx.lineWidth = 1*dpi;
            ctx.lineTo(70*dpi, (height + 3)*dpi);
            ctx.stroke();

            ctx.fillStyle = "#000";
            ctx.font = `${10*dpi}px Arial`;
            ctx.fillText(label, 10*dpi, (height + 8)*dpi);
        }

        const drawSmallLine = (height) => {
            ctx.beginPath();
            ctx.moveTo(65*dpi, (height + 3)*dpi);
            ctx.lineWidth = 1;
            ctx.lineTo(70*dpi, (height + 3)*dpi);
            ctx.stroke();
        }

        const ctx = canvas.current.getContext('2d');

        let style_height = +getComputedStyle(canvas.current).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(canvas.current).getPropertyValue("width").slice(0, -2);

        canvas.current.setAttribute('height', style_height * dpi);
        canvas.current.setAttribute('width', style_width * dpi);

        ctx.beginPath();
        ctx.strokeRect(70*dpi, 0*dpi, 78*dpi, 300*dpi);

        let label = capacity;
        for(let i= 0; i < 300; i = i + 30){
            drawLine(i, label);
            label = label - step;
        }

        for(let i= 0; i < 300; i = i + 6){
            drawSmallLine(i);
        }

        ctx.fillStyle= "#35393E";
        ctx.fillRect(70*dpi, (300 - current)*dpi , 230*dpi, current*dpi);
    }

    return(
        <div style={canvases}>
            <canvas style={{width:'150px', height:'300px'}} ref={canvas}></canvas>
        </div>
    )
}

const canvases = {
    width: '100%',
    height:'100%',
}

export default TankComponent;