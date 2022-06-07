import { Routes, Route } from "react-router-dom";
import { useSelector} from "react-redux";

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Table from './components/Table'
import Molecule from './components/Molecule';
import NotFound from './components/NotFound';

import Developer from './components/Developer';
import Docs from './components/Docs';

/*
██████╗░░█████╗░██╗░░░██╗████████╗███████╗██████╗░░██████╗
██╔══██╗██╔══██╗██║░░░██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝
██████╔╝██║░░██║██║░░░██║░░░██║░░░█████╗░░██████╔╝╚█████╗░
██╔══██╗██║░░██║██║░░░██║░░░██║░░░██╔══╝░░██╔══██╗░╚═══██╗
██║░░██║╚█████╔╝╚██████╔╝░░░██║░░░███████╗██║░░██║██████╔╝
╚═╝░░╚═╝░╚════╝░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═════╝░
*/

export default function App() {
  /*
  This is a component function in JSX that contains the HTML markup
  that represent each graphical element on the webpage;
  This specific function handles React's client-side routing feature

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    A HTML markup that contains graphical elements
  */
  const globalSelectedElement = useSelector((state) => state.selectedElement.globalSelectedElement);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Table />} />
          <Route path="/renderer" element={<Molecule />} />
          <Route path={`/renderer/${globalSelectedElement["element"]}`} element={<Molecule />} />
          <Route path="/dev" element={<Developer />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
