import { Route, Routes } from "react-router-dom"
import Footer from "./Components/common/Footer"
import Navbar from "./Components/common/Navbar"
import Home from "./Components/pages/Home"
import UserRegister from "./Components/credentials/Regester/UserRegister"
import CommManagerReg from "./Components/credentials/Regester/CommManagerReg"
import Login from "./Components/credentials/Regester/Login"
import ManagerDashboard from "./Components/credentials/dashboard/ManagerDashboard"
import LocalUserDashboard from "./Components/credentials/dashboard/LocalUserDashboard"
import AddEvent from "./Components/manager/Event/AddEvent"
import ViewEvent from "./Components/manager/Event/ViewEvent"
import EditEvent from "./Components/manager/Event/EditEvent"
import AddResource from "./Components/manager/Resource/AddResource"
import ViewResource from "./Components/manager/Resource/ViewResource"
import EditResource from "./Components/manager/Resource/EditResource"
import Profile from "./Components/manager/Profile/Profile"
import Chat from "./Components/chat/Chat"
import ChatList from "./Components/chat/ChatList"
import Feedback from "./Components/common/Feedback"
import About from "./Components/common/About"
import Contact from "./Components/common/Contact"
import ResourceBookings from "./Components/manager/Resource/ResourceBookings"
import ViewUsers from "./Components/manager/Users/ViewUsers"
import NewUsers from "./Components/manager/Users/NewUsers"
import EventRegistered from "./Components/manager/Event/EventRegistered"
import ManagerRoute from "./Components/auth/ManagerRoute";
import UserRoute from "./Components/auth/UserRoute";
function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/local-user-register" element={<UserRegister/>}/>
        <Route path="/community-manager-register" element={<CommManagerReg/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/manager-dashboard" element={<ManagerRoute> <ManagerDashboard /></ManagerRoute>  }/>
        <Route path="/user-dashboard" element={<UserRoute> <LocalUserDashboard /></UserRoute> }/>
        <Route path="/manager/add-event" element={<ManagerRoute><AddEvent/></ManagerRoute>}/>
        <Route path="/manager/events" element={<ManagerRoute><ViewEvent/></ManagerRoute>}/>
        <Route path="/edit-event/:id" element={<ManagerRoute><EditEvent/></ManagerRoute>}/>
        <Route path="/manager/add-resource" element={<ManagerRoute><AddResource/></ManagerRoute>}/>
        <Route path="/manager/view-resources" element={<ManagerRoute><ViewResource/></ManagerRoute>}/>
        <Route path="/edit-resource/:id" element={<ManagerRoute><EditResource /></ManagerRoute>} />
        <Route path="/chat-list" element={<ChatList/>}/>
        <Route path="/chat/:conversationId" element={<Chat />} />
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/manager/resource-bookings" element={<ManagerRoute><ResourceBookings/></ManagerRoute>} />
        <Route path="/manager/view-user" element={<ManagerRoute><ViewUsers/></ManagerRoute>}/>
        <Route path="/manager/new-registrations" element={<ManagerRoute><NewUsers/></ManagerRoute>}/>
        <Route path="/events" element={<ManagerRoute><EventRegistered/></ManagerRoute>}/>

      </Routes>

      <Footer/>
    </div>
  )
}

export default App
