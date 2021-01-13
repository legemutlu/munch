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
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
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

  {
    href: '/business/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/business/account',
    icon: UserIcon,
    title: 'Profile'
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
  },
  {
    href: '/business/foods',
    icon: AlertCircleIcon,
    title: 'Food'
  },
  {
    href: '/business/category',
    icon: AlertCircleIcon,
    title: 'Category'
  },
  {
    href: '/business/inventory',
    icon: AlertCircleIcon,
    title: 'Inventory'
  }
];

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
  const user = useSelector(state => state.login);
  const { userInfo } = user;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {
          href: '/business/products',
          icon: ShoppingBagIcon,
          title: 'Products'
        },
        {
          href: '/business/account',
          icon: UserIcon,
          title: 'Profile'
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
        },
        {
          href: '/business/foods',
          icon: AlertCircleIcon,
          title: 'Food'
        },
        {
          href: '/business/category',
          icon: AlertCircleIcon,
          title: 'Category'
        },
        {
          href: '/business/inventory',
          icon: AlertCircleIcon,
          title: 'Inventory'
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
        {
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
        },
        {
          href: '/business/foods',
          icon: AlertCircleIcon,
          title: 'Food'
        },
        {
          href: '/business/category',
          icon: AlertCircleIcon,
          title: 'Category'
        },
        {
          href: '/business/inventory',
          icon: AlertCircleIcon,
          title: 'Inventory'
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
          src={user.avatar}
          to="/business/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {userInfo &&
            items.length > 0 &&
            items.map(item => (
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
