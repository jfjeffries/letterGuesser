import React from 'react';

export default function Modal(props){
    function reset(){
        window.location.reload();
    }
    if(props.isOpen){
        return (
            <div>
                <div>
                    <h2>{props.didWin}</h2>
                </div>
                <button onClick={reset}>Reset</button>
            </div>
        )
    } else {
        return null;
    }
}