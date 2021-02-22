import React from 'react'
import { Button } from 'react-bootstrap'

type Props = { 
  viewOnMap: () => void
}

const ViewLocationOnGoogleMaps: React.FC<Props> = ({ viewOnMap }) => {
	return (
    <>
      <Button variant='outline-success' onClick={() => viewOnMap()}>
        View On Google Maps
      </Button>
    </>
  )
}

export default ViewLocationOnGoogleMaps;