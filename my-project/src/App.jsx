import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import EventDetail from "./components/EventDetails.jsx";
import RegisteredEvents from "./pages/RegisteredEvents.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
