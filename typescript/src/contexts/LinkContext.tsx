import React, { createContext, useEffect, useState } from 'react';
import { LinkData, LinksByTheme } from '../components/mainflow/types';

const specialThemeLinks: LinkData[] = [
  {
    functionalName: "Lien 1",
    technicalName: "link1",
    key: "link1",
    id: "link1",
    theme: "Special Theme",
    arrowStyle: {
      color: "green",
      border: "solid",
      thickness: "2px",
      cursor: "pointer",
    },
    children: [],
    attributes: [{ isSelected: false }],
  },
  {
    functionalName: "Lien 2",
    technicalName: "link2",
    key: "link2",
    id: "link2",
    theme: "Special Theme",
    arrowStyle: {
      color: "blue",
      border: "dashed",
      thickness: "3px",
      cursor: "pointer",
    },
    children: [],
    attributes: [{ isSelected: false }],
  },
];

interface LinkContentProps {
    linksByTheme: LinksByTheme;
    setLinksByTheme: (linksByTheme: LinksByTheme) => void;
    isUpdating: boolean;
    setIsUpdating: (isUpdating: boolean) => void;
    selectedNode : LinkData;
    setSelectedNode : (selectedNode : LinkData) => void;
}

export const LinkContent = createContext<LinkContentProps>({
    linksByTheme: {},
    setLinksByTheme: () => { },
    isUpdating: false,
    setIsUpdating: () => { },
    selectedNode: {} as LinkData,
    setSelectedNode: () => { },
});

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialData = JSON.parse(localStorage.getItem('themeSelectorData') || '{}');
    const [linksByTheme, setLinksByTheme] = useState<LinksByTheme>({
        ...initialData.linksByTheme,
        'Special Theme': specialThemeLinks,
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedNode, setSelectedNode] = useState<LinkData>({} as LinkData);

    useEffect(() => {
        const updatedData = { ...initialData, linksByTheme };
        localStorage.setItem('themeSelectorData', JSON.stringify(updatedData));
    }, [linksByTheme]);

    return (
        <LinkContent.Provider value={{ linksByTheme, setLinksByTheme, isUpdating, setIsUpdating, selectedNode, setSelectedNode}}>
            {children}
        </LinkContent.Provider>
    );
};