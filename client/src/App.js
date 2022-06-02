import { Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Table from './components/Table';

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
          <Route exact path="/" element={<Table />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
