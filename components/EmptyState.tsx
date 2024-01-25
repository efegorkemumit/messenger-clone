import React from 'react'

function EmptyState() {
  return (
    <div className='flex h-full justify-center items-center px-4 py-4 bg-gray-200'>
        <div className='text-center items-center flex flex-col'>
        <h3 className='text-3xl font-semibold text-gray-800'>Select a  chat or start a new conversation</h3>
        </div>
    </div>
  )
}

export default EmptyState