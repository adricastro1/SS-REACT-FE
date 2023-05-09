import './Main.css'
import Airtable from 'airtable';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE_ID)

function Main() {

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
    <section className="Main">
        <h1>HELLO</h1>
    </section>
  );
}

export default Main;