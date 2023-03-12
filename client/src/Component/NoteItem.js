import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, CardActions } from '@mui/material';
import Menu from '@mui/material/Menu';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { NoteContext } from '../Context/NoteState';
const NoteItem = ({ title, description, handleUpdate, noteid, readMore }) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card sx={{ maxWidth: 345 }} >
            <CardContent sx={{ height: "70px" }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {title}
                    <MoreVertIcon
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ cursor: "pointer" }}
                        onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        maxWidth="300px"
                    >
                        <Paper sx={{ width: 250, maxWidth: '100%', boxShadow: "none" }}>
                            <MenuList sx={{ padding: "0px 10px", display: "flex", flexDirection: "column" }}>
                                <MenuItem onClick={handleUpdate} >
                                    <ListItemIcon>
                                        <SaveAsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => deleteNote(noteid)}>
                                    <ListItemIcon>
                                        <ContentPaste fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </Menu>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" color="primary" onClick={readMore}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    )
}

export default NoteItem
