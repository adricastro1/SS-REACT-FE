import {Routes, Route} from 'react-router'
import Home from '../../Pages/Home/Home'
import StylistProfile from '../../Pages/StylistProfile/StylistProfile'

function Main(props){
    return (
    <main>
        <Routes>                
            <Route path="/" element={<Home/>} />
            <Route path="/stylists/:id" element={<StylistProfile/>} /> 
        </Routes>
    </main>
    )
}

export default Main