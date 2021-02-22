import React from 'react'
import { Button } from 'react-bootstrap'
import { ICategory } from '../../../type'

type Props = { 
    sortA2Z: () => void
    filterByCategoryId: (category_id: string) => void
    displayGroupedByCategoryAction: () => void
    displayGroupedByCategory: boolean,
    categoriesState: ICategory[]
}
  
const LocationsActions: React.FC<Props> = ({ sortA2Z,
  filterByCategoryId,
  displayGroupedByCategoryAction,
  displayGroupedByCategory,
  categoriesState }) => {

  const setCategoryGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterByCategoryId(e.currentTarget.value)
  }
  
  return (
    <>
      <Button variant='outline-success locationsActions' onClick={sortA2Z}>Sort A-Z</Button>
      <Button variant='outline-success locationsActions' onClick={displayGroupedByCategoryAction}>
        {displayGroupedByCategory ? 
          'Regular display' : 
          'Category grouped display'}
      </Button>
      <select id='category_id' className='locationsActionsSelect' onChange={setCategoryGroup}>
        <option key='0' value='0'>View All Categories</option>
        {categoriesState.map( category => (
          <option key={category._id} value={category._id}>
            {'View ' + category.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default LocationsActions

