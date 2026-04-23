import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const RepoDetail = lazy(() => import("./pages/RepoDetail"));

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
        <Suspense fallback={<p className="loading-page">Loading page...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/repo/:owner/:repo" element={<RepoDetail />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
