---
'@emotion/serialize': patch
---

Re-release latest prerelease version of this package as it has incorrectly been "downgraded" to 0.x version due to a bug in Changesets. This has caused problems because Emotion 10 had a newer 0.x release and thus version targeting Emotion 10 has been fetched on installs as it has been satisfying the specified dependency range.
