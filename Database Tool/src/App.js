import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login';
import IntroPage from './pages/Intro';
import ErrorPage from './pages/Error';
import AnimalPage from './pages/Animal';
import PlantPage from './pages/Plant';
import NewDataPage from './pages/NewData';
import OrganismPage from './pages/Organism';
import OutreachPage from './pages/Outreach';
import SuccessPage from './pages/Success';
import SurveyOnePage from './pages/SurveyOne';


/* 
To add a new page to the link tree, add a new route with a path and an page element
*/
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //EVERY TIME YOU ADD A NEW PAGE, YOU HAVE TO LINK IT HERE
        <Route index element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/animal" element={<AnimalPage />} />
        <Route path="/plant" element={<PlantPage />} />
        <Route path="/data" element={<NewDataPage />} />
        <Route path="/organism" element={<OrganismPage />} />
        <Route path="/outreach" element={<OutreachPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/surveyone" element={<SurveyOnePage />} />

      </Routes>
    </BrowserRouter>
  )
}
