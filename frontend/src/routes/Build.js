import React, { useEffect, useState } from 'react';
import { REST_API_URL } from '../settings/URL';

function Build(props) {
    
    const [data, setData] = useState(null)

    useEffect( () => {
        if (props.match.params.repo_id != null && props.match.params.build_id != null){
            fetch(`${REST_API_URL}/repo/${props.match.params.repo_id}/${props.match.params.build_id}`)
            .then( response => {
                return response.json()
            })
            .then( json => {
                setData(json);
            })
        }
    }, [])

    function parseString(data){
        var logs = []
        data.map((text, index) => {
            console.log(text);
            var splitText = []
            splitText = text.split('> ');
            var block = splitText.map((t, i) => {
                return <p key={i}>{t}</p>
            })
            logs.push(
            <div key={index}>
                <h3>{index}</h3>
                <div>{block}</div>
            </div>);
        })
        return <div>{logs}</div>;
    }
        

    function renderBuild(){

        return(
            <div>

                    <h2>Repository: {data.build.repository.name}</h2>
                    <p>
                        on: {data.type} - 
                        <a href={data.build.head_commit.url}>{data.build.head_commit.id}</a>
                    </p>
                    <div>
                        logs: {parseString(data.log.logs)}<br/>
                    </div>
            </div>
        )

    }

    console.log("build: ", data);

    return(
        <div>
            <div>
                {data != null ? renderBuild(): ''}
            </div>
        </div>
    )

}


export default Build;