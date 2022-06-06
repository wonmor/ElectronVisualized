import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Table from './components/Table'
import Element from './components/Element';
import NotFound from './components/NotFound';
import API from './components/API';

// Where is the BUILD folder in create-react-app? : https://create-react-app.dev/docs/deployment/
const App = () => {
  /*
  This is a component function in JSX that contains the HTML markup that represent each graphical element on the webpage

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    A HTML markup that contains graphical elements
  */
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Table />} />
          <Route path="/element" element={<Element />} />
          <Route path="/api" element={<API />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
