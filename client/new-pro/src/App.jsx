import Container from "@mui/material/Container";
import Home from "./Component/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Component/Auth/Auth.jsx";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter sx={{ width: "100%", padding: 0, margin: 0 }}>
  <Container sx={{ width: "100%", padding: 0, margin: 0 }}>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </Container>
</BrowserRouter>
  )
};

export default App;
