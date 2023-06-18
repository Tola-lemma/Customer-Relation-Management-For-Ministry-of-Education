import React from 'react'
const ModalButton = () => {
    
  return (
      <div>
      <button
      type="submit"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      className="btn btn-primary rounded-pill emailAccesbtn"
    >
      Check Status
    </button>
    </div>
  )
}

export default ModalButton