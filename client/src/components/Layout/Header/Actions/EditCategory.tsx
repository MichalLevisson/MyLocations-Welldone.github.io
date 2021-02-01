import React, { useState } from 'react'
import { ICategory } from '../../../../type'
import { Modal, Button } from 'react-bootstrap'

type Props = { 
  editCategory: (formData: ICategory | any) => void
  categoryToUpdate: ICategory
}

const EditCategory: React.FC<Props> = ({ editCategory, categoryToUpdate }) => {

  const [formData, setFormData] = useState<ICategory | {}>()
  const [modalShow, setModalShow] = React.useState(false);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({ 
      name: e.currentTarget.value,
      _id: categoryToUpdate._id
    })
  }

  return (
    <>
      <Button variant='outline-success btn-action' onClick={() => setModalShow(true)}>
         Edit
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit category - {categoryToUpdate.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='Form' onSubmit={(e) => editCategory(formData)}>
            <div>
              <div>
                <label htmlFor='name'>Edit category name</label>
                <input onChange={handleForm} type='text' id='name' defaultValue={categoryToUpdate.name} />
              </div>
            </div>
            <button disabled={formData === undefined? true : false} className="btn btn-success">Update</button>
          </form>
          <button className="btn btn-outline-danger" onClick={(e) => setModalShow(false)}>Cancel</button>
        </Modal.Body>
      </Modal>
     </>
  )
}
  
export default EditCategory;