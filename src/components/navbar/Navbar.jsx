"use client" // client side rendering 

// library 
import Link from 'next/link'
import { usePathname } from 'next/navigation';
// react bootstrap 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// css 
import '@/components/navbar/navbar.css'
// icon 
import { IoMdPerson } from "react-icons/io";

function Navigationbar() {
    const pathname = usePathname();
    const isLoggedin = false;

    return (
        <Navbar expand="lg" className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor":"#3f51b5"}}>
            <Container fluid>
            <Navbar.Brand href="#">
                <img
                    src="/library/cos2.png" // Path relative to the public directory
                    alt="Logo"
                    style={{ height: '35px', marginRight: '1px',marginLeft:"-5px",marginTop:"-1px" }} // Adjust height and margin as needed
                />
                Pacific Ocean Portal - Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {/* ===================> left nav <========================  */}
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    // style={{ maxHeight: '100px' }}
                    // navbarScroll
                    >

                    </Nav>
                    
                    {/* ===================> right nav <========================  */}
                    <Nav className="me-2 my-2 my-lg-0"
                    >
                        <a
      className={pathname === "/" ? "active-nav nav-link" : "nav-link"}
      href="https://oceanportal.spc.int"
      target="_blank" // Open in a new tab
      rel="noopener noreferrer" // For security reasons
    >
      Home
    </a>

<a
      className={pathname === "/" ? "active-nav nav-link" : "nav-link"}
      href="https://oceanportal.spc.int/portal/library/"
      target="_blank" // Open in a new tab
      rel="noopener noreferrer" // For security reasons
    >
      Archive
    </a>
                    </Nav>
                    {/* auth functionality  */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;