import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../store/bookmarksSlice";

// memo() wraps the component - skips re-render if repo prop unchanged
const RepoCard = memo(function RepoCard({ repo }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const isBookmarked = bookmarks.some((b) => b.id === repo.id);

  return (
    <div className="repo-card">
      <h4>{repo.name}</h4>
      <p>{repo.description || "No description"}</p>
      <div className="repo-meta">
        {repo.language && <span>{repo.language}</span>}
        <span>⭐ {repo.stargazers_count}</span>
        <button
          onClick={() =>
            isBookmarked
              ? dispatch(removeBookmark(repo.id))
              : dispatch(addBookmark(repo))
          }
          className={`bookmark-btn ${isBookmarked ? "saved" : ""}`}
        >
          {isBookmarked ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </div>
  );
});

export default RepoCard;
