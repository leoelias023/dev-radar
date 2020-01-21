import React, { useState } from 'react';
import './style.css';
import api from '../../services/api';

function DevItem({ key, devs }) {
    return (
        devs.map( (dev) => {
            const urlGit = "http://github.com/"+dev.github_user;
            return (
                <div className="card">
                    <div className="card-top">
                        <div className="btn-system">
                        </div>
                        <div className="left-info">
                            <img src={dev.avatar_url} alt="This is a Dev" />
                            <div className="nomes">
                                <strong>{dev.github_user}</strong>
                                <span className="techs-in">{dev.techs.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-bottom">
                        <p>
                            {dev.bio}
                        </p>
                    <a href={urlGit} className="link-git">Acessar perfil no GitHub</a>
                    </div>
                </div>
            );
        })
    );
}

export default DevItem;