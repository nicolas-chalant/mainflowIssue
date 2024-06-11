import React, { createContext, useState } from 'react';
import { FlowchartNodeData, LinkData } from '../components/mainflow/types';
import { Node } from 'reactflow';

interface MainFlowProps {
    selectedNode: Node<FlowchartNodeData>;
    setSelectedNode: (selectedNode: Node<FlowchartNodeData>) => void;
    selectedLink: LinkData;
    setSelectedLink: (selectedLink: LinkData) => void;
}

export const MainFlow = createContext<MainFlowProps>({
    selectedNode: {} as Node<FlowchartNodeData>,
    setSelectedNode: () => { },
    selectedLink: {} as LinkData,
    setSelectedLink: () => { },
});

export const MainFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedNode, setSelectedNode] = useState<Node<FlowchartNodeData>>({} as Node<FlowchartNodeData>);
    const [selectedLink, setSelectedLink] = useState<LinkData>({} as LinkData);

    return (
        <MainFlow.Provider value={{ selectedNode, setSelectedNode, selectedLink, setSelectedLink}}>
            {children}
        </MainFlow.Provider>
    );
};
