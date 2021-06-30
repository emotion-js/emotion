// slack invite links expire after 30 days and you can't(at least as far as i can tell) create tokens for things like slackin anymore

const fs = require('fs')

const slackInviteLink = process.argv[2]

const siteHeaderPath = `${__dirname}/../site/src/components/SiteHeader.js`
const readmePath = `${__dirname}/../README.md`

const slackInviteLinkRegex =
  /https:\/\/join\.slack\.com\/t\/emotion-slack\/shared_invite\/[^/]+\//

const siteHeader = fs.readFileSync(siteHeaderPath, 'utf8')

fs.writeFileSync(
  siteHeaderPath,
  siteHeader.replace(slackInviteLinkRegex, slackInviteLink)
)

const readme = fs.readFileSync(readmePath, 'utf8')

fs.writeFileSync(
  readmePath,
  readme.replace(slackInviteLinkRegex, slackInviteLink)
)
