import React from 'react';
import ArmyMan from './armyMan';

export default class Army extends React.Component {
    constructor(props){
        super(props);
        this.armyRef = React.createRef();
        this.state = {
            XCoordinates: [],
            YCoordinates: [],
            divHeight: 0,
        }
    }
    componentDidMount = () => {
        this.setState({
            divHeight: this.armyRef.current.offsetHeight
        });
    }
    componentDidUpdate = () => {
        // console.log(this.state.divHeight, "IN did update")
    }
    
    divStyle = {
        gridColumn: "1/ span 1",
        // gridRow: "2/ span 1",
        display: "grid",
        // backgroundColor: "tan"
    }
    addToX = (item) => {
        let newArr = this.state.XCoordinates;
        newArr.push(item);
        this.setState({
            XCoordinates: newArr
        })
    }
    addToY = (item) => {
        let newArr = this.state.YCoordinates;
        newArr.push(item);
        this.setState({
            YCoordinates: newArr
        })
    }
    setDivHeight = (height) => {
        console.log("in set", height)
        this.setState({
            divHeight: height
        });
        console.log("in set", this.state.divHeight)
    }
    render(){
        return(
            <div id="armyDiv" ref={this.armyRef} style={this.divStyle}>
                {
                    this.props.letters.map((letter, index) => 
                    <ArmyMan guesses={this.props.guesses} divRef={this.state.armyRef} divHeight={this.state.divHeight} key={index} value={letter} XCoordinates={this.state.XCoordinates} YCoordinates={this.state.YCoordinates} addToX={this.addToX} addToY={this.addToY}/>
                    )
                }
            </div>
        )
    }
}
