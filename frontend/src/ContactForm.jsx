import {useState} from "react"

const ContactForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(firstName, lastName, email)

        const data = {firstName, lastName, email}

        const url = 'http://127.0.0.1:5000/create_contact'

        const option ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, option)
        if(response.ok){
            console.log('Contact created')
        }
        else{
            console.log('Contact not created')
        }

    }

    return <form onSubmit={handleSubmit}>

        <div>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />


        </div>

        <div>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div>
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button >Submit</button>
        </form>

}

export default ContactForm;
