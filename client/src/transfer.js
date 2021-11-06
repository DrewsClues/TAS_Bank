import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function TransferFunds() {
    const [show, setShow]    = React.useState(true);

    return (
        <div className="Card_box">
            <Card
                bg={'secondary'}
                key={'secondary'}
                text={'light'}
                style={{ width: '25rem', padding: '10px' }}
            >
                <Card.Header>
                    <h3>Transfer Funds</h3>
                </Card.Header>
                <Card.Body>
                    {show?
                    <TransferForm/>:<TransferMsg/>
                    }
                </Card.Body>
            </Card>
        </div>

    )

    function TransferMsg(){
            return(
        <div className="number_box">
            <div>Success!</div>
            <Button type="submit" variant="light" onClick={()=>{setShow(true)}}>Make Another Transfer</Button>
        </div>
            )
    }

    
    function  TransferForm(){
        const ctx = React.useContext(UserContext)
        const [recipient_email, setRecipient_email]  = React.useState('');
        const [transfer_amount, setTransfer_amount] = React.useState('')


        function handle_transfer(){
            fetch(`/data`)
                .then(response => response.json())
                .then(data => {
                    const user = data.find((user) => user.email === ctx.ctx_email.active_email);
                    const recipient = data.find((recipient) => recipient.email == recipient_email);

                    console.log(recipient);

                    if(!user){
                        alert("Must be logged in to make transfer!");
                        return;
                    }

                    if(!recipient){
                        alert("No such user!");
                        return;
                    }

                    if(transfer_amount < 1){
                        alert("Amount must be greater than zero!")
                        return;
                    }

                    if (user.email === recipient.email){
                        alert("Invalid transaction: Cannot transfer money to yourself!")
                        return; 
              
                    }

                    if(transfer_amount > user.balance){
                        alert("Insufficient funds to complete transaction!")
                        return;
                    }

                    const url = `/updateBalance/${user.email}/${-transfer_amount}`;
                    (async () => {
                        var res   = await fetch(url);
                        var data  = await res.json();
                        console.log(data)
                      })();
                      
                    const receiving_url = `/updateBalance/${recipient.email}/${transfer_amount}`;
                    (async () => {
                        var res   = await fetch(receiving_url);
                        var data  = await res.json();
                        console.log(data)
                    })(); 
                setShow(false);
            })
        }

        return(<>
            <div>
            Email<br/>
            <input type="input" 
            className="form-control" 
            placeholder="Enter email" 
            value={recipient_email} 
            onChange={e => setRecipient_email(e.currentTarget.value)}/><br/>
            <div>
            <div className="number_box">
            <input className="number_input" type="number"
            placeholder="Enter amount"
            value ={transfer_amount} onChange={e => setTransfer_amount(e.currentTarget.value)}/>
            </div>
            </div>
            <div className="number_box">
            <Button type="submit" variant="light" onClick={handle_transfer}>Make Transfer</Button>
            </div>
            </div>
            </>
        )

    
  
    }

}

export default TransferFunds;