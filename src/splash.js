import React from 'react';
import Main from './game/main'

export default class Splash extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            wantToPlay: false,
            username: window.localStorage.getItem('username')
        }
    }
    toggle = () => {
        this.setState({
            wantToPlay: !this.state.wantToPlay
        })
    }
    changeName = () => {
        let input = document.getElementById('nameInput');
        localStorage.setItem('username', input.value)
        window.location.reload();
    }
    imageSrc = `url("./dependencies/war_torn.jpeg")`
    wrapperStyle = {
        // backgroundImage: this.imageSrc,
        // width: "100vw",
        // height: "100vh",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
    }
    divStyle = {
        width: "100vw",
        paddingLeft: "2em",
    }
    whatToDisplay = () => {
        if(this.state.wantToPlay){
            return (
                <Main />
            )
        } else {
            return (
            <div style={this.divStyle}>
                <img src="./comet.jpeg" alt="" id="comet" style={this.cometStyle}/>
                <h3>You are entering a world of pain {this.state.username}. WWIII is almost over, and you are losing.</h3>
                <span></span>
                <div>
                    <p>If you would like to be a hero, press this button. <button onClick={this.toggle}>Press Me</button></p>
                </div>
                    <p>Enter your name. <input type="text" id="nameInput"/><button onClick={this.changeName}>Submit</button></p>
            </div>
            )
        }
    }
    render(){
        return(
            <div style={this.wrapperStyle} id="splashWrapper">
                {this.whatToDisplay()}
            </div>
        )
    }
}