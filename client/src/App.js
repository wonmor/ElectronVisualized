import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactGA from "react-ga";
import firebase from "firebase/compat/app";

import { Routes, Route } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { isElectron } from "./components/Globals";
import { getAnalytics } from "firebase/analytics";

import AlertPopup from "./components/tools/AlertPopup";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GestureIcon from "@mui/icons-material/Gesture";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import 'firebase/compat/auth';
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Lottie from "react-lottie";
import animationData from "./assets/spinner.json";

const Login = React.lazy(() => import("./components/member/Login"));
const Register = React.lazy(() => import("./components/member/Register"));
const Table = React.lazy(() => import("./components/Table"));
const Search = React.lazy(() => import("./components/tools/Search"));
const Renderer = React.lazy(() => import("./components/visuals/Renderer"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const Developer = React.lazy(() => import("./components/Developer"));
const Extensions = React.lazy(() => import("./components/tools/Extensions"));
const Download = React.lazy(() => import("./components/tools/Download"));
const DownloadWeb = React.lazy(() => import("./components/tools/DownloadWeb"));
const MolarMass = React.lazy(() => import("./components/tools/MolarMass"));
const FileUploadForm = React.lazy(() => import("./components/tools/FileUploadForm"));
const Membership = React.lazy(() => import("./components/member/Membership"));
const MembershipElectron = React.lazy(() => import("./components/member/MembershipElectron"));
const SelfIonization = React.lazy(() => import("./components/visuals/SelfIonization"));
const Shop = React.lazy(() => import("./components/giftshop/Shop"));
const Cart = React.lazy(() => import("./components/giftshop/Cart"));
const Highlight = React.lazy(() => import("./components/giftshop/Highlight"));
const Blog = React.lazy(() => import("./components/articles/Blog"));

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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "electronvisualized.firebaseapp.com",
  projectId: "electronvisualized",
  storageBucket: "electronvisualized.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);

export { firebaseApp, firebaseAnalytics };

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
      <div
        className="p-10 bg-black"
        style={{ minHeight: "100vh", width: "-webkit-fill-available" }}
      >
        <div className="loading__container">
          <div className="flex justify-center items-center">
            <Lottie
              isClickToPauseDisabled={true}
              options={defaultOptions}
              height={400}
              width={400}
            />
          </div>
          <h2 className="text-center text-white m-5 font-thin">Loading Resources...</h2>
        </div>
      </div>
    );
  };

  const { collapseSidebar } = useProSidebar();

  return (
    <div className="bg-gray-800">
      <Header />
      <div className={`${isElectron() && "flex flex-row"}`}>
        <AlertPopup />
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

              <MenuItem
                icon={<HomeOutlinedIcon />}
                onClick={() => {
                  collapseSidebar(true);
                  navigate("/");
                }}
              >
                Home
              </MenuItem>

              <MenuItem
                icon={<GestureIcon />}
                onClick={() => {
                  collapseSidebar(true);
                  navigate("/renderer");
                }}
              >
                Spotlight
              </MenuItem>

              <MenuItem
                icon={<LibraryBooksIcon />}
                onClick={() => {
                  collapseSidebar(true);
                  navigate("/blog");
                }}
              >
                Articles
              </MenuItem>

              <MenuItem
                icon={<InsertEmoticonIcon />}
                onClick={() => {
                  collapseSidebar(true);
                  navigate("/login");
                }}
              >
                Member
              </MenuItem>
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
            <Route path="/download-web" element={<DownloadWeb />} />
            <Route path="/molar-mass" element={<MolarMass />} />
            <Route path="/file-upload" element={<FileUploadForm />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/membership-electron" element={<MembershipElectron />} />
            <Route path="/self-ionization" element={<SelfIonization />} />
            <Route path="/highlight" element={<Highlight />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
