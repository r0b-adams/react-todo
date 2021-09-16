import React from 'react'

import ListItem from '../ListItem'

export default function List({todos, handleComplete}) {
    return (
        <ul>
            {todos.map(todo => <ListItem key={todo.id}
                                         id={todo.id}
                                         text={todo.text}
                                         handleComplete={handleComplete}/>)}
        </ul>
    )
}
