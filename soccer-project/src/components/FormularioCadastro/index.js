import { useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/logo.png';
import axios from 'axios';

function FormularioCadastro() {
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [time, setTime] = useState('');
    const [numero, setNumero] = useState('');
  //  const [posicao, setPosicao] = useState('');
    const navigate = useNavigate();
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

    const cadastrarJogador = async () => {
        try {
            const response = await axios.post('', {
                nome,
                numero,
                time,
                sexo
            });
            exibirMensagem(response.data.mensagem || 'Jogador cadastrado com sucesso!', 'sucesso');
            setNome('');
            setNumero('');
            setTime('');
            setSexo('');
        } catch (error) {
            let erroMsg = 'Erro ao conectar ao servidor.';
            if (error.response && error.response.data) {
                erroMsg = error.response.data.mensagem;
                if (error.response.data.erros) {
                    erroMsg += ' ' + Object.values(error.response.data.erros).join(', ');
                }
            }
            exibirMensagem(erroMsg, 'erro');
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="Logo da empresa" />
            <h2>Cadastro de jogadores</h2>
            <form onSubmit={(e) => { e.preventDefault(); cadastrarJogador(); }}>
                <input 
                    type="text"
                    id="nome"
                    placeholder="Nome do jogador"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    id="numero"
                    placeholder="Número da camisa"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    id="time"
                    placeholder="Nome do time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    id="sexo"
                    placeholder="Sexo"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>

            <button onClick={() => navigate('/jogadores')} className="link-jogadores">
                Ver jogadores cadastrados
            </button>

            <MensagemFeedback
                mensagem={mensagem}
                tipo={tipoMensagem}
                visivel={visivel}
                onclose={fecharMensagem}
            />
        </div>
    );
}

export default FormularioCadastro;
