import React from 'react';

const SectionTitle = ({header, title}) => {
    return (
        <div className='text-center my-8 w-3/12 mx-auto'>
            <h1 className='text-orange-500 pb-4'>--- {header} ---</h1>
            <p className='border-y-4 py-2 text-3xl uppercase'>{title}</p>
        </div>
    );
};

export default SectionTitle;