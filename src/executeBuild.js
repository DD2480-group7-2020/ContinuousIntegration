const server_config = require('../config_server.json')

const uuidv1 = require('uuid/v1')
const fs = require('fs')

const { execSync } = require("child_process")


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
 * @param {object} obj - logger and status object
 * @param {string} repository The url to the git repository
 * @param {string} path The build path
 * @return {array} an array of the logger and status object as well as a config
 */
function clone_repository(obj, repository, path) {
    console.log("git clone -b test-dev " + repository + " " + path)
    execSync("git clone -b test-dev " + repository + " " + path)
    var config = {}
    try {
        config = JSON.parse(fs.readFileSync(path + "/" + "config.json").toString())
    } catch(error) {
        console.log("Could not find or read config.json, does it exist?")
        obj.logs.push("Could not find or read config.json, does it exist?")
    }
    return [obj, config]

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
 * Runs three shell commands
 * @author Love Almgren
 * @param {object} obj - logger and status object
 * @param {string} path the path where the shell commands are run
 * @param {string} install, syntax tests the three commands to run
 * @return {object} obj - logger and status object
 */
function executeEverything(obj, path, install, syntax, tests) {
    obj = run(obj, path, install)
    if (obj.flag) {
      obj = run(obj, path, syntax)
    }
    if (obj.flag) {
      obj = run(obj, path, tests)
    }

    return obj
}

/**
 * Runs the provided shell command and returns if it succeded or not.
 * This function also mutates a global log file.
 * @author Love Almgren
 * @param {object} obj - logger and status object
 * @param {string} command - The command to run.
 * @return {object} obj - logger and status object
*/
function run(obj, path, command) {
    if(command === "") {
        return obj.flag = true
    }
    try {
        console.log("running command " + command + " from: ", path)
        var res = execSync(command,
             {cwd: path});
        obj.logs.push(res.toString())
        obj.flag = true
    } catch(error) {
        obj.logs.push(error.message)
        obj.flag = false
    }
    return obj
}

module.exports = {
    execute: (git_repo) => {
        var obj = {
            flag: false,
            logs: []
        }
        var path = prepare_build_env()
        var obj_conf = clone_repository(obj, git_repo, path)
        obj = obj_conf[0]
        var config = obj_conf[1]
        if (!!config && !!config.install && !!config.syntax && !!config.tests) {
            const {install, syntax, tests} = config
            obj = executeEverything(obj, path, install, syntax, tests)
        }
        clean_build_env(path)
        return obj
    }
}
