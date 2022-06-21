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
        <div className="p-3 text-white text-center bg-gray-600">
            <div className="scale-90 sm:scale-100">
                <span className="text-xl">
                    © 2022 Licensed under <b>MIT</b>. Developed by <a className="hover:underline text-blue-200" href="https://github.com/wonmor"><b>John Seong</b></a>.
                </span>
            </div>
        </div>
    );
}
