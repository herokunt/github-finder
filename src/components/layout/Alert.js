import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {

  const alertContext = useContext(AlertContext)
  const { alert } = alertContext

  if (alert === null) {
    return ''
  } else {
    return (
      <div className="has-text-centered">
        <p className={alert.type}>{alert.message}</p>
      </div>
    )
  }
}

export default Alert
