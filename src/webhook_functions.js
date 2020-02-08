const config = require('../config_server.json')

function get_sha(req) {
    var sha = req.body.head_commit.id
    return sha
}

function get_url(req) {
    var sha = get_sha(req)
    return 'https://api.github.com/repos/' + req.body.repository.full_name + '/statuses/' + sha
}

function build_status_response(req, status) {
    var url = get_url(req)
    var sha = get_sha(req)
    var repo_id = req.body.repository.id

    status = {
        state: status,
        target_url: config['database'] + "/" + repo_id + + "/" + sha,
        description: "The build is " + status,
        context: "CI/group-7"
    }

    var token = "Bearer " + config['token']

    return {
        url: url,
        method: "POST",
        json: true,
        headers: {
            'User-Agent': 'node.js',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: status
    }
}

module.exports = {
    get_sha,
    get_url,
    build_status_response
}
