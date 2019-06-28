import React from 'react';

export default class Login extends React.Component {
    submitName = (e) => {
        let myInput = document.getElementById('myInput')
        console.log(myInput.value)
        localStorage.setItem('username', myInput.value)
        this.props.shouldReturn();
    }
    render(){
        return(
            <div>
            <label htmlFor="username">What is your name?</label>
                <input type="text" name="username" id="myInput"/>
                <button type="submit" onClick={this.submitName}>Submit</button>
            </div>
        )
    }
}