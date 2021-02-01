import { type } from "os"

export const SET_CATEGORIES = 'SET_CATEGORY'
export const SET_CATEGORY_TO_UPDATE = 'SET_CATEGORY_TO_UPDATE'
export const SET_CATEGORY_SELECTED_FLAG = 'SET_CATEGORY_SELECTED_FLAG'

export interface ICategory {
  _id: string
  name: string
}

export interface SystemState {
  categories: ICategory[]
  categoryToUpdate: ICategory
  isCategorySelected: boolean
}

export type SystemAction = {
  type: string
  category?: ICategory
  isCategorySelected?: boolean
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

export type CategoryActionTypes = SetCategoryAction | SetCategoryToUpdateAction | SetCategorySelectedFlagAction