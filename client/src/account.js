import React from 'react';
import './App.css';
import { UserContext } from './App';
import {  Card, Button, Nav  } from 'react-bootstrap'

function Account() {
    const [show, setShow]     = React.useState(true);
    const ctx = React.useContext(UserContext)

    return (
        <div className="Card_box">
            <Card
                bg={'secondary'}
                key={'secondary'}
                text={'light'}
                style={{ width: '25rem', padding: '10px' }}
            >
                <Card.Header>
                    <h3>My Account Details</h3>
                </Card.Header>
                <Card.Body>
                    <div>Name: {ctx.ctx_name.active_name}</div>
                    <div>Email: {ctx.ctx_email.active_email}</div>
                    <div>Accountnumber: {ctx.ctx_account.active_account}</div>
                </Card.Body>
            </Card>
        </div>
    )

}

export default Account;