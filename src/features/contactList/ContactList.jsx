import React, {useCallback} from 'react';
import { addContact, selectContactIds } from "../../store/contactSlice";
import ContactItem from "./ContactItem";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

const ContactList = () => {
  const dispatch = useDispatch();
  const contactIds = useSelector(selectContactIds);

  const handleAddButtonClick = useCallback(() => {
    dispatch(addContact());
  }, [dispatch]);

  const contactItems = contactIds.map(contactId => (
      <ContactItem key={contactId} contactId={contactId} />
  ));

  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 10 }}>
        { contactItems }
        <div>
          <Button onClick={handleAddButtonClick} variant="primary">Add</Button>
        </div>
      </div>
  )
}

export default ContactList;
