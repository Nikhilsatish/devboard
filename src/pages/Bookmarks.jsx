import { useSelector, useDispatch } from "react-redux";
import { removeBookmark } from "../store/bookmarksSlice";

function Bookmarks() {
  // Read bookmarks from Redux store
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  if (bookmarks.length === 0) {
    return (
      <div className="page-container">
        <h2>Bookmarks</h2>
        <p className="empty-text">
          No bookmarks yet. Search a user and save repos.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Bookmarks ({bookmarks.length})</h2>
      <div className="repo-list">
        {bookmarks.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h4>{repo.name}</h4>
            <p>{repo.description || "No description"}</p>
            <div className="repo-meta">
              {repo.language && <span>{repo.language}</span>}
              <span>⭐ {repo.stargazers_count}</span>
              {/* Remove from bookmarks */}
              <button
                onClick={() => dispatch(removeBookmark(repo.id))}
                className="bookmark-btn saved"
              >
                ★ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Bookmarks;
