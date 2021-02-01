import React, { useEffect } from 'react'
import { ICategory } from '../../type'
import { setCategories, setCategorySelectedFlag, setCategoryToUpdate } from '../../store/actions'
import { SystemState } from '../../store/types'
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { ListGroup } from 'react-bootstrap'
import Header from '../Layout/Header/Header'

const MyLocations: React.FC = () => {

  const storageCategories = JSON.parse(localStorage.getItem('categories') || '0');

  useEffect(() => {
    storageCategories !== 0 &&  
      onSetCategories(storageCategories)
  }, [])

  const dispatch: Dispatch<any> = useDispatch()

  const onSetCategories = React.useCallback(
    (categories: ICategory[]) => dispatch(setCategories(categories)), [dispatch])

  const onSetCategoryToUpdate = React.useCallback(
    (category: ICategory) => dispatch(setCategoryToUpdate(category)), [dispatch])

  const onSetCategorySelectedFlag = React.useCallback(
    (isCategorySelected: boolean) => dispatch(setCategorySelectedFlag(isCategorySelected)), [dispatch])

  const categoriesState: ICategory[] = 
    useSelector((state: SystemState) => state.categories, shallowEqual)
  const categoryToUpdateState: ICategory = 
    useSelector((state: SystemState) => state.categoryToUpdate, shallowEqual)
  const categorySelectedFlagState: boolean = 
    useSelector((state: SystemState) => state.isCategorySelected, shallowEqual)

  const handleSelectedCategory = (_id: string) => {
    const selectedCategory: ICategory | any = categoriesState.find(category => category._id ===_id)
    if (selectedCategory === categoryToUpdateState && categorySelectedFlagState) {
      onSetCategorySelectedFlag(false)
    } else {
      onSetCategoryToUpdate(selectedCategory)
      onSetCategorySelectedFlag(true) 
    }
  }

  return (
    <main className='App'>
      <Header title='Categories' />
      <ListGroup className='categoriesList'>
      {categoriesState.length ?
        categoriesState.map(category => 
          <ListGroup.Item
            className='categoriesListItem'
            onClick={() => handleSelectedCategory(category._id)}
            active={categorySelectedFlagState && categoryToUpdateState._id === category._id}>
            {category.name}
          </ListGroup.Item>) :
        <h3>Seems like you dont have any categories saved yet... {<br></br>}
            Create categories using the add option at the header!
        </h3>
      }
      </ListGroup>
    </main>
  );
}

export default MyLocations;