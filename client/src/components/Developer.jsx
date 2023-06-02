import React, { useState } from "react";
import { isElectron, moleculeDict } from "./Globals";

import Dropdown from "./tools/Dropdown";
import MetaTag from "./tools/MetaTag";
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
  const [statusText, setStatusText] = useState("Working hard...");

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
      url: `${isElectron() ? "https://electronvisual.org" : ""}/api/load/${elementName}`,
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
      <MetaTag
        title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={
          "electron, electron density, chemistry, computational chemistry"
        }
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"}
      />

      <div
        className="overflow-auto pb-40"
        style={{ "min-height": "100vh", width: "-webkit-fill-available" }}
      >
        <div className="text-center pt-10 pl-5 pr-5 text-white">
          <h1 className="sm:pb-5 scale-75 sm:scale-100 flex items-center justify-center">
            <span className="text-white font-thin">API Guide</span>
          </h1>
          <p className="text-gray-400 m-5">
            REST API for DFT Electron Density Data
          </p>
          <p
            id="api-url"
            className="flex justify-center items-center m-auto overflow-auto scale-90 sm:scale-100 mb-5 p-3 max-w-fit bg-gray-700 text-gray-400 rounded"
          >
            <span className="mr-2 p-2 bg-gray-800 rounded">GET</span>https://electronvisual.org/api/load/H2
          </p>

          <>
              <Dropdown />
              <button
                onClick={() => {
                  fetchData();
                  setDisable(true);
                }}
                className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-gray-400 hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
                type="button"
              >
                <span>Fetch</span>
              </button>
            </>

          {!disable ? (
            <></>
          ) : preRender ? (
            <div className={"mt-5 text-gray-400"}>
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
  
              </>
            ) : (
              <div className="block sm:flex align-center justify-center">
                <div className="text-xl max-h-min text-left bg-gray-900 p-5 text-white">
                  <span className="text-5xl text-gray-400">HYDROGEN GAS</span>
                  <br></br>
                  <br></br>
                  <span>
                    <code>density_data:</code>
                  </span>
                  <pre>{JSON.stringify(atomInfo.density_data, null, 2)}</pre>
                </div>

                <div className="text-xl max-h-min text-left bg-gray-700 p-5 text-white">
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
    </>
  );
}
