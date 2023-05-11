import {Link} from 'react-router-dom'

function Stylist({ stylist }) {
    return (
      <div>
        <h3>{stylist.fields.Name}</h3>
        <p>{stylist.fields.Bio}</p>
        <p>{stylist.fields.Contact}</p>
        <Link to={`/stylists/${stylist.id}`}>
        <button>
        Details</button>
        </Link>
      </div>
    );
  }
  
  export default Stylist