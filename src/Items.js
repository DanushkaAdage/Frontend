import React from 'react'

export default function Item({ item, toggleItem }) {
    function handleItemClick() {
        toggleItem(item.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={item.complete} onChange={handleItemClick}/>
                {item.name}
            </label>
        </div>
    )
}
