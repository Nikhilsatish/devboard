# 🐛 BUGS.md — Common React Bug Patterns

This file documents 4 classic React bugs I deliberately
introduced, observed, and fixed during this project build.

## Bug 1 — Infinite render loop
**What broke:** Browser tab froze immediately on mount.
**Why:** useEffect updated state that was in its own dep array.
**Fix:** Remove the circular dependency. Only put values you actually need.

## Bug 2 — Array index as key
**What broke:** Deleting an item caused the wrong item's state to remain.
**Why:** Index shifts on delete — React reuses the wrong DOM node.
**Fix:** Use repo.id — a stable, unique identifier.

## Bug 3 — Direct state mutation
**What broke:** UI didn't update even though the data changed.
**Why:** Same array reference — React.Object.is() saw no change, skipped render.
**Fix:** Always return a new array with spread or .map() or .filter().