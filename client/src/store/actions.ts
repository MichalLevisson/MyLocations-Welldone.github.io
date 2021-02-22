import { ICategory, ILocation,
  ActionTypes, 
  SET_CATEGORIES, 
  SET_CATEGORY_TO_UPDATE,
  SET_CATEGORY_SELECTED_FLAG,
  SET_LOCATIONS,
  SET_LOCATION_SELECTED_FLAG,
  SET_LOCATION_TO_UPDATE
} from './types'

export function setCategories(categories: ICategory[]): ActionTypes {
  return {
    type: SET_CATEGORIES,
    categories: categories
  }
}

export function setCategoryToUpdate(newCategoryToUpdate: ICategory): ActionTypes {
  return {
    type: SET_CATEGORY_TO_UPDATE,
    categoryToUpdate: newCategoryToUpdate
  }
}

export function setCategorySelectedFlag(isCategorySelectedStatus: boolean): ActionTypes {
  return {
    type: SET_CATEGORY_SELECTED_FLAG,
    isCategorySelected: isCategorySelectedStatus
  }
}

export function setLocations(locations: ILocation[]): ActionTypes {
  return {
    type: SET_LOCATIONS,
    locations: locations
  }
}

export function setLocationToUpdate(newLocationToUpdate: ILocation): ActionTypes {
  return {
    type: SET_LOCATION_TO_UPDATE,
    locationToUpdate: newLocationToUpdate
  }
}

export function setLocationSelectedFlag(isLocationSelectedStatus: boolean): ActionTypes {
  return {
    type: SET_LOCATION_SELECTED_FLAG,
    isLocationSelected: isLocationSelectedStatus
  }
}
