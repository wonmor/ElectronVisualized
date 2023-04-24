import { Background } from "./Geometries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledFirebaseAuth } from "react-firebaseui";

import MetaTag from "./MetaTag";
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const loginSuccessful = async () => {
        try {
          await firebase.auth().signInWithEmailAndPassword(username, password);
          navigate("/");
        } catch (error) {
          setErrorMessage("Please type in the correct username and password pair.");
        }
      };
      
      const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };

    return (
        <>
          <MetaTag title={"ElectronVisualized"}
            description={"View Electron Density, Molecular and Atomic Orbitals"}
            keywords={"electron, electron density, chemistry, computational chemistry"}
            imgsrc={"cover.png"}
            url={"https://electronvisual.org"} />
    
          <div className="bg-gray-700 pb-5 overflow-auto" style={{ "min-height": "100vh" }}>
            <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
              <h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">{"Sign in"}</span>
              </h1>

              <h3>or <button onClick={() => {
                navigate("/register");
              }}><span className="text-blue-200 hover:underline">{"Sign up"}</span></button>.</h3>
            
            {username === "" ? (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    ) : password === "" ? (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    ) : (
                <div className="mt-5">
                        <>
                            {errorMessage === "" ? (
                                <h3 className="text-blue-200">
                                    Authenticating...
                                </h3>
                            ) : (
                                <h3 className="text-red-200">
                                    {errorMessage}
                                </h3>
                            )}
                        </>
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