import './App.css';
import Main from './components/Main/Main';
import { Auth0Provider } from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

function App() {

  return (
    <div className="App">
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Main />
      </Auth0Provider>
    </div>
  );
}

export default App;
