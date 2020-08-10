import React, { useRef } from 'react'

import control from './control'

import MUIPhoneNumber from './material-ui-phone-number'

//
// *** Hanzo Standardized Material UI Phone Input ***
//
// This control requires onChange
//

export const BaseMUIPhone = ({
  defaultCountry,
  onChange,
  onBlur,
  ...props
}) => {
  const ref = useRef()
  const oc = onChange || onBlur

  return (
    <div ref={ref}>
      <MUIPhoneNumber
        defaultCountry={defaultCountry === undefined ? 'us' : ''}
        onChange={oc}
        {...props}
      />
    </div>
  )
}

export default control(BaseMUIPhone)
