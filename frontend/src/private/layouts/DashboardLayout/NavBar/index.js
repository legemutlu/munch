import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Layers as LayersIcon,
  Gift as GiftIcon
} from 'react-feather';
import NavItem from './NavItem';


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const loginData = useSelector((state) => state.login);
  const { userInfo } = loginData;


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  let items = [];

  switch (userInfo.user.role) {
    case 'employee':
      items = [
        {
          href: '/business/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard'
        },
       /* {
          href: '/business/products',
          icon: ShoppingBagIcon,
          title: 'Products'
        },*/
        {
          href: '/business/account',
          icon: UserIcon,
          title: 'Profile'
        },
       /* {
          href: '/business/settings',
          icon: SettingsIcon,
          title: 'Settings'
        },
        {
          href: '/business/login',
          icon: LockIcon,
          title: 'Login'
        },
        {
          href: '/business/register',
          icon: UserPlusIcon,
          title: 'Register'
        },
        {
          href: '/business/404',
          icon: AlertCircleIcon,
          title: 'Error'
        },*/
        {
          href: '/business/foods',
          icon: FastfoodOutlinedIcon,
          title: 'Food'
        },
        {
          href: '/business/categories',
          icon: CategoryOutlinedIcon,
          title: 'Category'
        },
        {
          href: '/business/inventories',
          icon: LayersIcon,
          title: 'Inventory'
        },
        {
          href: '/business/orders',
          icon: GiftIcon,
          title: 'Order'
        },
        {
          href: '/business/reservations',
          icon: EventSeatOutlinedIcon,
          title: 'Reservation'
        },
        {
          href: '/business/contacts',
          icon: ListAltOutlinedIcon,
          title: 'Contact'
        }
      ];
      break;
    case 'admin':
      items = [
        {
          href: '/business/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard'
        },
        {
          href: '/business/customers',
          icon: UsersIcon,
          title: 'Customers'
        },
       /* {
          href: '/business/products',
          icon: ShoppingBagIcon,
          title: 'Products'
        },
        {
          href: '/business/settings',
          icon: SettingsIcon,
          title: 'Settings'
        },
        {
          href: '/business/login',
          icon: LockIcon,
          title: 'Login'
        },
        {
          href: '/business/register',
          icon: UserPlusIcon,
          title: 'Register'
        },
        {
          href: '/business/404',
          icon: AlertCircleIcon,
          title: 'Error'
        },*/
        {
          href: '/business/foods',
          icon: FastfoodOutlinedIcon,
          title: 'Food'
        },
        {
          href: '/business/categories',
          icon: CategoryOutlinedIcon,
          title: 'Category'
        },
        {
          href: '/business/inventories',
          icon: LayersIcon,
          title: 'Inventory'
        },
        {
          href: '/business/orders',
          icon: GiftIcon,
          title: 'Order'
        },
        {
          href: '/business/reservations',
          icon: EventSeatOutlinedIcon,
          title: 'Reservation'
        },
        {
          href: '/business/contacts',
          icon: ListAltOutlinedIcon,
          title: 'Contact'
        }
      ];
      break;
  }

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={`/static/images/users/${userInfo.user.image}`}
          to="/business/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          <br/>
          {userInfo.user.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {userInfo &&
            items.length > 0 &&
            items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
