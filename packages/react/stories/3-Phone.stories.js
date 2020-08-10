import React, { useState } from 'react'

// import { action } from '@storybook/addon-actions'
import {
  MUIPhone,
} from '../src/controls'

export default {
  title: 'Phone',
  component: MUIPhone,
}

export const Basic = () => {
  const [value, setValue] = useState()

  return (
    <MUIPhone
      label='Type Some Text'
      value={value}
      setValue={setValue}
      error={value ? '' : 'Value Required'}
    />
  )
}
