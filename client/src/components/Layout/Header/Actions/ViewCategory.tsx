import React, { useState } from 'react'
import { ICategory } from '../../../../type'
import { Modal, Button } from 'react-bootstrap'

type Props = {
  categoryToUpdate: ICategory
}

const ViewCategory: React.FC<Props> = ({ categoryToUpdate }) => {

  const [viewModalShow, setViewModalShow] = React.useState(false);

  const ViewModal = () => {
    return (
      <Modal
        show={viewModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <p>View category details</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name : {categoryToUpdate.name}</p>
          <button className="btn btn-outline-success" onClick={(e) => setViewModalShow(false)}>Close</button>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Button variant='outline-success' onClick={() => setViewModalShow(true)}>
         View details
      </Button>
      <ViewModal />
     </>
  )
}
  
export default ViewCategory;