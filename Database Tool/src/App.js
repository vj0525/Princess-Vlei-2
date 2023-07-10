import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Intro from './pages/IntroPage';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  )
}
