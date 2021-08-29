import React from 'react'
import Items from './Items'


export default function MyList({items, toggleItem}) {
    return (
        items.map(item => {
            return <Items key={item.id} toggleItem={toggleItem} item={item} />
        })
    )
}
