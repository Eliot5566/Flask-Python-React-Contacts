import React from "react";

const ContactList = ({ contacts }) => {
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
              <br></br>
              <td>{contact.lastName}</td>
              <br></br>
              <td>{contact.email}</td>
           
              <td>
                <button>更新</button>
                <button>刪除</button>
              </td>
            </tr>

          ))}

        </tbody>
        </table>
    </div>
  );
}

export default ContactList;