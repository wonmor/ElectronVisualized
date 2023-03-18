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
              <h1 className="sm:pb-5 scale-75 sm:scale-100">
                <span className="text-white">Login.</span>
              </h1>

              <h3>or <button onClick={() => {
                navigate("/register");
              }}><span className="text-blue-200 hover:underline">Register</span></button>.</h3>

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
                        By signing up for a membership, you'll gain access to even more advanced features, such as real-time molecular visualization and interactive orbital manipulation.
                        <br /><br />
                        You'll also have access to our comprehensive database of orbital data, which is constantly updated with the latest research findings.
                        <br /><br />
                        So what are you waiting for?
                        <br />
                        Sign up for our membership today and start exploring the exciting world of atomic and molecular orbitals like never before!
                    </span>
                </div>
            </div>
          </div>
          <Background />
        </>
      );
}