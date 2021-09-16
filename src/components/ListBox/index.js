import React from 'react'

import List from '../List';

export default function ListBox({complete, handleComplete, handleAll, todos}) {



    return (
        <section>

        <h2>To Do</h2>

        <p>{todos.length} {complete ? 'Items Completed' : 'Items Remaining'}</p>

        <List todos={todos}
              handleComplete={handleComplete}>
        </List>

        <button type='button' onClick={() => handleAll()}>
            {complete ? 'Clear All Completed' : 'Mark All Completed'}
        </button>

      </section>
    )
}
