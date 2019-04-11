import React, { Component } from 'react';

import logo from '../../assets/img/icon-login.png';

import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

import Rodape from '../../components/Rodape/Rodape';

import api from '../../services/api.js';

class Cadastro extends Component {
    constructor() {
        super();

        this.state = {
            titulo: '',
            dataEvento: '',
            acessoLivre: '',
            tipoEventoId: '',
            instituicaoId: 1,
            descricao: '',
            listaTiposEventos: []
        };
    }

    // react call api file

    buscarTiposEventos() {
        // fetch('http://localhost:5000/Api/TiposEventos/')
        // .then(resposta => resposta.json())
        // .then(data => this.setState({listaTiposEventos : data}))
        // .catch((erro) => console.log(erro))
        api.tiposeventos.getAll();
    }

    componentDidMount() {
        this.buscarTiposEventos();
    }

    atualizaEstadoTitulo(event) {
        this.setState({ titulo: event.target.value })
    }

    atualizaEstadoDataEvento(event) {
        this.setState({ dataEvento: event.target.value })
    }

    atualizaEstadoAcessoLivre(event) {
        this.setState({ acessoLivre: event.target.value })
    }

    atualizaEstadoTipoEventoId(event) {
        this.setState({ tipoEventoId: event.target.value })
    }

    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
    }

    cadastraEvento(event) {
        event.preventDefault();

        let evento = {
            titulo: this.state.titulo,
            dataEvento: this.state.dataEvento,
            // É necessário converter o acessoLivre para int, pois no banco de dados é do tipo bool
            // e a requisição pelo navegador passa como string
            // Convertendo para int, internamente a conversão para bool é possível. Como string, não.
            acessoLivre: parseInt(this.state.acessoLivre),
            tipoEventoId: this.state.tipoEventoId,
            instituicaoId: this.state.instituicaoId,
            descricao: this.state.descricao
        }

        console.log(evento);

        fetch('http://localhost:5000/Api/Eventos',
            {
                method: 'POST',
                body: JSON.stringify(evento),
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resposta => resposta)
            .then(this.buscarTiposEventos())
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} alt="descricao" />

                        <nav className="cabecalhoPrincipal-nav">
                            Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo"></tbody>
                            </table>

                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>


                            <form onSubmit={this.cadastraEvento.bind(this)}>
                                <div className="container">
                                    <input
                                        type="text"
                                        id="evento__titulo"
                                        value={this.state.titulo}
                                        onChange={this.atualizaEstadoTitulo.bind(this)}
                                        placeholder="título do evento" />
                                    <input
                                        type="date"
                                        id="evento__data"
                                        value={this.state.dataEvento}
                                        onChange={this.atualizaEstadoDataEvento.bind(this)}
                                        placeholder="dd/MM/yyyy" />
                                    <select
                                        id="option__acessolivre"
                                        value={this.state.acessoLivre}
                                        onChange={this.atualizaEstadoAcessoLivre.bind(this)}>
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>
                                    <select
                                        id="option__tipoevento"
                                        value={this.state.tipoEventoId}
                                        onChange={this.atualizaEstadoTipoEventoId.bind(this)}>
                                        <option value="0">
                                            Selecione
                                </option>
                                        {
                                            this.state.listaTiposEventos.map((element) => {
                                                return <option key={element.id} value={element.id}>{element.nome}</option>
                                            })
                                        }
                                    </select>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        value={this.state.descricao}
                                        onChange={this.atualizaEstadoDescricao.bind(this)}
                                        placeholder="descrição do evento"
                                        id="evento__descricao"></textarea>


                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                                </div>
                            </form>

                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        );
    }
}

export default Cadastro;