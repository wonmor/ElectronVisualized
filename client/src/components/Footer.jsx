import React from "react";

export default function Footer() {
  /*
  This is a component function in JSX that contains the HTML markup that represent each graphical element on the webpage

  Parameters
  ----------
  None

  Returns
  -------
  DOM File
      A HTML markup that contains graphical elements
  */

  return (
    <div className="p-3 opacity-50 text-gray-400 text-center bg-gray-600 fixed bottom-0 rounded-3xl" style={{ left: "50%", transform: "translate(-50%, -50%)" }}>
      <div className="scale-90 sm:scale-100">
        <span className="text-sm md:text-xl">
          Hey, how was your day?
        </span>
      </div>
    </div>
  );
}
