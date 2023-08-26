import React from "react";
import "./Home.css";
import logo from "/space-logo.png";
import { GoRocket } from "react-icons/go";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* video section */}
      <div className="home-video">
        <div className="overlay"></div>
        <video preload="true" playsInline autoPlay muted loop>
          <source
            src="https://technology.nasa.gov/sites/default/files/2022-08/WebsiteLoopingvideo3.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div
          className="d-flex align-items-center justify-content-center banner-heading"
          style={{ zIndex: "9999" }}
        >
          <img src={logo} alt="" style={{ width: "13%" }} />
          <p className="fs-1 text-light fw-bolder mb-0">
            Space<span className="text-danger">QUORA</span>
          </p>
        </div>

        <div className="banner-title">
          <p className="fw-bold">
            Created with the purpose of quenching your thirst for curiosity to
            know about space and beyond!
          </p>

          <HashLink smooth to="/#projects" className="text-decoration-none">
            <button className="btn">
              Explore{" "}
              <span className="ms-1">
                <GoRocket />
              </span>
            </button>
          </HashLink>
        </div>
      </div>

      {/* projects section */}
      <div id="projects" className="my-5">
        <h1 className="text-center fw-bold pt-5">
          Let's Explore <span className="text-danger">The World</span> with us
        </h1>

        <div className="project-container container my-5 pb-5">
          <div className="project-card">
            <img
              src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/10/15185655/climate-crisis-classes.jpg"
              alt=""
              className="project-img"
            />
            <h4 className="project-title">Climate Forecast</h4>

            <p className="mb-4 px-2 project-desc">
              Climate Forecast provides real-time weather data and also
              historic-upcoming climate data based on a place's coordinates.
            </p>

            <Link to={`/climate`} className="text-decoration-none">
              <button className="project-btn">
                <span className="me-1">Explore</span> <GoRocket />
              </button>
            </Link>
          </div>

          <div className="project-card">
            <img
              src="https://static.scientificamerican.com/sciam/cache/file/B850A8D8-ED55-4E14-9BED0D9DBC0626B4_source.jpg"
              alt=""
              className="project-img"
            />
            <h4 className="project-title">Track the ISS!</h4>

            <p className="mb-4 px-2 project-desc">
              International Space Station tracker is a tool that tracks the ISS
              live, orbiting the world and also shows it's path graphically.
            </p>

            <Link to={`/iss`} className="text-decoration-none">
              <button className="project-btn">
                <span className="me-1">Explore</span> <GoRocket />
              </button>
            </Link>
          </div>

          <div className="project-card">
            <img
              src="https://nypost.com/wp-content/uploads/sites/2/2022/05/lunar-eclipse-84.jpg"
              alt=""
              className="project-img"
            />
            <h4 className="project-title">APOD Viewer</h4>

            <p className="mb-4 px-2 project-desc">
              Astronomy Picture of The Day(APOD) is a picture that NASA provides
              every day based on the date. APOD Viewer is a tool that helps to
              exhibit the APOD picture daily and also provides various different
              functionalities.
            </p>

            <Link to={`/apod`} className="text-decoration-none">
              <button className="project-btn">
                <span className="me-1">Explore</span> <GoRocket />
              </button>
            </Link>
          </div>

          <div className="project-card">
            <img
              src="https://scx2.b-cdn.net/gfx/news/hires/2015/whatcanwedow.jpg"
              alt=""
              className="project-img"
            />
            <h4 className="project-title">3D Satellite Tracker</h4>

            <p className="mb-4 px-2 project-desc">
              3D Satellite Tracker is a tool that live tracks some earth
              orbiting satellites based on their coordinates and exhibits 10
              random satellites as 3D Objects around an Earth Globe. Also the
              globe can be moved 360deg by user.
            </p>

            <Link to={`/satellites`} className="text-decoration-none">
              <button className="project-btn">
                <span className="me-1">Explore</span> <GoRocket />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
