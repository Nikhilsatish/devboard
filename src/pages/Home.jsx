import { useState } from "react";
import { fetchUser, fetchRepos } from "../api/github";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../store/store";

function Home() {
  // Form input state
  const [username, setUsername] = useState("");

  // API result state
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookmarks = useSelector((state) => state); // read from store
  const dispatch = useDispatch();

  // Helper to check if a repo is bookmarked
  const isBookmarked = (repoId) => bookmarks.some((b) => b.id === repoId);

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
                <button
                  onClick={() =>
                    isBookmarked(repo.id)
                      ? dispatch(removeBookmark(repo.id))
                      : dispatch(addBookmark(repo))
                  }
                  className="bookmark-btn"
                >
                  {isBookmarked(repo.id) ? "★ Saved" : "☆ Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
