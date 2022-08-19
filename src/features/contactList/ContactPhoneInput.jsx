import React from "react";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { contactPhoneChanged, selectContactPhoneById, selectPhoneErrors } from "../../store/contactSlice";
import ValidatedFormControl from "./ValidatedFormControl";

const ContactPhoneInput = ({ contactId, shouldShowLabels, shouldShowAllErrors }) => {
  const dispatch = useDispatch();

  const contactPhone = useSelector(selectContactPhoneById(contactId));

  const errors = useSelector(selectPhoneErrors(contactId));

  const handleChange = (event) => {
    dispatch(contactPhoneChanged({ contactId, newValue: event.target.value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '100%' }}>
      { shouldShowLabels && <Form.Label>Phone</Form.Label> }
      <ValidatedFormControl type="text" onChange={handleChange} value={contactPhone} errors={errors} showAllErrors={shouldShowAllErrors} />
    </div>
  );
}

export default React.memo(ContactPhoneInput);
