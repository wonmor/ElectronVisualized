import React from "react";
/*
█░█ █▀█ █░█   █▀▀ █▀█ █▀█ █▀█ █▀█   █▀█ ▄▀█ █▀▀ █▀▀
▀▀█ █▄█ ▀▀█   ██▄ █▀▄ █▀▄ █▄█ █▀▄   █▀▀ █▀█ █▄█ ██▄
*/

export default function NotFound() {
  /*
    This is a component function of the JSX that returns the graphical elements of the website; 
    which in this case, the periodic table is blitted on the screen

    Parameters
    ----------
    None

    Returns
    -------
    DOM File
        A HTML markup that contains graphical elements
  */
  return (
    <>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 text-gray-400">

          <h1 className="leading-tight">
            Oops, <span className="font-bold text-rose-200">404</span> Error.
          </h1>

          <h2 className="mt-5 pb-5 text-gray-400 border-b border-gray-400">
            Sorry bud, page not found.
          </h2>

          <p className="pt-5 text-gray-400">
            Kindly consider <b>redirecting</b> to the main website.
          </p>
        </div>
      </div>
    </>
  );
}
