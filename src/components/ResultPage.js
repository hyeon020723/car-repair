import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const { response } = location.state || {};
  const image = response?.yolo_image;

  const [damageDetails, setDamageDetails] = useState([]);

  useEffect(() => {
    if (response && response.repair_info) {
      setDamageDetails(response.repair_info);
    }
  }, [response]);

  return (
    <div className="result-container">
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
          <div style={{ textAlign: "center" }}>차량 파손 견적 결과</div>
          <div style={{ width: 24 }}></div>
        </Container>
      </Navbar>

      <div
        style={{
          height: "35vh",
          margin: "10vh",
          marginTop: "15vh",
          background: "#ccc",
          overflow: "hidden",
        }}>
        {image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
          />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>

      <div style={{ margin: "7.5vw" }}>
        <p style={{ textAlign: "center", fontSize: "0.75em" }}>
          공임비를 포함한 결과값입니다.
          <br />
          실제 수리비와 차이가 있을 수 있습니다.
        </p>
      </div>

      <div style={{ margin: "5vw 10vw" }}>
        <p style={{ color: "royalblue", float: "left" }}>예상 수리비</p>
        <div style={{ textAlign: "right" }}>
          {damageDetails.map((item, index) => (
            <p key={index}>
              파손위치: {item.damage_location}
              <br />총 {item.estimated_repair_cost}원
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
