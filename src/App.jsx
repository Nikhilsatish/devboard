import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RepoDetail from "./pages/RepoDetail";
import Bookmarks from "./pages/Bookmarks";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <span className="app-logo">🔭 DevBoard</span>
        <nav className="app-nav">
          <NavLink to="/">Search</NavLink>
          <NavLink to="/bookmarks">Bookmarks</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/repo/:owner/:repo" element={<RepoDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
