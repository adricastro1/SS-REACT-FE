import 'rsuite/dist/rsuite.min.css';
import { Panel, Button } from 'rsuite';
import { Link } from 'react-router-dom'


function Card({ props, stylist }) {

  return (
    <Panel {...props} shaded bordered>
      <h3>{stylist.fields.Name}</h3>
      <img src={`${stylist.fields.Image}`} />
      <Link to={`/stylists/${stylist.id}`}>
        <Button>Details</Button>
      </Link>
    </Panel>
  )
}

export default Card