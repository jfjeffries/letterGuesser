import React from 'react';
import MyArmyMan from './myArmyMan'

export default class MyArmy extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }
    // componentWillMount = () => {
    //     this.setState({
    //         fighters : this.props.fighters
    //     })
    // }
    // componentDidUpdate = () => {
    //     console.log(this.state.fighters, this.state.alive)
        
    // }
    myArmyStyle = {
        
    }
    render(){
        return(
            <div style={this.myArmyStyle}>
                {   
                    this.props.fighters.map((fighter, index) => 
                    <MyArmyMan key={index} value={fighter} index={fighter.index}/>
                    )
                }
            </div>
        )
    }
}