import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { ICategory, ILocation, SystemState } from '../../../../store/types'
import { Modal, Button } from 'react-bootstrap'

type Props = {
  locationToUpdate: ILocation
}

const ViewLocation: React.FC<Props> = ({ locationToUpdate }) => {
  const categoriesState: ICategory[] = useSelector(
    (state: SystemState) => state.categories,
    shallowEqual
  )

  const [viewLocationModalShow, setViewLocationModalShow] = React.useState(false);
  
  const ViewModal = () => {
    return (
      <Modal
        show={viewLocationModalShow}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            <p>View location details</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name : {locationToUpdate.name}</p>
          <p>Address : {locationToUpdate.address}</p>
          <p>Latitude : {locationToUpdate.lat}</p>
          <p>Longitude : {locationToUpdate.lon}</p>
          <p>categories : </p>
          <ul>
            {
              locationToUpdate.category_id.map(category_id =>
                <li>{categoriesState.find(i => i._id === category_id)?.name}</li>
              )
            }
          </ul>
          <button className='btn btn-outline-success' onClick={(e) => setViewLocationModalShow(false)}>Close</button>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Button variant='outline-success' onClick={() => setViewLocationModalShow(true)}>
         View details
      </Button>
      <ViewModal />
     </>
  )
}
  
export default ViewLocation;