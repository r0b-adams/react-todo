import React from 'react'

export default function ListItem({text, id, handleComplete}) {
    return (
        <li>
            <span>
                {text}
            </span>
            <button type='button' onClick={() => handleComplete(id)}>
                Mark Complete
            </button>
        </li>
    )
}
