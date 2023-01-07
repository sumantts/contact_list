import { Button, Form, Container, Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from './LoadingSpinner';


const Contact = () => {
  const [ counter, setCounter ] = useState(0);
  const dataFetchedRef = useRef(false);
  const [usersList, setUsersList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

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
        console.log(JSON.stringify(users));  
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
        <td>Edit -|- Delete</td>
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
      </Container>
      </>
    )
  };
  
  export default Contact;