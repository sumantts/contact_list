import styles from './my-style.module.css'; 
import { Button, Form, Container } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Sans-Serif"
      };
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changestate, setChangestate] = useState(false);
    const navigate = useNavigate();

    const doRegistration = async () => {
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify({
            userName: name,
            userEmail: email,
            userPassword: password
          })
        }
        const functionFetch = `https://plugins-development.ordering.co/roy/contact_list/register.php`
        const response = await fetch(functionFetch, requestOptions)
        const content = await response.json()
        console.log(JSON.stringify(content));
    
        if(content.status == true){
            alert('Registration completed successfully')
            setChangestate(true)
        }else{
            alert('Error happened on API')
        }    

    }//end doRegistration

    const handleSubmit = (event) => {
      event.preventDefault();
       if(name === ''){
        alert('Please enter Name')
       }else if(email === ''){
        alert('Please enter Email')
       }else if(password === ''){
        alert('Please enter Password')
       }else{
        console.log('The name you entered was:'+ name )
        doRegistration()
       }
    }

    useEffect( () => {
        if(changestate === true){
            console.log('Redirect to /blog page')
            navigate("/contact");
        }
    }, [changestate])

    return (
        <>
            <Container>
                {/* <h1 style={{color: "red", backgroundColor: "lightblue"}}>Home</h1>
                <p style={myStyle}>Description of this page</p> */}
                <p className={styles.bigblue}>Registration</p>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <Form.Text className="text-muted">
                        Please enter name
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Phone number" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
  };
  
  export default Home;