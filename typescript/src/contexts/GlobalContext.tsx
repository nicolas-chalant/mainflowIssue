import React, { createContext, useState } from 'react';

interface GlobalProps {
    isSidebarOpen: boolean; // ! For now it is not connected for the sidebar (it has a local state)
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

export const GlobalContext = createContext<GlobalProps>({
    isSidebarOpen: false,
    setIsSidebarOpen: () => { },
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
            {children}
        </GlobalContext.Provider>
    );
};
