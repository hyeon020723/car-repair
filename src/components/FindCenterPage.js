import React, { useState } from "react";

//nav
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

import { Map } from "react-kakao-maps-sdk";
// import useKakaoLoader from "./useKakaoLoader";

function FindCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy data for repair centers
  const repairCenters = [
    { name: "Hyundai Motor Studio", address: "대연동, 부산" },
    { name: "Kia Service Center", address: "남천동, 부산" },
    { name: "Auto Repair Co.", address: "감만동, 부산" },
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const filteredCenters = repairCenters.filter((center) =>
        center.address.includes(searchTerm)
      );
      if (filteredCenters.length === 0) {
        setError("검색결과를 찾을 수 없습니다.");
      } else {
        setCenters(filteredCenters);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="find-center-container">
      {/* navbar */}
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
          <div style={{ textAlign: "center" }}>차량 수리 센터 찾기</div>
          <div style={{ width: 24 }}></div>{" "}
        </Container>
      </Navbar>
      <Map
        id="map"
        center={{
          // 기본 부경대 대연캠퍼스 좌표
          lat: 35.13399144993564,
          lng: 129.10554278982033,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "250px",
        }}
        level={6}
      />

      <div style={{ textAlign: "center", margin: "10vw" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch}>Search</button>
        <p
          style={{
            lineHeight: "2em",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}>
          ㅇㅇ동(읍/면/리)명으로 검색해주세요. <br />
          센터마다 수리 가능 부품 및 운영 시간이 다르니 꼭 확인 후 방문해주세요!
        </p>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error === 0 && <p>잠시 후 다시 이용해주세요</p>}{" "}
        <ul>
          {centers.map((center, index) => (
            <li key={index}>
              <strong>{center.name}</strong>
              <p>{center.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FindCenterPage;
