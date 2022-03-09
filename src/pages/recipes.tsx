import {useState} from 'react'
//import { RecipeModal } from '../components/RecipeModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ModalText } from '../components/ModalText';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Recipes() {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpen = ():void => setOpenModal(true);
    const handleClose = ():void => setOpenModal(false);

    return <div>
        <h3> Recipes </h3>
        
        <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalText/>
        </Box>
      </Modal>
        
     
        </div>
}
//<Button onClick={handleOpen} variant="outlined">Open modal</Button>
//{open && (<RecipeModal  setOpen={setOpen} handleClose={handleClose} open={open}/>)}