import React from 'react';


export default class MyArmyMan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rotation : 0,
        }
    }
    componentWillReceiveProps = () => {
        this.rotate();
    }
    rotate = () => {
        // console.log(this.props.value.isAlive)
        if(!this.props.value.isAlive){
            this.setState({
                rotation: -90,
            })
        }
    }
    render(){
        let divStyle = {
            width: "40px",
            height: "50px",
            transform: 'scaleX(-1)',
            marginBotton: "1em",
        }
        let imgStyle = {
            width : "40px",
            height: "auto",
            transform: `rotate(${this.state.rotation}deg)`,
            transition: "transform 1s",
            transformOrigin: "20% 80%",
            filter: "FlipH",
            marginBotton: "10px"
        }
        return(
            <div style={divStyle}>
                <img style={imgStyle} src={require("../dependencies/armyman4.png")} alt=""/>
            </div>
        )
    }
}