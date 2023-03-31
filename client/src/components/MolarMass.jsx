import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBackspace } from "@fortawesome/free-solid-svg-icons";

import elements from "../assets/elements.json";
import "./MolarMass.css";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 0) {
      const filtered = elements.filter(
        (element) =>
          element.symbol
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase()) ||
          element.name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase())
      );
      setFilteredElements(filtered);
    } else {
      setFilteredElements([]);
    }
  };

  const Calculator = ({ selectedElements }) => {
    const [result, setResult] = useState(null);

    const handleAdd = () => {
      if (selectedElements.length >= 2) {
        const totalMolarMass = selectedElements.reduce(
          (accumulator, element) => accumulator + element.molarMass,
          0
        );
        setResult(totalMolarMass);
      }
    };

    const handleClear = () => {
      setResult(null);
      setSelectedElements([]);
    };

    return (
      <>
        <div className="calculator">
          <button className="button" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="button equals-button" onClick={handleClear}>
            <FontAwesomeIcon icon={faBackspace} />
          </button>
        </div>

        {result && (
          <div className="result-container">
            <p className="result-text">Result: {result.toFixed(3)} g/mol</p>
          </div>
        )}
      </>
    );
  };

  const handleSelectElement = (element) => {
    setQuery(element.symbol);
    setSelectedElements([...selectedElements, element]);
    setFilteredElements([]);
  };

  const renderElement = (element) => (
    <div
      key={element.symbol}
      className="item"
      onClick={() => handleSelectElement(element)}
    >
      <p className="item-text">{element.symbol}</p>
      <p className="item-text">{element.name}</p>
      <p className="item-text">{element.molarMass} g/mol</p>
    </div>
  );

  return (
    <div className="container text-center">
      <h1 className="title-text text-5xl">Calculate</h1>
      <h2 className="text-gray-400 text-3xl">Molar Mass.</h2>
      <input
        className="input"
        type="text"
        placeholder="Search for an element..."
        onChange={handleInputChange}
        value={query}
      />
      <div className="list">
        {filteredElements.map((element) => renderElement(element))}
      </div>
      <button
        className="button calculator-button"
        onClick={() => setCalculatorVisible(!calculatorVisible)}
      >
        <i className="fas fa-calculator"></i>
        <span className="button-text">
          {calculatorVisible ? "Hide Calculator." : "Show Calculator."}
        </span>
      </button>
      {calculatorVisible && <Calculator selectedElements={selectedElements} />}
      {selectedElements.length > 0 && (
        <div className="selected-elements-container">
          <h2 className="title-text selected-elements-title">
            Selected Elements.
          </h2>
          {selectedElements.map((element) => (
            <div key={element.symbol} className="selected-element">
              <p className="selected-element-symbol">{element.symbol}</p>
              <p className="selected-element-name">{element.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MolarMass = () => {
  return (
    <div className="parent">
      <div className="container">
        <Autocomplete />
      </div>
    </div>
  );
};

export default MolarMass;
