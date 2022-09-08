import React, { useState, useEffect } from "react";

import { Background } from "./Geometries";
import { uBitConnectDevice } from "../utilities/serial";
import { getBrowser } from "../utilities/platform";
import { isElectron } from "./Globals";
import { Mount } from "./Transitions";

export default function Extensions() {
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

  const [entryCode, setEntryCode] = useState("23wrebr");

  const [enableiOSComms, setEnableiOSComms] = useState(false);

  useEffect(() => {
    if (enableiOSComms) {
    }
  }, [enableiOSComms]);

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

    if (browser === "Google Chrome" && isElectron() === false) {
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
          <Mount content={<h1 className="sm:mb-5 scale-75 sm:scale-90">
            <span className="text-rose-200">Extensions</span> make it
            more <span className="text-white">accessible</span>.
          </h1>} show />

          <div className="pt-5 leading-normal text-gray-400 border-t border-gray-500">
            <img
              className="flex m-auto mt-5"
              style={{ width: "500px" }}
              src="atomizer_logo_blue.svg"
              alt="Atomizer"
            ></img>
          </div>

          <p className="p-5 text-white">
            An Universal Solution to Controlling and Manipulating 3D Objects.
            <br></br>
            <b>iOS</b>, as well as <b>micro:bit</b> versions
            are in <b>development</b>.
          </p>

          {!enableiOSComms ? (
            <>
              <button
                onClick={() => {
                  setEnableiOSComms(true);
                }}
                className="ml-2 mb-2 bg-transparent hover:bg-blue-500 text-rose-200 hover:text-white py-2 px-4 border border-rose-200 hover:border-transparent rounded"
              >
                <span>
                  Connect with an <b>iOS</b> Device
                </span>
              </button>

              <button
                onClick={() => {
                  connectMicroBit();
                }}
                className="ml-2 mb-2 bg-transparent hover:bg-blue-500 text-blue-200 hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"
              >
                <span>
                  Communicate with <b>Micro:bit</b>
                </span>
              </button>

              <a href="https://github.com/wonmor/Project-Atomizer" target="_blank" rel="noopener noreferrer">
                <button className="ml-2 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                  <span>
                    Check out the <b>GitHub</b> Page
                  </span>
                </button>
              </a>
            </>
          ) : (
            <>
              <p className="flex m-auto break-all scale-90 sm:scale-100 mb-5 p-3 max-w-fit text-rose-200 border border-rose-200 rounded">
                Entry Code | {entryCode}
              </p>
            </>
          )}

          {browserError && (
            <div>
              <h3 className="mt-5">
                {!isElectron() ? (
                  <>
                    <b>Incompatible</b> browser. Please use <b>Google Chrome</b>
                    .
                  </>
                ) : (
                  <>
                    You're on the <b>Desktop</b> app. Please use the <b>Web</b>{" "}
                    version to unlock this feature.
                  </>
                )}
              </h3>
            </div>
          )}

          <img
            className="flex m-auto mt-5 mb-5 rounded"
            style={{ width: "1000px" }}
            src="Sketch3.jpg"
            alt="Sketch3"
          ></img>

          <p className="font-bold text-center text-3xl">
            What does this extension do? Who is it made for?
          </p>

          <div className="pl-0 pr-0 lg:pl-60 lg:pr-60 flex justify-center">
            <p className="p-5 text-left text-white">
              Project <b>Atomizer</b> started as a small idea to develop a way
              to introduce other students who seemingly avoid Chemistry at all
              costs to the world of atoms and molecules. We have achieved this
              by developing a module slash program that enables users to freely
              interact with the 3D models — by feeling and touching them using a{" "}
              <b>microcontroller</b> or a <b>phone</b> — as if you are in a
              science museum.
            </p>
          </div>

          <p className="p-5 font-bold text-center text-3xl border-t border-gray-400">
            Steps to Flash the Code to Your{" "}
            <span className="text-white font-bold"> Micro:bit</span> Controller
          </p>

          <div className="pl-0 pr-0 lg:pl-60 lg:pr-60 flex justify-center">
            <p className="pl-5 pr-5 text-left text-white">
              <b>1.</b> Install <b>Thonny</b> IDE through their{" "}
              <a href="https://thonny.org/" target="_blank" rel="noopener noreferrer">
                <span className="font-bold text-blue-200 hover:underline">
                  official website
                </span>
              </a>
              <div className="p-2" />
              <b>2.</b> Download the <code>main.py</code> file located in the{" "}
              <code>microbit</code> folder in the <code>root</code> directory,
              and open it using <b>Thonny</b>
              <div className="p-2" />
              <b>3.</b> Navigate to the options, select intrepreter, and change
              the settings to use <b>MicroPython</b> (BBC <b>micro:bit</b>)
              instead of the default Python 3.7 (Everything is pre-packaged, so
              you don't have to worry about installing an extension or anything
              like that)
              <div className="p-2" />
              <b>4.</b> Press the green arrow button on the top to compile the
              code and push it into your microbit board; make sure the right
              port is selected for Serial communication between your computer
              and the microcontroller
              <div className="p-2" />
              <b>5.</b> Now, last but not least, go to the Extensions page on
              the official website of <b>ElectronVisualized</b> on{" "}
              <b>Google Chrome</b> that supports <b>WebUSB</b> API, and press
              the "Communicate with <b>micro:bit</b>" button
            </p>
          </div>
          <a href="https://github.com/wonmor/Project-Atomizer/blob/main/microbit/main.py" target="_blank" rel="noopener noreferrer">
            <button className="mt-5 ml-5 mr-5 ml-2 bg-transparent hover:bg-blue-500 text-white hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
              <span>
                <b>Download</b> <code>main.py</code>
              </span>
            </button>
          </a>
        </div>
      </div>
      <Background />
    </div>
  );
}
