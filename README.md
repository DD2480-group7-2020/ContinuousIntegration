# Continuous Integration
This project is a continuous integration (CI) server integrated with Github and Firebase. At the moment, it is able to test and build small projects.

# Running
To run the server use the command `npm start`.

# Configuration
There are several different config files for this project. The `config.json` is used to provide shell scripts in three stages. `install` is used to to install project dependencies. `syntax` is used for syntax checking and building the project. `tests` is used for running unit tests and such. A successful build must pass all three stages. If no script is provided for a certain stages, then it automatically passes said stage.

The `config_server.json` contains three keys. `token` is used to connect with the [github API](https://developer.github.com/v3/repos/statuses/). `database` is used to provide a link to the database from the github status message. Finally, `build_path_prefix` is used to set a custom build folder location of the tested project.

The final configuration is inlined in `src/controllersfirebase_controller.js` and is the firebase configuration config which contains api keys and such.

# Dependencies
This project mainly uses nodemon, express, firebase. All dependencies can be installed by the command `npm install`

# Server access
To access the AWS ubuntu server, ssh into ubuntu@ec2-54-198-38-54.compute-1.amazonaws.com at port 22.

# Statement of Contributions
  Love Almgren - Parsed the config file, running the configuration, saving the test output logs
  Ramiz - Rest API, Webhook functions + unit tests, Created Github secret key token
  Simon - Setup firebase, retrieve data from firebase
  Fabian - Deploy AWS server, Setup NodeJS server, Firebase, Frontend
  Gustav - Integrate server, firebase and Github 
