"use client";

import { useState } from 'react';
import { reformat_millie } from '@/utils/reformat_millie'

const Form = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const response = reformat_millie(inputValue);
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full h-full p-4">
            <label htmlFor="inputBox" className="block mb-2 text-lg">Input:</label>
            <textarea
                id="inputBox"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 mb-4 text-black border rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
    );
}

export default Form;
