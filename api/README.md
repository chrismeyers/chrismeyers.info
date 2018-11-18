# api

## Running the Application Locally

Run `aqueduct serve` from this directory to run the application. For running within an IDE, run `bin/main.dart`. By default, a configuration file named `config.yaml` will be used.

To generate a SwaggerUI client, run `aqueduct document client`.

## Running Application Tests

To run all tests for this application, run the following in this directory:

```
pub run test
```

The default configuration file used when testing is `config.src.yaml`. This file should be checked into version control. It also the template for configuration files used in deployment.

## Deploying an Application

See the documentation for [Deployment](https://aqueduct.io/docs/deploy/).

## Initial Setup
1) Create a database, add a database user, then grant database permissions to this user.
2) Initialize the database tables by running `aqueduct db upgrade`.
3) Register a user using the `/auth/register` endpoint.
4) Add an OAuth 2.0 client by running `aqueduct auth add-client --id ...`.
5) Import the initial data by running `dart bin/bootstrap.dart`.
