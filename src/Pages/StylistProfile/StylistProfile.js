import Airtable from 'airtable';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID)


const StylistProfile = (props) => {
    const { id } = useParams()
    console.log("here is this stylist's:", id)
    const [stylist, setStylist] = useState(null);

    const getStylist = async () => {
        try {
          const record = await base("stylists").find(id);
          setStylist(record);
        } catch (error) {
          console.error(error);
        }
      };
      

    useEffect(() => {
        getStylist()
    }, [id]);

    if (!stylist) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h1>{stylist.fields.Name}</h1>
            <p>{stylist.fields.Bio}</p>
            <p>{stylist.fields.Contact}</p>
        </section>
    )
}

export default StylistProfile