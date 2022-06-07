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
      <div className="bg-gray-700" style={{ "min-height": "200vh" }}>
        <div className="text-white text-center pt-10 pl-5 pr-5 mb-5 text-gray-400">
          <h1 className="pb-5 scale-90 sm:scale-100">
            <span className="text-white">Designed</span> and{" "}
            <span className="text-white">Manufactured</span>
            <br></br>
            by a fellow <span className="text-white">Earthling</span>.
          </h1>

          <h2 className="mt-5 p-5 leading-normal bg-gray-600 text-gray-400">
            <span className="text-6xl scale-75 sm:scale-100">
              With a <span className="text-white">Great Program</span> Comes
              With a <span className="text-white">Great Documentation</span>.
            </span>
            <br></br>A Brilliant, Elegant Interaction Between the{" "}
            <span className="text-white">User</span> and the{" "}
            <span className="text-white">Developer</span>.
            <p className="pt-10 pr-5 pl-5 text-rose-100 text-3xl">
              Table of Contents
            </p>
            <a
              href="#introduction"
              className="mt-5 sm:mt-0 ml-2 bg-transparent hover:bg-blue-500 text-rose-100 hover:text-white py-2 px-4 border border-rose-100 hover:border-transparent rounded"
            >
              Introduction
            </a>
            <p
              id="introduction"
              className="mt-10 pt-5 pr-5 pl-5 text-left text-3xl border-t border-gray-400"
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
            <p className="pt-10 pr-5 pl-5 text-left text-3xl">
              Life is Hard, and Solo Development is Equally as Hard.
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              Life is difficult. That's right. Life can throw some challenges
              that seemed to be indeterminate; that's also correct. But I
              believe that this is where our programming skills may apply, as a
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
              and back-end; back-end being the client side of the website or an
              app)
            </p>
            <p className="pt-5 pr-5 pl-5 text-left text-gray-400">
              To develop a computationally-rigour and physically-accurate
              core API, I had to come up with a solution where the
              performance is ensured but also the gap between real-life physics
              and the simulated environment isn't too large. GPAW and ASE were
              perfect candidates for the very foundation of the World Engine REST API that
              utilizes the famous <b>Density Functional Theory</b> in QM that
              massively simplifies the N-dimensional Schrödinger's Equation
              problem into something a lot more digestible and can be handled
              efficiently. The pure abstractness of these theories that involve
              atoms and molecules came to me as overwhelmingly complicated at
              first, but combining my AP Chemistry background as well as taking
              Physics in my school led me into mastering it in relatively a
              short time of period.
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
}
