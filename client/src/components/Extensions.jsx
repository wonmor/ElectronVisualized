import { useState } from "react";

import { Background } from "./Geometries";
import { uBitConnectDevice } from "../utilities/serial";
import { getBrowser } from "../utilities/platform";

export default function Docs() {
  /*
  This is a component function in JSX

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
    Contains HTML properties that each represent the graphic element on the website
  */
  const [browserError, setBrowserError] = useState();

  const consolePrintln = (message) => {
    console.log(message);
  };

  // List of connected devices (a single value could be used if only connecting to one device)
  let connectedDevices = [];

  // Example event call-back handler
  const uBitEventHandler = (reason, device, data) => {
    switch (reason) {
      case "connected":
        consolePrintln("Connected");
        connectedDevices.push(device);
        break;

      case "disconnected":
        consolePrintln("Disconnected");
        connectedDevices = connectedDevices.filter((v) => v !== device);
        break;

      case "connection failure":
        consolePrintln("Connection Failure");
        break;

      case "error":
        consolePrintln("Error");
        break;

      case "console":
        consolePrintln("Console Data: " + data.data);
        break;

      case "graph-event":
        consolePrintln(
          `Graph Event:  ${data.data} (for ${data.graph}${
            data.series.length ? " / series " + data.series : ""
          })`
        );
        break;

      case "graph-data":
        consolePrintln(
          `Graph Data: ${data.data} (for ${data.graph}${
            data.series.length ? " / series " + data.series : ""
          })`
        );
        break;

      default:
        consolePrintln("<b>Connected!</b>");
        connectedDevices.push(device);
        break;
    }
  };

  const connectMicroBit = () => {
    let browser = getBrowser(window);
    console.log(browser);

    if (browser === "Google Chrome") {
      uBitConnectDevice(uBitEventHandler);
      setBrowserError(false);
    } else {
      setBrowserError(true);
    }
  };

  return (
    <div>
      <div className="bg-gray-700 pb-5">
        <div className="ml-5 mr-5 text-white text-center sm:pt-10 text-gray-400">
          <h1 className="sm:mb-5 scale-75 sm:scale-90">
            <span className="font-bold text-rose-200">Extensions</span> make it
            more <span className="text-white">accessible</span>.
          </h1>

          <h2 className="pt-5 leading-normal text-gray-400 border-t border-gray-500">
            <span className="text-5xl">
              Project <b className="text-blue-200">Atomizer</b>
            </span>
          </h2>

          <p className="p-5 text-gray-400">
            An Universal Solution to Controlling and Manipulating 3D Objects.
            <br></br>
            <b>iOS</b> and <b>Android</b>, as well as <b>micro:bit</b> versions
            are in <b>development</b>.
          </p>

          <button
            onClick={() => {
              connectMicroBit();
            }}
            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-200 hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"
          >
            <span>
              Communicate with <b>Micro:bit</b>
            </span>
          </button>

          {browserError && (
            <div>
              <h3 className="mt-5">
                <b>Incompatible</b> browser. Please use <b>Google Chrome</b>.
              </h3>
            </div>
          )}

          <img
            className="flex m-auto mt-5 mb-5"
            style={{ width: "1000px" }}
            src="Sketch3.jpg"
            alt="Sketch3"
          ></img>
        </div>
      </div>
      <Background />
    </div>
  );
}
