import React from 'react';
import { Link } from 'react-router-dom';
import { Card , Button } from 'react-bootstrap';
import Header from '../Layout/Header/Header'

const MyLocations: React.FC = () => {
  return (
    <main className='App'>
      <Header title='My locations website' />
      <div className='cards'>
        <Card style={{ width: '24rem' }}>
          <Card.Body>
            <Card.Title>Categories</Card.Title>
            <Card.Text>
              When viewing the categories list you can edit, view details and delete
              any of them by selecting a category from the list via click on the category name
            </Card.Text><Link to='/categories'>
            <Button variant='outline-success'>
              View categories list
            </Button></Link>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
}

export default MyLocations;
