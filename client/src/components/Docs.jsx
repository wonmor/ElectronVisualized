import Dropdown from "./Dropdown";

/*
░█████╗░██████╗░██╗  ██████╗░░█████╗░░██████╗░███████╗
██╔══██╗██╔══██╗██║  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
███████║██████╔╝██║  ██████╔╝███████║██║░░██╗░█████╗░░
██╔══██║██╔═══╝░██║  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
██║░░██║██║░░░░░██║  ██║░░░░░██║░░██║╚██████╔╝███████╗
╚═╝░░╚═╝╚═╝░░░░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝
*/

export default function Developer() {
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
      <div className="bg-gray-700" style={{ "min-height": "200vh" }}>
        <div className="text-white text-center pt-10 pl-5 pr-5 text-gray-400">
          <h1 className="pb-5">
            <span className="text-white">Designed</span> and{" "}
            <span className="text-white">Manufactured</span>
            <br></br>
            by a fellow <span className="text-white">Earthling</span>.
          </h1>

          <h2 className="mt-5 p-5 leading-normal bg-gray-600 text-gray-400">
            <span className="text-6xl">
              With a <span className="text-white">Great Program</span> Comes
              With a <span className="text-white">Great Documentation</span>.
            </span>
            <br></br>A <span className="text-white">Beautiful</span>,{" "}
            <span className="text-white">Elegant</span> Interaction Between the{" "}
            <span className="text-white">User</span> and the{" "}
            <span className="text-white">Developer</span>.
            <p className="pt-10 pr-5 pl-5 text-left text-3xl">Welcome to Earth.</p>
            <p className="pt-3 pr-5 pl-5 text-left text-gray-400">
              <b>Who am I</b>? To properly introduce myself, my name is{" "}
              <b>John Seong</b>, and I am a high school student based in
              Oakville, Canada. I am deeply interested in pursuing my dream as a
              software engineer and a head of Human Interface Design at Apple
              Inc.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              Building this website called <b>ElectronVisualized</b> from
              scratch has truly been an unique and a life-changing experience,
              leading me to this point where I see one object and see lines of
              codes that are needed to procedurely render it. There were
              numerous instances where I thought something was impossible — of
              course — but I managed to perservere through my deep-rooted desire
              to self-actualize. It was to become a person that sees the beauty
              even in seemingly chaotic moments. It was by creating this magic
              app that really shows my skilled background as someone who
              typically ponders the question of order and disorder.
            </p>
            <p className="pt-10 pr-5 pl-5 text-left text-3xl">Life is Hard, Babe. No Joke.</p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              Life is difficult. That's right. Life can throw some challenges that seemed to be indeterminate; that's also correct. But I believe that this is where our programming skills may apply, as a "developer," not merely someone who "codes." Believe or not, there is a difference between these two.
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
}
