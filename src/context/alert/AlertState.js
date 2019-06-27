import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { SET_ALERT, REMOVE_ALERT } from '../types'

const AlertState = props => {

  // in this case since there would be only one property (alert) we can set the state directly like so
  const initialState = null

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  // Set Alert
  const setAlert = (message, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type }
    })

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT
      })
    }, 3500)
  }

  // props are passed automatically, and props.children are every other component this Context Provider wraps.
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
