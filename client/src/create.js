import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function Create() {
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState(''); 

    return (
        <div className="Card_box">
            <Card
                bg={'secondary'}
                key={'secondary'}
                text={'light'}
                style={{ width: '25rem', padding: '10px' }}
            >
                <Card.Header>
                    <h3>Create Account</h3>
                </Card.Header>
                <Card.Body>
                    {show?
                    <CreateAccountForm/>:
                    <CreateMsg/>
                    }
                </Card.Body>
            </Card>
        </div>

    )

    function CreateMsg(){
        return(<>
        <h5>Success</h5>
        <Button type="submit" variant="light" onClick={()=> setShow(true)}>Create Another Account</Button>
        </>);
        
    }
    
    function CreateAccountForm(){
        const [name, setName]         = React.useState('');
        const [email, setEmail]       = React.useState('');
        const [password, setPassword] = React.useState('');
        const ctx = React.useContext(UserContext)

        function handle(){
            console.log(name, email, password)
            const url = `/create/account/${name}/${email}/${password}`;
            (async ()=> {
                var res     = await fetch(url);
                var data    = await res.json();
                console.log(data)
            })();


            setShow(false)
        }
        

        return(<>
             Name<br/>
            <input type="input" 
            className="form-control" 
            placeholder="Enter name" 
            value={name} 
            onChange={e => setName(e.currentTarget.value)} /><br/>

            
            Email<br/>
            <input type="input" 
            className="form-control" 
            placeholder="Enter email" 
            value={email} 
            onChange={e => setEmail(e.currentTarget.value)}/><br/>

            Password<br/>
            <input type="password" 
            className="form-control" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.currentTarget.value)}/><br/>

            <Button type="submit" variant="light" onClick={handle}>Submit</Button>
                
                </>)
            

        
    }












}

export default Create;