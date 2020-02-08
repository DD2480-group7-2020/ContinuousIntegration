import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { REST_API_URL } from '../settings/URL';


function AllRepos() {

    const [repos , setRepos] = useState(null);
    const [repo, setRepo] = useState(null);

    useEffect( () => {
    // Get all repos
        fetch(`${REST_API_URL}/repo`).then(response => {
            return response.json()
        }).then(json => {
            var json_array = []
            Object.keys(json).forEach(function(key) {
                json_array.push(json[key]);
            });
            setRepos(json_array);
        })
    }, [])

    function renderRepos(){
        return repos.map((rep, index) => {
            return <li key={index} onClick={() => setRepo(rep.id)} style={{'cursor': 'pointer'}} >{rep.full_name}</li>
        })
    }

    return(
        <div>
            <ul>
                {repos != null ? renderRepos(): null}
                {repo != null ? <Redirect to={`/repo/${repo}`}/> : null}
            </ul>
        </div>
    
    );
}

export default AllRepos;

