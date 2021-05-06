import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import api from './services/api';
import Routes from './routes';

import User from './components/User';
interface IUser {
  name: string,
  email: string;
}

function App() {

  const [ users, setUsers ] =useState<IUser[]>([]);

  useEffect(() => {
    api.get<IUser[]>('/users').then(response => {
      setUsers(response.data);
    })
  },[])

  return (
    <Router>
      <Routes />
    </Router>

    // <div className="App">
    //   { users.map(user => <User key={user.email} user={user} />) }
    // </div>
  );
}

export default App;
