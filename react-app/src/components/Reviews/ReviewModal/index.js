import { Modal } from '../../../context/Modal'
import React, { useState } from "react";
import CreateReviewForm from "../ReviewForm";
import "./index.css"

function ReviewModal() {
  // const [changePage, setChangePage] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className="login-btn-splashpage"
        onClick={() => setShowModal(true)}>
        Add Review
      </button>
      {showModal && (
        <Modal onExit={() => setShowModal(false)}>
            <CreateReviewForm 
              exitModal={() => setShowModal(false)}
            />
        </Modal>
      )}
    </>
  );
}

export default ReviewModal;