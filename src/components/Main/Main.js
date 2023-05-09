import {Routes, Route} from 'react-router'
import Home from '../../Pages/Home/Home'
// import Stylist from '../../pages/StylistProfile'

function Main(props){
    return (
    <main>
        <Routes>                
            <Route path="/" element={<Home/>} />
            {/* <Route path="/stylist/:id" element={<Show/>} />  */}
        </Routes>
    </main>
    )
}

export default Main