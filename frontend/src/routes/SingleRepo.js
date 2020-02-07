import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { API_REPO } from '../settings/URL';

Modal.setAppElement('#root')

function SingleRepo(props){

    const [builds, setBuilds] = useState(null);
    const [modal, setModal] = useState({
        trigger: false,
        data: {}
    });

    useEffect(() => {
        
        fetch(`${API_REPO}/${props.match.params.id}`).then(response => {
            return response.json()
        }).then(json => {

            var json_array = []
            Object.keys(json).forEach(function(key) {
                json_array.push(json[key]);
            });
            setBuilds(json_array);
        })

    }, [])

    function renderBuilds(){
        return builds.map((b, i) => {
            return <li 
                    style={{'cursor': 'pointer'}} 
                    key={i} 
                    onClick={() => setModal({trigger: true, data: b})}
                    >
                        <h2>{b.build.head_commit.id}</h2>                        
                </li>
        })
    }

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

    return(
        <div>
            <ul style={{'listStyle': 'none'}}>
                {builds != null ? renderBuilds() : null}
                {modal.trigger != false ? 
                <Modal isOpen={modal.trigger}>
                    <h2>Repository: {modal.data.build.repository.name}</h2>
                    <p>
                        on: {modal.data.type} - 
                        <a href={modal.data.build.head_commit.url}>{modal.data.build.head_commit.id}</a>
                    </p>
                    <div>
                        logs: {parseString(modal.data.log.logs)}<br/>
                    </div>
                    <button onClick={ () => setModal({trigger: false})}>Close</button>
                </Modal> 
                : ''}
            </ul>
        </div>
    );
}

export default SingleRepo;