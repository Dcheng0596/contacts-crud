import React, { useState, useEffect, useRef } from "react";
import EmailList from './EmailList.js';
import add from '../images/add.svg';

function ContactForm({ contact, fetchContacts, clearContact}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emails, setEmails] = useState([]);
    const emailRef = useRef("");

    useEffect(() => {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmails(contact.emails);
    }, [contact]);

    useEffect(() => {
        emailRef.current.value = "";
    }, [emails]);
    const handleDeleteEmail = (email) => {
        setEmails(emails.filter(curEmail => curEmail !== email));
    }

    const handleSaveContact = async (email) => {
        const url = "https://avb-contacts-api.herokuapp.com/";
        if(!contact.id && firstName.trim() !== "" && lastName.trim() !== "") {
            let response = await fetch(url + "contacts", { 
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    emails: emails
                })
            });
            let json = await response.json();

            fetchContacts(url);
            clearContact();
            return;
        } 
        let isEmailsEqual =
            contact.emails.length === emails.length &&
            contact.emails.every(function (email) {
              return emails.includes(email);
            });
        if(contact.id && contact.firstName !== firstName || contact.lastName !== lastName || !isEmailsEqual) {
            let response = await fetch(url + "contacts/" + contact.id, { 
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    emails: emails
                })
            });
            let json = await response.json();

            fetchContacts(url);
        }
    }

    const handleDeleteContact = async (email) => {
        if(contact.id && firstName.trim() !== "" && lastName.trim() !== "") {
            const url = "https://avb-contacts-api.herokuapp.com/";
            let response = await fetch(url + "contacts/" + contact.id, { method: "DELETE" });

            fetchContacts(url);
            clearContact();
        }
    }

    const handelAddEmail = (e) => {
        emailRef.current.value = "";
        const input = document.querySelector(".email-input");
        if(input.style.visibility === "" || input.style.visibility === "hidden") {
            input.style.visibility = "visible";
        } else 
        if(input.style.visibility === "visible") {
            input.style.visibility = "hidden";
        }
    }

    return (
        <div className="contact-container w-100 m-5  d-flex flex-column justify-content-between
        ">
            <div className="form-group">
                <div className="row">
                    <div className="form-group col-md-6">
                        <small>First Name</small>
                        <input className="form-control" onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" value={firstName}></input>
                    </div>
                    <div className="form-group col-md-6">
                        <small>Last Name</small>
                        <input className="form-control" onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" value={lastName}></input>
                    </div>
                    
                </div>
                <div className="email">
                    <small>Email</small>
                    <EmailList emails={emails} handleDeleteEmail={handleDeleteEmail}/>
                    <div className="email-bar from-control mt-2">
                        <img 
                            onClick={() => {
                                if(emailRef.current.value.trim() !== "") {
                                    if(!emails.includes(emailRef.current.value.trim()))
                                        setEmails((state, props) => [...state, emailRef.current.value.trim()]);
                                }
                            }} 
                            src={add} 
                            alt="Add"
                            width="24"
                        ></img>
                        <span className="add-email" onClick={handelAddEmail}>add email</span>
                        <input className="email-input form-control" ref={emailRef} type="text" name="Add Email"></input>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn-lg btn-danger" onClick={handleDeleteContact}>Delete</button>
                <div>
                    <button className="btn-lg btn-light mr-3" onClick={clearContact}>Cancel</button>
                    <button className="btn-lg btn-primary" onClick={handleSaveContact}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
