import React, { Component } from 'react'
import { UserContext } from './App';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav, Container } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLinkClickHandler
} from "react-router-dom";

import Home from './home';
import Create from './create';
import Signin from './signin';
import Balance from './balance';
import Deposit from './deposit';
import Withdrawal from './withdrawal';
import TransferFunds from './transfer';
import Account from './account';

export default class NavbarComp extends Component {


    render() {

        function Welcome(){
            const ctx = React.useContext(UserContext)
            const [welcome_message, setWelcome_message] = React.useState('')
            React.useEffect(() =>{
                if(!ctx.ctx_logged.logged_state){
                  setWelcome_message('')
                }
                if(ctx.ctx_logged.logged_state){
                  setWelcome_message(`Logged in as ${ctx.ctx_email.active_email}`)
                }
              }, [ctx.ctx_logged.logged_state])
            return(
                <div>{welcome_message}</div>
            )
        }

        function Financial_Links(){
            const ctx = React.useContext(UserContext)
            const [show, setShow] = React.useState(false)

            React.useEffect(() =>{
                if(!ctx.ctx_logged.logged_state){
                    setShow(false)
                }
                if(ctx.ctx_logged.logged_state){
                    setShow(true)
                }
                }, [ctx.ctx_logged.logged_state])

            return(<>
                {show?
                <NavDropdown title="Perform Transaction" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/balance">Balance</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/deposit">Deposit</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/withdrawal">Withdraw</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/transfer">Transfer Funds</NavDropdown.Item>
                </NavDropdown>:null}
            </>)
        }

        function MyAccount(){
            const ctx = React.useContext(UserContext)
            const [show, setShow] = React.useState(false)

            React.useEffect(() =>{
                if(!ctx.ctx_logged.logged_state){
                    setShow(false)
                }
                if(ctx.ctx_logged.logged_state){
                    setShow(true)
                }
                }, [ctx.ctx_logged.logged_state])

            return(<>
                {show? 
                <Nav.Link as={Link} to="/account">My Account</Nav.Link>:null}
            </>)

        }



        function Logout(){
            const ctx = React.useContext(UserContext)
            const [show, setShow] = React.useState(false)

            React.useEffect(() =>{
                if(!ctx.ctx_logged.logged_state){
                    setShow(false)
                }
                if(ctx.ctx_logged.logged_state){
                    setShow(true)
                }
                }, [ctx.ctx_logged.logged_state])
            
            function Handle_signout(){
                ctx.ctx_name.setActive_name(ctx.ctx_name.active_name = '')
                ctx.ctx_email.setActive_email(ctx.ctx_email.active_email = '')
                ctx.ctx_account.setActive_account(ctx.ctx_account.active_account = '')
                ctx.ctx_logged.setLogged_state(ctx.ctx_logged.logged_state = false)
                alert("You have signed out succesfully!")
                return;
            }
            return(
                <div>{show? 
                <Button onClick={Handle_signout}>Signout</Button>:null}
                </div>
            )
        }

        return (
            <Router>
                <div>

                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                        <Navbar.Brand as={Link} to="/">T.A.S. Bank</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/create">Create Account</Nav.Link>
                            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                            <MyAccount/>
                            <Financial_Links/>
                            </Nav>
                            <Nav>
                            <Nav.Link>
                                <Logout/>
                            </Nav.Link>
                            <Nav.Link>
                                <Welcome/>
                            </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/create" element={<Create/>}/>
                        <Route path="/signin" element={<Signin/>}/>
                        <Route path="/balance" element={<Balance/>}/>
                        <Route path="/deposit" element={<Deposit/>}/>
                        <Route path="/withdrawal" element={<Withdrawal/>}/>
                        <Route path="/transfer" element={<TransferFunds/>}/>
                        <Route path="/account" element={<Account/>}/>
                    </Routes>
                </div>
            </Router>
        )
    }
}

