import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import MyPage from "@/pages/MyPage";
import HomePage from "@/pages/HomePage";
import StudyGroupCreatePage from "@/pages/StudyGroupCreatePage";
import StudyGroupDetailPage from "@/pages/StudyGroupDetailPage";
import ProblemCreatePage from "@/pages/ProblemCreatePage";
import ProblemDetailPage from "@/pages/ProblemDetailPage";
import ProblemSolvePage from "@/pages/ProblemSolvePage";
import ProblemResultPage from "@/pages/ProblemResultPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout이 필요한 페이지들 */}
        <Route path="/" element={<LayoutWrapper><HomePage /></LayoutWrapper>} />
        <Route path="/login" element={<LayoutWrapper><LoginPage /></LayoutWrapper>} />
        <Route path="/signup" element={<LayoutWrapper><SignUpPage /></LayoutWrapper>} />
        <Route path="/home" element={<LayoutWrapper><HomePage /></LayoutWrapper>} />
        <Route path="/mypage" element={<LayoutWrapper><MyPage /></LayoutWrapper>} />
        <Route path="/studygroup-create" element={<LayoutWrapper><StudyGroupCreatePage /></LayoutWrapper>} />
        <Route path="/studygroup-detail" element={<LayoutWrapper><StudyGroupDetailPage /></LayoutWrapper>} />
        <Route path="/problem-create" element={<LayoutWrapper><ProblemCreatePage /></LayoutWrapper>} />
        <Route path="/problem/:id/detail" element={<LayoutWrapper><ProblemDetailPage /></LayoutWrapper>} />
        <Route path="/problem/:id" element={<LayoutWrapper><ProblemSolvePage /></LayoutWrapper>} />
        <Route path="/problem-result" element={<LayoutWrapper><ProblemResultPage /></LayoutWrapper>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
