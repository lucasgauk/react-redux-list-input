import {createAction, createSlice} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import mockContacts from "../util/mockContacts";

const createMessage = ({ text, variant, id }) => ({
  id: id || uuidv4(),
  text,
  variant,
});

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(createMessage(action.payload));
    },
    removeMessage: (state, action) => {
      const { messageId } = action.payload;
      const messageIndex = state.messages.findIndex(message => message.id === messageId);
      if (messageIndex !== -1) {
        state.messages.splice(messageIndex, 1);
      }
    },
  },
});

export const { addMessage, removeMessage } = messageSlice.actions;

export const addDisappearingMessage = ({ text, variant, timeout }) => (dispatch) => {
  const newMessage = createMessage({ text, variant, id: uuidv4() });
  dispatch(addMessage(newMessage));
  setTimeout(() => {
    dispatch(removeMessage({ messageId: newMessage.id }))
  }, timeout);
};

export default messageSlice.reducer;

export const selectMessages = (state) => state.message.messages;
