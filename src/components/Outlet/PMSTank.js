import React, {useRef, useEffect} from 'react';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const TankComponent = (props) => {

    const canvas = useRef();
    const [currentLevel, setCurrentLevel] = useState(props.data.totalPMS || 0);
    const [capacity, setCapacity] = useState(props.data.PMSTankCapacity || 33000);
    const [deadstock, setDeadStock] = useState(props.data.PMSDeadStock || 0);

    useEffect(()=>{
        setCapacity(props.data.PMSTankCapacity);
        setCurrentLevel(props.data.totalPMS);
        setDeadStock(props.data.PMSDeadStock);

        return () => {
            setCurrentLevel(0);
            setCapacity(33000);
            setDeadStock(0);
        }

    }, [props.data.PMSDeadStock, props.data.PMSTankCapacity, props.data.totalPMS])

    useEffect(()=>{
        createTankCanvas(currentLevel, capacity, deadstock);

        return () => {
            setCurrentLevel(0);
            setCapacity(33000);
            setDeadStock(0);
        }
        
    }, [capacity, currentLevel, deadstock]);

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

        ctx.fillStyle= "#399A19"
        
        var z = 1;

        function myLoop(){
            setTimeout(function(){
                ctx.fillRect(70*dpi, (300 - z)*dpi , 230*dpi, current*dpi);
                z++;
                if(z <= current){
                    myLoop();
                }
            }, 5)
        }

        if(current > 0){
            myLoop();
        }
    }

    return(
        <div style={canvases}>
            <Tooltip title={`${props.data.totalPMS} Litres`} followCursor>
                <canvas style={{width:'150px', height:'300px'}} ref={canvas}></canvas>
            </Tooltip>
        </div>
    )
}

const canvases = {
    width: '100%',
    height:'100%',
}

export default TankComponent;