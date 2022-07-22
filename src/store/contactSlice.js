import {createAction, createSlice} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import mockContacts from "../util/mockContacts";
import {addDisappearingMessage} from "./messageSlice";

const createContact = (name = '', phone = '') => ({
  id: uuidv4(),
  name,
  phone,
  createdAt: Date.now(),
});

const createContactValidation = () => ({
  name: [],
  phone: [],
});

// <== This is dummy code and should be ignored. Only for demo purposes
const initialContacts = mockContacts.map(mockContact => createContact(mockContact.name, mockContact.phone));
const initialContactIds = initialContacts.map(contact => contact.id);
const initialValidationErrors = {};
initialContacts.forEach(contact => {
  initialValidationErrors[contact.id] = createContactValidation();
});
// End of dummy code ==>

const initialState = {
  contacts: initialContacts,
  contactIds: initialContactIds,
  validationErrors: initialValidationErrors,
  lastSubmitAttempt: null,
};

const hasValidationErrors = (validationErrors) => {
  return Object.values(validationErrors)
    .some(validation => (
        Object.values(validation).some(validationErrors => !!validationErrors.length)
    ));
}

const modifyContact = (state, contactId, param, value) => {
  const contact = state.contacts.find(contact => contact.id === contactId);
  if (contact) {
    contact[param] = value;
  }
};

const addError = (state, contactId, param, error) => {
  if (!state.validationErrors[contactId][param].includes(error)) {
    state.validationErrors[contactId][param].push(error);
  }
}

const removeError = (state, contactId, param, error) => {
  const errorIndex = state.validationErrors[contactId][param].findIndex(existingError => existingError === error);
  if (errorIndex !== -1) {
    state.validationErrors[contactId][param].splice(errorIndex, 1);
  }
}

const toggleError = (state, contactId, param, error, isError) => {
  if (isError) {
    addError(state, contactId, param, error);
  } else {
    removeError(state, contactId, param, error);
  }
}

const REQUIRED_NAME_ERROR = 'Please enter a name';
const DUPLICATE_NAME_ERROR = 'Name must be unique';

const validateContactNames = (state) => {
  state.contacts.forEach((contact) => {
    const isNameEmpty = !contact.name;
    toggleError(state, contact.id, 'name', REQUIRED_NAME_ERROR, isNameEmpty);

    const isNameDuplicate = !isNameEmpty && state.contacts.some(otherContact => otherContact.id !== contact.id && otherContact.name === contact.name);
    toggleError(state, contact.id, 'name', DUPLICATE_NAME_ERROR, isNameDuplicate);
  });
}

const REQUIRED_PHONE_ERROR = 'Please enter a phone';

const validateContactPhones = (state) => {
  state.contacts.forEach((contact) => {
    const isPhoneEmpty = !contact.phone;
    toggleError(state, contact.id, 'phone', REQUIRED_PHONE_ERROR, isPhoneEmpty);
  });
}

const submitContactsFailed = createAction('submitContactsFailed');
const submitContactsSucceeded = createAction('submitContactsSucceeded');

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state) => {
      const newContact = createContact();
      state.contacts.push(newContact);
      state.contactIds.push(newContact.id);
      state.validationErrors[newContact.id] = createContactValidation();
      validateContactNames(state);
      validateContactPhones(state);
    },
    removeContact: (state, action) => {
      const { contactId } = action.payload;
      const contactIndex = state.contacts.findIndex(contact => contact.id === contactId);
      if (contactIndex !== -1) {
        state.contacts.splice(contactIndex, 1);
        state.contactIds.splice(contactIndex, 1);
        delete state.validationErrors[contactId];
      }
    },
    contactNameChanged: (state, action) => {
      const { contactId, newValue } = action.payload;
      modifyContact(state, contactId, 'name', newValue);
      validateContactNames(state);
    },
    contactPhoneChanged: (state, action) => {
      const { contactId, newValue } = action.payload;
      modifyContact(state, contactId, 'phone', newValue);
      validateContactPhones(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactsFailed, (state) => {
        state.lastSubmitAttempt = Date.now();
      })
      .addCase(submitContactsSucceeded, (state) => {
        state.lastSubmitAttempt = null;
      })
  }
});

export const submitContacts = () => (dispatch, getState) => {
  if (hasValidationErrors(getState().contact.validationErrors)) {
    dispatch(submitContactsFailed());
    dispatch(addDisappearingMessage({ text: 'Could not submit, there are errors in the contacts', variant: 'danger', timeout: 5000 }));
  } else {
    dispatch(submitContactsSucceeded());
    dispatch(addDisappearingMessage({ text: 'Contacts saved successfully!', variant: 'success', timeout: 3000 }));
  }
}

export const { addContact, removeContact, contactNameChanged, contactPhoneChanged } = contactSlice.actions;

export default contactSlice.reducer;

export const selectContactIds = (state) => state.contact.contactIds;

export const selectContactById = (contactId) => (state) => state.contact.contacts.find(contact => contact.id === contactId);

export const selectIsFirstContact = (id) => (state) => state.contact.contacts[0].id === id;

export const selectNameErrors = (contactId) => (state) => state.contact.validationErrors[contactId].name;

export const selectShouldShowAllErrors = (contactId) => (state) => {
  const contact = selectContactById(contactId)(state);
  return contact.createdAt < state.contact.lastSubmitAttempt;
}
