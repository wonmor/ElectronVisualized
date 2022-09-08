import React, { Background } from "./Geometries";
import MetaTag from "./MetaTag";
import { Mount } from "./Transitions";

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
    <>
      <MetaTag title={"ElectronVisualized"}
        description={"View Electron Density, Molecular and Atomic Orbitals"}
        keywords={"electron, electron density, chemistry, computational chemistry"}
        imgsrc={"cover.png"}
        url={"https://electronvisual.org"} />

      <div className="bg-gray-700 pb-5" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center sm:pt-10 pl-5 pr-5">
          <Mount content={<h1 className="sm:pb-5 scale-75 sm:scale-100">
            Search
          </h1>} show />

          <h2 className="mt-5 pl-5 pr-5 pt-5 leading-normal bg-gray-600 text-gray-400 rounded">
            <span className="text-5xl">
              With a <span className="text-white">Great Program</span> Comes
              With a{" "}
              <span className="text-white">
                Great{" "}
                <span className="text-rose-200">Documentation</span>
              </span>
              .
            </span>
          </h2>

          <h2 className="p-5 leading-normal bg-gray-600 text-gray-400 rounded">
            A Beautiful, Elegant Interaction Between the{" "}
            <span className="text-white">User</span> and the{" "}
            <span className="text-white">Developer</span>.
            <p className="pt-10 pb-3 pr-5 pl-5 text-rose-100 text-3xl">
              Table of Contents
            </p>
            <a
              href="#introduction"
              className="text-xl mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              Introduction
            </a>
            <br></br>
            <a
              href="https://github.com/wonmor/ElectronVisualized"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              <b>GitHub</b> Page
            </a>
            <br></br>
            <a
              href="https://github.com/wonmor/ElectronVisualized/blob/main/docs/John%20Seong%20-%20ICS3%20Project%20Scope%20Statement%20-%20ElectronVisualized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              Project Scope
            </a>
            <p
              id="introduction"
              className="mt-10 pt-5 pr-5 pl-5 text-left text-3xl border-t border-gray-400"
            >
              By the Lead Developer of ElectronVisualized.
            </p>
            <p className="pt-3 pr-5 pl-5 text-left text-white">
              <b>Who am I</b>? To properly introduce myself, my name is{" "}
              <b>John Seong</b>, and I am a <b>high school student</b> based in{" "}
              Oakville, Canada. I am deeply interested in pursuing my dream as a
              software engineer and the head of Human Interface Design at Apple
              Inc.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-white">
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

            <div class="p-5 grid grid-row-3 sm:grid-cols-3 gap-4">
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="john.jpg"
                alt="John"
              ></img>
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="john2.jpg"
                alt="John2"
              ></img>
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="john3.png"
                alt="John3"
              ></img>
            </div>

            <p className="font-bold pr-5 pl-5 text-left text-3xl">
              Life is Hard, and Solo Development is Equally as Hard.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-white">
              Life is difficult. That's right. Life can throw some challenges
              that seem to be indeterminate; that's also correct. But I believe
              that this is where our programming skills may apply, as a
              "developer," not merely someone who "codes." Believe or not, there
              is a difference between these two. The former being an universal
              problem solver that is able to deal with all kinds of conudrums in
              our daily lives, but the latter being an average Joe who just
              learned how to code.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-white">
              There were two hard-taught lessons from the development of this
              project. Being a solo developer of <b>ElectronVisualized</b>, the
              first great hurdle that shattered my ego into pieces was the
              sprawling nature of all kinds of different libraries — mainly
              Redux — a state management tool for the React front-end framework.
              (I will assume here that you know the difference between front-end
              and back-end; front-end being the client side of the website or an
              app)
            </p>
            <p className="p-5 text-left text-white border-b border-gray-400">
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
              <div className="p-2" />
              <i className="text-rose-200">Check out my <a href="https://johnseong.info" target="_blank" rel="noopener noreferrer"><span className="font-bold hover:underline">official blog</span></a> and <a href="https://github.com/wonmor" target="_blank" rel="noopener noreferrer"><span className="font-bold hover:underline">GitHub</span></a> page for more information</i>
            </p>
            <p className="p-5 text-left text-gray-400">
              Special Thanks to <b>Samar C.</b> for their Contribution by
              Providing Us With the Name: Project <b>Atomizer</b>.
            </p>
            <div class="grid grid-row-3 sm:grid-cols-3 gap-4">
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="Graphics.png"
                alt="Graphics"
              ></img>
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="Sketch1.jpg"
                alt="Sketch1"
              ></img>
              <img
                className="rounded"
                style={{ width: "500px" }}
                src="Sketch2.png"
                alt="Sketch2"
              ></img>
            </div>
          </h2>
        </div>
      </div>
      <Background />
    </>
  );
}
