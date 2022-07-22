import { Navbar, Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from "react-redux";
import { submitContacts } from "../../store/contactSlice";

const ContactNavbar = () => {
  const dispatch = useDispatch();

  const handleSaveClick = () => {
    dispatch(submitContacts());
  }

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, flexGrow: 1 }}>
        <Navbar.Brand>Redux Input List</Navbar.Brand>
        <div style={{ marginLeft: 'auto'}}>
          <Button variant="success" onClick={handleSaveClick}>Save</Button>
        </div>
      </div>
    </Navbar>
  )
}

export default ContactNavbar;
