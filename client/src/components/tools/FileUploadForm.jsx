import React, { useState } from 'react';
import { isElectron } from '../Globals';

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    fetch(`${isElectron() ? "https://electronvisual.org" : ""}/api/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black p-8">
      <h2 className='text-white mb-4'>
        Upload File to AWS S3
      </h2>
      {success && (
        <span className="bg-green-800 text-white px-2 py-1 mb-4 rounded-sm shadow-sm">
          File uploaded successfully!
        </span>
      )}
      <label className="block text-white mb-4">
        <input type="text" placeholder="Define file key" value={name} onChange={handleNameChange} className="bg-white text-black px-2 py-1 rounded-sm shadow-sm w-full" />
      </label>
      <label className="block text-white mb-4">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <div className="bg-white text-black px-2 py-1 rounded-sm shadow-sm w-full flex items-center justify-between">
          <span>{file ? file.name : "Choose a file..."}</span>
          <button type="button" onClick={() => setFile(null)}><span>Clear</span></button>
        </div>
      </label>
      <button type="submit" className="bg-white text-black px-4 py-2 rounded-sm shadow-sm hover:bg-gray-200"><span>Submit</span></button>
    </form>
  );
}

export default FileUploadForm;
