import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import History from "./pages/History"
import { useState } from "react"

function App() {
  const [history, setHistory] = useState([]);

  const setCities = (city) => {
    console.log(city)
    setHistory([...history, city]);
  }

  const handleDelete = (city) => {
    const newHistory = history.filter((data) => {
      if (data != city) {
        return data
      }
    })
    console.log("history", newHistory)
    setHistory(newHistory)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home setCities={setCities} />} />
        <Route path="/history" element={<History history={history} handleDelete={handleDelete} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
