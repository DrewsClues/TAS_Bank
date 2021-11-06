import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function Deposit() {
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
                    <h3>Deposit</h3>
                </Card.Header>
                <Card.Body>
                    {show?
                    <DepositForm/>:<DepositMsg/>
                    }
                </Card.Body>
            </Card>
        </div>

    )

    function DepositMsg(){
            return(
        <div className="number_box">
            <div>Success!</div>
            <Button type="submit" variant="light" onClick={()=>{setShow(true)}}>Make Another Deposit</Button>
        </div>
            )
    }

    
    function DepositForm(){
        const ctx = React.useContext(UserContext)
        const [deposit, setDeposit] = React.useState('')

        function handle_deposit(){
            fetch(`/data`)
                .then(response => response.json())
                .then(data => {
                    const user = data.find((user) => user.email === ctx.ctx_email.active_email);
                    console.log(user)
                    console.log(deposit)

                    if(!user){
                        alert("Must be logged in to make deposits!");
                        return;
                    }

                    if(deposit < 1){
                        alert("Amount must be greater than zero!")
                        return;
                    }

                    const url = `/updateBalance/${user.email}/${deposit}`;

                    (async () => {
                        var res   = await fetch(url);
                        var data  = await res.json();
                        console.log(data)
                      })();  
                setShow(false);
            })
        }

        return(<>
            <div>
            <div>
            <div className="number_box">
            <input className="number_input" type="number"
            placeholder="Enter amount"
            value ={deposit} onChange={e => setDeposit(e.currentTarget.value)}/>
            </div>
            </div>
            <div className="number_box">
            <Button type="submit" variant="light" onClick={handle_deposit}>Make Deposit</Button>
            </div>
            </div>
            </>
        )

    
  
    }

}

export default Deposit;