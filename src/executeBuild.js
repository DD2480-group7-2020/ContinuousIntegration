const myConfig = require("../config.json")
const server_config = require('../config_server.json')

const uuidv1 = require('uuid/v1')
const fs = require('fs')

const install = myConfig.install
const syntax = myConfig.syntax
const tests = myConfig.tests
const { execSync } = require("child_process")

var obj = {
    flag: false,
    logs: []
}

/**
 * Prepares a build environment for the scripts to run in.
 * @author Gustav Ung
 * @return {void}
 */
function prepare_build_env() {
    return server_config.build_path_prefix + uuidv1()
}

/**
 * Clones a git reposityory given a clonable repository url at a given build path
 * @author Gustav Ung
 * @param {string} repository The url to the git repository
 * @param {string} path The build path
 * @return {void}
 */
function clone_repository(repository, path) {
    console.log("git clone -b test-dev " + repository + " " + path)
    execSync("git clone -b test-dev " + repository + " " + path)
}

/**
 * Cleans a given build environment path.
 * @author Gustav Ung
 * @param {string} path The path to the build environment
 * @return {void}
 */
function clean_build_env(path) {
    console.log("Removing dir" + path)
    fs.rmdirSync(path, {recursive: true})
}

/**
 * Runs three shell commands defined globally
 * @author Love Almgren
 * @param {string} path the path where the shell commands are run
 * @param {string} install, syntax tests the three commands to run
 * @return whether they all succeded or not.
 */
function executeEverything(path, install, syntax, tests) {
    return run(path, install) && run(path, syntax) && run(path, tests)
}

/**
 * Runs the provided shell command and returns if it succeded or not.
 * This function also mutates a global log file.
 * @author Love Almgren
 * @param {string} command - The command to run.
 * @return {boolean} whether the command ran successfully or not
*/
function run(path, command) {
    var truth = true
    if(command === "") {
        return true
    }
    try {
        console.log("running command " + command + " from: ", path)
        var res = execSync(command,
             {cwd: path});
        obj.logs.push(res.toString())
    } catch(error) {
        obj.logs.push(error.message)
        truth = false
    }
    return truth
}

module.exports = {
    execute: (git_repo) => {
        var path = prepare_build_env()
        clone_repository(git_repo, path)
        obj.flag = executeEverything(path, install, syntax, tests)
        clean_build_env(path)
        return obj
    }
}
