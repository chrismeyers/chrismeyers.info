# web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Setup
1) Create `.env.[development|production].local` and add `VUE_APP_API_CLIENT_ID=CLIENT_ID` where `CLIENT_ID` is the value set in the `aqueduct auth add-client --id ...` command.

## Docker
### Build
```
docker build -t chrismeyers-info-web .
```

### Run
```
docker stop chrismeyers-info-build
docker run -d -p 8080:80 --rm --name chrismeyers-info-web chrismeyers-info-web
```
