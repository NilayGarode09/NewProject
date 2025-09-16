import Container from "@mui/material/Container";
import Home from "./Component/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Component/Auth/Auth.jsx";
import Form from "./Component/Form/Form.jsx";
import "./App.css";
import {  useState } from "react";

const App = () => {
    const [currentId, setCurrentId] = useState(null);
  
  return (
   <BrowserRouter>
  <Container maxWidth={false} disableGutters sx={{ width: "100%", padding: "2%", margin: "0" }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
          path="/form"
          element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
        />
        <Route path="/form/:id" element={<Form currentId={currentId} setCurrentId={setCurrentId}/>} /> 
        </Routes>    
  </Container>
</BrowserRouter>

  )
};

export default App;
