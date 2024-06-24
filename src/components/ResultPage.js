import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const { response } = location.state || {};
  const yoloImage = response?.yolo_image;
  const unetImage = response?.unet_image;

  const [damageDetails, setDamageDetails] = useState([]);

  useEffect(() => {
    if (response && response.repair_info) {
      setDamageDetails(response.repair_info);
    }
  }, [response]);

  const formatCost = (cost) => {
    const parsedCost = parseFloat(cost);
    const roundedCost = Math.round(parsedCost / 1000) * 1000;
    return `${roundedCost.toLocaleString()}`;
  };

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
          width: "80%",
          margin: "10%",
          marginTop: "15vh",
          background: "#ccc",
        }}>
        {yoloImage ? (
          <img
            src={`data:image/jpeg;base64,${yoloImage}`}
            alt="YOLO Processed"
            style={{ width: "50%", height: "100%", objectFit: "scale-down" }}
          />
        ) : (
          <p>No YOLO image uploaded</p>
        )}

        {unetImage ? (
          <img
            src={`data:image/jpeg;base64,${unetImage}`}
            alt="UNet Processed"
            style={{ width: "50%", height: "100%", objectFit: "scale-down" }}
          />
        ) : (
          <p>No UNet image uploaded</p>
        )}
      </div>
      <div style={{ margin: "7.5vw" }}>
        <p style={{ textAlign: "center", fontSize: "0.75em" }}>
          공임비를 포함한 결과 값으로, 실제와 차이가 있을 수 있습니다.
        </p>
      </div>
      <div style={{ margin: "5vw 10vw" }}>
        <p style={{ color: "royalblue", float: "left" }}>예측 결과</p>

        <div style={{ textAlign: "right" }}>
          {damageDetails.map((item, index) => (
            <p key={index}>
              파손 위치 : {item.damage_location}
              <br />총 비용 : {formatCost(item.estimated_repair_cost)}원
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
