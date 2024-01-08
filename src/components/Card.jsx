import { useState } from "react";
import "../styles/card.css"

function Card({name, imageSource, handleCardSelect}){

    const handleSelect = () => {
        handleCardSelect(name)
    }
    return (
        <div className="card" onClick={handleSelect}>
            <img src={imageSource}/>
            <p>{name}</p>
        </div>
    );
}

export default Card;