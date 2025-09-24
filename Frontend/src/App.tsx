import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"


function App() {
  // Temporary Login component that redirects to signup
  const LoginPlaceholder = () => {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl mb-4">Login page coming soon!</h2>
        <p className="mb-4">This page is under construction.</p>
        <div className="flex gap-4">
          <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go Home
          </a>
          <a href="/signup" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Sign Up Instead
          </a>
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<LoginPlaceholder/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
