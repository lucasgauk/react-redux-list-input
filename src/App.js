import React from 'react';
import ContactList from './features/contactList/ContactList';
import ContactNavbar from './features/contactList/ContactNavbar';
import Messages from "./features/messages/Messages";

const App = () => {
  return (
      <div>
        <ContactNavbar />
        <div style={{ paddingTop: 60}}>
          <ContactList />
        </div>
        <Messages />
      </div>
  );
}

export default App;
