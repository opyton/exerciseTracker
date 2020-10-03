import React from "react";
import Home_img from "../../assets/Home_PlaceHolder.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <span>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img src={Home_img} alt="Home_placeholder"></img>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Lifts">Lifts</Nav.Link>
        </Nav>
      </Navbar>
    </span>
  );
};

export default Header;
