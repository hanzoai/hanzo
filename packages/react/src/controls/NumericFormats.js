import { signs } from '@hanzo/utils'

import React from 'react'
import NF from 'react-number-format'

export const CreateCurrencyFormat = (currency, opts) => (
  (props) => {
    const {
      inputRef,
      onBlur,
      onChange,
      onFocus,
      value,
      ...other
    } = props

    return (
      <NF
        {...other}
        {...opts}
        value={value}
        getInputRef={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        isNumericString
        prefix={signs[currency || '']}
      />
    )
  }
)

export const CreateNumberFormat = (opts) => (
  (props) => {
    const {
      inputRef,
      onBlur,
      onChange,
      onFocus,
      value,
      ...other
    } = props

    return (
      <NF
        {...other}
        {...opts}
        value={value}
        getInputRef={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        isNumericString
      />
    )
  }
)
