import Modal from '@/components/modals/Modal';
import Image from 'next/image';
import React from 'react'


interface ImageModalProps{
    isOpen? : boolean;
    onClose?: ()=>void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps>=({
    isOpen,onClose,src
})=> {

    if(!src){
        return null;
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='w-72 h-72 p-4 '>
        <Image
                    alt=""
                  fill
                    src={src}
                    className='object-cover p-3'>

                    </Image>

        </div>


    </Modal>
  )
}

export default ImageModal