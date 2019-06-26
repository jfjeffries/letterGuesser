import React from 'react';


export default class MyArmyMan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rotation : 0,
            scale : 0,
            margin : this.props.index,
            topMargin : 0,
        }
    }
    componentWillMount = () => {
        this.setCss();
    }
    componentWillReceiveProps = () => {
        this.rotate();
        this.setCss();
    }
    rotate = () => {
        // console.log(this.props.value.isAlive)
        if(!this.props.value.isAlive){
            this.setState({
                rotation: -90,
            })
        }
    }
    setCss = () => {
        let newScale = 0;
        let top = 0;

        switch (this.props.index){
            case 0: newScale = 1; top = 0;
            break;
            case 1: newScale = 1.1; top = 0;
            break;
            case 2: newScale = 1.2; top = 0;
            break;
            case 3: newScale = 1.3; top = 0;
            break;
            case 4: newScale = 1.4; top = 0;
            break;
            case 5: newScale = 1.5; top = 0;
            break;
            case 6: newScale = 1.6; top = 0;
            break;
            case 7: newScale = 1.7; top = 0;
            break;
            case 8: newScale = 1.8; top = 0;
            break;
            default: newScale = 2; top = 0;
            break;
        }
        this.setState({
            scale : newScale,
            margin: this.props.index,
            topMargin: top,
        })
    }
    render(){
        let divStyle = {
            width: "40px",
            height: "50px",
            transform: 'scaleX(-1)',
            marginBotton: "1em",
            marginLeft: this.state.margin + "em",
            marginTop: this.state.topMargin + "em",
        }
        let divStyleTwo = {
            transform: `scale(${this.state.scale})`
        }
        let imgStyle = {
            width : "25px",
            height: "auto",
            transform: `rotate(${this.state.rotation}deg) `,
            transition: "transform 1s",
            transformOrigin: "20% 80%",
            filter: "FlipH",
            marginBotton: "10px",
        }
        return(
            <div style={divStyleTwo}>
                <div style={divStyle}>
                    <img style={imgStyle} src={require("../dependencies/armyman4.png")} alt=""/>
                </div>
            </div>
        )
    }
}