import {Routes, Route} from 'react-router'
import Home from '../../Pages/Home/Home'
import StylistProfile from '../../Pages/StylistProfile/StylistProfile'
import EditReview from '../../Pages/EditReview/EditReview'

function Main(){
    return (
    <main>
        <Routes>                
            <Route path="/" element={<Home/>} />
            <Route path="/stylists/:id" element={<StylistProfile/>} /> 
            <Route path="/reviews/:id/edit" element={<EditReview/>} /> 
        </Routes>
    </main>
    )
}

export default Main