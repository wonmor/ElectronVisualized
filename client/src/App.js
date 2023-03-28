import React, { Suspense, useEffect } from "react";
import ReactGA from "react-ga";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Lottie from "react-lottie";
import animationData from "./assets/spinner.json";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const Table = React.lazy(() => import("./components/Table"));
const Search = React.lazy(() => import("./components/Search"));
const Renderer = React.lazy(() => import("./components/Renderer"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const Developer = React.lazy(() => import("./components/Developer"));
const Extensions = React.lazy(() => import("./components/Extensions"));

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

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Fallback = () => {
    return (
      <div className="p-10">
        <div className="loading__container">
          <div className="flex justify-center items-center">
            <Lottie
              isClickToPauseDisabled={true}
              options={defaultOptions}
              height={400}
              width={400}
            />
          </div>
          <h2 className="text-center text-white m-5">Loading Resources.</h2>
          <h3 className="text-center text-gray-400 m-5 mb-40">
            Please wait until the process is completed.
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
        <Suspense fallback={
         <Fallback />
        }>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route exact path="/" element={<Table />} />
            <Route path="/renderer" element={<Renderer />} />
            <Route path="/dev" element={<Developer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/extensions" element={<Extensions />} />
          </Routes>
        </Suspense>
      <Footer />
    </>
  );
}
