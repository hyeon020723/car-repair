import React, { useState } from "react";

//nav
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

function UploadPage() {
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
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Navbar.Brand
            href="/"
            style={{ color: "royalblue", fontWeight: "bold" }}>
            {"<"}
          </Navbar.Brand>
          <div style={{ textAlign: "center" }}>차량 파손 정보 등록</div>
          <div style={{ width: 24 }}></div>{" "}
        </Container>
      </Navbar>

      <form
        onSubmit={handleSubmit}
        style={{ height: "500px", textAlign: "center" }}>
        <div
          style={{
            width: "100%",
            lineHeight: "50px",
            padding: "50px",
          }}>
          <input type="file" onChange={handleFileChange} required />
          <p style={{ fontSize: "0.75em", whiteSpace: "nowrap" }}>
            손상된 부품이 잘 보이는 사진으로 한장만 업로드해주세요
          </p>
        </div>
        <button type="submit" disabled={!file}>
          견적 내기
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default UploadPage;
