import React from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};
