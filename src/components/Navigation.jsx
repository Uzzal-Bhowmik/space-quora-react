import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "/space-logo.png";

function Navigation() {
  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt=""
            style={{ width: "10%" }}
            className="d-none d-md-inline-block"
          />

          <span className="fs-4 text-light fw-bold mb-0 ms-2">
            Space<span className="text-danger">QUORA</span>
          </span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/">Home</Link>
            <Link to="/climate">Climate</Link>
            <Link to="/iss">ISS</Link>
            <Link to="/apod">APOD</Link>
            <Link to="/satellites">Satellites</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
