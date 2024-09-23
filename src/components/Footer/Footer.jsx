import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} | <a className='text-white text-decoration-none'
                       href='https://softeis.net/'>SoftEis</a> | Alle Rechte vorbehalten.
                </p>
            </div>
        </footer>
    );
}