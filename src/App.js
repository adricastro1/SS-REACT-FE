import './App.css';
import Airtable from 'airtable';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE_ID)

function App() {

  useEffect(() => {
    base("stylists")
    .select({view: "Grid view"})
    .eachPage((records, fetchNextPage) => {
      console.log(records);
      fetchNextPage()
    }
    )
  }
  )

  const { isLoading } = useAuth0()
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="App">
        <h1>HELLO</h1>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
    </div>
  );
}

export default App;
