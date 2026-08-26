# Releasing Emotion

Emotion uses [Changesets](https://github.com/changesets/changesets) to manage package versions, changelogs, and npm releases.

Releases are performed by the [release workflow](.github/workflows/release.yml), not from a maintainer's local machine. The workflow runs on pushes to `main` and `next`.

## Add a changeset

Pull requests containing user-facing changes should include a changeset:

1. Run `pnpm changeset`.
2. Select the affected packages and the appropriate semver bump.
3. Write a concise summary for the changelog.
4. Commit the generated file from `.changeset/` with the pull request.

A changeset is usually unnecessary for documentation, test-only, or internal changes that do not affect published packages.

## Publish a release

After changesets are merged, the release workflow handles the release in two stages:

1. It creates or updates a **Version Packages** pull request containing the version bumps and generated changelogs.
2. Merging the **Version Packages** pull request triggers the release. The workflow builds and packs the packages, then waits for a maintainer to manually approve the `publish` job in GitHub before publishing them to npm.

Do not run `changeset version` or `changeset publish` locally as part of the normal release process. If the workflow fails, inspect its logs and rerun the failed job after resolving the underlying problem.
