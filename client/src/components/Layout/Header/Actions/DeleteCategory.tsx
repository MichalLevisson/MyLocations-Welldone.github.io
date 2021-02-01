import React from 'react'
import { ICategory } from '../../../../type'

import { Modal, Button } from 'react-bootstrap'

type Props = { 
  deleteCategory: (formData: ICategory | any) => void
  categoryToUpdate: ICategory
}

const DeleteCategory: React.FC<Props> = ({ deleteCategory, categoryToUpdate }) => {

  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  const DeleteModal = () => {
    return (
      <Modal
        show={deleteModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete category - {categoryToUpdate.name}
          </Modal.Title>
          Are you sure you want to delete this category ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setDeleteModalShow(false)}>Cancle</Button>
          <Button variant="success" onClick={() => deleteCategory(categoryToUpdate._id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Button variant='outline-success btn-action' onClick={() => setDeleteModalShow(true)}>
        Delete
      </Button>
      <DeleteModal />
     </>
  )
}
  
export default DeleteCategory;