import moment from 'moment-timezone'
import { getLanguage } from './language'

export const rfc3339  = 'YYYY-MM-DDTHH:mm:ssZ'
export const mmddyyyy = 'MM/DD/YYYY'
export const yyyymmdd = 'YYYY/MM/DD'
export const ddmmyyyy = 'DD/MM/YYYY'

// get the prefered format
export const defaultFormat = () => {
  if (getLanguage() == 'en-US') {
    return mmddyyyy
  } else {
    return ddmmyyyy
  }
}

// render a date in a format, or use defualt format if non is provided
export const renderDate = (date, format) => {
  if (!format) {
    format = defaultFormat()
  }

  return moment(date).format(format)
}

// render a date for the UI
export const renderUIDate = (date) => {
  if (!date) {
    return ''
  }

  return renderDate(date)
}

// rander a date for the json (rfc3339)
export const renderJSONDate = (date)=> {
  return renderDate(date, rfc3339)
}
