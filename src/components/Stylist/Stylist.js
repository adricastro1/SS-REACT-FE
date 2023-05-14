import 'rsuite/dist/rsuite-no-reset.min.css';
import './Stylist.css'
import { Panel } from 'rsuite';
import { Link } from 'react-router-dom'


function Card({ props, stylist }) {

  return (
    <Link to={`/stylists/${stylist.id}`} className="Card-link">
      <Panel className="Card" {...props} shaded bordered>
        <h3>{stylist.fields.Name}</h3>
        <img src={`${stylist.fields.Image}`} alt='profile-img' />
      </Panel>
    </Link>
  )
}

export default Card