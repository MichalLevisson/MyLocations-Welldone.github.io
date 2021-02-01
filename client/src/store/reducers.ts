import { 
  ICategory,
  SystemState,
  SET_CATEGORIES, 
  SET_CATEGORY_SELECTED_FLAG, 
  SET_CATEGORY_TO_UPDATE,
  CategoryActionTypes} from './types'

  const initialState: SystemState = {
    categories: [],
    categoryToUpdate: {} as ICategory,
    isCategorySelected: false
  }

  export function categoryReducer(
    state: SystemState = initialState,
    action: CategoryActionTypes
  ): SystemState {
    switch (action.type) {
      case SET_CATEGORIES:
        return {
          ...state,
          categories: action.categories
        }
      case SET_CATEGORY_TO_UPDATE:
        return {
          ...state,
          categoryToUpdate: action.categoryToUpdate
        }
      case SET_CATEGORY_SELECTED_FLAG:
        return {
          ...state,
          isCategorySelected: action.isCategorySelected
        }
      default:
        return state
    }
  }
