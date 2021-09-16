import React from 'react'

import List from '../List';

export default function ListBox({handleComplete, handleCompleteAll, todos}) {

    return (
        <section>

        {/* prop here */}
        <h2>To Do</h2>

        {/* props here */}
        <p>{todos.length} Items Remaining</p>

        {/* factor out filter */}
        <List todos={todos}
              handleComplete={handleComplete}  />

        <button type='button' onClick={() => handleCompleteAll()}>Complete All</button>

      </section>
    )
}
