import React, {useEffect , useState} from 'react';
import './style.css';

function DevForm({onSubmit , erros}) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [github_username , setGithub_username] = useState('');
    const [techs, setTechs] = useState('');


    useEffect( () => {
        navigator.geolocation.getCurrentPosition( 
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function registerDev(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            longitude,
            latitude
        })
        
        setGithub_username('');
        setTechs('');
    }
    
    return(
        <div className="box">
                <h2>DevRadar</h2>
                <form onSubmit = {registerDev}>
                    <div className="main-form">
                        <input type="text" 
                            placeholder="Github Username"
                            value = {github_username}
                            onChange = { e => {
                                setGithub_username(e.target.value);
                            }}
                        ></input>
                        <div className="erros">
                            <span>{erros}</span>
                        </div>
                        <input type="text" 
                            placeholder="Tecnologias"
                            value = {techs}
                            onChange = { e => {
                                setTechs(e.target.value);
                            }}
                        ></input>
                        <label htmlFor="latitude">Latitude: </label>
                        <input type="number"
                            id="latitude" 
                            value={latitude}
                            onChange = {e => {
                                setLatitude(e.target.value);
                            }}
                        ></input>
                        <label htmlFor="longitude">Longitude: </label>
                        <input type="number"
                            value={longitude}
                            onChange = {e => {
                                setLatitude(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="end-form">
                        <input type="submit" className="btn-sub" value="Cadastrar"></input>
                    </div>
                </form>
            </div>
    )
}

export default DevForm;