import React from "react";
import "./style.scss";

function LoadingAnim() {
    const words = ["L", "O", "A", "D", "I", "N", "G"];
    return (
        <div className="loading-text">
            {words.map(w => (
                <span key={w} className="loading-text-words">
                    {w}
                </span>
            ))}
        </div>
    );
}

export default LoadingAnim;
