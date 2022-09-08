import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Table from './components/Table'
import Search from './components/Search';
import Renderer from './components/Renderer';
import NotFound from './components/NotFound';

import Developer from './components/Developer';
import Docs from './components/Docs';
import Extensions from './components/Extensions';

import ReactGA from 'react-ga';

/*
██████╗░░█████╗░██╗░░░██╗████████╗███████╗██████╗░░██████╗
██╔══██╗██╔══██╗██║░░░██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝
██████╔╝██║░░██║██║░░░██║░░░██║░░░█████╗░░██████╔╝╚█████╗░
██╔══██╗██║░░██║██║░░░██║░░░██║░░░██╔══╝░░██╔══██╗░╚═══██╗
██║░░██║╚█████╔╝╚██████╔╝░░░██║░░░███████╗██║░░██║██████╔╝
╚═╝░░╚═╝░╚════╝░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═════╝░

COULD NOT PROXY REQUEST ERROR FIX: https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500
*/

const TRACKING_ID = "G-15Q6HNH1D8"; // Google Analytics Tracking ID

ReactGA.initialize(TRACKING_ID);

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
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Table />} />
          <Route path="/renderer" element={<Renderer />} />
          <Route path={`/renderer/${globalSelectedElement["element"]}`} element={<Renderer />} />
          <Route path="/dev" element={<Developer />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/search" element={<Search />} />
          <Route path="/extensions" element={<Extensions />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
