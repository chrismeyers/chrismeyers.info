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

## Setup
1) Create a database, add a database user, then grant database permissions to this user (see https://aqueduct.io/docs/db/connecting/).
    ```
    CREATE DATABASE my_app_name;
    CREATE USER my_app_name_user WITH PASSWORD 'password';
    GRANT ALL ON DATABASE my_app_name TO my_app_name_user;
    ```
2) Copy `config.src.yaml` to `config.yaml` and replace the values with the values from the previous step.
3) Initialize the database tables by running `aqueduct db upgrade`.
4) Register a user using the `/auth/register` endpoint.
5) Add an OAuth 2.0 client by running `aqueduct auth add-client --id ...`.
6) Import the initial data by running `dart bin/bootstrap.dart`.
7) Copy `../bin/systemd/chrismeyers-info-api.service` to `/etc/systemd/system` and run `sudo systemctl daemon-reload`, `sudo systemctl enable chrismeyers-info-api.service`, and `sudo systemctl start chrismeyers-info-api.service`.
