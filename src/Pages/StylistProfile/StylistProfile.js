import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StylistProfile(props) {
    const {id} = useParams()
    console.log("here is this stylist's:", id)
    return (
        <section>
            <h1>Stylist Profile</h1>
        </section>
    )
}

export default StylistProfile