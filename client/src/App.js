import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

import { Routes, Route } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { isElectron } from "./components/Globals";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GestureIcon from '@mui/icons-material/Gesture';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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
const Download = React.lazy(() => import("./components/Download"));

/*
██████╗░░█████╗░██╗░░░██╗████████╗███████╗██████╗░░██████╗
██╔══██╗██╔══██╗██║░░░██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝
██████╔╝██║░░██║██║░░░██║░░░██║░░░█████╗░░██████╔╝╚█████╗░
██╔══██╗██║░░██║██║░░░██║░░░██║░░░██╔══╝░░██╔══██╗░╚═══██╗
██║░░██║╚█████╔╝╚██████╔╝░░░██║░░░███████╗██║░░██║██████╔╝
╚═╝░░╚═╝░╚════╝░░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═════╝░

COULD NOT PROXY REQUEST ERROR FIX: https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500

HOW TO START AS AN ELECTRON APP: yarn electron:start https://plainenglish.io/blog/migrate-existing-web-react-app-to-desktop-app-with-electron-a7007128120e
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

  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (isElectron()) {
      console.log("Electron is running");
      collapseSidebar();
    }
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

  const { collapseSidebar } = useProSidebar();

  return (
    <>
      <Header />
      <div className={`${isElectron() && "flex flex-row"}`}>
        {isElectron() && (
          <Sidebar style={{ height: "inherit" }}>
            <Menu>
              <MenuItem
                icon={<MenuOutlinedIcon />}
                onClick={() => {
                  collapseSidebar();
                }}
                style={{ textAlign: "center" }}
              ></MenuItem>

              <MenuItem icon={<HomeOutlinedIcon />} onClick={() => {
                collapseSidebar(true);
                navigate('/');
              }}>Home</MenuItem>
              <MenuItem icon={<GestureIcon />} onClick={() => {
                collapseSidebar(true);
                navigate('/renderer');
                }}>Spotlight</MenuItem>
            </Menu>
          </Sidebar>
        )}
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route exact path="/" element={<Table />} />
            <Route path="/renderer" element={<Renderer />} />
            <Route path="/dev" element={<Developer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/extensions" element={<Extensions />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
