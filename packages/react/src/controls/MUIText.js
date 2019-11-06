import React, { Component } from 'react'

import control from './control'
import {
  TextField,
  MenuItem,
} from '@material-ui/core'

import {
  isFunction,
} from '@hanzo/utils'

const SPECIALNIL = '☭'

//
// *** Hanzo Standardized Material UI Input ***
//
// A Material UI TextField with the following bug fixes:
// - Selects can now auto set themselves to a placeholder when undefined
// - defaultValue now takes the first non-undefined value so you cna
//   asynchronously set default value
// - Forced always into uncontrolled mode so we don't fire a nonstandard onChange
//   event compared to a normal input
//
// Custom Fields
// - placeholder - default value for selects
// - options - automatically generate a list of selections/menu items based on
//   options map
// - allowEmpty - Make the placeholder in select mode picakble with a
//   onBlur/onChange value of undefined
// - shrink - shorthand for InputLabelProps{ shrink }, recommended taht you overwrite
//   the whole thing with custom shrink logic if using InputLabelProps
// - sensitive - defaults to a password field unless focused
//

export class BaseMUIText extends Component {
  options = undefined
  firstValue = undefined
  inputRef = undefined

  // Default InnerComponent
  InnerComponent = TextField

  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  // Make it so that select can handle a specific nil value based on a rare
  // unicode special value because empty string does not work
  wrapSelectSetter(setter) {
    return (e) => {
      if (e === SPECIALNIL) {
        return setter(undefined)
      }

      if (e && e.target && e.target.value === e === SPECIALNIL) {
        let newE = Object.create(e, {
          target: {
            value: undefined
          }
        })

        return setter(newE)
      }

      return setter(e)
    }
  }

  // Enable sensitive focus detection using Blur and Focus
  wrapSensitiveBlur (onBlur) {
    return (e) => {
      this.setState({
        focused: false,
      })
      if(isFunction(onBlur)) {
        onBlur(e)
      }
    }
  }

  wrapSensitiveFocus (onFocus) {
    return (e) => {
      this.setState({
        focused: true,
      })
      if(isFunction(onFocus)) {
        onFocus(e)
      }
    }
  }

  render() {
    let {
      select,
      options,
      placeholder,
      value,
      defaultValue,
      shrink,
      onChange,
      onBlur,
      onFocus,
      allowEmpty,
      sensitive,
      type,
      InnerComponent,
      InputLabelProps,
      InputProps,
      ...props
    } = this.props

    if (!options) {
      options = this.options
    }

    let isSelect       = select     != null
    let isSensitive    = sensitive  != null
    let doesAllowEmpty = allowEmpty != null

    let selectOptions  = []
    if (!options) {
      options = []
    }

    if (isFunction(onChange)) {
      onChange = this.wrapSelectSetter(onChange)
    }

    if (isFunction(onBlur)) {
      onBlur = this.wrapSelectSetter(onBlur)
    }

    onBlur  = this.wrapSensitiveBlur(onBlur)
    onFocus = this.wrapSensitiveFocus(onFocus)

    if (isSelect) {
      // set the default value to '' if it doesn't exist
      if (!options[defaultValue]) {
        defaultValue = SPECIALNIL
      }

      // set the value to '' if it doesn't exist
      if (!options[value]) {
        value = SPECIALNIL
        defaultValue = undefined
      }

      if (props.SelectProps && props.SelectProps.native) {
        if (placeholder) {
          if (doesAllowEmpty) {
            selectOptions.push(pug`
              option( key=SPECIALNIL value=SPECIALNIL)
                =placeholder
            `)
          } else {
            selectOptions.push(pug`
              option(disabled key=SPECIALNIL value=SPECIALNIL)
                =placeholder
            `)
          }
        }
        for (let k in options) {
          ((key) => {
            let opt = options[key]
            selectOptions.push(pug`
              option(key=key value=key)
                =opt
            `)
          })(k)
        }
      } else {
        if (placeholder) {
          if (doesAllowEmpty) {
            selectOptions.push(pug`
              MenuItem(key=SPECIALNIL value=SPECIALNIL)
                =placeholder
            `)
          } else {
            selectOptions.push(pug`
              MenuItem(disabled key=SPECIALNIL value=SPECIALNIL)
                =placeholder
            `)
          }
        }
        for (let k in options) {
          ((key) => {
            let opt = options[key]
            selectOptions.push(pug`
              MenuItem(key=key value=key)
                =opt
            `)
          })(k)
        }
      }
    }

    // This is only for text inputs because we can't use fully controlled
    // inputs since they update on keystroke rather than the standard onchange.
    // Selects don't have this problem
    if(!isSelect) {
      // A real default value system for asynchronous uncontrolled inputs
      if (this.firstValue === undefined || this.firstValue === '') {
        this.firstValue = value || defaultValue

        if (this.firstValue !== undefined && this.firstValue !== '') {
          // Keep trying to set until inputRef is assigned
          const forceSet = () => {
            if (this.inputRef) {
              this.inputRef.value = this.firstValue
            } else {
              requestAnimationFrame(forceSet)
            }
          }

          requestAnimationFrame(forceSet)
        }
      }
    }

    InnerComponent = InnerComponent || this.InnerComponent
    let InputPropsCheck = InputProps || {}

    return pug`
      InnerComponent(
        ...props
        inputRef=(ref) => this.inputRef = ref
        select=select
        options=options
        placeholder=isSelect ? '' : placeholder
        type=(isSensitive && !this.state.focused) ? 'password' : type
        value=isSelect ? value : undefined
        defaultValue=value ? undefined : defaultValue
        onChange=isSelect ? (onChange || onBlur) : onChange
        onBlur=isSelect ? this.wrapSensitiveBlur() : onBlur
        onFocus=onFocus
        InputProps=InputProps
        InputLabelProps=Object.assign({ shrink: !!(this.state.focused || (this.inputRef && this.inputRef.value) || !!value || !!defaultValue || shrink || isSelect || placeholder || InputPropsCheck.startAdornment || InputPropsCheck.endAdornment) }, InputLabelProps)
      )
        =selectOptions
      `
  }
}

@control
export default class MUIText extends BaseMUIText {}
