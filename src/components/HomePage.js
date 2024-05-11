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
    <div className="home-container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            href="#home"
            style={{ color: "royalblue", fontWeight: "bold" }}>
            차수리
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse> */}
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

        <Link to="/quote">
          <Button variant="secondary" size="lg" style={{ width: "100%" }}>
            quote
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
