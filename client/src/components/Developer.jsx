import React, { useState } from "react";

import { Background } from "./Geometries";

import { Mount } from "./Transitions";

import Dropdown from "./Dropdown";

import MetaTag from "./MetaTag";

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

  const fetchData = async (elementName = "H2") => {
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
      url: `/api/load/${elementName}`,
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

          bond_lengths: res.bond_lengths,
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
    <>
      <MetaTag title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={"electron, electron density, chemistry, computational chemistry"}
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"} />

      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 pl-5 pr-5 text-gray-400">
          <Mount content={<h1 className="pb-5 text-ellipsis overflow-hidden">
            <span className="text-white">Density Functional Theory</span> Meets
            the <span className="text-blue-200">Web</span>.
          </h1>} show />

          <div className="bg-gray-600 rounded ml-0 mr-0 lg:ml-60 lg:mr-60">
            <h2 className="mt-5 pl-5 pr-5 pt-5 leading-normal text-gray-400">
              <span className="text-5xl sm:text-6xl">
                Introducing the{" "}
                <span className="text-rose-200">World Engine</span>.
              </span>
            </h2>

            <h2 className="p-5 leading-normal text-gray-400">
              A <span className="text-white">REST API</span> Powered by the
              Industry-leading <span className="text-white">GPAW</span> and{" "}
              <span className="text-white">ASE</span> Libaries.
            </h2>
          </div>

          <h2 id="api-description" className="p-5 leading-tight text-gray-400">
            An implementation that seemed to be impossible to be made.<br></br>
            Handcrafted for{" "}
            <span className="text-white">Computational Chemists</span> and{" "}
            <span className="text-white">Engineers</span>.
          </h2>

          <p
            id="api-url"
            className="flex m-auto overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-rose-200 border border-rose-200 rounded"
          >
            https://electronvisual.org/api/load/H2
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

          <div className="flex flex-col pt-5 pb-5">
            {preRender ? (
              <>
                <img
                  className="border-dotted border-2 border-white m-auto rounded"
                  src="/API.png"
                  style={{ width: "1000px" }}
                  alt="Screenshot"
                />

                <div className="bg-gray-800 mt-5 p-5 ml-0 mr-0 lg:ml-60 lg:mr-60 rounded">
                  <h2>
                    This is an{" "}
                    <span className="text-white">Open Source Project</span>.
                  </h2>

                  <p className="text-left mt-2">
                    The nature of being <b>open source</b> is that anyone can
                    jump in and contribute to our project. This means you, you,
                    and you over there! You guys can all be a part of the{" "}
                    <b>ElectronVisualized</b> Dev team. If you would like to
                    contact me personally, however, please shoot an email to{" "}
                    <span className="text-rose-200">
                      business@johnseong.info
                    </span>
                    .
                  </p>
                </div>
              </>
            ) : (
              <div className="block sm:flex align-center justify-center">
                <div className="text-xl max-h-min text-left bg-gray-900 p-5 text-white">
                  <span className="text-5xl text-gray-400">
                    HYDROGEN GAS
                  </span>
                  <br></br>
                  <br></br>
                  <span>
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

                    <span>
                      <code>bond_lengths:</code>
                    </span>

                    <br></br>
                    {JSON.stringify(atomInfo.bond_lengths, null, 2)}
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
      <Background />
    </>
  );
}
