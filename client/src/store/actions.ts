import { ICategory, 
  CategoryActionTypes, 
  SET_CATEGORIES, 
  SET_CATEGORY_TO_UPDATE,
  SET_CATEGORY_SELECTED_FLAG
} from './types'

export function setCategories(categories: ICategory[]): CategoryActionTypes {
  return {
    type: SET_CATEGORIES,
    categories: categories
  }
}

export function setCategoryToUpdate(newCategoryToUpdate: ICategory): CategoryActionTypes {
  return {
    type: SET_CATEGORY_TO_UPDATE,
    categoryToUpdate: newCategoryToUpdate
  }
}

export function setCategorySelectedFlag(isCategorySelectedStatus: boolean): CategoryActionTypes {
  return {
    type: SET_CATEGORY_SELECTED_FLAG,
    isCategorySelected: isCategorySelectedStatus
  }
}