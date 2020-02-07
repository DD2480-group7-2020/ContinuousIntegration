const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const firebase_controller = require('./controllers/firebase_controller')
const helper = require('./webhook_functions.js')
const executeBuild = require('./executeBuild.js')

const app = express()
const port = 3001

app.use(bodyParser.json())

/*
    Handles web-hooks POST request.
*/
app.post('/', async(req, res) => {
    var pending_response = helper.build_status_response(req, 'pending')
    res.send(pending_response);
    const repository = req.body.repository
    var logs = executeBuild.execute(repository.ssh_url)
    var build_response
    if (logs.flag) {
      build_response = helper.build_status_response(req, 'success')
    } else {
      build_response = helper.build_status_response(req, 'failure')
    }
    request(build_response, function (error, response) {
      if (!error && response.statusCode == 200) {
        console.error("Faulty request was sent...");
      }
    })
    firebase_controller.storeWebhook(req.body, req.header, logs)
})

/*
    Get all the repositories and the information about them.
*/
app.get('/repo', async (req, res) => {
    const data = await firebase_controller.getAllRepos();
    if(data != null) {
        res.status(200).send(data);
    } else {
        res.status(500).send("data empty")
    }

})

/*
    Get all the builds from a specific repository id.
*/
app.get('/repo/:id', async (req, res) => {
    const data = await firebase_controller.getRepoBuilds(req.params.id);
    if(data != null) {
        res.status(200).send(data);
    } else {
        res.status(500).send("data empty")
    }
})

/*
    Get build from repository id and build id(head_commit.id)
*/
app.get('/repo/:repo_id/:build_id', async (req, res) => {
    const data = await firebase_controller.getBuild(req.params.repo_id, req.params.build_id);
    if(data != null) {
        res.status(200).send(data);
    } else {
        res.status(500).send("data empty")
    }
})


app.listen(port)
console.log('Server is up on port ', port)
