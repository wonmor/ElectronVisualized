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
      <div className="overflow-auto" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 text-gray-400">

          <h1 className="leading-tight font-thin">
            Oops, <span className="text-rose-200">404</span> Error.
          </h1>

          <h2 className="mt-5 pb-5 text-gray-400">
            Sorry bud, but page not found.
          </h2>
        </div>
      </div>
    </>
  );
}
