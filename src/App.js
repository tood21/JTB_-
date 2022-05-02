import { Route, Routes } from "react-router-dom";
import "./App.css";
import PortfolioPage from "./pages/PortfolioPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";
import ResumePage from "./pages/ResumePage";
import WriterPage from "./pages/WriterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/postdetail' element={<PostDetailPage />} />
        <Route path='/resume' element={<ResumePage />} />
        <Route path='/writer' element={<WriterPage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}

export default App;
