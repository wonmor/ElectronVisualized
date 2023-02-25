import { Mount } from "./Transitions";
import { Background } from "./Geometries";
import MetaTag from "./MetaTag";
import { login } from "../auth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const loginSuccessful = async () => {
        let opts = {
            'username': username,
            'password': password
        }

        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(opts)
          }).then(r => r.json())
            .then(token => {
              if (token.access_token) {
                login(token);
                navigate("/");     
              }
              else {
                setErrorMessage("Please type in the correct username and password pair.");
              }
            })
    };

    return (
        <>
          <MetaTag title={"ElectronVisualized"}
            description={"View Electron Density, Molecular and Atomic Orbitals"}
            keywords={"electron, electron density, chemistry, computational chemistry"}
            imgsrc={"cover.png"}
            url={"https://electronvisual.org"} />
    
          <div className="bg-gray-700 pb-5" style={{ "min-height": "100vh" }}>
            <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
              <Mount content={<h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">Login.</span>
              </h1>} show />

              {username === "" ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Else the page will be reloaded which is the default DOM behaviour in forms and its submit button...

                        if (e.target[0].value.replace(/\s/g, '') === "") {
                            return;
                        }

                        setUsername(e.target[0].value);
                        e.target[0].value = "";
                    }}
                    className="flex flex-cols justify-self-end m-auto mt-5 overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-white border border-gray-400 rounded"
                    >
                        <label>
                            <span>
                                <input
                                    className="bg-transparent truncate ..."
                                    type="username"
                                    placeholder="Enter your username..."
                                />
                            </span>
                        </label>
                        <button className="ml-3" type="submit">
                            <span>Submit</span>
                        </button>
                    </form>
              ) : password === "" ? (
                <Mount content={
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Else the page will be reloaded which is the default DOM behaviour in forms and its submit button...

                            if (e.target[0].value.replace(/\s/g, '') === "") {
                                return;
                            }

                            setPassword(e.target[0].value);
                            e.target[0].value = "";
                            loginSuccessful();
                        }}
                        className="flex flex-cols justify-self-end m-auto mt-5 overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-white border border-gray-400 rounded"
                    >
                        <label>
                            <span>
                            <input
                                className="bg-transparent truncate ..."
                                type="password"
                                placeholder="Enter the password..."
                            />
                            </span>
                        </label>
                        <button className="ml-3" type="submit">
                            <span>Submit</span>
                        </button>
                    </form>
                } show />   
            ) : (
                <div className="mt-5">
                    <Mount content={
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
                    } show />
                </div>
            )}
            </div>
          </div>
          <Background />
        </>
      );
}