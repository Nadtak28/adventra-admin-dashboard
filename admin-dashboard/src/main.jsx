import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from "./features/routes/scroll_to_top.jsx";

createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <BrowserRouter>
      <ScrollToTop />
      <App />
  </BrowserRouter>
</Provider>
)
