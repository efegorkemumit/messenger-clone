import { User } from '@prisma/client';
import React from 'react'
import Modal from '../modals/Modal';

interface SettingsModalProps{
    isOpen?:boolean;
    onClose?:()=>void;
    currentUser: User;
}

const  SettingsModal: React.FC<SettingsModalProps>=({
    currentUser, isOpen, onClose
})=> {



  return (
   <Modal isOpen={isOpen} onClose={onClose}>


   </Modal>
  )
}

export default SettingsModal