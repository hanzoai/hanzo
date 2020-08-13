import React, {
  useRef,
  useState,
} from 'react'

import classnames from 'classnames'
import {
  isFunction,
  valueOrError,
  valueOrEvent,
} from '@hanzo/utils'

import raf from 'raf'

//
// *** Hanzo Standardized Control Decorator ***
//
// A standardized control wrapper for making Hanzo controls all behave the same
// way and share a common props api.
//
// Features
// - Support react style hooks with getValue/setValue
// - setValue standarizes behavior use onBlur.  This mostly has to do with
//   Material UI using a nonstandard onChange event for controlled inputs
// - Standardizes the error field for setting the correct error and helperText
//   states
// - The 'nice' api for controls:
//
// const {
//   getValue
//   setValue
//   inputValue
//   error
//   showError
// } = this.props
//
// - Fully optional and compatible with normal Material UI
//
// Custom Fields
// - getValue - a function that is evaluated and is used to set value
//   internally converted into a onBlur function
// - setValue - a function for taking value instead of an event, executes
//   alongside onBlur.  This is designed for creating uncontrolled inputs.
// - inputValue - a function fo taking value instead of an event, events
//   alongside Material UI onChange (standard onInput).  This is designed for
//   creating controleld inputs.
// - error - setting to true or false replicates
// - showError - overwrite showing/hiding the error
//

let controlId = 0

export default (ControlComponent) => (
  ({
    getValue,
    setValue,
    inputValue,
    onBlur,
    onChange,
    defaultValue,
    value,
    error,
    helperText,
    showError,
    ...props
  }) => {
    const [id] = useState(() => controlId++)
    const controlEl = useRef()

    let se = showError

    // show error defaults to true
    if (se == null) {
      se = true
    }

    let v = value
    let dv = defaultValue

    // getValue supercedes both defaultValue and value
    if (isFunction(getValue)) {
      v = getValue()
      dv = undefined
    }

    let oc = onChange
    let ob = onBlur

    // inputValue supercedes setValue
    if (isFunction(inputValue)) {
      const originalOnChange = onChange
      oc = (e) => {
        inputValue(valueOrEvent(e))
        if (isFunction(originalOnChange)) {
          originalOnChange(e)
        }
      }
    // setValue supercedes both onBlue and onChange
    } else if (isFunction(setValue)) {
      const originalOnBlur = onBlur
      ob = (e) => {
        setValue(valueOrEvent(e))
        if (isFunction(originalOnBlur)) {
          originalOnBlur(e)
        }
      }
      oc = undefined

      // if we are not using the getValue/setValue api, then we must load
      // a value into the system
      // some falsy values of value should not cause an initial update
      if (v != null && v !== '') {
        raf(() => {
          ob(v)
        })
      } else if (dv !== undefined) {
        raf(() => {
          ob(dv)
        })
      }
    }

    // error must be a string
    const e = valueOrError(error)

    return (
      <div
        ref={controlEl}
        className={classnames({
          control: true,
          valid: !e,
          invalid: e,
        })}
      >
        <ControlComponent
          id={`control-${id}`}
          onBlur={ob}
          onChange={oc}
          error={!!(se && e)}
          helperText={(se && e !== undefined && e !== false && e !== true) ? e : helperText}
          value={v}
          defaultValue={dv}
          {...props}
        />
      </div>
    )
  }
)
