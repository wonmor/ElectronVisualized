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
        <div className="p-3 text-gray-400 text-center bg-gray-600">
            <div className="scale-90 sm:scale-100">
                <span className="text-xl">
                    © 2022 Licensed under <a className="hover:underline text-white" href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer">MIT</a>. Developed by <a className="hover:underline text-white" href="https://github.com/wonmor" target="_blank" rel="noopener noreferrer">John Seong</a> and <a className="hover:underline text-white" href="https://github.com/davidchi31415" target="_blank" rel="noopener noreferrer">David Chi</a>.
                </span>
            </div>
        </div>
    );
}
