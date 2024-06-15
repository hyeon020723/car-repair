import React, { useState, useEffect } from "react";

//nav
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { flushSync } from "react-dom";
// import NavDropdown from "react-bootstrap/NavDropdown";

import { Map, MapMarker } from "react-kakao-maps-sdk";
// import useKakaoLoader from "./useKakaoLoader";

function FindCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy data for repair centers
  // const repairCenters = [
  //   { name: "Hyundai Motor Studio", address: "대연동, 부산" },
  //   { name: "Kia Service Center", address: "남천동, 부산" },
  //   { name: "Auto Repair Co.", address: "감만동, 부산" },
  // ];

  // const handleSearch = () => {
  //   if (!searchTerm) {
  //     setError("Please enter a search term");
  //     return;
  //   }
  //   setError("");
  //   setLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     const filteredCenters = repairCenters.filter((center) =>
  //       center.address.includes(searchTerm)
  //     );
  //     if (filteredCenters.length === 0) {
  //       setError("검색결과를 찾을 수 없습니다.");
  //     } else {
  //       setCenters(filteredCenters);
  //     }
  //     setLoading(false);
  //   }, 1000);
  // };

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  // const [sdkReady, setSdkReady] = useState(false);

  // Use Places service after confirming the SDK is ready
  useEffect(() => {
    if (!map) return;

    const places = new window.kakao.maps.services.Places();

    places.keywordSearch("부산 자동차 정비", (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // handle the data
        console.log(data);

        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address: data[i].address_name,
            phone: data[i].phone,
            place_url: data[i].place_url,
          });
          // @ts-ignore
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  }, [map]);

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
        level={10}
        onCreate={setMap}>
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}>
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>

      <div style={{ textAlign: "center", margin: "5vw" }}>
        {/* <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch}>Search</button> */}
        <p
          style={{
            lineHeight: "2em",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
            marginBottom: "5vw",
          }}>
          부산 지역을 중심으로 찾은 결과입니다. <br />
          센터마다 수리 가능 부품 및 운영 시간이 다르니 꼭 확인 후 방문해주세요!
        </p>{" "}
        <div style={{ textAlign: "center", width: "100%" }}>
          {markers.map((marker, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                textAlign: "left",
                float: "left",
                width: "100%",
                height: "20vw",
              }}>
              <strong style={{ textAlign: "center" }}>{marker.content}</strong>{" "}
              {}
              <a
                href={marker.place_url}
                target="_blank"
                rel="noopener noreferrer">
                <button
                  style={{
                    float: "right",
                    marginTop: "5vh",
                  }}>
                  자세히 보기
                </button>{" "}
                {}
              </a>
              <p style={{ margin: 0 }}>주소: {marker.address}</p> {}
              <p>전화: {marker.phone}</p> {}
            </div>
          ))}
        </div>
        {/* {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error === 0 && <p>잠시 후 다시 이용해주세요</p>}{" "}
        <ul>
          {centers.map((center, index) => (
            <li key={index}>
              <strong>{center.name}</strong>
              <p>{center.address}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default FindCenterPage;
