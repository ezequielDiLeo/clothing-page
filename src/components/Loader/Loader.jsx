

import React from 'react'
import { Spinner } from './spinner'

export const Loader = () => {
  return (
    <div className='flex justify-center items-center flex-columns gap-2 mt-20'>
        <Spinner />

    </div>
  )
}
