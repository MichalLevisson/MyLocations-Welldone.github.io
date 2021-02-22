import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { ICategory, ILocation, SystemState } from '../../../../store/types'
import { Modal, Button, Form } from 'react-bootstrap'
import { MDBInput , MDBBtn} from 'mdbreact';
import Geocode from 'react-geocode';

type Props = { 
  editLocation: (e: React.FormEvent, formData: ILocation | any) => void
  locationToUpdate: ILocation
}

const EditLocation: React.FC<Props> = ({ editLocation, locationToUpdate }) => {

  const [formData, setFormData] = useState<ILocation | any>(locationToUpdate)
  const [editLocationModalShow, setEditLocationModalShow] = React.useState(false);

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
      (error) => {alert(error)
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
  
  const setCategoryGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      category_id: Array.from(e.target.selectedOptions, (item) => item.value)
    })
  }

  const handleEditLocation = (e: React.FormEvent, formData: ILocation): void => {
    editLocation(e, formData);
    setEditLocationModalShow(false)
  }

  const handleCancelUpdate = () => {
    setFormData({
      ...locationToUpdate
    })
    setEditLocationModalShow(false)
  }

  const categoriesState: ICategory[] = useSelector(
    (state: SystemState) => state.categories,
    shallowEqual
  )

  const undefinedFormData = (formData === undefined)
  return (
    <>
      <Button variant='outline-success' onClick={() => setEditLocationModalShow(true)}>
         Edit
      </Button>
      <Modal
        show={editLocationModalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit location - {locationToUpdate.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleEditLocation(e, formData)}>
            <div className='form-group'>
                <MDBInput label='Enter Name' onChange={handleForm} id='name' 
                  value={formData.name}/>
                <MDBInput label='Enter Address' onChange={handleForm} id='address' 
                  value={undefinedFormData? locationToUpdate.address: formData.address}/>
                {formData && formData.address && <MDBBtn onClick={getLatLngFromMap}>Get coordinates from google map</MDBBtn>}
                <MDBInput label='Enter Latitude' type='number' onChange={handleForm} id='lat' 
                  value={undefinedFormData? locationToUpdate.lat: formData.lat}/>
                <MDBInput label='Enter Longitude' type='number' onChange={handleForm} id='lon' 
                  value={undefinedFormData? locationToUpdate.lon: formData.lon}/>
                <Form.Group>
                  <Form.Label htmlFor='selectedCategory'>Select Category</Form.Label>
                  <select multiple id='category_id' onChange={setCategoryGroup} className='form-control'>
                    {categoriesState.map( category => (
                        <option key={category._id} value={category._id} 
                          selected={ undefinedFormData? locationToUpdate.category_id.indexOf(category._id) > -1 : 
                            formData && formData.category_id.indexOf(category._id) > -1 }>
                            {category.name}
                        </option>
                    ))}
                  </select>
                </Form.Group>
              </div>
            <button disabled={formData === undefined
              || (formData.category_id && formData.category_id.length === 0) ? true: false}
              className='btn btn-success'>Update</button>
          </form>
          <button className='btn btn-outline-danger' onClick={() => handleCancelUpdate()}>Cancel</button>
        </Modal.Body>
      </Modal>
     </>
  )
}
  
export default EditLocation;