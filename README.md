# 🔭 DevBoard — GitHub Profile Explorer

A production-grade GitHub profile explorer built with React and Redux Toolkit. Search any GitHub username, browse their public repositories, bookmark favourites — all with real API data, code splitting, error boundaries, and a feature-based folder structure.

**[Live Demo →](https://devboard-alpha-nine.vercel.app/)** &nbsp;|&nbsp; **[GitHub →](https://github.com/Nikhilsatish/devboard)**

> Project 3 of 3 in my React learning series — covers R21–R30, advanced and production patterns.

---

## 📸 Preview

> Add screenshot after building:
> `![DevBoard Preview](./public/preview.png)`

---

## ✨ Features

- 🔍 Search any public GitHub username
- 👤 View profile — avatar, bio, repos, followers, following
- 📦 Browse top 10 public repositories with language + star count
- 🔖 Bookmark repos — saved to Redux store, visible from any page
- 🚀 Code splitting — each page loads as a separate JS chunk on demand
- 🛡️ Error Boundary — graceful fallback UI if anything crashes
- ⚡ React.memo — prevents unnecessary re-renders on RepoCard
- 📁 Feature-based folder structure — production-ready layout
- 🐛 BUGS.md — 4 classic React bugs documented with broken code + fix

---

## 🧠 React Concepts Practiced (R21–R30)

| Topic | What I implemented |
|---|---|
| **R21 — Lazy loading + Suspense** | `React.lazy()` for all pages, `<Suspense>` with fallback — visible as separate JS chunks in Network tab |
| **R22 — Error Boundary** | Class component with `getDerivedStateFromError` — catches render crashes, shows fallback UI with Try again button |
| **R23 — Performance optimization** | `React.memo` on `RepoCard` — skips re-render when repo prop unchanged. Verified in React DevTools Profiler |
| **R24 — API calls (fetch)** | `src/api/github.js` isolates all fetch calls. `Promise.all` for parallel requests. `try/catch/finally` for 3 states |
| **R25 — State management basics** | Started with prop drilling across routes, felt the pain, then migrated to Redux |
| **R26 — Redux fundamentals** | Wrote action type constants, action creators, switch/case reducer by hand before touching RTK |
| **R27 — Redux Toolkit** | Rewrote with `createSlice` + `configureStore`. Immer lets you safely mutate state in reducers |
| **R28 — React + Redux integration** | `useSelector` reads from store, `useDispatch` writes — used in both Home and Bookmarks pages |
| **R29 — Folder structure** | Feature-based layout — `features/bookmarks/` owns slice + component. `components/ui/` for shared UI |
| **R30 — Interview bugs** | 4 classic bugs introduced, observed, fixed — each with broken code + fix in `BUGS.md` |

---

## 🗂️ Project Structure

```
src/
├── api/
│   └── github.js               # All GitHub API calls — fetchUser, fetchRepos, fetchRepo
├── components/
│   ├── RepoCard.jsx             # Shared repo card — wrapped in React.memo
│   └── ErrorBoundary.jsx        # Class component — catches render errors
├── features/
│   ├── bookmarks/
│   │   ├── BookmarksList.jsx    # Bookmarks page component
│   │   └── bookmarksSlice.js   # RTK slice — addBookmark, removeBookmark
│   └── search/
│       └── SearchBar.jsx        # Search input component
├── pages/
│   ├── Home.jsx                 # Search + profile + repos (lazy loaded)
│   └── RepoDetail.jsx           # Single repo detail (lazy loaded)
├── store/
│   └── store.js                 # configureStore — combines all slice reducers
├── App.jsx                      # BrowserRouter + lazy Routes + ErrorBoundary
└── main.jsx                     # ReactDOM.createRoot + Redux Provider
BUGS.md                          # R30 — 4 bug patterns with fixes
```

---

## 🔑 Key Learnings

**1. Writing Redux manually before RTK**
I wrote action type constants, action creator functions, and a full switch/case reducer by hand. 35+ lines for a simple add/remove feature. RTK's `createSlice` does the same in 15 lines and auto-generates action creators from reducer names. Understanding the manual version makes RTK feel like a natural improvement — not magic.

**2. Why Error Boundary must be a class component**
There is no hook equivalent for `componentDidCatch` and `getDerivedStateFromError`. These lifecycle methods are the only way to catch errors during render. This is the one place in the codebase where a class component is justified — and knowing *why* is the interview answer.

**3. Code splitting visible in the Network tab**
Without `React.lazy`, all pages bundle together on first load. With lazy loading, each page loads as a separate chunk only when navigated to. Open DevTools → Network → JS — watch a new chunk file appear when you click Bookmarks.

**4. Promise.all for parallel API calls**
```js
// Sequential — slower
const userData  = await fetchUser(username)
const reposData = await fetchRepos(username)

// Parallel — fires both at the same time, waits for both
const [userData, reposData] = await Promise.all([
  fetchUser(username),
  fetchRepos(username)
])
```

**5. React.memo stops unnecessary re-renders**
Typing in the search input caused all repo cards to re-render — even unchanged ones. `React.memo` tells React to skip re-render if props didn't change. Verified before/after in React DevTools Profiler.

---

## 🐛 Bug Documentation

See [`BUGS.md`](./BUGS.md) for 4 classic React bugs deliberately introduced and fixed:

1. **Stale closure** — `count` always logged 0 inside `setInterval` with empty dep array
2. **Infinite render loop** — updating state that was in its own `useEffect` dependency array
3. **key={index}** — deleting an item caused wrong component's state to persist
4. **Direct state mutation** — same array reference, React saw no change, skipped re-render

---

## 🚀 Run Locally

```bash
git clone https://github.com/Nikhilsatish/devboard-github-explorer.git
cd devboard-github-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> Uses GitHub public API — no API key needed. Rate limited to 60 requests/hour per IP.

---

## 🛠️ Built With

- [React 18](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router v6](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- [GitHub REST API](https://docs.github.com/en/rest)
- Vanilla CSS

---

## 📌 Part of My React Learning Series

| Project | Topics | Status |
|---|---|---|
| [TaskFlow](https://github.com/Nikhilsatish/react-taskflow) | R1–R10 · Fundamentals | ✅ Complete |
| [ExpenseTracker](https://github.com/Nikhilsatish/expense-tracker-react) | R11–R20 · Hooks + Context + Router | ✅ Complete |
| **DevBoard** (this one) | R21–R30 · Redux + Advanced Patterns | ✅ Complete |

---

## 👨‍💻 Author

**Nikhil** — Senior Software Engineer
[GitHub](https://github.com/Nikhilsatish) · [LinkedIn](https://linkedin.com/in/nikhil-sathish)
