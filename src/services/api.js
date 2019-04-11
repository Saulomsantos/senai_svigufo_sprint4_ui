import axios from 'axios';

const URL = "http://localhost:5000/Api/";

export default {
    tiposeventos(data) {
        return {
            getAll: () => axios.get(URL + "tiposeventos")
            // cadastrar: () => axios.post(URL + "tiposeventos", { data })
        }
    }
}
// buscarTiposEventos(){
//     fetch('http://localhost:5000/Api/TiposEventos/')
//         .then(resposta => resposta.json())
//         .then(data => this.setState({ listaTiposEventos: data }))
//         .catch((erro) => console.log(erro))
// }