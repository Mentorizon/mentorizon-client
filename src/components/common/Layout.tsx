import React, { ReactNode } from 'react';
import AppNavbar from "./AppNavbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <AppNavbar />
            <div className="main-content-container">{children}</div>
        </div>
    );
};

export default Layout;
