import React, { useState, useEffect } from "react";
import { Background } from "./Geometries";
import { isElectron } from "./Globals";

export default function DownloadWeb() {
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
    <div style={{ minWidth: "-webkit-fill-available", overflow: "auto" }}>
      <div className="bg-gray-700 pb-20 overflow-auto" style={{ height: "100vh" }}>
        <div className="ml-5 mr-5 text-white text-center sm:pt-10 text-gray-400">
          <h1 className="scale-75 sm:scale-90">
            Now on{" "}
            <span className="text-white">Mobile</span>.
            <br />
            <span className="text-rose-200">Electronify.</span>
          </h1>

          <p className="p-5 text-white">
            Download on your phone or a tablet
            <br />
            by scanning the QR code below.
          </p>

          <img
            className="flex m-auto mt-5 mb-5 rounded"
            style={{ width: "250px" }}
            src="qrcode.png"
            alt="qrcode"
          ></img>
          </div>
      </div>
      <Background />
    </div>
  );
}
