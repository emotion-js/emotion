# Releasing Emotion

Emotion uses [changesets](https://github.com/Noviny/changesets) to do versioning. This makes releasing really easy and changelogs are automatically generated.

## How to do a release

1. Run `yarn` to make sure everything is up to date
2. Run `yarn version-packages`.
3. Run `NPM_CONFIG_OTP=PUTANOTPCODEHERE yarn release`. If the 2FA code times out while publishing, run the command again with a new code, only the packages that were not published will be published.
