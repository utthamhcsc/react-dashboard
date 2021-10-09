import React from 'react';

import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Toolbar,
  Box,
  useTheme,
  Collapse,
  Typography,
  Divider,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PermissionChecker from '../../../utils/PermissionChecker';
import { useAuth } from '../../../contexts/AuthContext';

export default ({
  classes,
  menus,
  drawerWidth,
  window,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const Auth = useAuth();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {menus?.map((menu, index) => {
          if (new PermissionChecker(Auth.currentUser).match(menu)) {
            if (menu.submenu?.length > 0) {
              return (
                <SubMenu
                  key={menu.label}
                  menu={menu}
                  theme={theme}
                  Auth={Auth}
                />
              );
            } else {
              return (
                <NavLink
                  key={menu.label}
                  activeStyle={{ backgroundColor: theme.palette.primary.light }}
                  component={ListItem}
                  to={menu.path}
                  button
                  key={menu.label}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={menu.label} />
                </NavLink>
              );
            }
          } else {
            return <></>;
          }
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
          bgcolor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

const SubMenu = ({ theme, menu, Auth }) => {
  const [open, setOpen] = useToggle(false);

  return (
    <>
      <ListItem button onClick={setOpen}>
        <ListItemIcon sx={{ color: 'inherit' }}>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={menu?.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {menu?.submenu?.map(({ label, path, allowedRoles }) => {
            if (
              new PermissionChecker(Auth.currentUser).match({ allowedRoles })
            ) {
              return (
                <NavLink
                  key={label}
                  activeStyle={{ backgroundColor: theme.palette.primary.light }}
                  component={ListItem}
                  to={path}
                  button
                  key={label}
                >
                  <ListItemIcon />
                  <Typography sx={{ fontSize: '14px' }}>{label}</Typography>
                </NavLink>
              );
            } else {
              return null;
            }
          })}
        </List>
      </Collapse>
    </>
  );
};
