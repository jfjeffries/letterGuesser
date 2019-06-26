import React from 'react';
// import Letter from './letter'

export default class Guessing extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
            
    //     }
    // }
    componentWillMount(){
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        })
    }
    componentWillUnmount(){
        document.removeEventListener('keydown');
    }
    handleKeyDown = (e) => {
        let guess = e.key;
        let guessCode = e.keyCode;
        if(guessCode > 64 && guessCode < 91 && !this.props.guesses.includes(guess)){
            if(guess === this.props.letterToGuess){
                this.props.handleWin();
            } else if(this.props.guessCount < 9){
                let arr = this.props.guesses;
                arr[this.props.guessCount] = guess;
                this.props.addLetter(arr);
            } else {
                this.props.handleLoss();
            }
        }
    }

    render(){
        
        return(
            <div>
                {/* <ul>
                    {
                        this.props.guesses.map((letter, index) => 
                        <Letter whatToDisplay={this.props.whatToDisplay} key={index} value={letter} />
                        )
                    }
                </ul> */}
            </div>
        )
    }
}