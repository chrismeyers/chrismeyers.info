# chrismeyers.info
This is the codebase for my personal website currently located at <https://chrismeyers.info>

## Requirements
1) Install the Dart SDK (see https://dart.dev/get-dart)
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    sudo sh -c 'curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
    sudo sh -c 'curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'
    ```
    ```
    sudo apt-get update
    sudo apt-get install dart
    ```
2) Install Aqueduct (see https://aqueduct.io/docs/tut/getting-started/)
    ```
    pub global activate aqueduct
    ```
3) Install Node.js (see https://github.com/nodesource/distributions)
    ```
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt install nodejs
    ```

## Setup
1) Setup a git remote on the production server by following the instructions in `bin/git/hooks/post-receive`.
2) Configure apache virtual hosts by copying the files in `config/apache` into `/etc/apache2/sites-available` and running `a2ensite` for each virtual host.
3) Install and configure LetsEncrypt. Ensure the virtual host files are still configured properly.
4) Follow the instructions in `api/README.md`.
5) Follow the instructions in `web/README.md`.

## Credit
+ The site uses a few open source tools and frameworks:
  + [Vue.js](https://vuejs.org/) as a fontend Javascript framework.
    * [v-img](https://github.com/crowdbotics/v-img) to make viewing images a lot more pleasant.
    * [vue-js-modal](https://github.com/euvl/vue-js-modal) to raise modals and dialogs.
    * [vue-progressbar](https://github.com/hilongjw/vue-progressbar) to display of the loading state of a page.
    * [v-tooltip](https://github.com/Akryum/v-tooltip)/[vue-clipboard2](https://github.com/Inndy/vue-clipboard2) to copy my contact email address to the clipboard.
    * [vue-cookie](https://github.com/alfhen/vue-cookie) to handle cookie manipulation.
  * [Aqueduct](https://aqueduct.io/) as a backend API framework.
  * [hamburgers](https://jonsuh.com/hamburgers/) to animate the hamburger menu icon.
