import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Table from './components/Table';

// Where is the BUILD folder in create-react-app? : https://create-react-app.dev/docs/deployment/
const App = () => {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Table />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
