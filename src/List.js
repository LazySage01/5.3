import React from 'react'

const List = ({items}) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}> 
          {JSON.stringify(item)} 
        </li> 
      )) }
    </ul>
  )
}

export default List