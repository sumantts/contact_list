//import React from 'react'
import { React, useState, useEffect} from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ showModal, hideModal, confirmModal, editData, contactId, tempName, tempEmail, tempPassword }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
      if((tempName === '')&&( name === '')){
        alert('Please enter Name')
      }else if(tempEmail === '' && email === ''){
        alert('Please enter Email')
      }else if(tempPassword === '' && password === ''){
        alert('Please enter Password')
      }else{
        console.log('The name you entered was:'+ name )
        doUpdateContact()
      }
  }//end validation

  const doUpdateContact = async () => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: contactId,
        userName: name,
        userEmail: email,
        userPassword: password
      })
    }
    const functionFetch = `https://plugins-development.ordering.co/roy/contact_list/update_contact.php`
    const response = await fetch(functionFetch, requestOptions)
    const content = await response.json()
    console.log(JSON.stringify(content));

    if(content.status == true){
      alert('Data Updated Successfully')        
      confirmModal() 
    }else{
        alert('Error happened on API')
    }    

  }//end doUpdateContact

    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" defaultValue={tempName? tempName: ''} onChange={(e) => setName(e.target.value)}/>
              <Form.Text className="text-muted">
              Please enter name
              </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" defaultValue={tempEmail? tempEmail: ''} onChange={(e) => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="Phone number" value={tempPassword? tempPassword: ''} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
          Update
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditModal;