import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import React from "react";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { removeContact, selectIsFirstContact, selectShouldShowAllErrors } from "../../store/contactSlice";
import ContactNameInput from "./ContactNameInput";
import ContactPhoneInput from './ContactPhoneInput';

const ContactItem = ({ contactId }) => {
  const dispatch = useDispatch();

  const shouldShowLabels = useSelector(selectIsFirstContact(contactId));
  const shouldShowAllErrors = useSelector(selectShouldShowAllErrors(contactId));

  const handleDeleteClick = () => {
    dispatch(removeContact({ contactId }));
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <ContactNameInput 
          contactId={contactId} 
          shouldShowAllErrors={shouldShowAllErrors} 
          shouldShowLabels={shouldShowLabels}   
        />
        <ContactPhoneInput 
          contactId={contactId} 
          shouldShowAllErrors={shouldShowAllErrors} 
          shouldShowLabels={shouldShowLabels}   
        />
        <div style={{ display: 'flex', height: 38, marginTop: shouldShowLabels ? 32 : 0 }}>
          <Button variant="outline-danger" onClick={handleDeleteClick}>
            <Icon path={mdiDelete} size="26px" />
          </Button>
        </div>
      </div>
  );
}

export default React.memo(ContactItem);
