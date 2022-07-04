import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ setShowModal, modelHtml }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>
        <div dangerouslySetInnerHTML={{__html: modelHtml}} />

            This is a Modal {modelHtml}</h2>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};