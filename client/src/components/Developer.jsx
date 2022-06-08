import { useState } from "react";

import Dropdown from "./Dropdown";

import axios from "axios";

/*
░█████╗░██████╗░██╗  ██████╗░░█████╗░░██████╗░███████╗
██╔══██╗██╔══██╗██║  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
███████║██████╔╝██║  ██████╔╝███████║██║░░██╗░█████╗░░
██╔══██║██╔═══╝░██║  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
██║░░██║██║░░░░░██║  ██║░░░░░██║░░██║╚██████╔╝███████╗
╚═╝░░╚═╝╚═╝░░░░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝
*/

export default function Developer() {
  /*
  This is a component function in JSX that handles all the API-related events

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    Contains HTML properties that each represent the graphic element on the website
  */
  const [disable, setDisable] = useState(false);

  const [preRender, setPreRender] = useState(true);

  const [atomInfo, setAtomInfo] = useState(null);

  const [serverError, setServerError] = useState(false);

  const [statusText, setStatusText] = useState("Fetching in Progress...");

  const fetchData = async () => {
    /*
    This is an asyncronous function that sends HTML requests to the server, ran by Flask (Python)

    Parameters
    ----------
    None

    Returns
    -------
    None
    */
    await axios({
      method: "GET",
      url: "/api/gpaw/H2",
    })
      .then((response) => {
        const res = response.data;

        setAtomInfo({
          no_of_atoms: res.no_of_atoms,

          atoms_x: res.atoms_x,
          atoms_y: res.atoms_y,
          atoms_z: res.atoms_z,

          xdim: res.xdim,
          ydim: res.ydim,
          zdim: res.zdim,

          density_data: res.density_data,
        });

        setPreRender(false);
      })
      .catch((err) => {
        setServerError(true);
        setStatusText("Server communication error has occured!");
      });
  };

  return (
    <div>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 pl-5 pr-5 text-gray-400">
          <h1 className="pb-5">
            <span className="text-white">Density Functional Theory</span> Meets
            the <span className="text-white">Web</span>.
          </h1>

          <h2 className="mt-5 p-5 leading-normal bg-gray-600 text-gray-400">
            <span className="text-6xl">
              Introducing the <span className="text-white">World Engine</span>.
            </span>
            <br></br>A <span className="text-white">REST API</span> Powered by
            the Industry-leading <span className="text-white">GPAW</span> and{" "}
            <span className="text-white">ASE</span> Libaries.
          </h2>

          <h2 id="api-description" className="p-5 leading-tight text-gray-400">
            An implementation that seemed to be impossible to be made.<br></br>
            Handcrafted for{" "}
            <span className="text-white">Computational Chemists</span> and{" "}
            <span className="text-white">Engineers</span>.
          </h2>

          <p className="inline-block scale-90 sm:scale-100 mb-5 max-w-fit text-rose-200 border border-rose-200 py-2 px-4 rounded">
          https://electron-visualized.herokuapp.com/api/gpaw/H2
          </p>

          {!disable ? (
            <div>
              <Dropdown />
              <button
                disabled={disable}
                onClick={() => {
                  fetchData();
                  setDisable(true);
                }}
                className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-gray-400 hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
                type="button"
              >
                <span>Fetch Data from the API</span>
              </button>
            </div>
          ) : preRender ? (
            <div className={"text-gray-400"}>
              <h3>{statusText}</h3>

              {!serverError && (
                <div className="scale-75 lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
          ) : null}

          <div className="pt-5 pb-5">
            {preRender ? (
              <img
                className="border-dotted border-2 border-white"
                src="/API.png"
                alt="Screenshot"
              />
            ) : (
              <div className="block sm:flex align-center justify-center">
                <div className="text-xl max-h-min text-left bg-gray-900 p-5 text-white">
                  <span className="text-5xl text-gray-400">HYDROGEN GAS</span>
                  <br></br>
                  <br></br>
                  <span>
                    <code className="text-gray-400">Density data is normalized<br></br>from range -255 to 255...</code>
                    <br></br><br></br>
                    <code>density_data:</code>
                  </span>
                  <pre>{JSON.stringify(atomInfo.density_data, null, 2)}</pre>
                </div>

                <div className="text-xl max-h-min text-left bg-gray-800 p-5 text-white">
                  <span>
                    <code>atom_x:</code>
                  </span>

                  <pre>
                    {JSON.stringify(atomInfo.atoms_x, null, 2)}
                    <br></br>

                    <span>
                      <code>atom_y:</code>
                    </span>

                    <br></br>
                    {JSON.stringify(atomInfo.atoms_y, null, 2)}
                    <br></br>

                    <span>
                      <code>atom_z:</code>
                    </span>

                    <br></br>
                    {JSON.stringify(atomInfo.atoms_z, null, 2)}
                    <br></br>

                    <br></br>
                    <span>
                      <code>
                        no_of_atoms: {JSON.stringify(atomInfo.no_of_atoms)}
                      </code>
                    </span>

                    <pre>
                      <br></br>
                      <span>
                        <code>xdim: </code>
                      </span>

                      {JSON.stringify(atomInfo.xdim, null, 2)}
                      <br></br>

                      <span>
                        <code>ydim: </code>
                      </span>

                      {JSON.stringify(atomInfo.ydim, null, 2)}
                      <br></br>

                      <span>
                        <code>zdim: </code>
                      </span>

                      {JSON.stringify(atomInfo.zdim, null, 2)}
                    </pre>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}