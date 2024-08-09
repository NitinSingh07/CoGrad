import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import EventDetail from "./components/EventDetails.jsx";
import RegisteredEvents from "./pages/RegisteredEvents.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import AllEvents from "./pages/AllEvents.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllEvents />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/getAll" element={<AllEvents />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
