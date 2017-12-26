---
title: "Instances"
---

emotion allows creating custom instances of emotion to provide special options. Instances are created with the [`create-emotion`](https://github.com/emotion-js/emotion/tree/master/packages/create-emotion), [`create-emotion-styled`](https://github.com/emotion-js/emotion/tree/master/packages/create-emotion-styled) and [`create-emotion-server`](https://github.com/emotion-js/emotion/tree/master/packages/create-emotion-server) packages which create instances of `emotion`, `react-emotion`/`preact-emotion` and `emotion-server` respectively. They are documented in their own respective READMEs linked above.

The instances' and primary instance's paths should be added as options to `babel-plugin-emotion` [as shown in `babel-plugin-emotion`'s README](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion#instances).
