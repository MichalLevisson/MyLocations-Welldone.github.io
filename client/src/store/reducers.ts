import { ILocation } from '../type'
import { 
  ICategory,
  SystemState,
  SET_CATEGORIES, 
  SET_CATEGORY_SELECTED_FLAG, 
  SET_CATEGORY_TO_UPDATE,
  SET_LOCATIONS,
  SET_LOCATION_TO_UPDATE,
  SET_LOCATION_SELECTED_FLAG,
  ActionTypes
  } from './types'

  const initialState: SystemState = {
    categories: [],
    categoryToUpdate: {} as ICategory,
    isCategorySelected: false,
    locations: [],
    locationToUpdate: {} as ILocation,
    isLocationSelected: false
  }

  export function mainReducer(
    state: SystemState = initialState,
    action: ActionTypes
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
      case SET_LOCATIONS:
        return {
          ...state,
          locations: action.locations
        }
      case SET_LOCATION_TO_UPDATE:
        return {
          ...state,
          locationToUpdate: action.locationToUpdate
        }
      case SET_LOCATION_SELECTED_FLAG:
        return {
          ...state,
          isLocationSelected: action.isLocationSelected
        }
      default:
        return state
    }
  }