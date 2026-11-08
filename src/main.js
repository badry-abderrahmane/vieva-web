import './style.css';
import { initCommon } from './common.js';

initCommon();

const page = document.body.dataset.page;
if (page === 'home') import('./home.js').then((m) => m.initHome());
if (page === 'devis') import('./wizard.js').then((m) => m.initWizard());
if (page === 'catalogue') import('./catalogue.js').then((m) => m.initCatalogue());
