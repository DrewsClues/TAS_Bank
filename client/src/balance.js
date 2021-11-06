import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function Balance() {
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
                    <h3>Balance</h3>
                </Card.Header>
                <Card.Body>
                    <BalanceForm/>
                </Card.Body>
            </Card>
        </div>

    )

    
    function BalanceForm(){
        const ctx = React.useContext(UserContext)
        const [balance, setBalance] = React.useState('')

        function handle_balance(){
            
            if(ctx.ctx_logged.logged_state){
            fetch(`/data`)
                .then(response => response.json())
                .then(data => {
                    const user = data.find((user) => user.email === ctx.ctx_email.active_email);
                    if(!user){
                        alert("You must be signed in to view your balance!")
                        setStatus("Fail")
                        return;
                    }
                    
                    setBalance(user.balance)
                    setStatus(`Your current balance is $${balance}`)
                    return;
                })
        }
    }

        return(<>
            <div>
                <div>
                    {status}
                </div>
            <Button type="submit" variant="light" onClick={handle_balance}>Check Balance</Button>
            </div>
            </>
        )

    
  
    }

}

export default Balance;