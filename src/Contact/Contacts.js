import React, { useState, useEffect } from "react";
import ContactList from './ContactList.js';
import ContactForm from './ContactForm.js';
import add from '../images/add.svg';

function Contacts() {
    const newContact = {firstName: "", lastName: "", emails: []};
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(newContact); // contact in focus

    const url = "https://avb-contacts-api.herokuapp.com/";

    const fetchContacts = async (url) => {
        let response = await fetch(url + "contacts");
        let json = await response.json();
    
        setContacts(json)
    }

    useEffect(() => {
        fetchContacts(url);
    }, []);


    const handleContactChange = (newContact) => {
        setContact(newContact);
    }

    const clearContact = () => {
        setContact(newContact);
    }

    return (
    <div className="d-flex">
        <div className="contacts">
            <div className="contact-header">
                <div><span>Contacts</span></div>
                <img onClick={() => setContact(newContact) }src={add} alt="Add" width="40"></img>
            </div>
            <div className="contact-list">
                <ContactList contact={contact} contacts={contacts} handleContactChange={handleContactChange}/>
            </div>
        </div>
        <ContactForm contact={contact} fetchContacts={fetchContacts} clearContact={clearContact}/>
    </div>
    );
}

export default Contacts;
