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
import SurveyAnimalPage from './pages/SurveyAnimal';
import SurveyPlantPage from './pages/SurveyPlant';
import ModDataPage from './pages/ModData';
import ModAnimalPage from './pages/ModAnimal';
import ModPlantPage from './pages/ModPlant';
import ModOrganismPage from './pages/ModOrganism';
import ModOutreachPage from './pages/ModOutreach';
import ModSuccessPage from './pages/ModSuccess';
import ModSurveyOnePage from './pages/ModSurveyOne';
import ModSurveyAnimalPage from './pages/ModSurveyAnimal';
import ModSurveyPlantPage from './pages/ModSurveyPlant';

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
        <Route path="/newdata" element={<NewDataPage />} />
        <Route path="/organism" element={<OrganismPage />} />
        <Route path="/outreach" element={<OutreachPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/surveyone" element={<SurveyOnePage />} />
        <Route path="/surveyanimal" element={<SurveyAnimalPage />} />
        <Route path="/surveyplant" element={<SurveyPlantPage />} />
        <Route path="/modify" element={<ModDataPage />} />
        <Route path="/animal-modify" element={<ModAnimalPage />} />
        <Route path="/plant-modify" element={<ModPlantPage />} />
        <Route path="/organism-modify" element={<ModOrganismPage />} />
        <Route path="/outreach-modify" element={<ModOutreachPage />} />
        <Route path="/success-modify" element={<ModSuccessPage />} />
        <Route path="/surveyone-modify" element={<ModSurveyOnePage />} />
        <Route path="/surveyanimal-modify" element={<ModSurveyAnimalPage />} />
        <Route path="/surveyplant-modify" element={<ModSurveyPlantPage />} />
      </Routes>
    </BrowserRouter>
  )
}
