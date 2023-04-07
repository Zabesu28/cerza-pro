import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App.js';
import ListAlerte from './styles/ListAlerte.css';
import AddAlerte from './styles/AddAlerte.css';
import ModifAlerte from './styles/ModifAlerte.css';
import ListMissionUser from './styles/ListMissionUser.css';
import './styles/AddAlerteUser.css';
import './styles/ListAlerteUser.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);