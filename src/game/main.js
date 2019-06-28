import React from 'react';
import Guessing from './guessing';
import Army from './army';
import MyArmy from './myArmy';
import Modal from './modal'
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
            fighters : [],
            modalIsOpen : false,
            didWin : "",
            playerName : "",
            imgSrc : null,
        }
    }
    letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    returnRandom = (limit) => {
        return Math.floor(Math.random()*limit);
    }
    explosion = (setPic) => {
        let exp = new Promise(function(resolve, reject){
            console.log("explosion 1")
            resolve (setPic(require("../dependencies/explosion4.svg")));
            
        })
        .then(function(){
            console.log("explosion 2")
            setTimeout(()=> {
                setPic(require("../dependencies/explosion3.svg"))
            }, 100)
        })
        .then(function(){
            console.log("explosion 3")
            setTimeout(()=> {
                setPic(require("../dependencies/explosion2.svg"))
            }, 200)
        })
        .then(function(){
            console.log("explosion 4")
            setTimeout(()=> {
                setPic(require("../dependencies/explosion1.svg"))
            }, 300)
        })
    }

    setPic = (src) => {
        this.setState({
            imgSrc : src
        })
    }

    componentWillMount = () => {
        this.setState({
            playerName : localStorage.getItem("username")
        })
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
    Fighter = function (alive, index){
        this.isAlive = alive; 
        this.index = index;
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
        if(this.state.losses === 10){
            this.endGame(false);
        } else {
            this.startNewGame();
        }
    }
    toggleModal = () => {
        this.setState({
            modalIsOpen : !this.state.modalIsOpen
        })
    }
    endGame = (didWin) => {
        if(didWin){
            console.log("You won the war!")
            this.toggleModal();
            this.setState({
                didWin: "You won the war!!"
            })
        } else {
            this.toggleModal();
            this.setState({
                didWin: "Annihilated!!"
            })
            this.explosion(this.setPic);
        }

    }
    handleWin = () => {
        this.setState({
            wins : this.state.wins + 1,
            guesses : Array(10).fill(''),
            guessCount : 0,
        });
        if(this.state.wins === 10){
            this.endGame(true);
        } else {
            this.startNewGame();
        }
    }
    startNewGame = () => {
        this.setLetterToGuess();
        this.setPlayers();
    }
    setPlayers = () => {
        let newArr = [];
        for(let i = 0; i < 10; i++){
            if(i < this.state.leftAlive){
                let myFighter = new this.Fighter(true, i);
                newArr.push(myFighter);
                
            } else {
                let myFighter = new this.Fighter(false, i);
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
        background: "linear-gradient(0deg, rgba(171,223,123,1) 0%, rgba(112,167,62,1) 29%, rgba(8,129,50,1) 67%, rgba(0,212,255,1) 68%, rgba(210,247,255,1) 95%)",

    }

    myTeamStyle = {
        gridColumn : "2/3",
        gridRow: "2/ end",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "5em",
    }
    enemyDiv = {

        display: "grid",
        gridColumn: "1/ span 1",
        gridRow: "2/ end",
    }
    headerDiv = {
        gridColumn : "1/ end",
        gridRow : "1/ span 1",
    }
    modalStyle = {
        display:"grid",
        position: "absolute",
        margin: "auto",
        top: "50%",
        left: "25%",
    }
    h2Style = {
        gridColumn: "2/ end",
        gridRow: "1/ span 1",
    }
    imgStyle = {
        width: "20vw",
        height: "auto",
        gridColumn: "1/ span 1",
        gridRow: "2/ span 1",
        alignSelf: "start",
        justifySelf: "end",
    }
    render(){
        return(
            <div style={this.wrapper}>
                <div style={this.headerDiv}>
                    <h2>Enemy Slain: {this.state.wins}</h2>
                    <h2>Losses Sustained: {this.state.losses}</h2>
                </div>
                <div style={this.h2Style}>
                    <h2>Hello {this.state.playerName}, war is upon you.</h2>
                </div>
                <img style={this.imgStyle} src={this.state.imgSrc} alt=""/>
                <Modal isOpen={this.state.modalIsOpen} didWin={this.state.didWin} style={this.modalStyle}/>
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