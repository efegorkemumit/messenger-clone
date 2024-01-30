'use client'
import useActiveChannel from '@/app/hook/action/useActiveChannel';
import React from 'react'

function ActiveStatus() {
  useActiveChannel();

  return null;
}

export default ActiveStatus