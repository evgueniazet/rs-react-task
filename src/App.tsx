import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
};

export default App;
