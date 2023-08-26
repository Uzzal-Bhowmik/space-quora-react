import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function VerticalModal(props) {
  const { title, explanation, copyright, hdurl, url, date, media_type } =
    props.selectedItem;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bold fs-3"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a href={hdurl} target="_blank" rel="noreferrer">
          {media_type === "image" ? (
            <img
              src={url}
              alt="failed to load"
              className="modal-img"
              style={{
                width: "100%",
                height: "450px",
                margin: "10px auto",
                borderRadius: "10px",
              }}
              title="click to expand"
            />
          ) : (
            <iframe
              width="100%"
              height="450"
              src={url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </a>

        <div className="d-flex justify-content-between align-items-center px-2">
          <p className="fw-bold">Date: {date}</p>
          <p className="fw-bold fst-italic w-25">
            Copyright:{" "}
            <span className="text-primary">{copyright || "NASA"}</span>
          </p>
        </div>

        <h5 className="fw-semibold ps-2">Description:</h5>
        <p className="px-3">{explanation}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
