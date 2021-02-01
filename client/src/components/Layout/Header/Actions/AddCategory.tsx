import React, { useState } from 'react'
import { ICategory } from '../../../../type'

type Props = { 
  saveCategory: (e: React.FormEvent, formData: ICategory) => void 
}

const AddCategory: React.FC<Props> = ({ saveCategory }) => {

  const [formData, setFormData] = useState<ICategory | any>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSaveCategory = (e: React.FormEvent, formData: ICategory): void => {
    saveCategory(e, formData)
    setFormData({
      ...formData,
      name: "",
    })
  }

  const undefinedFormData = (formData === undefined|| formData.name === '')
  return (
    <form className='Form' onSubmit={(e) => {handleSaveCategory(e, formData)}}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' 
            value={undefinedFormData? "": formData.title}/>
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Category</button>
    </form>
  )
}
  
export default AddCategory;