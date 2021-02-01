import React from 'react'
import { ICategory } from '../../../type'
import { setCategories, setCategorySelectedFlag } from '../../../store/actions'
import { SystemState } from '../../../store/types'
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import AddCategory from "./Actions/AddCategory"
import EditCategory from './Actions/EditCategory'
import DeleteCategory from './Actions/DeleteCategory'
import ViewCategory from './Actions/ViewCategory'

type Props = {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {

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

  const handleSaveCategory = (e: React.FormEvent, formData: ICategory, setFormData: void): void => {
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

  return (
      <header className='navbar'>
        <p>{title}</p>
        <AddCategory saveCategory={handleSaveCategory} />
        <div className='actions'>
          {isCategorySelected && <> 
            <EditCategory editCategory={handleEditCategory} 
              categoryToUpdate={categoryToUpdate} />
            <DeleteCategory categoryToUpdate={categoryToUpdate}
              deleteCategory={handleDeleteCategory} />
            <ViewCategory categoryToUpdate={categoryToUpdate} />
          </>}
        </div>
      </header>
    );
  }
  
  export default Header;