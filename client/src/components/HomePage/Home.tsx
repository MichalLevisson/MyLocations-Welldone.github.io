import React from 'react';
import Header from '../Layout/Header/Header'
import Footer from '../Layout/Footer/Footer'

const HomePage: React.FC = () => {
  return (
    <main className='App'>
      <Header title='My locations website' page='home' />
      <div className='cards'>
        Welcome! {<br></br>}{<br></br>}
        Use the footer navigation to view categoris or locations {<br></br>} 
        When viewing the locations list you can edit, delete, view details or view on google map 
        any of them by selecting a location from the list via click on the location name {<br></br>} 
        When viewing the categories list you can edit, view details and delete
        any of them by selecting a category from the list via click on the category name
      </div>
      <Footer />
    </main>
  );
}

export default HomePage;
