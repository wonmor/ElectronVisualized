import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { isElectron } from './Globals';
import './Diagram.css';

function Diagram(props) {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchImage();
    }, []);
  
    function fetchImage() {
      setIsLoading(true);
      axios({
        url: `${isElectron() ? "https://electronvisual.org" : ""}/api/downloadPNG/${props.name}`,
        responseType: 'blob'
      })
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageUrl(imageUrl);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  
    if (isLoading) {
      return <></>;
    }
    
    if (error) {
      return <span className="text-rose-400 m-5">Error: {error}</span>;
    }
    return (
      <div className="image-container ml-10 mr-10 md:ml-40 md:mr-40 rounded">
        <LazyLoadImage
          effect="blur"
          src={imageUrl}
          alt="Energy Diagram"
          className="scaled-image"
        />
      </div>
    );
  }
  
export default Diagram;