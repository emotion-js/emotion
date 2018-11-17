# Releasing Emotion

Emotion contains packages versions in two different ways. The "primary" packages that are intended for use by app or component library authors are versioned together. "secondary" packages that are utilities and may be used without the rest of emotion are versioned independently.

## How to do a release

1. Make sure you have [bolt](https://github.com/boltpkg/bolt) installed globally
2. Run `yarn version-packages`. Primary packages should all be bumped to the same version. Secondary packages should be bumped according to whatever changes have happened to them.
3. Run `git tag vCURRENTPRIMARYPACKAGESVERSION`
4. Run `NPM_CONFIG_OTP=PUTANOTPCODEHERE bolt publish`. If the 2FA code times out while publishing, run the command again with a new code, only the packages that were not published will be published.

## Problems to solve

- How should changelogs work with this setup, lerna-changelog's output is not very nice for all these packages. Maybe we should use [@atlaskit/build-releases](https://www.npmjs.com/package/@atlaskit/build-releases)?
