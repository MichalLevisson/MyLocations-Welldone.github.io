import React, { useState } from 'react'
import { ICategory } from '../../../../type'
import { Modal, Button } from 'react-bootstrap'

type Props = { 
  saveCategory: (e: React.FormEvent, formData: ICategory) => void 
}

const AddCategory: React.FC<Props> = ({ saveCategory }) => {

  const [formData, setFormData] = useState<ICategory | any>()
  const [addModalShow, setAddModalShow] = React.useState(false);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSaveCategory = (e: React.FormEvent, formData: ICategory): void => {
    saveCategory(e, formData)
    setAddModalShow(false)
  }

  const undefinedFormData = (formData === undefined|| formData.name === '')
  return (
    <>
      <Button variant='outline-success' onClick={() => setAddModalShow(true)}>
        Add
      </Button>
      <Modal
        show={addModalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='Form' onSubmit={(e) => {handleSaveCategory(e, formData)}}>
            <div>
              <div>
                <label htmlFor='name'>Name</label>
                <input onChange={handleForm} type='text' id='name' 
                  value={undefinedFormData? '': formData.title}/>
              </div>
            </div>
            <button disabled={formData !== undefined && formData.name !== '' ? false: true} 
              className='btn btn-outline-success'>Add Category</button>
          </form>
          <button className='btn btn-outline-danger' onClick={(e) => setAddModalShow(false)}>Cancel</button>
        </Modal.Body>
      </Modal>
    </>
  )
}
  
export default AddCategory;