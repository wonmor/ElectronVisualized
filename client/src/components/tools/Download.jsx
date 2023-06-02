import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Download() {
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
      <div className="pb-20 overflow-auto" style={{ height: "100vh" }}>
        <div className="ml-5 mr-5 text-white text-center sm:pt-10 text-gray-400">
          <h1 className="scale-75 font-thin sm:scale-90">
            Now on{" "}
            <span className="font-thin text-white">Mobile</span>.
            <br />
            <span className="font-thin text-rose-200">Electronify.</span>
          </h1>

          <p className="p-5 text-white">
            Download on your phone or a tablet
            <br />
            by scanning the QR code below.
          </p>

          <LazyLoadImage
            className="flex m-auto mt-5 mb-5 rounded"
            width={250}
            src="qrcode.png"
            alt="qrcode"
          ></LazyLoadImage>
          </div>
      </div>
    </div>
  );
}
