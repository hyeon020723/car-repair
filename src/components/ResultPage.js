import React, { useState, useEffect } from "react"; // Import useEffect here
import { Container, Navbar } from "react-bootstrap"; // Slightly adjusted import for cleanliness
import { useLocation } from "react-router-dom"; // Import useLocation

function ResultPage() {
  const [carCost] = useState(150000);
  const [personCost] = useState(100000);
  const [sumCost, setSumCost] = useState(carCost + personCost); // Initialize directly with sum
  const location = useLocation(); // Use location to access the passed state
  const image = location.state?.image; // Access the image from the state

  useEffect(() => {
    // This useEffect will now only run when carCost or personCost changes
    setSumCost(carCost + personCost);
  }, [carCost, personCost]);

  return (
    <div className="result-container">
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
          <div style={{ textAlign: "center" }}>차량 파손 견적 결과</div>
          <div style={{ width: 24 }}></div>
        </Container>
      </Navbar>

      <div
        style={{
          height: "35vh",
          margin: " 5vw 10vw",
          background: "#ccc",
          overflow: "hidden",
        }}>
        {image ? (
          <img
            src={image} // Display the uploaded image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "scale-down",
            }}
            alt="Uploaded"
          />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>

      <div style={{ margin: "5vw 10vw" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.75em",
            whiteSpace: "nowrap",
          }}>
          실제 수리비와 차이가 있을 수 있습니다.
        </p>

        <p style={{ color: "royalblue" }}>선택내역</p>
      </div>

      <div style={{ margin: "5vw 10vw" }}>
        <p style={{ color: "royalblue" }}>예상 수리비</p>
        <div style={{ textAlign: "right" }}>
          <p>부품비 {carCost.toLocaleString()}원</p>
          <p>+ 공임비 {personCost.toLocaleString()}원</p>
          <p style={{ fontSize: "1.25em", fontWeight: "bold" }}>
            = 총 {sumCost.toLocaleString()}원
          </p>
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          margin: "5vw 0vw",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <button
          onClick={fileSend}
          style={{
            width: "50vw",
            padding: "1vw 2vw",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#ccc",
            color: "#fff",
          }}>
          파일 보내기
        </button>
      </div> */}
    </div>
  );
}

export default ResultPage;
