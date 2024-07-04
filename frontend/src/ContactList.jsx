/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//ContractLIst.jsx
import React from "react";

const ContactList = ({ contacts,updateContact,updateCallback }) => {

    const onDelete = async(id) => {
        try {
         const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, { method: 'DELETE' })
            if (response.ok) {
                console.log('Contact deleted')
                updateCallback()
            }
            else {
                console.log('Contact not deleted')
            }
            
        } catch (error) {
            console.log(error)
        }
    }










  return (
    <div>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
        
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
       
              <td>{contact.lastName}</td>
      
              <td>{contact.email}</td>
           
              <td>
                <button onClick={() => updateContact(contact)}>更新</button>
                <button onClick={() => onDelete(contact.id)}>刪除</button>
              </td>
            </tr>

          ))}

        </tbody>
        </table>
    </div>
  );
}

export default ContactList;