import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carType, setCarType] = useState("");
  const [model, setModel] = useState("");
  const navigate = useNavigate(); // Ensure this line is not deleted or altered incorrectly

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("사진 파일을 선택해주세요.");
      return;
    }
    if (!carType || !model) {
      alert("모든 내용을 입력해주세요.");
      return;
    }
    const requestData = {
      car_type: carType, // Assuming 'carType' is a string e.g., "Hyundai"
      model: model, // Assuming 'model' is a string e.g., "2020"
    };

    console.log("Sending data:", requestData);

    setIsLoading(true);
    fetch(
      "https://pxuefku0cb.execute-api.ap-northeast-2.amazonaws.com/default",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "8CyDGFGBo70VXBUbpSzU3tiCm5u69sR3GaeZ3xXg",
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setIsLoading(false);
        alert("내용이 전송되었습니다.");
        navigate("/result", { state: { image: file, response: data } });
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        alert("다시 시도해주세요.");
      });
  };
  /* eslint-enable no-unused-vars */
  //eslint-disable-line no-unused-vars
  const requestData = {
    car_type: carType, // Assuming 'carType' is a string e.g., "Hyundai"
    model: model, // Assuming 'model' is a string e.g., "2020"
  };
  /* eslint-enable no-unused-vars */

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
        style={{ textAlign: "center", padding: "10vh" }}>
        <div
          style={{
            width: "100%",
          }}>
          <input type="file" onChange={handleFileChange} required />

          <p
            style={{
              paddingTop: "2vh",
              fontSize: "0.75em",
              whiteSpace: "break-spaces",
              display: "block",
            }}>
            손상된 부품이 잘 보이는 사진으로 <br />
            한장만 업로드해주세요
          </p>
        </div>
        <div style={{ height: "30vh" }}>
          <p style={{ float: "left", fontSize: "1em", whiteSpace: "nowrap" }}>
            차량 정보 선택
          </p>
          <div id="selectbox" style={{ float: "right" }}>
            <select
              style={{
                display: "block",
                width: "100%",
                padding: "1vh",
                margin: "1vh",
              }}
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              required>
              <option value="">Select Car Type</option>
              <option value="Hyundai">Hyundai Sonata</option>
              <option value="Kia">Kia Sorento</option>
              <option value="Chevrolet">Chevrolet Spark</option>
            </select>

            <select
              style={{
                display: "block",
                width: "100%",
                padding: "1vh",
                margin: "1vh",
              }}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required>
              <option value="">Select Model</option>
              <option value="Sonata">2020</option>
              <option value="Sorento">2021</option>
              <option value="Spark">2022</option>
            </select>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        <Button
          variant={file && carType && model ? "primary" : "secondary"}
          size="lg"
          type="submit">
          견적 내기
        </Button>
      </form>
    </div>
  );
}

export default UploadPage;
