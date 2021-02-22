import React from 'react'
import { ILocation } from '../../../../type'

import { Modal, Button } from 'react-bootstrap'

type Props = { 
  deleteLocation: (_id: string) => void
  locationToUpdate: ILocation
}

const DeleteLocation: React.FC<Props> = ({ deleteLocation, locationToUpdate }) => {

  const [deleteLocationModalShow, setDeleteLocationModalShow] = React.useState(false);

  const handleDeleteLocation = (_id: string): void => {
    setDeleteLocationModalShow(false)
    deleteLocation(_id)
  }  

  const DeleteModal = () => {
    return (
      <Modal
        show={deleteLocationModalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body>
          <Modal.Title id='contained-modal-title-vcenter'>
            Delete location - {locationToUpdate.name}
          </Modal.Title>
          Are you sure you want to delete this location ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-success' onClick={() => setDeleteLocationModalShow(false)}>Cancle</Button>
          <Button variant='success' onClick={() => handleDeleteLocation(locationToUpdate._id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Button variant='outline-success' onClick={() => setDeleteLocationModalShow(true)}>
        Delete
      </Button>
      <DeleteModal />
     </>
  )
}
  
export default DeleteLocation;