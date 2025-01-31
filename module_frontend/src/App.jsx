import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./pages/Auth/AuthContext"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"

function App() {

  return (
   <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/auth/signin" element={<Login />}/>
    </Routes>
   </AuthProvider>
  )
}

export default App
