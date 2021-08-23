import React, { useState, useEffect } from "react";

function ContactList({contact, contacts, handleContactChange}) {
    const [focus, setFocus] = useState();

    useEffect(() => {
        if(focus != contact)
            document.querySelectorAll(".contact-item").forEach((item) => {
                item.style.backgroundColor = "#F8FAFF";
            });
    }, [contact]);

    const handleFocusChange = (contact, index) => {
        handleContactChange(contact);
        document.querySelectorAll(".contact-item").forEach((item) => {
            item.style.backgroundColor = "#F8FAFF";
        });
        document.querySelector("#contact-" + index).style.backgroundColor = "#579AFF";
        setFocus(contact);
    }

    return (
        <ul>
            {contacts.map((contact, index) => {
                return <li id={"contact-" + index} className="contact-item" onClick={() => handleFocusChange(contact, index)} key={contact.id}><span className="contact-name">{contact.firstName + " " + contact.lastName}</span></li>
             })}
        </ul>
    );
}

export default ContactList;
