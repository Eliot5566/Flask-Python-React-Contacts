/* eslint-disable react/prop-types */
import {useState} from "react"

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || '')
    const [lastName, setLastName] = useState(existingContact.lastName ||'')
    const [email, setEmail] = useState(existingContact.email ||'')


    const updating  = Object.entries(existingContact).length > 0


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(firstName, lastName, email)

        const data = {firstName, lastName, email}

        // const url = 'http://127.0.0.1:5000/ + ${updataing ? `update_contact/${existingContact.id}` : "create_contacts"}'
        const url = `http://127.0.0.1:5000/${updating  ? `update_contact/${existingContact.id}` : "create_contact"}`;


        const option ={
            method: updating ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, option)
        if(response.ok){
            console.log('Contact created')
            updateCallback()
        }
        else{
            console.log('Contact not created')
        }

    }

    return <form onSubmit={handleSubmit}>

        <div>
            <label  htmlFor="firstName">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />


        </div>

        <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
            <label htmlFor="email">Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button type="submit"> {updating  ? "Update" : "Submit"}</button>
        </form>

}

export default ContactForm;
