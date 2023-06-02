import React, { useState, useEffect } from "react";
import { isElectron } from "../Globals";
import LazyLoad from "react-lazyload";

export default function Blog() {
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

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${isElectron() ? "https://electronvisual.org" : ""}/api/get-articles`)
      .then((response) => response.json())
      .then((data) => setArticles(Object.values(data))) // Convert dictionary values to an array
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ minWidth: "-webkit-fill-available", overflow: "auto" }}>
      <div className="pb-20 mx-5 overflow-auto" style={{ height: "100vh" }}>
        <div className="mx-5 mb-10 text-white text-center sm:pt-10 text-gray-400">
          <h1 className="scale-75 font-thin sm:scale-90 text-gray-400">
            <span className="font-thin text-rose-200">Articles</span>.
          </h1>

          <p className="p-5 text-gray-400">Start Reading our Latest Issues</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {articles.map((article, index) => (
            <LazyLoad height={400} once>
              <div
                className="relative bg-black px-4 overflow-hidden shadow rounded-lg text-white"
                style={{
                  height: "400px", // Set the height to the desired value
                }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
                  <h3 className="text-lg leading-6 font-medium z-40">
                    {article.subtitle}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl text-center m-5 font-thin z-40">
                      {article.title}
                    </span>
                  </div>
                  <button
                    onClick={() => {}}
                    className="z-40 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
                  >
                    <span>Explore</span>
                  </button>
                </div>
                <img
                  className="absolute top-0 left-0 right-0 bottom-0 object-contain object-center w-full h-full"
                  src={article.imageUrl}
                  alt={article.title}
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  );
}
