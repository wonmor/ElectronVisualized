import "./Table.css";

export default function Table() {
  return (
    <div>
      <div className="bg-gray-700" style={{ "min-height": "100vh" }}>
        <div className="text-white text-center pt-10 text-gray-400">
          <h1 className="leading-tight">
            Oops, <span className="text-white">404</span> Error.
          </h1>
          <h2 className="mt-5 pb-5 text-gray-400 border-b border-gray-400">
            Sorry bud, page not found.
          </h2>
          <p className="pt-5 text-gray-400">
            Kindly consider <b>redirecting</b> to the main website.
          </p>
          <img
            className="scale-75 m-auto"
            src="https://pngimg.com/uploads/dog/dog_PNG50371.png"
            alt="dog_image"
          ></img>
        </div>
      </div>
    </div>
  );
}
