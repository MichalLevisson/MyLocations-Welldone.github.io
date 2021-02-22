import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { ICategory, ILocation, SystemState } from '../../../../store/types'
import { Modal, Button, Form } from 'react-bootstrap'
import { MDBInput , MDBBtn} from 'mdbreact';
import Geocode from 'react-geocode';

type Props = { 
  saveLocation: (e: React.FormEvent, formData: ILocation) => void 
}

const AddLocation: React.FC<Props> = ({ saveLocation }) => {

  const [formData, setFormData] = useState<ILocation | any>()
  const [addLocationModalShow, setAddLocationModalShow] = useState(false);  

  const getLatLngFromMap = (): void => {
    Geocode.fromAddress(formData.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setFormData({
          ...formData,
          lat: lat,
          lon: lng
        })
      },
      (error) => {
        console.error(error);
      }
    )
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSaveLocation = (e: React.FormEvent, formData: ILocation): void => {
    saveLocation(e, formData)
    setFormData({
      ...formData,
      name: '',
      address: '',
      lat: '',
      lon: ''
    })
    setAddLocationModalShow(false)
  }

  const setCategoryGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      category_id: Array.from(e.target.selectedOptions, (item) => item.value)
    })
  }

  const categoriesState: ICategory[] = useSelector(
    (state: SystemState) => state.categories,
    shallowEqual
  )

  const undefinedFormData = (formData === undefined || formData.name === '')
  return (
    <>
      <Button variant='outline-success' onClick={() => setAddLocationModalShow(true)}>
        Add
      </Button>
      <Modal
        show={addLocationModalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => {handleSaveLocation(e, formData)}}>
            <div className='form-group'>
              <MDBInput label='Enter Name' onChange={handleForm} id='name' 
                value={undefinedFormData? '': formData.name}/>
              <MDBInput label='Enter Address' onChange={handleForm} id='address' 
                value={undefinedFormData? '': formData.address}/>
              {formData && formData.address && <MDBBtn onClick={getLatLngFromMap}>Get coordinates from google map</MDBBtn>}
              <MDBInput label='Enter Latitude' type='number' onChange={handleForm} id='lat' 
                value={undefinedFormData? '': formData.lat}/>
              <MDBInput label='Enter Longitude' type='number' onChange={handleForm} id='lon' 
                value={undefinedFormData? '': formData.lon}/>
              <Form.Group>
                <Form.Label htmlFor='selectedCategory'>Select at least one category</Form.Label>
                <select multiple id='category_id' onChange={setCategoryGroup} className='form-control'>
                  {categoriesState.map( category => (
                      <option key={category._id} value={category._id} 
                        selected={ formData && formData.category_id === category._id }>
                          {category.name}
                      </option>
                  ))}
                </select>
              </Form.Group>
            </div>
            <button className='btn btn-outline-success' disabled={formData === undefined
              || (formData.category_id && formData.category_id.length === 0) ? true: false} >Add Location</button>
          </form>
          <button className='btn btn-outline-danger' onClick={(e) => setAddLocationModalShow(false)}>Cancel</button>
        </Modal.Body>
      </Modal>
    </>
  )
}
  
export default AddLocation;