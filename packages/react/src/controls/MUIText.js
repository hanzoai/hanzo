import {
  isFunction,
} from '@hanzo/utils'

import {
  MenuItem,
  TextField,
} from '@material-ui/core'

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import control from './control'

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

// Make it so that select can handle a specific nil value based on a rare
// unicode special value because empty string does not work
const wrapSelectSetter = (setter) => (
  (e) => {
    if (e === SPECIALNIL) {
      return setter(undefined)
    }

    if (e && e.target && e.target.value === e === SPECIALNIL) {
      const newE = Object.create(e, {
        target: {
          value: undefined,
        },
      })

      return setter(newE)
    }

    return setter(e)
  }
)

export const BaseMUIText = ({
  options = [],
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  InnerComponent,
  select,
  placeholder,
  shrink,
  disableAutoChange,
  allowEmpty,
  sensitive,
  type,
  InputLabelProps,
  InputProps,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef()

  // Enable sensitive focus detection using Blur and Focus
  const wrapSensitiveBlur = (ob) => (
    (e) => {
      setFocused(false)
      console.log('what')

      if (isFunction(ob)) {
        ob(e)
      }
    }
  )

  const wrapSensitiveFocus = (of) => (
    (e) => {
      setFocused(true)

      if (isFunction(of)) {
        of(e)
      }
    }
  )

  const isSelect = select != null
  const isSensitive = sensitive != null
  const doesAllowEmpty = allowEmpty != null

  const selectOptions = []

  let oc = onChange
  let ob = onBlur
  let of = onFocus
  let dv = defaultValue
  let v = value

  if (isSelect) {
    // set the default value to '' if it doesn't exist
    if (!options[dv]) {
      dv = SPECIALNIL
    }

    // set the value to '' if it doesn't exist
    if (!options[v]) {
      v = SPECIALNIL
      dv = undefined
    }

    if (props.SelectProps && props.SelectProps.native) {
      if (placeholder) {
        if (doesAllowEmpty) {
          selectOptions.push(
            <option key={SPECIALNIL} value={SPECIALNIL}>
              {placeholder}
            </option>,
          )
        } else {
          selectOptions.push(
            <option disabled key={SPECIALNIL} value={SPECIALNIL}>
              {placeholder}
            </option>,
          )
        }
      }
      for (const k in options) {
        ((key) => {
          const opt = options[key]

          selectOptions.push(
            <option key={key} value={key}>
              {opt}
            </option>,
          )
        })(k)
      }
    } else {
      if (placeholder) {
        if (doesAllowEmpty) {
          selectOptions.push(
            <MenuItem key={SPECIALNIL} value={SPECIALNIL}>
              {placeholder}
            </MenuItem>,
          )
        } else {
          selectOptions.push(
            <MenuItem disabled key={SPECIALNIL} value={SPECIALNIL}>
              {placeholder}
            </MenuItem>,
          )
        }
      }

      for (const k in options) {
        ((key) => {
          const opt = options[key]
          selectOptions.push(
            <MenuItem key={key} value={key}>
              {opt}
            </MenuItem>,
          )
        })(k)
      }
    }
  }

  const [actualValue, setActualValue] = useState(v || dv)

  if (isFunction(oc)) {
    const wssoc = wrapSelectSetter(oc)
    oc = (e) => {
      setActualValue(e.target ? e.target.value : e)
      return wssoc(e)
    }
  }

  if (isFunction(ob)) {
    const wrappedOb = wrapSelectSetter(ob)
    ob = wrappedOb

    if (!isFunction(oc)) {
      oc = useMemo(() => {
        let onChangeTimeoutId = -1

        return (ev) => {
          setActualValue(ev.target ? ev.target.value : ev)
          if (disableAutoChange) {
            return
          }

          clearTimeout(onChangeTimeoutId)

          const { target } = ev

          if (isSelect) {
            wrappedOb({
              target,
            })
          } else {
            onChangeTimeoutId = setTimeout(() => {
              wrappedOb({
                target,
              })
            }, 500)
          }
        }
      }, [onBlur])
    }
  }

  // update component if value is different than actual value
  useEffect(() => {
    if (v !== actualValue) {
      requestAnimationFrame(() => setActualValue(v))
    }
  }, [v])

  ob = wrapSensitiveBlur(ob)
  of = wrapSensitiveFocus(of)

  const IC = InnerComponent || TextField
  const InputPropsCheck = InputProps || {}

  const shrinkInputLabelProps = !!(focused
    || (inputRef && inputRef.value)
    || !!v
    || !!dv
    || !!actualValue
    || shrink
    || isSelect
    || placeholder
    || InputPropsCheck.startAdornment
    || InputPropsCheck.endAdornment)

  return (
    <IC
      {...props}
      inputRef={inputRef}
      select={select}
      options={options}
      placeholder={isSelect ? '' : placeholder}
      type={(isSensitive && !focused) ? 'password' : type}
      value={actualValue}
      defaultValue={actualValue ? undefined : dv}
      onChange={isSelect ? (oc || ob) : oc}
      onBlur={isSelect ? wrapSensitiveBlur() : ob}
      onFocus={of}
      InputProps={InputProps}
      InputLabelProps={
        {
          shrink: shrinkInputLabelProps,
          ...InputLabelProps,
        }
      }
    >
      {selectOptions}
    </IC>
  )
}

export default control(BaseMUIText)
