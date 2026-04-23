import { useState } from "react";
import { fetchUser, fetchRepos } from "../api/github";

function Home() {
  // Form input state
  const [username, setUsername] = useState("");

  // API result state
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!username.trim()) return;

    const userData = await fetchUser(username);
    const reposData = await fetchRepos(username);

    setUser(userData);
    setRepos(reposData);
  }

  return (
    <div className="page-container">
      {/* Search form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

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
      {repos.length > 0 && (
        <div className="repo-list">
          <h3>Repositories</h3>
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h4>{repo.name}</h4>
              <p>{repo.description || "No description"}</p>
              <div className="repo-meta">
                {repo.language && <span>{repo.language}</span>}
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
