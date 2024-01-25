'use client'

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ClipLoader } from 'react-spinners'

function LoadingModals() {
  return (
  <Transition.Root show as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={()=>{}}>
        <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom="opacity-0"
        enterTo='opactiy-100'
        leave='ease-in duration-200'
        leaveFrom='opactiy-100'
        leaveTo='opacity-0'
        >

        <div className='fixed inset-0 bg-gray-300 bg-opacity-45'>
        </div>

        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center
            p-6 text-center'>

                <Transition.Child
                 as={Fragment}
                 enter='ease-out duration-300'
                 enterFrom="opacity-0 translate-y-4"
                 enterTo='opactiy-100 translate-y-0'
                 leave='ease-in duration-200'
                 leaveFrom='opactiy-100 translate-y-0'
                 leaveTo='opacity-0 translate-y-4'>

                    <Dialog.Panel>
                        <ClipLoader size={40} color='#40A2D8'></ClipLoader>
                    </Dialog.Panel>


                </Transition.Child>

            </div>


        </div>




    </Dialog>


  </Transition.Root>
  )
}

export default LoadingModals