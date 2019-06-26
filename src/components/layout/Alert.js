import React from 'react'

const Alert = ({ alert }) => {
  if (alert === null) {
    return ''
  } else {
    return (
      <div>
        <p className={alert.type}>{alert.message}</p>
      </div>
    )
  }
}

export default Alert
