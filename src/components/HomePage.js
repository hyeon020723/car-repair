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

        <Link to="/result">
          <Button variant="secondary" size="lg" style={{ width: "100%" }}>
            result
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
