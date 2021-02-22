import React from 'react'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import CategoriesIcon from '@material-ui/icons/FormatListBulleted';
import LocationIcon from '@material-ui/icons/LocationOn';
import { history } from '../../../store/history';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <BottomNavigation className='footer-navigation' 
      showLabels value={history.location.pathname}>
      <BottomNavigationAction
        value='/locations'
        label='Locations'
        icon={<LocationIcon />} 
        onClick={() => history.push('/locations')}
      />
      <BottomNavigationAction
        value='/categories'
        label='Categories'
        icon={<CategoriesIcon />}
        onClick={() => history.push('/categories')}
      />
    </BottomNavigation>
    );
  }
  
  export default Footer;