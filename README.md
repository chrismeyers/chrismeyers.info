# chrismeyers.info
This is the codebase for my personal website currently located at <https://chrismeyers.info>

## Requirements
1. Install the Dart SDK (see [instructions](https://dart.dev/get-dart))
1. Install Aqueduct (see [documentation](https://aqueduct.io/docs/tut/getting-started))
1. Install Node.js (see [nodesource](https://github.com/nodesource/distributions) or [nvm](https://github.com/nvm-sh/nvm))

## Setup
1. Setup a git remote on the production server by following the instructions in `bin/git/hooks/post-receive`
    - Assuming a git remote named `production` exists, the following command can be run from the root of the repository to deploy: `git push production master`
1. Configure apache virtual hosts by copying the files in `config/apache` into `/etc/apache2/sites-available` and running `a2ensite` for each virtual host
1. Install and configure LetsEncrypt
1. Follow the `Setup` instructions in `api/README.md`
1. Follow the `Setup` instructions in `web/README.md`

## Docker
### Build
```
# Additional docker build arguments can be passed through such as:
#   --no-cache (do not use cache when building image)
{api|web}/scripts/build.sh
```

### Run
```
# Additional docker run arguments can be passed through such as:
#   -it (allow for signals such as SIGINT <ctrl-c>)
#   -d  (detached - run container in background)
{api|web}/scripts/run.sh
```

### Troubleshooting
- Make sure that multiple arguments are surrounded by quotes when passed into the build or run scripts

## Credit
+ The site uses a few open source tools and frameworks:
  + [Vue.js](https://vuejs.org/) as a fontend JavaScript framework
    - [vue-router](https://router.vuejs.org/) for SPA routing
    - [v-img](https://github.com/crowdbotics/v-img) to make viewing images a lot more pleasant
    - [vue-js-modal](https://github.com/euvl/vue-js-modal) to raise modals and dialogs
    - [vue-progressbar](https://github.com/hilongjw/vue-progressbar) to display of the loading state of a page
    - [vue-cookie](https://github.com/alfhen/vue-cookie) to handle cookie manipulation
    - [vuex](https://github.com/vuejs/vuex) for frontend state management
    - [vuex-persist](https://github.com/championswimmer/vuex-persist) to persist vuex state
    - [vue-svgicon](https://github.com/MMF-FE/vue-svgicon) to dynamically change the fill color of SVGs
    - [vue-js-toggle-button](https://github.com/euvl/vue-js-toggle-button) to toggle themes
    - [vue-click-outside](https://github.com/vue-bulma/click-outside) to automatically close elements
  - [hamburgers](https://jonsuh.com/hamburgers/) to animate the hamburger menu icon
  - [axios](https://github.com/axios/axios) as an HTTP client
  - [qs](https://github.com/ljharb/qs) for querystring parsing
  - [lodash](https://github.com/lodash/lodash) for convenient helper functions
  - [Aqueduct](https://aqueduct.io/) as a backend API framework
