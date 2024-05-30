import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const [carCost] = useState(150000);
  const [personCost] = useState(100000);
  const [sumCost, setSumCost] = useState(carCost + personCost);

  const location = useLocation();
  const image = location.state?.image;

  // Ensure the response is available and parse the JSON body
  const { response } = location.state || {};
  let damageLocation = "No data";
  let estimatedRepairCost = "No data";
  if (response) {
    try {
      const responseBody = JSON.parse(response.body);
      damageLocation = responseBody.damage_location;
      estimatedRepairCost = responseBody.estimated_repair_cost;
    } catch (error) {
      console.error("Error parsing response body", error);
    }
  }

  useEffect(() => {
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
          margin: "5vw 10vw",
          background: "#ccc",
          overflow: "hidden",
        }}>
        {image ? (
          <img
            src={image}
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

      <div style={{ margin: "7.5vw" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.75em",
            whiteWhite: "nowrap",
          }}>
          실제 수리비와 차이가 있을 수 있습니다.
        </p>
        {/* <p style={{ color: "royalblue" }}>선택내역</p> */}
      </div>

      <div style={{ margin: "5vw 10vw" }}>
        <p style={{ color: "royalblue", float: "left" }}>예상 수리비</p>
        <div style={{ textAlign: "right" }}>
          <p>
            파손위치 {damageLocation}
            <br />
            수리비 {estimatedRepairCost}
          </p>
          <p>+ 공임비 150,000원</p>
          <p style={{ fontSize: "1.25em", fontWeight: "bold" }}>
            = 총 {sumCost.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
