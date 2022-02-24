import './App.css';
import {useContext} from "react"
import AuthContext from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import Browse from "./components/Browse"
import Detail from "./components/Detail"
import Profiles from "./components/Profiles"
import CreateProfile from "./components/CreateProfile"
import EditProfile from "./components/EditProfile"
import MediaComponent from './components/MediaComponent';

function App() {
  const context = useContext(AuthContext)
  const {authenticated,isAuthenticated} = context
  
  return (
    <div className="App">
          <Routes>
            <Route  path="/" element={!authenticated?<Home />:<Navigate to="/profiles"/>} />
            <Route  path="/login" element={!authenticated?<Login />:<Navigate to="/profiles"/> } />
            <Route  path="/signup" element={!authenticated?<Register />:<Navigate to="/profiles"/>} />
            <Route  path="/logout" element={ <Logout /> }/>
            <Route  path="/browse" element={authenticated? <Browse />:<Navigate  to="/login"/>} />
            <Route  path="/detail" element={authenticated?<Detail />:<Navigate  to="/login"/>} />
            <Route path="/profiles" element={authenticated?<Profiles />:<Navigate  to="/login"/>} />
            <Route path="/createprofile" element={authenticated?<CreateProfile />:<Navigate  to="/login"/>} />
            <Route path="/editprofile" element={authenticated?<EditProfile />:<Navigate  to="/login"/>} />
            <Route path="/play" element={authenticated?<MediaComponent />:<Navigate  to="/login"/>} />
          </Routes>
    </div>
  );
}

export default App;