import { InputAdornment, Button } from '@material-ui/core'
import React, { useState } from 'react'

// import { action } from '@storybook/addon-actions'
import {
  MUIText,
  CreateCurrencyFormat,
  CreateNumberFormat,
} from '../src/controls'

export default {
  title: 'Text',
  component: MUIText,
}

export const Basic = () => {
  const [value, setValue] = useState('some text')

  return (
    <MUIText
      label='Type Some Text'
      value={value}
      setValue={setValue}
      error={value ? '' : 'Value Required'}
    />
  )
}

export const ForceSetBasic = () => {
  const [value, setValue] = useState('some text')

  return (
    <>
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={(v) => {
          setTimeout(() => {
            setValue(v)
          }, 100)
        }}
        error={value ? '' : 'Value Required'}
      />
      <Button onClick={() => {
        setValue('set1')
        setTimeout(() => {
          setValue('set2')
        }, 50)
      }}>Click</Button>
    </>
  )
}

export const BasicSynchronized = () => {
  const [value, setValue] = useState('some text')

  return (
    <>
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        label='Type Some Text'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
    </>
  )
}

export const Currency = () => {
  const [value, setValue] = useState('')

  const currency = 'usd'

  return (
    <MUIText
      disableAutoChange
      label='Amount'
      variant='outlined'
      InputProps={{
        inputComponent: CreateCurrencyFormat(currency, {
          allowEmptyFormatting: true,
        }),
        endAdornment: <InputAdornment position='end'>{ currency ? currency.toUpperCase() : 'USD'}</InputAdornment>,
      }}
      value={value}
      setValue={(x) => {
        setValue(x.replace(/[^0-9.-]+/g, ''))
      }}
    />
  )
}

export const Numeric = () => {
  const [value, setValue] = useState('')

  console.log('abcd')

  return (
    <MUIText
      disableAutoChange
      label='Amount'
      variant='outlined'
      InputProps={{
        inputComponent: CreateNumberFormat(),
      }}
      value={value}
      setValue={(x) => {
        console.log('zzz', x)
        setValue(x)
      }}
    />
  )
}

const selectOpts = {
  a: 'a',
  b: 'b',
  c: 'c',
}

export const Select = () => {
  const [value, setValue] = useState('a')

  return (
    <MUIText
      select
      options={selectOpts}
      label='Select'
      placeholder='Select an Option'
      value={value}
      setValue={setValue}
      error={value ? '' : 'Value Required'}
    />
  )
}

export const SelectSynchronized = () => {
  const [value, setValue] = useState()

  return (
    <>
      <MUIText
        select
        options={selectOpts}
        label='Select'
        placeholder='Select an Option'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        select
        options={selectOpts}
        label='Select'
        placeholder='Select an Option'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        select
        options={selectOpts}
        label='Select'
        placeholder='Select an Option'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        select
        options={selectOpts}
        label='Select'
        placeholder='Select an Option'
        value={value}
        setValue={setValue}
        error={value ? '' : 'Value Required'}
      />
      <MUIText
        select
        options={selectOpts}
        label='Select'
        placeholder='Select an Option'
        value={value}
        setValue={(x) => {
          console.log('set to', x)
          setValue(x)
        }}
        error={value ? '' : 'Value Required'}
      />
    </>
  )
}
