import React from "react";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {
  contactNameChanged, selectContactNameById, selectNameErrors
} from "../../store/contactSlice";
import ValidatedFormControl from "./ValidatedFormControl";

const ContactNameInput = ({ contactId, shouldShowLabels, shouldShowAllErrors }) => {
  const dispatch = useDispatch();

  const contactName = useSelector(selectContactNameById(contactId));

  const errors = useSelector(selectNameErrors(contactId));

  const handleChange = (event) => {
    dispatch(contactNameChanged({ contactId, newValue: event.target.value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '100%' }}>
      { shouldShowLabels && <Form.Label>Name</Form.Label> }
      <ValidatedFormControl type="text" onChange={handleChange} value={contactName} errors={errors} showAllErrors={shouldShowAllErrors} />
    </div>
  );
}

export default React.memo(ContactNameInput);
