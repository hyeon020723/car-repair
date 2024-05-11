import React, { useState } from "react";

function UploadDamagePage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Add your logic to upload the file here
    setTimeout(() => {
      setIsLoading(false);
      alert("File uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="upload-container">
      <h2>Upload Damage Information</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={!file}>
          Submit
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default UploadDamagePage;
