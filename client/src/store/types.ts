export const SET_CATEGORIES = 'SET_CATEGORY'
export const SET_CATEGORY_TO_UPDATE = 'SET_CATEGORY_TO_UPDATE'
export const SET_CATEGORY_SELECTED_FLAG = 'SET_CATEGORY_SELECTED_FLAG'
export const SET_LOCATIONS = 'SET_LOCATIONS'
export const SET_LOCATION_TO_UPDATE = 'SET_LOCATION_TO_UPDATE'
export const SET_LOCATION_SELECTED_FLAG = 'SET_LOCATION_SELECTED_FLAG'

export interface ICategory {
  _id: string
  name: string
}

export interface ILocation {
  _id: string
  name: string
  address: string
  lat: number
  lon: number
  category_id: string[]
}

export interface SystemState {
  categories: ICategory[]
  categoryToUpdate: ICategory
  isCategorySelected: boolean
  locations: ILocation[]
  locationToUpdate: ILocation
  isLocationSelected: boolean
}

export type SystemAction = {
  type: string
  category?: ICategory
  isCategorySelected?: boolean
  location?: ILocation
  isLocationSelected?: boolean
}

export type DispatchType = (args: SystemAction) => SystemAction

interface SetCategoryAction {
  type: typeof SET_CATEGORIES,
  categories: ICategory[]
}

interface SetCategoryToUpdateAction {
  type: typeof SET_CATEGORY_TO_UPDATE,
  categoryToUpdate: ICategory
}

interface SetCategorySelectedFlagAction {
  type: typeof SET_CATEGORY_SELECTED_FLAG,
  isCategorySelected : boolean
}

interface SetLocationAction {
  type: typeof SET_LOCATIONS,
  locations: ILocation[]
}

interface SetLocationToUpdateAction {
  type: typeof SET_LOCATION_TO_UPDATE,
  locationToUpdate: ILocation
}

interface SetLocationSelectedFlagAction {
  type: typeof SET_LOCATION_SELECTED_FLAG,
  isLocationSelected : boolean
}


export type ActionTypes = SetCategoryAction | SetCategoryToUpdateAction | SetCategorySelectedFlagAction |
                          SetLocationAction | SetLocationToUpdateAction | SetLocationSelectedFlagAction