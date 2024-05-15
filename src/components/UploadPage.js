import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure this is imported correctly

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Correctly initialized navigate

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result); // Store the image as a base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate a file upload
    setTimeout(() => {
      setIsLoading(false);
      alert("사진이 업로드 되었습니다.");
      navigate("/result", { state: { image: file } }); // Use navigate to redirect and pass state
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
          <div style={{ width: 24 }}></div>
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
        <Button
          variant={file ? "primary" : "secondary"}
          size="lg"
          type="submit"
          disabled={!file}>
          견적 내기
        </Button>
      </form>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default UploadPage;
