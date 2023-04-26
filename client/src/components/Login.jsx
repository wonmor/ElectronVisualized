import { Background } from "./Geometries";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MetaTag from "./MetaTag";
import firebase from 'firebase/compat/app';

import * as firebaseui from 'firebaseui';

import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const authContainer = useRef(null);

    const navigate = useNavigate();

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/membership',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => {
            navigate('/membership');
            return false; // Prevents redirect by FirebaseUI
          },
        },
    };

    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(authContainer.current, uiConfig);

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            navigate('/membership');
          }
        });

        return () => {
          unregisterAuthObserver();
          ui.reset();
        };
    }, [navigate]);

    return (
        <>
          <MetaTag title={"ElectronVisualized"}
            description={"View Electron Density, Molecular and Atomic Orbitals"}
            keywords={"electron, electron density, chemistry, computational chemistry"}
            imgsrc={"cover.png"}
            url={"https://electronvisual.org"} />
    
          <div className="bg-gray-700 pb-5 overflow-auto" style={{ minHeight: "100vh", width: "-webkit-fill-available" }}>
            <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
              <h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">{"Sign in"}</span>
              </h1>

              <h3>or <button onClick={() => {
                navigate("/register");
              }}><span className="text-blue-200 hover:underline">{"Sign up"}</span></button>.</h3>

              <div ref={authContainer}></div>

              {errorMessage !== "" && (
                <div className="mt-5">
                    <h3 className="text-red-200">
                        {errorMessage}
                    </h3>
                </div>
              )}

              <div className="max-w-lg m-auto pt-5">
                  <span className="text-center text-gray-400">
                      Sign up for our membership today and start exploring the exciting world of atomic and molecular orbitals like never before!
                  </span>
              </div>
            </div>
          </div>
          <Background />
        </>
    );
}
