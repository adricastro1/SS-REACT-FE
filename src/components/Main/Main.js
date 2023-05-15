import './Main.css'
import {Routes, Route} from 'react-router'
import Home from '../../Pages/Home/Home'
import StylistProfile from '../../Pages/StylistProfile/StylistProfile'
import EditReview from '../../Pages/EditReview/EditReview'
import ContactForm from '../../Pages/ContactForm/ContactForm'

function Main(){
    return (
    <main>
        <Routes>                
            <Route path="/" element={<Home/>} />
            <Route path="/stylists/:id" element={<StylistProfile/>} /> 
            <Route path="/reviews/:id/edit/:stylistId" element={<EditReview />} />
            <Route path="/contact" element={<ContactForm />} />
        </Routes>
    </main>
    )
}

export default Main