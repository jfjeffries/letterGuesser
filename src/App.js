import React from 'react';
import './App.css';
import Splash from './splash';
import Login from './login'

function App() {
  function shouldReturn(){
    if(localStorage.getItem("username")){
      return(
        <Splash />
      )
    } else {
      return(
      <Login shouldReturn={shouldReturn}/>
      )  
    }
  }
  let divStyle = {
    
  }
  return (
    <div style={divStyle}>
      {/* {shouldReturn()} */}
      <Splash />
    </div>
  );
}

export default App;
