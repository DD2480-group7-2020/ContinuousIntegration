var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyB5OBjUJzocNCGwWtGZds-RTyuYsH36ejw",
    authDomain: "continuous-integration-62063.firebaseapp.com",
    databaseURL: "https://continuous-integration-62063.firebaseio.com",
    projectId: "continuous-integration-62063",
    storageBucket: "continuous-integration-62063.appspot.com",
    messagingSenderId: "641337962366",
    appId: "1:641337962366:web:b20f07582f28abcd610d2f",
    measurementId: "G-4HGNMFP2QG"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const repo_path = database.ref('/repos/');
const build_path = database.ref('/builds/');

/**
  *  Check if Repository exist in firebase under /repos/ path.
	*/
async function checkRepo(repo_id){
    var exist = false;
    await repo_path.child(`${repo_id}/`).once('value', snapshot => {
        exist = snapshot.val() ? true:false;
    })
    return exist;
}

/**
  * Set repository information in firebase under /repos/ path.
	*/
function addRepo(repo_id, data){
    repo_path.child(`${repo_id}/`).set(data)
}

/**
  * Add build and logs under specific specific repository id under /build/ path.
	*/
function addBuild(repo_id, body, headers, log_build) {
    var data = {
        'type': headers["x-github-event"],
        'log': log_build,
        'build': body
    }
    const child_key_commit = body.head_commit.id
    build_path.child(repo_id).child(child_key_commit).set(JSON.parse(JSON.stringify(data)));
}

/**
  * Get all the repositories and the information about them.
	*/
async function getRepos(){
    var data = null;
    try {
        await repo_path.once(('value'), snapshot => {
            data = snapshot.val();
        })
    } catch(error){

    } finally{
        return data
    }

}

/**
 * Get all the builds from a specific repository id.
 */
async function getBuilds(repo_id){
    var data = null;
    try {
        await build_path.child(repo_id).once('value', snapshot => {
            data = snapshot.val();
        })
    } catch (error) {

    } finally {
        return data
    }
}

/**
 * Get build from repository id and build id(head_commit.id)
 */
async function getBuild(repo_id, build_id) {
    var data = null;
    try {
        await build_path.child(repo_id).child(build_id).once('value', snapshot => {
            data = snapshot.val();
        })
    } catch (error) {

    } finally {
        return data;
    }
}

module.exports = {
    storeWebhook: async (body, header, logs) => {

        const repo_id = body.repository.id;
        const repo_exist = await checkRepo(repo_id)

        if(!repo_exist){
            addRepo(repo_id, body.repository);
        }

        addBuild(repo_id, body, header, logs);
    },

    getAllRepos: async () => {
        const repos = await getRepos();
        return repos
    },

    getRepoBuilds: async (id) => {
        return await getBuilds(id);
    },

    getBuild: async(repo_id, build_id) => {
        return await getBuild(repo_id, build_id);
    }
}
