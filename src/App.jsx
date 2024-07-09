import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([]);

  const handleDelete = (city, searchTime) => {
    const newHistory = history.filter(data => !(data.city === city && data.searchTime === searchTime));
    setHistory(newHistory)
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setHistory={setHistory} />} />
        <Route path="/history" element={<History history={history} handleDelete={handleDelete} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
