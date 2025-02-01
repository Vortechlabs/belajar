import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./pages/Auth/AuthContext"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import DiscoverGames from "./pages/Gaming_portal/DiscoverGames"
import ManageGames from "./pages/Gaming_portal/ManageGames"
import DetailGames from "./pages/Gaming_portal/DetailGames"
import ManageGamesForm from "./pages/Gaming_portal/ManageGamesForm"

function App() {

  return (
   <AuthProvider>
    <Routes>
      <Route path="/" element={<DiscoverGames />}/>
      <Route path="/auth/signin" element={<Login />}/>
      <Route path="/auth/signup" element={<Register />}/>

      <Route path="/DiscoverGames" element={<DiscoverGames />}/>
      <Route path="/ManageGames" element={<ManageGames />}/>
      <Route path="/DetailGames/:id" element={<DetailGames />}/>
      <Route path="/ManageGamesForm" element={<ManageGamesForm />}/>

    </Routes>
   </AuthProvider>
  )
}

export default App
