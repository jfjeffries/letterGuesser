import React from 'react';
import Guessing from './guessing';
import Army from './army';
import MyArmy from './myArmy';
import { NONAME } from 'dns';
import { tsAnyKeyword } from '@babel/types';
// import fighter from './fighter'

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            letterToGuess : "",
            wins : 0,
            losses : 0,
            guesses : Array(10).fill(''),
            guessCount : 0,
            leftAlive : 10,
            fighters : []
        }
    }
    letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    returnRandom = (limit) => {
        return Math.floor(Math.random()*limit);
    }
    componentWillMount = () => {
        this.startNewGame();
    }
    componentDidUpdate = () => {
        // console.log("left alive", this.state.leftAlive, this.state.fighters)
    }
    setLetterToGuess = () => {
        let num = this.returnRandom(26);
        let letter = this.letters[num];
        this.setState({
            letterToGuess : letter
        });
    }
    Fighter = function (alive){
        this.isAlive = alive; 
    }
    handleLoss = () => {
        let x = this.state.leftAlive;
        x--;
        this.setState({
            losses : this.state.losses + 1,
            guesses : Array(10).fill(''),
            guessCount : 0,
            leftAlive : x,
        })
        this.startNewGame();
    }
    handleWin = () => {
        this.setState({
            wins : this.state.wins + 1,
            guesses : Array(10).fill(''),
            guessCount : 0,
        });
        this.startNewGame();
    }
    startNewGame = () => {
        this.setLetterToGuess();
        this.setPlayers();
    }
    setPlayers = () => {
        let newArr = [];
        for(let i = 0; i < 10; i++){
            if(i < this.state.leftAlive){
                let myFighter = new this.Fighter(true);
                newArr.push(myFighter);
                
            } else {
                let myFighter = new this.Fighter(false);
                newArr.push(myFighter);
            }
        }

        this.setState({
            fighters : newArr
        })

    }
    addLetter = (arr) => {
        this.setState({
            guesses : arr,
            guessCount : this.state.guessCount + 1
        });
        
    }
    guessingStyle = {
        display: "none",
    }
    frameDivStyle = {
        width: "100%",
        height: "20vh"
    }
    frameStyle = {
        position: "absolute"
    }
    imgStyle = {
        width: "20vw",
        height: "auto"
    }
    wrapper = {
        display: "grid",
        gridTemplateColumns : "2fr 1fr",
        gridTemplateRows: "1fr 5fr",
        height: "100vh",
        background: "rgb(112,167,62)",
        background: "linear-gradient(0deg, rgba(112,167,62,1) 0%, rgba(112,167,62,1) 58%, rgba(8,129,50,1) 67%, rgba(0,212,255,1) 75%)",

    }

    myTeamStyle = {
        gridColumn : "2/3",
        gridRow: "2/ end",
        display: "grid",
        justifyContent: "center",
        alignContent: "center"
    }
    enemyDiv = {

        display: "grid",
        gridColumn: "1/ span 1",
        gridRow: "2/ end",
    }
    headerDiv = {
        gridColumn : "1/ end",

    }
    render(){
        return(
            <div style={this.wrapper}>
                <div style={this.headerDiv}>
                    <h2>Wins: {this.state.wins}</h2>
                    <h2>Losses: {this.state.losses}</h2>
                </div>
                {/* {this.state.letterToGuess} */}
                <div style={this.enemyDiv}>
                    <Army guesses={this.state.guesses} letters={this.letters}/>
                </div>
                    <Guessing style={this.guessingStyle} whatToDisplay={this.whatToDisplay} addLetter={this.addLetter}guesses={this.state.guesses}guessCount={this.state.guessCount}letterToGuess={this.state.letterToGuess} handleLoss={this.handleLoss} handleWin={this.handleWin}></Guessing>
                <div style={this.myTeamStyle}>
                    <MyArmy fighters={this.state.fighters}/>
                </div>
            </div>
        )
    }
}