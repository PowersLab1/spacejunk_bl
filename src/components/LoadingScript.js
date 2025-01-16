import React from 'react'
import backgroundImage from "../resources/background_level1.jpg"
import "./Font.css"

const style = {
    fontFamily: "VT323",
    textAlign: "center",
    color: "white",
    backgroundPosition: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "cover"
}

export const LoadingScript = () => {
    return (
        <div style={style}>
            <h3 style={{ margin: "0" }}>Loading Script, if this page persists, please refresh or contact support</h3>
        </div>
    )
}



