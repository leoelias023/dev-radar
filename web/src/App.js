import React, { useState, useEffect } from 'react';

import './index.css';
import './global.css';

import api from './services/api';

import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';


function App() {
  const [devs, setDevs] = useState([]);
  const [erros, setErros] = useState("");

  useEffect( () => {
    async function findDev() {
      const devs = await api.get('/dev/listar');
      setDevs(devs.data);
    }
    findDev();
  }, [])


  async function registerDev(data) {
    const resp = await api.post('/dev/cadastro', data);
    if(resp.data.mensagem) {
      setErros(resp.data.mensagem);
    }
    else{
      setDevs([...devs, resp.data]);
      setErros(" ");
    }
  }

  return (
    <>
      <aside className="cad-box">
        <DevForm onSubmit={registerDev} erros={erros} setErros={setErros}/>
      </aside>
      <main className="main-list">
        <DevItem key={devs._id} devs={devs} />
      </main>
    </>
  );
}

export default App;
