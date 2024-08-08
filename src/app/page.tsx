"use client";

import { useState } from 'react';
import { reformat_millie } from '@/utils/reformat_millie';

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState<String[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = reformat_millie(inputValue);
        setOutputValue(response);
    };

    return (
        <div className="w-full h-full p-4">
            <form onSubmit={handleSubmit} className="w-full h-auto p-4">
                <label htmlFor="inputBox" className="block mb-2 text-lg">Input:</label>
                <textarea
                    id="inputBox"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 mb-4 text-black border rounded"
                    rows="4"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Response:</h2>
                <pre className="text-black bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap break-words md:text-sm lg:text-base">
                    {outputValue.join('\n')}
                </pre>
            </div>
        </div>
    );
};

export default Form;
