import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import SignUp from "@/pages/SignUp";
//import ProblemSubmitPage from "@/pages/Contest/Problem/ProblemSubmit"; // [DEBUG] 테스트용 코드
import JudgingStatusPage from "@/pages/JudgingStatusPage";
import ProblemsPage from "@/pages/ProblemsPage";
import ProblemCreatePage from "@/pages/ProblemCreatePage";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import ProblemDetail from "@/pages/ProblemDetail.jsx";
import Home from "@/pages/HomePage";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/problems" element={<ProblemsPage />} />
        {/*  <Route path="/problem-submit" element={<ProblemSubmitPage />} />  */}
        <Route path="/problem-create" element={<ProblemCreatePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
        <Route path="/judging-status" element={<JudgingStatusPage />} />

        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
