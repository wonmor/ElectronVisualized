/*
░█▀▀█ ░█─── ░█▀▀▀█ ░█▀▀█ ─█▀▀█ ░█─── ░█▀▀▀█ 
░█─▄▄ ░█─── ░█──░█ ░█▀▀▄ ░█▄▄█ ░█─── ─▀▀▀▄▄ 
░█▄▄█ ░█▄▄█ ░█▄▄▄█ ░█▄▄█ ░█─░█ ░█▄▄█ ░█▄▄▄█
*/

export const CANVAS = {
    WIDTH: "100vw",
    HEIGHT: "85vh"
};

export const RENDERER = {
    ATOM_RADIUS: "0.3",
    TUBE_RADIUS: "0.3",
}

export const normalizeData = (val, max, min) => {
    /*
    This function normalizes a given dataset within a certain range that is defined
  
    Parameters
    ----------
    val: Float
      A value that has to be normalized within a range
    max: Float
      The desired upper limit of the value
    min: Float
      The desired lower limit of the value
  
    Returns
    -------
    Float
      Returns a normalized float value contained within the boundary set
    */
  
    return (val - min) / (max - min);
  };

export const getMoleculeColour = (element, volume) => {
    /*
    Getting the molecule colour based upon the element name and the volume information
  
    Parameters
    ----------
    element: String
        Name of the element
    volume: Float
        Volume that correspond with each coordinate of the Canvas
  
    Returns
    -------
    String
        Contains the RGB information of the generated colour
    */
    switch (element) {
        case "H2":
            return `rgb(255, ${Math.round(
                    255.0 - volume * 2.5
                )}, ${Math.round(255.0 - volume * 2.5)})`;

        case "H2O":
            return `rgb(255, ${Math.round(Math.abs(volume)
                ) / 2}, ${Math.round(Math.abs(volume)) / 2})`;

        default:
            return `rgb(255, ${Math.round(
                255.0 - volume * 2.5
            )}, ${Math.round(255.0 - volume * 2.5)})`;
    }
}

export const getMoleculeOpacity = (element, volume) => {
    /*
    Getting the molecule opacity based upon the element name and the volume information
  
    Parameters
    ----------
    element: String
        Name of the element
    volume: Float
        Volume that correspond with each coordinate of the Canvas
  
    Returns
    -------
    String
        Contains the normalized value of the volume so that it can be used for the opacity
    */
    switch (element) {
        case "H2":
            return normalizeData(volume, 1, 0) / 50;

        case "H2O":
            return normalizeData(255 - Math.abs(volume) * 1.006, 1, -1);

        default:
            return normalizeData(volume, 1, 0) / 50;
    }
}

export const getCameraPosition = (element) => {
    /*
    Updating the camera position according to the element name
  
    Parameters
    ----------
    element: String
        Name of the element
  
    Returns
    -------
    Dictionary
        Contains the position values and the FOV of the camera
    */
    switch (element) {
        case "H":
            return { fov: 15, position: [-5, 8, 8] };

        case "H2":
            return { fov: 20, position: [-5, 8, 8] };

        case "H2O":
            return { fov: 55, position: [-5, 8, 8] };

        default:
            return { fov: 35, position: [-5, 8, 8] };
    }
}