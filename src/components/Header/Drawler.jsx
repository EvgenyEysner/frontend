import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Link} from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import useLogout from "../../hooks/useLogout";

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const logout = useLogout()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/'>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/scan'>
            <ListItemIcon>
              <DocumentScannerIcon/>
            </ListItemIcon>
            <ListItemText primary='Scanner'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/items'>
            <ListItemIcon>
              <InventoryIcon/>
            </ListItemIcon>
            <ListItemText primary='Bestand'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/add-item'>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary='Neu hinzufügen'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/cart'>
            <ListItemIcon>
              <ShoppingCartCheckoutIcon/>
            </ListItemIcon>
            <ListItemText primary='Korb'/>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/return-request'>
            <ListItemIcon>
              <KeyboardReturnIcon/>
            </ListItemIcon>
            <ListItemText primary='Rückgabe'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/return-request/cart-return'>
            <ListItemIcon>
              <AssignmentReturnIcon/>
            </ListItemIcon>
            <ListItemText primary='Retouren'/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary='Logout'/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon sx={{fontSize: 40, color: 'white'}}/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
