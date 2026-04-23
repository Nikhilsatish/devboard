// All GitHub API calls live here - one place to maintain
const BASE = "https://api.github.com";

// Fetch a user's profile by username
export async function fetchUser(username) {
  const res = await fetch(`${BASE}/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

// Fetch a user's public repos
export async function fetchRepos(username) {
  const res = await fetch(
    `${BASE}/users/${username}/repos?sort=updated&per_page=10`,
  );
  if (!res.ok) throw new Error("Could not fetch repos");
  return res.json();
}

// Fetch details of a single repo
export async function fetchRepo(owner, repo) {
  const res = await fetch(`${BASE}/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error("Repo not found");
  return res.json();
}
