import { useDispatch, useSelector } from "react-redux";
import {
  contactNameChanged,
  contactPhoneChanged,
  selectContactById,
  selectIsFirstContact,
  removeContact,
  selectNameErrors,
  selectShouldShowAllErrors,
} from "../../store/contactSlice";
import { Form, Button } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import React, {useState} from "react";

const ContactItem = ({ contactId }) => {
  const dispatch = useDispatch();

  const contact = useSelector(selectContactById(contactId));
  const shouldShowLabels = useSelector(selectIsFirstContact(contactId));
  const shouldShowAllErrors = useSelector(selectShouldShowAllErrors(contactId));

  const [nameFieldDirty, setNameFieldDirty] = useState(false);
  const nameErrors = useSelector(selectNameErrors(contactId));
  const isNameFieldInvalid = !!nameErrors.length && (nameFieldDirty || shouldShowAllErrors)

  const handleNameChange = (event) => {
    dispatch(contactNameChanged({ contactId, newValue: event.target.value }));
    setNameFieldDirty(true);
  };

  const handleNameBlur = () => {
    setNameFieldDirty(true);
  }

  const handlePhoneChange = (event) => {
    dispatch(contactPhoneChanged({ contactId, newValue: event.target.value }));
  }

  const handleDeleteClick = () => {
    dispatch(removeContact({ contactId }));
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '100%' }}>
          { shouldShowLabels && <Form.Label>Name</Form.Label> }
          <Form.Control type="text" onChange={handleNameChange} onBlur={handleNameBlur} value={contact.name} isInvalid={isNameFieldInvalid} />
          {
            isNameFieldInvalid && (
              nameErrors.map(error => (
                <Form.Control.Feedback key={error} type="invalid">
                  { error }
                </Form.Control.Feedback>
              ))
            )
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '100%' }}>
          { shouldShowLabels && <Form.Label>Phone</Form.Label> }
          <Form.Control type="text" onChange={handlePhoneChange} value={contact.phone} />
        </div>
        <div style={{ display: 'flex', height: 38, marginTop: shouldShowLabels ? 32 : 0 }}>
          <Button variant="outline-danger" onClick={handleDeleteClick}>
            <Icon path={mdiDelete} size="26px" />
          </Button>
        </div>
      </div>
  );
}

export default React.memo(ContactItem);
