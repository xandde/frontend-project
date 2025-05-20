import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaCadastro from './pages/Cadastro';
import PaginaListaJogadores from './pages/Lista';
import './App.css'; // Para estilos globais, se necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaCadastro />} />
        <Route path="/jogadores" element={<PaginaListaJogadores />} />
      </Routes>
    </Router>
  );
}

export default App;