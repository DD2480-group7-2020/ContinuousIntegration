const request = require('request')
const config = require('./config_server.json')

function get_sha(req) {

    var sha = req.body.head_commit.id

    return sha
}

function get_url(req) {
    var sha = get_sha(req)
    url = 'https://api.github.com/repos/' + req.body.repository.full_name + '/statuses/' + sha
    return url
}

function set_status(req, status) {

    url = get_url(req)
    sha = get_sha(req)
    var repo_id = req.body.repository.id
    var res


    status = {
        state: status,
        target_url: config['database'] + "/" + repo_id + + "/" + sha,
        description: "The build is " + status,
        context: "CI/group-7"
    } 

    var token = "Bearer " + config['token']

    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            'User-Agent': 'node.js',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: status
    }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            res = response
    })


    
    return res
}

module.exports = {
    get_sha,
    get_url,
    set_status
}