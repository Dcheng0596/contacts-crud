import React, { useState, useEffect } from "react";
import remove from '../images/remove.svg';

function EmailList({emails, handleDeleteEmail}) {

    const handleMouseOver = (e) => {
        const remove = e.target.querySelector("img");
        if(remove)
            remove.style.visibility = 'visible';
    };

    const handleMouseLeave = (e) => {
        const remove = e.target.querySelector("img");
        if(remove)
            remove.style.visibility = 'hidden';
    };

    return (
        <ul>
            {emails.map(email => {
                return <li className="email-item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} key={email}>{email}
                    <img className="delete ml-3" onClick={() => handleDeleteEmail(email)} src={remove} alt="Delete"></img>
                </li>
             })}
        </ul>
    );
}

export default EmailList;
