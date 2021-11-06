import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function Signin() {
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
                    <h3>Sign In</h3>
                </Card.Header>
                <Card.Body>
                    {show?
                    <SigninForm/>:
                    <SigninMSG/>
                    }
                </Card.Body>
            </Card>
        </div>

    )

    function SigninMSG(){
        return(<>
        <h5>Success</h5>
        <Button type="submit" variant="light" onClick={()=> setShow(true)}>Reauthenticate</Button>
        </>);
        
    }
    
    function SigninForm(){
        const [email, setEmail]       = React.useState('');
        const [password, setPassword] = React.useState('');
        const ctx = React.useContext(UserContext)

        function handle(){

            fetch(`/data`)
                .then(response => response.json())
                .then(data => {
                    
                    const user = data.find((user) => user.email === email);

                    if(!user){
                        console.log('None!')
                        alert("Sign in failed!")
                        return;
                    }

                    if(user.password === password){
                        console.log("Success!")
                        alert("Succesful login!")
                        ctx.ctx_name.setActive_name(ctx.ctx_name.active_name = user.name)
                        ctx.ctx_email.setActive_email(ctx.ctx_email.active_email = user.email)
                        ctx.ctx_account.setActive_account(ctx.ctx_account.active_account = user.accountnumber)
                        ctx.ctx_logged.setLogged_state(ctx.ctx_logged.logged_state = true)

                        console.log(ctx.ctx_name.active_name);
                        console.log(ctx.ctx_email.active_email);
                        console.log(ctx.ctx_logged.logged_state);
                    }

                    setShow(false)
                })
        }
        

        return(<>

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

export default Signin;