import React from 'react';

export default class ArmyMan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: "black",
            x:this.returnRandom(0, 60, 'x'),
            y:this.returnRandom(35, 90, 'y'),
            rotation: 0,
            scale: 0,
        }
    }
    
    componentWillReceiveProps = () => {
        this.setScale(this.state.y);
        this.setColor();
    }
    setScale = (y) => {
        let scale;
        if(y<40){
            scale = 1;
        } else if (y>= 40 && y < 50){
            scale = 1.2;
        } else if (y >= 50 && y < 60){
            scale = 1.4;
        } else if (y >= 60 && y < 70){
            scale = 1.6;
        } else if (y >= 70 && y < 80){
            scale = 1.8;
        } else {
            scale = 2;
        }
        this.setState({
            scale: scale
        })
    }
    setColor = () => {
        let x;
        let angle = 0;
        if(this.props.guesses.includes(this.props.value)){
            x =  "red";
            angle = 90;
        } else {
            x = "black";
        }
        this.setState({
            color: x,
            rotation: angle
        })
    }
    returnRandom = (min, max, coord) => {
        let arrX = this.props.XCoordinates;
        let arrY = this.props.YCoordinates;
        let num = 0;
        let bool = false;
        do{
            num = Math.floor(Math.random()*(max - min) + min);
            bool = this.loopOverArray(arrX, arrY, num);
            if(bool){
                bool = this.loopOverArray(arrY, arrX, num);
            }
        } 
        while (!bool);
        
        if(coord === 'x'){
            this.props.addToX(num);
        } else {
            this.props.addToY(num);
        }
        return num;
    }
    loopOverArray(outer, inner, num){
        // console.log(outer, inner, num)
        for(let i = 0; i < outer.length; i++){
            if(num > outer[i]-5 && num < outer[i]+5){
                for(let j = 0; j < inner.length; j++){
                    if(num > inner[j]-5 && num < inner[j]+5){

                        return false;
                    }
                    // console.log(num, outer[i], inner[j])
                    
                }
            } 
            // else {
            //     if(num > inner[i]-5 && num < inner[i]+5){
            //         for(let k = 0; k < outer.length; k++){
            //             if(num > outer[k]-5 && num < inner[k]+5){
            //                 return false;
            //             }
            //         }
            //     }
            // }
        }
        return true;
    }
    
    render(){
        let divStyle = {
            width: "40px",
            position: "absolute",
            left: `${this.state.x}vw`,
            top: `${this.state.y}vh`,
            height: "50px"
        }
        let pStyle = {
            color : this.state.color,
            position: "relative",
            top: "-40px",
            left: "20px",
            fontSize: "150%"
        }
        let imgDiv = {
            transform: `scale(${this.state.scale})`
        }
        let imgStyle = {
            width : "25px",
            height: "auto",
            transform: `rotate(-${this.state.rotation}deg)`,
            transition: "transform 1s",
            transformOrigin: "20% 80%",
        } 
        return(
            <div style={divStyle}>
                <div style={imgDiv}>
                    <img style={imgStyle} src={require("../dependencies/armyman4.png")} alt=""/>
                </div>
                <p style={pStyle}>{this.props.value}</p>
            </div>
        )
    }
}