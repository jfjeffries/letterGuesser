import React from 'react';

export default class Splash extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <label htmlFor="username">What is your name?</label>
                <input type="text" name="username"/>
            </div>
        )
    }
}