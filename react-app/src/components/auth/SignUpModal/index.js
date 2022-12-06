import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import "./index.css";

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);
  const [changePage, setChangePage] = useState(true);

  return (
    <>
      <button
        className="signup-btn-splashpage"
        onClick={() => setShowModal(true)} 
      >
        Start your journey
      </button>
      {showModal && (
        <Modal onExit={() => setShowModal(false)}>
          {changePage ? (
            <SignUpForm
              exitModal={() => setShowModal(false)}
              changePage={() => setChangePage(!changePage)}
            />
          ) : (
            <LoginForm
              exitModal={() => setShowModal(false)}
              changePage={() => setChangePage(!changePage)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;