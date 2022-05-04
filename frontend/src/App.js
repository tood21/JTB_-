import "./App.css";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import PortfolioPage from "./pages/PortfolioPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";
import ResumePage from "./pages/ResumePage";
import WriterPage from "./pages/WriterPage";

function App() {
  return (
    <Wrapper>
      <Sidebar />
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/postdetail/:id' element={<PostDetailPage />} />
        <Route path='/resume' element={<ResumePage />} />
        <Route path='/writer' element={<WriterPage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
      </Routes>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding-left: 300px;
`;
