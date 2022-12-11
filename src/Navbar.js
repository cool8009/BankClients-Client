import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" className={classes.title}>
                Clients App
            </Typography>  
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
            <Button color="inherit" onClick={() => navigate('/')}>Add Client</Button>
            <Button color="inherit" onClick={() => navigate('/ViewClients')}>View Clients</Button>
        </Drawer>
      </div>
    );
}

export default Navbar