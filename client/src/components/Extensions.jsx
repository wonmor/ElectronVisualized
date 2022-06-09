import { Background } from "./Geometries";

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

  return (
    <div>
      <div className="bg-gray-700 pb-5" style={{ "min-height": "100vh" }}>
        <div className="ml-5 mr-5 text-white text-center sm:pt-10 text-gray-400">
          <h1 className="sm:mb-5 scale-75 sm:scale-90 break-all">
            <span className="font-bold text-rose-200">Extensions</span> play a pivotal
            role in promoting the{" "}
            <span className="text-white">ease of use</span> of our website,
            making it more <span className="text-white">accessible</span> to
            users of all ages.
          </h1>

          <h2 className="pt-5 leading-normal text-gray-400 border-t border-gray-500">
            <span className="text-5xl break-all">
              Project <b className="text-blue-200">Atomizer</b>
            </span>
          </h2>

          <p className="p-5 mb-5 text-gray-400">
            An Universal Solution to <b>Controlling</b> and <b>Manipulating</b>{" "}
            3D Objects.<br></br>
            <b>iOS</b> and <b>Android</b>, as well as <b>micro:bit</b> versions
            are in <b>development</b>.
          </p>

          <a
              href="https://github.com/wonmor/ElectronVisualized"
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-200 hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"
            >
              <b>GitHub</b> page
            </a>

        <img className="flex m-auto mt-20 mb-5 opacity-50" src="https://cdn.sparkfun.com/assets/5/2/d/c/c/microbit-logo-white.png" alt="microbit-img"></img>
        </div>
      </div>
      <Background />
    </div>
  );
}