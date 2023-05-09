function Stylist({ stylist, reviews }) {
    return (
      <div>
        <h3>{stylist.fields.Name}</h3>
        <p>{stylist.fields.Bio}</p>
        {/* <ul>
          {reviews.length > 0 &&
            reviews.map((review) => (
              <li key={review.id}>
                <p>{review.fields.Review}</p>
                <p>{review.fields.Rating}</p>
              </li>
            ))}
        </ul> */}
      </div>
    );
  }
  
  export default Stylist