import { useState ,useEffect} from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts , setContacts] = useState([])


  const[isModalOpen, setIsModalOpen] = useState(false)

  const[currentContact, setCurrentContact] = useState({})


  useEffect(() => {
    fetchContacts()

  },[])



  const fetchContacts = async () => {
    const res = await fetch("http://127.0.0.1:5000/contacts")

    const data = await res.json()

    setContacts(data.contacts)

    console.log(data.contacts)


  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openModal = () => {
   if(!isModalOpen){
      setIsModalOpen(true)
   }
  }

  const openEditModal = (contact) =>{
    if (!isModalOpen) {
      setCurrentContact(contact);
      setIsModalOpen(true);
  }
  
    }
  
    const onUpdate = () => {
      closeModal()
      fetchContacts()
    }

  return (
    <>
     <ContactList contacts={contacts}  updateContact={openEditModal}  updateCallback={onUpdate}/>
    <button onClick={openModal}>Add Contact</button>
      {/* <ContactForm /> */}
      {isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
           <ContactForm existingContact={currentContact}  updateCallback={onUpdate}/>
         </div>
        </div>}
    </>
  )
}

export default App
