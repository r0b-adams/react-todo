import React from 'react'

export default function Form({handleInputChange, handleSubmit, value}) {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text'
               placeholder='Enter Todo Item'
               value={value}
               onChange={(e) => handleInputChange(e)}>
        </input>
        <button type='submit'>Save</button>
      </form>
    )
}
