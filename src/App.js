import './App.css';

import IURegistro from './components/sesion/IURegistro';
import IUInicio from './components/sesion/IUInicio';
import IUDashboard from './components/dashboard/IUDashboard';
import NotFound from './components/NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from "./store/store"
import { Provider } from 'react-redux';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IUInicio />} />
            <Route path="/registro" element={<IURegistro />} />
            <Route path="/dashboard" element={<IUDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
