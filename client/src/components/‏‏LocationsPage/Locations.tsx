import React, { useEffect, useState } from 'react'
import { ILocation, ICategory } from '../../type'
import { setLocations, setLocationSelectedFlag, setLocationToUpdate } from '../../store/actions'
import { SystemState } from '../../store/types'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { ListGroup } from 'react-bootstrap'
import Header from '../Layout/Header/Header'
import Footer from '../Layout/Footer/Footer'
import LocationsActions from './components/LocationsActions'
import './Locations.css'

const LocationsPage: React.FC = () => {

  const [locationsFilteredByCategoryId, setLocationsFilteredByCategoryId] = useState<string>('0')
  const [locationsDisplayGroupedByCategory, setLocationsDisplayGroupedByCategory] = useState(false);

  const storageLocations = JSON.parse(localStorage.getItem('locations') || '0');

  useEffect(() => {
    storageLocations !== 0 &&  
      onSetLocations(storageLocations)
  }, [])

  const dispatch: Dispatch<any> = useDispatch()

  const onSetLocations = React.useCallback(
    (locations: ILocation[]) => dispatch(setLocations(locations)), [dispatch])

  const onSetLocationToUpdate = React.useCallback(
    (location: ILocation) => dispatch(setLocationToUpdate(location)), [dispatch])

  const onSetLocationSelectedFlag = React.useCallback(
    (isLocationSelected: boolean) => dispatch(setLocationSelectedFlag(isLocationSelected)), [dispatch])

  const locationsState: ILocation[] = useSelector(
    (state: SystemState) => [...state.locations])
  const categoriesState: ICategory[] = useSelector(
    (state: SystemState) => state.categories)
  const locationToUpdateState: ILocation = 
  useSelector((state: SystemState) => state.locationToUpdate)
  const locationSelectedFlagState: boolean = 
    useSelector((state: SystemState) => state.isLocationSelected)
    
  const handleSelectedLocation = (_id: string) => {
    const selectedLocation: ILocation | any = locationsState.find(location => location._id ===_id)
    if (selectedLocation === locationToUpdateState && locationSelectedFlagState) {
      onSetLocationSelectedFlag(false)
    } else {
      onSetLocationToUpdate(selectedLocation)
      onSetLocationSelectedFlag(true) 
    }
  }

  const handleSortA2Z = (): void => {
    const newLocationsState: ILocation[] = [...locationsState.sort((a, b) => a.name.localeCompare(b.name))]
    onSetLocations(newLocationsState)
  }

  const handleFilterByCategoryId = (category_id: string): void => {
    let selectedCategoryId: string = category_id
    setLocationsFilteredByCategoryId(selectedCategoryId);
  }

  const handleDisplayGroupedByCategory = (): void => {
    setLocationsDisplayGroupedByCategory(!locationsDisplayGroupedByCategory);
  }

  const renderLocationItem = (location: ILocation) => {
    return (
      <ListGroup.Item
        className='locationsListItem'
        onClick={() => handleSelectedLocation(location._id)}
        active={locationSelectedFlagState && locationToUpdateState._id === location._id}>
        {location.name}
      </ListGroup.Item>
    )
  }

  const renderLocationsdisplay = () => {
    if (locationsState.length)
    { return (<>
        <LocationsActions 
          sortA2Z={handleSortA2Z}
          filterByCategoryId={handleFilterByCategoryId}
          displayGroupedByCategoryAction={handleDisplayGroupedByCategory}
          displayGroupedByCategory={locationsDisplayGroupedByCategory}
          categoriesState={categoriesState} />
        { locationsFilteredByCategoryId === '0' && !locationsDisplayGroupedByCategory ?
            locationsState.map(location => renderLocationItem(location)) :
          locationsDisplayGroupedByCategory && locationsFilteredByCategoryId === '0' ?
            <div>
              {categoriesState.map(categoryState => <>
                <h6 className='categoryHeader'>{categoryState.name}</h6>
                {locationsState.map(location => 
                  location.category_id.find(categoryId => categoryId === categoryState._id) &&
                  renderLocationItem(location))}
              </>)}</div> 
          : <div>
              <h6 className='categoryHeader'>{categoriesState.find(category => category._id === locationsFilteredByCategoryId)?.name}</h6>
              {locationsState.map(location => 
                location.category_id.find(categoryId => categoryId === locationsFilteredByCategoryId) &&
                renderLocationItem(location))}
            </div> 
          }
      </>)
    } else if (categoriesState.length) {
      return (<h3>Seems like you dont have any locations saved yet... {<br></br>}
        Create locations using the add option at the header!
      </h3>)
    } else {
      return (<h3>Seems like you dont have any categories saved yet... {<br></br>}
        Create categories using the add option at the header on categories page! {<br></br>}
        Then you can create locations :)
      </h3>)
    }
  }

  return (
    <>
      <main className='App'>
        <Header title='Locations' page='locations'/>
        <ListGroup className='locationsList'>
          {renderLocationsdisplay()}
        </ListGroup>
      </main>
      <Footer />
    </>
  );
}

export default (LocationsPage);