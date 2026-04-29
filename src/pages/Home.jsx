import { useState } from "react";
import { fetchUser, fetchRepos } from "../api/github";
import RepoCard from "../components/RepoCard";
import SearchBar from "../features/search/SearchBar";

function Home() {
  // Form input state
  const [username, setUsername] = useState("");

  // API result state
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, reposData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);
      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      {/* Search form */}
      <SearchBar
        handleSearch={handleSearch}
        username={username}
        setUsername={setUsername}
      />

      {/* Loading state */}
      {loading && <p className="status-text">Loading...</p>}
      {/* Error state */}
      {error && <p className="error-text">❌ {error}</p>}

      {/* User profile - show only when data exists */}
      {user && (
        <div className="profile-card">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="profile-avatar"
          />
          <div>
            <h2>{user.name || user.login}</h2>
            <p className="profile-handle">@{user.login}</p>
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            <div className="profile-stats">
              <span>
                <strong>{user.public_repos}</strong> repos
              </span>
              <span>
                <strong>{user.followers}</strong> followers
              </span>
              <span>
                <strong>{user.following}</strong> following
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Repo list */}
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
export default Home;
