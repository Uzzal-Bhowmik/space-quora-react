import React from "react";
import "./Home.css";
import globe from "../assets/globe.gif";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="text-center">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h1 className='mb-4 fw-bolder animate__animated animate__slideInDown animate__slower'>Let's Explore <span>The World</span> Together</h1>

                <Link to="/map">
                    <img src={globe} alt="rotating globe" className="rounded-4 globe animate__animated animate__zoomIn animate__slower" title="Click On The Globe To Explore!!!" />
                </Link>
            </div>
        </div>
    );
};

export default Home;