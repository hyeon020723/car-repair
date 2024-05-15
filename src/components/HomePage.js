import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Ensure this import is correct
import "slick-carousel/slick/slick.css"; // Ensure these imports are correct
import "slick-carousel/slick/slick-theme.css";

//nav
import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

//img
import mainImage from "../img/main_img.jpg";
import accidentImage from "../img/accident_img.jpg";

//btn
import Button from "react-bootstrap/Button";

function HomePage() {
  //이미지슬라이드 설정
  const settings = {
    dots: true,
    infinite: true, //순환
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="home-container"
      style={{ margin: "0", padding: "0", width: "100%", overflowX: "hidden" }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ justifyContent: "center" }}>
          <Navbar.Brand
            href="/"
            style={{
              color: "royalblue",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            차수리
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Slider {...settings} style={{ marginBottom: "40px" }}>
        <div>
          <img
            src={mainImage}
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
            alt="Main scene"
          />
        </div>
        <div>
          <img
            src={accidentImage}
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
            alt="Accident aftermath"
          />
        </div>
      </Slider>

      <div
        className="d-grid gap-2"
        style={{ justifyContent: "center", alignItems: "center" }}>
        <Link to="/upload-damage" className="button" style={{ width: "100%" }}>
          <Button variant="primary" size="lg" style={{ width: "100%" }}>
            견적내기
          </Button>
        </Link>

        <Link to="/find-center">
          <Button variant="secondary" size="lg" style={{ width: "100%" }}>
            수리센터찾기
          </Button>
        </Link>
      </div>

      <div
        style={{
          marginTop: "5vh",
          padding: "5vh",
          backgroundColor: "rgba(204, 204, 204, 0.25)",
          textAlign: "center",
          fontSize: "0.75em",
          display: "block",
          lineHeight: "1em",
        }}>
        <p style={{ lineHeight: "1.25em" }}>
          이 서비스는 AI 기술을 활용하여 차량의 파손 정도를 분석하고,
          <br />
          관련 데이터를 바탕으로 예상 수리비를 견적으로 제공합니다. <br />
          실제 수리비와는 차이가 있을 수 있으므로 참고용으로만 사용해 주시기
          바랍니다.
        </p>
        <p>&copy; 2024 차량 수리비 견적 서비스. All rights reserved</p>
        <p>국립부경대학교 시스템경영안전공학부 캡스톤디자인</p>
        <p>
          이메일 : <a href="mailto:dlga723@naver.com">dlga723@naver.com</a>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
