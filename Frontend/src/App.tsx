import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
