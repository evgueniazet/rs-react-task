import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import { SearchProvider } from "./components/SearchProvider/SearchProvider";

const App = () => {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </SearchProvider>
  );
};

export default App;
