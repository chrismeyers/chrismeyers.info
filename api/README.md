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

---

## Setup
NOTE: `aqueduct` commands may need to be run within the docker container (`docker exec -it {CONTAINER_NAME} sh`) or by using `pub run aqueduct ...`
1. Create a database, add a database user, then grant database permissions to this user (see https://aqueduct.io/docs/db/connecting/)
    ```
    CREATE DATABASE my_app_name;
    CREATE USER my_app_name_user WITH PASSWORD 'password';
    GRANT ALL ON DATABASE my_app_name TO my_app_name_user;
    ```
1. Copy `config.src.yaml` to `config.yaml` and replace the values with the values from the previous step
1. Create `database.yaml` containing the values in the `database` section of `config.yaml`
1. Initialize the database tables by running `aqueduct db upgrade`
1. Register a user by sending a POST request to the `/auth/register` endpoint or running the `./bootstrap.dart --register ...` command
1. Add an OAuth 2.0 client by running `aqueduct auth add-client --id ...`
1. Import the initial data by running `dart bin/bootstrap.dart`
1. Configure a `systemd` service only if docker is **not** being used
    ```
    cp ../bin/systemd/chrismeyers-info-api.service /etc/systemd/system
    sudo systemctl daemon-reload
    sudo systemctl enable chrismeyers-info-api.service
    sudo systemctl start chrismeyers-info-api.service
    ```

## Troubleshooting
- `pub global activate aqueduct` may need to be run to use the `aqueduct` CLI tool
