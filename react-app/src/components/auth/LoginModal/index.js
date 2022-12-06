import { Modal } from '../../../context/Modal'
import React, { useState } from "react";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import "./index.css"

function LoginModal() {
  const [changePage, setChangePage] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        className="login-btn-splashpage"
        onClick={() => setShowModal(true)}>
        Sign In
      </button>
      {showModal && (
        <Modal onExit={() => setShowModal(false)}>
          {changePage ? (
            <LoginForm 
              exitModal={() => setShowModal(false)}
              changePage={() => setChangePage(!changePage)}
            />
          ) : (
            <SignUpForm
              exitModal={() => setShowModal(false)}
              changePage={() => setChangePage(!changePage)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default LoginModal;