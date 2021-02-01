import axios, { AxiosResponse } from "axios"
import { ApiDataType , ICategory } from "../type"

const baseUrl: string = "http://localhost:4000"

export const getCategories = async () => {
  try {
    const categories = localStorage.getItem('categories');
    return categories
  } catch (error) {
    throw new Error(error)
  }
}

export const addCategory = async (
  formData: ICategory
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const category: Omit<ICategory, '_id'> = {
      name: formData.name
    }
    const saveCategory: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-category',
      category
    )
    return saveCategory
  } catch (error) {
    throw new Error(error)
  }
}

export const updateCategory = async (
  category: ICategory
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedCategory: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-category/${category._id}`,
      category
    )
    return updatedCategory
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteCategory = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedCategory: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-category/${_id}`
    )
    return deletedCategory
  } catch (error) {
    throw new Error(error)
  }
}