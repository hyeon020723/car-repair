import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carType, setCarType] = useState("");
  const [model, setModel] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("사진 파일을 선택해주세요.");
      return;
    }
    if (!carType || !model) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("car_type", carType);
    formData.append("car_model", model);

    for (let entry of formData.entries()) {
      console.log(entry[0] + ":", entry[1]);
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://3.35.126.206:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image upload successful:", data);
        navigate("/result", {
          state: { image: URL.createObjectURL(image), response: data },
        });
      } else {
        throw new Error(
          `Failed to upload image: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
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
        style={{ textAlign: "center", marginTop: "10vh", padding: "10vh" }}>
        <div style={{ width: "100%" }}>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            accept="image/*"
          />
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
        <div style={{ marginTop: "4vh" }}>
          <select
            name="car_type"
            style={{ width: "100%", padding: "2vh", margin: "1vh" }}
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            placeholder="Car Type"
            required>
            <option value="">차량 종류 선택</option>
            <option value="BMW">BMW</option>
            <option value="아우디">아우디</option>
            <option value="폭스바겐">폭스바겐</option>
            <option value="기아">기아</option>
            <option value="현대">현대</option>
          </select>

          <select
            name="car_model"
            style={{ width: "100%", padding: "2vh", margin: "1vh" }}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Car Model"
            required>
            <option value="">모델 선택</option>
            {carType === "BMW" && (
              <>
                <option value="3">3 시리즈</option>
                <option value="5">5 시리즈</option>
              </>
            )}
            {carType === "아우디" && (
              <>
                <option value="A4">A4</option>
                <option value="A6">A6</option>
              </>
            )}
            {carType === "폭스바겐" && (
              <>
                <option value="골프">골프</option>
              </>
            )}
            {carType === "기아" && (
              <>
                <option value="K3">K3</option>
                <option value="K5">K5</option>
              </>
            )}
            {carType === "현대" && (
              <>
                <option value="소나타LF">소나타 14 LF</option>
                <option value="그랜저HG15">그랜저 15 HG</option>
              </>
            )}
          </select>
        </div>
        {isLoading && <p>Loading...</p>}
        <Button
          variant={image && carType && model ? "primary" : "secondary"}
          size="lg"
          type="submit">
          견적 내기
        </Button>
      </form>
    </div>
  );
}

export default UploadPage;
