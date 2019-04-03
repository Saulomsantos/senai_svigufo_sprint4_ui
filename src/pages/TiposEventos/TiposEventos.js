import React, { Component } from 'react';

import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

import logo from '../../assets/img/icon-login.png';

import Rodape from '../../components/Rodape/Rodape';

class TiposEventos extends Component {
    constructor(){
        super();
        this.state = {
            lista : [],
            nome : ""
        }

        this.atualizaEstadoNome = this.atualizaEstadoNome.bind(this);
        this.cadastraTipoEvento = this.cadastraTipoEvento.bind(this);
    }

    buscarTiposEventos(){
        fetch('http://localhost:5000/Api/TiposEventos/')
        .then(resposta => resposta.json())
        .then(data => this.setState({lista : data}))
        .catch((erro) => console.log(erro))
    }

    componentDidMount(){
        this.buscarTiposEventos();
    }

    atualizaEstadoNome(event) {
        this.setState({nome : event.target.value});
    }

    cadastraTipoEvento(event) {
        event.preventDefault();

        fetch('http://localhost:5000/Api/TiposEventos/',
            {
                method : 'POST',
                body : JSON.stringify({nome : this.state.nome}),
                crossDomain : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
        .then(resposta => resposta)
        .then(this.buscarTiposEventos())
        .catch(erro => console.log(erro))

    }



    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={logo} alt="calendário com um ícone de check no centro"/>

                    <nav className="cabecalhoPrincipal-nav">
                    Administrador
                    </nav>
                </div>
                </header>

                <main className="conteudoPrincipal">
                <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Tipos de Eventos</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                    <table id="tabela-lista">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                        </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.lista.map(function(tipoevento){
                                    return (
                                        <tr key={tipoevento.id}>
                                            <td>{tipoevento.id}</td>
                                            <td>{tipoevento.nome}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Tipo de Evento
                    </h2>
                    <form onSubmit={this.cadastraTipoEvento}>
                        <div className="container">
                        <input 
                            type="text"
                            value={this.state.nome}
                            onChange={this.atualizaEstadoNome}
                            id="nome-tipo-evento" 
                            placeholder="tipo do evento" 
                        />
                        <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                            Cadastrar
                        </button>
                        </div>
                    </form>
                    </div>
                </section>
                </main>

                {/* é assim que se faz um comentário em ReactJS */}

                {/* <footer className="rodapePrincipal">
                <section className="rodapePrincipal-patrocinadores">
                    <div className="container">
                    <p>Escola SENAI de Informática - 2019</p>
                    </div>
                </section>
                </footer> */}
                <Rodape />
            </div>

        );
    }
}

export default TiposEventos;