# chrismeyers-website
[![Actions Status](https://github.com/chrismeyers/chrismeyers-website/workflows/API/badge.svg)](https://github.com/chrismeyers/chrismeyers-website/actions?query=workflow%3AAPI) [![Actions Status](https://github.com/chrismeyers/chrismeyers-website/workflows/Web/badge.svg)](https://github.com/chrismeyers/chrismeyers-website/actions?query=workflow%3AWeb)

This is the codebase for my personal website currently located at [https://chrismeyers.net](https://chrismeyers.net)

## Requirements
1. Install Node.js (see [nvm](https://github.com/nvm-sh/nvm) or [nodesource](https://github.com/nodesource/distributions))

## Setup
1. Copy [bin/git/hooks/pre-commit](bin/git/hooks/pre-commit) to the local `.git/hooks` directory and ensure the script is executable
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
+ The site uses several open source libraries and frameworks, including:
  + [React](https://reactjs.org) as a frontend JavaScript framework
    - [react-router](https://reactrouter.com) for SPA routing
    - [simple-react-lightbox](https://simple-react-lightbox.dev) to make viewing images a lot more pleasant
    - [react-toastify](https://fkhadra.github.io/react-toastify/introduction) to raise toast notifications
    - [react-switch](https://github.com/markusenglund/react-switch) to toggle themes
    - [react-device-detect](https://github.com/duskload/react-device-detect) to determine browser/device capabilities
    - [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) for loading animations
    - [delayed-scroll-restoration-polyfill](https://github.com/janpaul123/delayed-scroll-restoration-polyfill) to restore scroll location on browser back and forward navigation
  - [hamburgers](https://jonsuh.com/hamburgers/) to animate the hamburger menu icon
  - [Fastify](https://www.fastify.io/) as a backend API framework
