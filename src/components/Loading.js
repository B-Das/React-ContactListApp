import React, { memo } from "react";
import { Spinner } from "react-bootstrap";

const Loading = memo(() => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        role="status"
        className="me-2"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="m-0">Loading contacts...</p>
    </div>
  );
});

export default Loading;
