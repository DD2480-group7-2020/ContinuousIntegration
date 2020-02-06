myConfig = require("./config.json")
install = myConfig.install
syntax = myConfig.syntax
tests = myConfig.tests
const { execSync } = require("child_process")
function executeEverything() {
    return run(install) && run(syntax) && run(tests)
}

function run(command) {
    truth = true
    if(command === "") {
        return true
    }
    try {
        res = execSync(command,

             {cwd: './ContinuousIntegration'});

        obj.logs.push(res.toString())
    } catch(error) {
        //error = error.message.split("")[0]
        obj.logs.push(error.message)
        truth = false
    } finally {
        return truth
    }
}

module.exports = {
    execute: () => {
        obj.flag = executeEverything()
        console.log(obj)
        return obj
    }
}

obj = {
    flag: true,
    logs: []
}
