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
        <div className="text-white text-center sm:pt-10 pl-5 pr-5 text-gray-400">
          <h1 className="sm:pb-5 scale-75 sm:scale-100">
            <span className="text-white">Designed</span> and{" "}
            <span className="text-white">Manufactured</span>
            <br></br>
            by a fellow{" "}
            <span className="font-bold text-blue-200">Earthling</span>.
          </h1>

          <h2 className="mt-5 pl-5 pr-5 pt-5 leading-normal bg-gray-600 text-gray-400">
            <span className="text-5xl">
              With a <span className="text-white">Great Program</span> Comes
              With a{" "}
              <span className="text-white">
                Great{" "}
                <span className="font-bold text-rose-200">Documentation</span>
              </span>
              .
            </span>
          </h2>

          <h2 className="p-5 leading-normal bg-gray-600 text-gray-400">
            A Beautiful, Elegant Interaction Between the{" "}
            <span className="text-white">User</span> and the{" "}
            <span className="text-white">Developer</span>.
            <p className="font-bold pt-10 pb-3 pr-5 pl-5 text-rose-100 text-3xl">
              Table of Contents
            </p>
            <a
              href="#introduction"
              className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              Introduction
            </a>
            <br></br>
            <a
              href="https://github.com/wonmor/ElectronVisualized"
              className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              <b>GitHub</b> Page
            </a>
            <br></br>
            <a
              href="https://github.com/wonmor/ElectronVisualized/blob/main/docs/John%20Seong%20-%20ICS3%20Project%20Scope%20Statement%20-%20ElectronVisualized.pdf"
              className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              Project Scope
            </a>
            <p
              id="introduction"
              className="font-bold mt-10 pt-5 pr-5 pl-5 text-left text-3xl border-t border-gray-400"
            >
              Welcome to Earth.
            </p>
            <p className="pt-3 pr-5 pl-5 text-left text-gray-400">
              <b>Who am I</b>? To properly introduce myself, my name is{" "}
              <b>John Seong</b>, and I am a high school student based in
              Oakville, Canada. I am deeply interested in pursuing my dream as a
              software engineer and the head of Human Interface Design at Apple
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
            <p className="font-bold pt-10 pr-5 pl-5 text-left text-3xl">
              Life is Hard, and Solo Development is Equally as Hard.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              Life is difficult. That's right. Life can throw some challenges
              that seem to be indeterminate; that's also correct. But I believe
              that this is where our programming skills may apply, as a
              "developer," not merely someone who "codes." Believe or not, there
              is a difference between these two. The former being an universal
              problem solver that is able to deal with all kinds of conudrums in
              our daily lives, but the latter being an average Joe who just
              learned how to code.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              There were two hard-taught lessons from the development of this
              project. Being a solo developer of <b>ElectronVisualized</b>, the
              first great hurdle that shattered my ego into pieces was the
              sprawling nature of all kinds of different libraries — mainly
              Redux — a state management tool for the React front-end framework.
              (I will assume here that you know the difference between front-end
              and back-end; front-end being the client side of the website or an
              app)
            </p>
            <p className="p-5 text-left text-gray-400 border-b border-gray-400">
              To develop a computationally rigorous and physically accurate core
              API, I had to come up with a solution where the performance is
              ensured but also the gap between real-life physics and the
              simulated environment isn't too large. GPAW and ASE were perfect
              candidates for the very foundation of the <b>World Engine</b> REST
              API. They utilize the famous <b>Density Functional Theory</b>{" "}
              (DFT) and <b>Projector Augmented-wave</b> (PAW) method in QM that
              massively simplify the N-dimensional Schrödinger's Equation
              problem. The pure abstractness of these theories that involve
              complex undergrad, or even grad-level studies came to me as
              overwhelmingly complicated at first, but thanks to my AP Chemistry
              background as well as taking Physics in my school led me into
              grasping them in a relatively short time of period.
            </p>
            <p className="p-5 text-left text-gray-400">
              Special Thanks to <b>Samar C.</b> for their Contribution by
              Providing Us With the Name: Project <b>Atomizer</b>.
            </p>
            <div class="grid grid-row-3 sm:grid-cols-3 gap-4">
              <img
                style={{ width: "500px" }}
                src="Graphics.png"
                alt="Graphics"
              ></img>
              <img
                style={{ width: "500px" }}
                src="Sketch1.jpg"
                alt="Sketch1"
              ></img>
              <img
                style={{ width: "500px" }}
                src="Sketch2.png"
                alt="Sketch2"
              ></img>
            </div>
          </h2>
        </div>
      </div>
      <Background />
    </div>
  );
}
