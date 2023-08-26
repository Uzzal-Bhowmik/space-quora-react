import React, { useEffect, useState } from "react";
import "./Apod.css";
import Spinner from "react-bootstrap/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { VerticalModal } from "./VerticalModal";
import { Button, Form } from "react-bootstrap";
import { TfiReload } from "react-icons/tfi";
import { RiSearchLine } from "react-icons/ri";

const Apod = () => {
  // loading state
  const [todayDataLoading, setTodayDataLoading] = useState(true);
  const [randomDataLoading, setRandomDataLoading] = useState(true);

  // today apod data --------------------------------------------
  const [apodToday, setApodToday] = useState({});
  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=NXUfHmzMVKOk9ooRu0Ar7bjPPUCsNFVkpg2EMhch"
    )
      .then((res) => res.json())
      .then((data) => {
        setApodToday(data);
        setTodayDataLoading(false);
      });
  }, []);

  // fetch searched apod data
  const [searchError, setSearchError] = useState("");
  const handleSearchAPOD = (e) => {
    e.preventDefault();
    setTodayDataLoading(true);
    const searchText = e.target.apodSearchText.value;

    try {
      const apiKey = "NXUfHmzMVKOk9ooRu0Ar7bjPPUCsNFVkpg2EMhch";
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${searchText}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.msg) {
            setSearchError(data?.msg);
            setTodayDataLoading(false);
            return;
          }
          setSearchError("");
          setApodToday(data);
          setTodayDataLoading(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const { date, explanation, title, url, hdurl, media_type } = apodToday;

  // random apods ---------------------------------------------
  const [randomAPODData, setRandomAPODData] = useState([]);

  // Function to fetch random APOD data
  const fetchRandomAPOD = async () => {
    setRandomDataLoading(true);
    try {
      const apiKey = "NXUfHmzMVKOk9ooRu0Ar7bjPPUCsNFVkpg2EMhch";
      const randomDates = generateRandomDates(10);
      const randomAPODDataPromises = randomDates.map(async (date) => {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        );
        const data = await response.json();
        return data;
      });

      const randomAPODResults = await Promise.all(randomAPODDataPromises);
      setRandomAPODData(randomAPODResults);
      setRandomDataLoading(false);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    }
  };

  // Function to generate random dates within a range --------------------
  const generateRandomDates = (count) => {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < count; i++) {
      const randomDate = new Date(
        currentDate -
          Math.floor(Math.random() * (365 * 10) * 24 * 60 * 60 * 1000)
      );
      const formattedDate = `${randomDate.getFullYear()}-${String(
        randomDate.getMonth() + 1
      ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
      dates.push(formattedDate);
    }
    return dates;
  };

  useEffect(() => {
    fetchRandomAPOD();
  }, []);

  // modal popup ----------------------------
  const [modalShow, setModalShow] = React.useState(false);
  const [modalId, setModalId] = useState(null);

  const handleModal = (id) => {
    setModalId(id);
    setModalShow(true);
  };

  const [selectedItem, setSelectedItem] = useState({});
  useEffect(() => {
    const findItem = randomAPODData.find((data) => data.date === modalId);
    setSelectedItem(findItem);
  }, [modalId]);

  return (
    <div className="apod">
      <div>
        {/*------------------- today apod ---------------------- */}
        <div className="today">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="apod-title fancy-apod-title">
              The Astronomy Picture of the Day
            </h1>

            <Form className="d-flex apod-search" onSubmit={handleSearchAPOD}>
              <Form.Control
                type="search"
                className="me-2"
                aria-label="Search"
                placeholder="Search any date (e.g. 2020-7-10)"
                name="apodSearchText"
              />

              <Button variant="outline-light" type="submit">
                <RiSearchLine id="apod-search-icon" />
              </Button>

              <div className="error-text">
                <p className="m-0 fw-bolder text-danger fs-5">{searchError}</p>
              </div>
            </Form>
          </div>

          <div className="title-img">
            <h3>{title}</h3>
            {todayDataLoading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              <>
                {media_type == "image" ? (
                  <a href={hdurl} target="_blank" rel="noreferrer">
                    <img
                      src={url}
                      alt="failed to load"
                      title="click to expand"
                      className="img-thumbnail"
                      style={{
                        width: "700px",
                        marginTop: "12px",
                        transition: "all .3s ease-out",
                      }}
                    />
                  </a>
                ) : (
                  <iframe
                    width="800"
                    height="470"
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                )}
              </>
            )}
          </div>

          <p className="fw-semibold fs-6 mb-3">Date: {date}</p>
          <p className="fw-bolder fs-3">Description:</p>
          <p className="fs-5 lh-lg px-4">{explanation}</p>
        </div>

        {/*-------------- random apods --------------- */}
        <div className="random-apods">
          <div className="d-flex align-items-center justify-content-between border border-2 rounded border-warning px-2 mx-3">
            <h1 className="random-apod-title fancy2">
              Check out More Interesting APODs
            </h1>

            <Button
              variant="warning"
              style={{
                width: "180px",
                marginRight: "20px",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
              onClick={fetchRandomAPOD}
            >
              <TfiReload className="mb-1 me-1" /> Load More..
            </Button>
          </div>

          <div className="swiper-con">
            {randomDataLoading ? (
              <div className="py-4 w-75 mx-auto" style={{ height: "500px" }}>
                <Spinner
                  variant="warning"
                  animation="border"
                  className="d-block mx-auto mt-5"
                />
              </div>
            ) : (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                spaceBetween={20}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {randomAPODData?.map((randomApod) => (
                  <SwiperSlide
                    key={randomApod.url}
                    className="random-apod-card"
                  >
                    <div className="px-3">
                      <p className="mt-2 fw-semibold">{randomApod.date}</p>
                      <h4 className="fw-bolder fs-4">{randomApod.title}</h4>
                      <p>{randomApod.explanation?.slice(0, 300)} ...</p>
                    </div>

                    {/* modal */}
                    <div>
                      <Button
                        className="d-block mx-auto see-details-btn"
                        variant="primary"
                        onClick={() => handleModal(randomApod.date)}
                      >
                        See Details
                      </Button>
                    </div>

                    {randomApod?.media_type === "image" ? (
                      <img
                        src={randomApod?.url}
                        alt="failed to load"
                        style={{
                          width: "95%",
                          height: "250px",
                          display: "block",
                          margin: "13px auto",
                          borderRadius: "10px",
                          transition: "all .3s",
                        }}
                        className="random-apod-img"
                      />
                    ) : (
                      <iframe
                        width="95%"
                        height="250"
                        src={randomApod?.url}
                        style={{
                          display: "block",
                          margin: "13px auto",
                          borderRadius: "10px",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <VerticalModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              selectedItem={selectedItem != undefined && selectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apod;
