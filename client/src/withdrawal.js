import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button  } from 'react-bootstrap'

function Withdrawal() {
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
                    <h3>Withdraw</h3>
                </Card.Header>
                <Card.Body>
                    {show?
                    <WithdrawForm/>:<WithdrawMsg/>
                    }
                </Card.Body>
            </Card>
        </div>

    )

    function WithdrawMsg(){
            return(
        <div className="number_box">
            <div>Success!</div>
            <Button type="submit" variant="light" onClick={()=>{setShow(true)}}>Make Another Withdrawal</Button>
        </div>
            )
    }

    
    function WithdrawForm(){
        const ctx = React.useContext(UserContext)
        const [withdraw, setWithdraw] = React.useState('')

        function handle_withdrawal(){
            fetch(`/data`)
                .then(response => response.json())
                .then(data => {
                    const user = data.find((user) => user.email === ctx.ctx_email.active_email);
                    console.log(user)
                    console.log(withdraw)

                    if(!user){
                        alert("Must be logged in to make deposits!");
                        return;
                    }

                    if(withdraw < 1){
                        alert("Amount must be greater than zero!")
                        return;
                    }

                    if(withdraw > user.balance){
                        alert("Insufficient funds to complete transaction!")
                        return;
                    }

                    const url = `/updateBalance/${user.email}/${-withdraw}`;

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
            value ={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/>
            </div>
            </div>
            <div className="number_box">
            <Button type="submit" variant="light" onClick={handle_withdrawal}>Make Withdrawal</Button>
            </div>
            </div>
            </>
        )

    
  
    }

}

export default Withdrawal;