# chrismeyers.info
[![Actions Status](https://github.com/chrismeyers/chrismeyers.info/workflows/API/badge.svg)](https://github.com/chrismeyers/chrismeyers.info/actions?query=workflow%3AAPI) [![Actions Status](https://github.com/chrismeyers/chrismeyers.info/workflows/Web/badge.svg)](https://github.com/chrismeyers/chrismeyers.info/actions?query=workflow%3AWeb)

This is the codebase for my personal website currently located at [https://chrismeyers.info](https://chrismeyers.info)

## Requirements
1. Install Node.js (see [nvm](https://github.com/nvm-sh/nvm) or [nodesource](https://github.com/nodesource/distributions))

## Setup
1. Setup a git remote on the production server by following the instructions in [bin/git/hooks/post-receive](bin/git/hooks/post-receive)
    - Assuming a git remote named `production` exists, the following command can be run from the root of the repository to deploy: `git push production main`
1. Configure server level reverse proxy (assuming Debian based server)
    - **Nginx**: Copy files from [config/nginx](config/nginx) to `/etc/nginx/sites-available` and symlink each file to `/etc/nginx/sites-enabled`
    - **Apache**: Copy files from [config/apache](config/apache) to `/etc/apache2/sites-available` and run `a2ensite` for each virtual host (disable virtual host with `a2dissite`)
1. Install and configure LetsEncrypt/Certbot on the server
    + Add a `deploy-hook` to `/etc/letsencrypt/cli.ini` to reload proxy server after certificate update ([more info](https://blog.arnonerba.com/2019/01/lets-encrypt-how-to-automatically-restart-nginx-with-certbot))
        - **Nginx**: `deploy-hook = systemctl reload nginx`
        - **Apache**: `deploy-hook = systemctl reload apache2`
1. Follow the instructions in [api/README.md](api/README.md)
1. Follow the instructions in [web/README.md](web/README.md)

## Docker
### Build
```sh
# Additional docker build arguments can be passed through such as:
#   --no-cache (do not use cache when building image)
$ {api|web}/scripts/build.sh
```

### Run
```sh
# Additional docker run arguments can be passed through such as:
#   -it --init (allow for signals such as SIGINT <ctrl-c>)
#   -d         (detached - run container in background)
$ {api|web}/scripts/run.sh
```

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
  - [Fastify](https://www.fastify.io/) as a backend API framework.
