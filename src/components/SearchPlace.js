import React, { useState } from 'react';

const SearchPlace = ({ searchText }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        searchText(text)
    }

    return (
        <div className='searchBar pt-5 space-x-2 flex items-center justify-center mb-52'>
        <img width="48" height="48" src="https://img.icons8.com/doodle/48/search--v1.png" alt="search--v1"/>
        <input 
        className='rounded-full p-2 text-white bg-slate-500 outline-teal-500 outline-none' placeholder='Search places' 
        onChange={e => setText(e.target.value)}
        type='text'
        onKeyDown={onSubmit}/>
      </div>
    )
}

export default SearchPlace;