import { Container, Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from './LoadingSpinner';
import { BsBoxArrowInUpRight, BsFillTrashFill, BsAlignMiddle } from 'react-icons/bs';
import DeleteConfirmation from './DeleteConfirmation'
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal'


const Contact = () => {
  const [ counter, setCounter ] = useState(0);
  const dataFetchedRef = useRef(false);
  const [usersList, setUsersList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ displayConfirmationModal, setDisplayConfirmationModal ] = useState(false)
  const [ hideConfirmationModal, setHideConfirmationModal ] = useState(false)
  const [type, setType] = useState(null)
  const [id, setId] = useState(null)
  const [deleteMessage, setDeleteMessage] = useState(null);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState()

  const [contactId, setContactId] = useState('');
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  
  const fetchData = async () => {
    setCounter( (oldValue) => oldValue+1)
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        userEmail: 'suman.acuity@gmail.com'
      })
    }
    const functionFetch = `https://plugins-development.ordering.co/roy/contact_list/fetch_user.php`
    const response = await fetch(functionFetch, requestOptions)
    const content = await response.json()
    //console.log(JSON.stringify(content));

    if(content.status == true){
        const users = content.users;  
        //console.log(JSON.stringify(users));  
        if(users.length > 0){
          setUsersList(users)
          setIsLoading(false)
        }  
    }else{
      setIsLoading(false)
      alert('Error happened on API')
    }    

  }

  useEffect( () => {
    console.log('call users list API')
    if(dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData()
  }, [])

  const deleteMyContact = (id, type) => {
    console.log(JSON.stringify(type))
    setType(type);
    setId(id);
    setDeleteMessage('Are you suret to delete this contact? ' + type)
    setHideConfirmationModal(false)
    setDisplayConfirmationModal(true);
  }

  // Hide the modal
  const handelHideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async (type, id) => {
    handelHideConfirmationModal()
    setIsLoading(true)
    console.log(type, id)
    
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: id
      })
    }
    const functionFetch = `https://plugins-development.ordering.co/roy/contact_list/delete_user.php`
    const response = await fetch(functionFetch, requestOptions)
    const content = await response.json()

    if(content.status == true){
      fetchData()
      setIsLoading(false)
    }else{
      setIsLoading(false)
      alert('Error happened on API')
    }     
  }//end fun

  const editContact = (data) => {
    console.log('Edit user: '+ JSON.stringify(data))
    setContactId(data.id)
    setTempName(data.user_name)
    setTempEmail(data.user_email)
    setTempPassword(data.user_password)

    setEditData(data)
    setShowEditModal(true)
  }//end fun

  const handelHideEditModal = () => {
    setShowEditModal(false)
  }

  const updateContactInfo = () => {
    fetchData()
    handelHideEditModal()
    console.log('close modal')
  }


  //start rendering
  const renderUserListTable = (    
    <Table striped bordered hover>
    <thead>
      <tr>
        <td>Sl.No</td>
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
    {usersList.map( data => (
      <tr key={ data.id }>
        <td>{ data.id }</td>
        <td>{ data.user_name }</td>
        <td>{ data.user_email }</td>
        <td>{ data.user_password }</td>
        <td>
          <BsBoxArrowInUpRight 
          onClick={() => editContact(data)}
          /> 

          <BsFillTrashFill 
          onClick={() => deleteMyContact(data.id, data.user_name)}
          />
        </td>
      </tr>
    ))
    }
    </tbody>
   </Table>
  )
  //end rendering
  
    return (
      <>  
      <Container> 
         <h1>My Contact List</h1>

        {/* Render table start from here */}             
        { isLoading ? <LoadingSpinner /> : renderUserListTable }
        {/* Render table start from here */}

        <DeleteConfirmation 
        showModal={displayConfirmationModal} 
        confirmModal={submitDelete} 
        hideModal={handelHideConfirmationModal} 
        type={type} 
        id={id} 
        message={deleteMessage}  
        />

        <EditModal 
        showModal={showEditModal}
        hideModal={handelHideEditModal}
        confirmModal={updateContactInfo}
        editData={editData}
        contactId={contactId}
        tempName={tempName}
        tempEmail={tempEmail}
        tempPassword={tempPassword}
        />
      </Container>
      </>
    )
  };
  
  export default Contact;