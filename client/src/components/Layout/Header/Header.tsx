import React from 'react'
import { ICategory } from '../../../type'
import { setCategories, setCategorySelectedFlag, setLocations, setLocationSelectedFlag } from '../../../store/actions'
import { ILocation, SystemState } from '../../../store/types'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import AddCategory from './CategoryActions/AddCategory'
import EditCategory from './CategoryActions/EditCategory'
import DeleteCategory from './CategoryActions/DeleteCategory'
import ViewCategory from './CategoryActions/ViewCategory'
import AddLocation from './LocationActions/AddLocation'
import DeleteLocation from './LocationActions/DeleteLocation'
import EditLocation from './LocationActions/EditLocation'
import ViewLocation from './LocationActions/ViewLocation'
import ViewLocationOnGoogleMaps from './LocationActions/ViewLocationOnGoogleMaps'
import Geocode from 'react-geocode';

type Props = {
  title: string
  page?: string
}

const Header: React.FC<Props> = ({ title, page }) => {

  const dispatch: Dispatch<any> = useDispatch()

  const onSetCategories = React.useCallback(
    (categories: ICategory[]) => dispatch(setCategories(categories)),
    [dispatch]
  )

  const onSetCategorySelectedFlag = React.useCallback(
    (isCategorySelected: boolean) => dispatch(setCategorySelectedFlag(isCategorySelected)),
    [dispatch]
  )

  const categoriesState: ICategory[] = useSelector(
    (state: SystemState) => state.categories,
    shallowEqual
  )

  const handleSaveCategory = (e: React.FormEvent, formData: ICategory): void => {
    e.preventDefault();
    formData._id = Date.now().toString();
    const newCategoriesState: ICategory[] = categoriesState.concat(formData);
    onSetCategories(newCategoriesState)
    localStorage.setItem(formData._id, formData.name)
  }

  const handleDeleteCategory = (_id: string): void => {
    localStorage.removeItem(_id)
    const newCategoriesState: ICategory[] = categoriesState.filter(category => category._id !== _id);
    onSetCategories(newCategoriesState)
    onSetCategorySelectedFlag(false)
  }

  const handleEditCategory = (newCategory: ICategory): void => {
    localStorage.setItem(newCategory._id, newCategory.name)
    let newCategoriesState: ICategory[] = categoriesState;
    newCategoriesState[newCategoriesState.findIndex(category => category._id === newCategory._id)] = newCategory;
    onSetCategories(newCategoriesState)
    onSetCategorySelectedFlag(false)
  }

  const categoryToUpdate: ICategory = useSelector(
    (state: SystemState) => state.categoryToUpdate,
    shallowEqual
  )

  const isCategorySelected: boolean = useSelector(
    (state: SystemState) => state.isCategorySelected,
    shallowEqual
  )

  const onSetLocations = React.useCallback(
    (locations: ILocation[]) => dispatch(setLocations(locations)),
    [dispatch]
  )

  const onSetLocationSelectedFlag = React.useCallback(
    (isLocationSelected: boolean) => dispatch(setLocationSelectedFlag(isLocationSelected)),
    [dispatch]
  )

  const locationsState: ILocation[] = useSelector(
    (state: SystemState) => state.locations,
    shallowEqual
  )

  const handleSaveLocation = (e: React.FormEvent, formData: ILocation): void => {
    e.preventDefault();
    formData._id = Date.now().toString();
    const newLocationsState: ILocation[] = locationsState.concat(formData);
    onSetLocations(newLocationsState)
    localStorage.setItem(formData._id, formData.name)
  }

  const handleDeleteLocation = (_id: string): void => {
    localStorage.removeItem(_id)
    const newLocationsState: ILocation[] = locationsState.filter(location => location._id !== _id);
    onSetLocations(newLocationsState)
    onSetLocationSelectedFlag(false)
  }

  const handleEditLocation = (e: React.FormEvent, newLocation: ILocation): void => {
    e.preventDefault();
    localStorage.setItem(newLocation._id, newLocation.name)
    let newLocationsState: ILocation[] = locationsState;
    newLocationsState[newLocationsState.findIndex(location => location._id === newLocation._id)] = newLocation;
    onSetLocations(newLocationsState)
    onSetLocationSelectedFlag(false)
  }

  const locationToUpdate: ILocation = useSelector(
    (state: SystemState) => state.locationToUpdate,
    shallowEqual
  )

  const isLocationSelected: boolean = useSelector(
    (state: SystemState) => state.isLocationSelected,
    shallowEqual
  )

  const handleViewOnMap = (): void => {
    window.open('https://maps.google.com?q='+ locationToUpdate.lat +','+ locationToUpdate.lon );
  }

  Geocode.setApiKey('AIzaSyBSZyeaKK7Y3zhWsGn7MlKlq-S82NjM9FY');
  Geocode.setLanguage('en');

  const renderHeaderActions = () => {
    switch (page) {
      case 'categories':
        return (
          <div className='actions'>
            {isCategorySelected && <> 
              <EditCategory editCategory={handleEditCategory} 
                categoryToUpdate={categoryToUpdate} />
              <DeleteCategory categoryToUpdate={categoryToUpdate}
                deleteCategory={handleDeleteCategory} />
              <ViewCategory categoryToUpdate={categoryToUpdate} />
            </>}
            <AddCategory saveCategory={handleSaveCategory} />
          </div>
        )
      case 'locations':
        return (
          <div className='actions'>
            {isLocationSelected && <> 
              <EditLocation editLocation={handleEditLocation} 
                locationToUpdate={locationToUpdate} />
              <DeleteLocation locationToUpdate={locationToUpdate}
                deleteLocation={handleDeleteLocation} />
              <ViewLocation locationToUpdate={locationToUpdate} />
              <ViewLocationOnGoogleMaps viewOnMap={handleViewOnMap} />
            </>}
            {categoriesState.length > 0 && <AddLocation saveLocation={handleSaveLocation} />}
          </div>
        )
      default:
        return <></>
    }
  }

  return (
      <header className='navbar'>
        <h4>{title}</h4>
        {renderHeaderActions()}
      </header>
    );
  }
  
  export default Header;