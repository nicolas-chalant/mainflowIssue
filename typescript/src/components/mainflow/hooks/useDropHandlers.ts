import { useCallback } from 'react';
import { FlowchartNodeData, FlowchartState, UseDropHandlersParams } from "../types";
import { Node, Edge, ReactFlowInstance } from "reactflow";
import { v4 as uuidv4 } from 'uuid';

interface NodePositions {
  [nodeId: string]: { x: number; y: number };
}

export const useDropHandlers = (
    { reactFlowWrapper,
        reactFlowInstance,
        flowNodes,
        selectedNode,
        setFlowNodes,
        setNewNodeCreated,
        edges }: UseDropHandlersParams
) => {
    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        const position = reactFlowInstance?.project({
            x: event.clientX - (reactFlowBounds?.left ?? 0),
            y: event.clientY - (reactFlowBounds?.top ?? 0),
        });

        if (position) {
            const isOverSelectedThemeNode = flowNodes.some(node => {
                if (!node.data.isThemeNode || node.id !== selectedNode?.id) return false;
            
                const nodeWidth = parseInt(String(node.style?.width ?? "300"), 10);
                const nodeHeight = parseInt(String(node.style?.height ?? "150"), 10);
                

                const nodeX = node.position.x;
                const nodeY = node.position.y;
            
                return (
                    position.x >= nodeX &&
                    position.x <= nodeX + nodeWidth &&
                    position.y >= nodeY &&
                    position.y <= nodeY + nodeHeight + 50
                );
            });

            event.dataTransfer.dropEffect = isOverSelectedThemeNode ? 'move' : 'none';
        }
    }, [reactFlowWrapper, reactFlowInstance, flowNodes, selectedNode]);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const objectWidth = 70;
        const objectHeight = 40;

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        if (!reactFlowBounds || !reactFlowInstance) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        let nodeUnderDrop: Node<FlowchartNodeData> | null = null;
        let correctedPosition = { x: position.x - objectWidth, y: position.y - objectHeight  };

        setFlowNodes((prevFlowNodes) => {
            const newFlowNodes = [...prevFlowNodes];

            prevFlowNodes.forEach(node => {
                const nodeWidth = parseInt(String(node.style?.width ?? "300"), 10);
                const nodeHeight = parseInt(String(node.style?.height ?? "150"), 10);
                const nodeX = node.position.x;
                const nodeY = node.position.y;

                if (node.data.isThemeNode && node.id === selectedNode?.id && position.x >= nodeX && position.x <= nodeX + nodeWidth && position.y >= nodeY && position.y <= nodeY + nodeHeight + 50) {
                    nodeUnderDrop = node;
                    correctedPosition.x = Math.max(nodeX, Math.min(nodeX + nodeWidth - objectWidth, correctedPosition.x));
                    correctedPosition.y = Math.max(nodeY, Math.min(nodeY + nodeHeight - objectHeight, correctedPosition.y));

                    const tempId = `object-${Math.random()}`;

                    const newNode = {
                        id: tempId,
                        type: 'customNode',
                        position: correctedPosition,
                        data: {
                          label: event.dataTransfer.getData('application/reactflow'),
                          theme: node.data.theme,
                          color: "black",
                          parentId: node.id,
                          handleIds: {
                            top: `${tempId}-handle-top-${uuidv4()}`,
                            bottom: `${tempId}-handle-bottom-${uuidv4()}`,
                            left: `${tempId}-handle-left-${uuidv4()}`,
                            right: `${tempId}-handle-right-${uuidv4()}`,
                          },
                        },
                        
                      };
                    newFlowNodes.push(newNode);
                    setNewNodeCreated(true);
                }
            });

            if (!nodeUnderDrop) {
                alert("You can only drop items onto the currently selected theme node.");
                return prevFlowNodes;
            }

            const objectNodesInitialPositions: NodePositions = newFlowNodes.reduce((acc: NodePositions, node) => {
                if (!node.data.isThemeNode) {
                    acc[node.id] = { x: node.position.x, y: node.position.y };
                }
                return acc;
            }, {});

            return newFlowNodes;
        });
    }, [reactFlowWrapper, reactFlowInstance, selectedNode, setFlowNodes, setNewNodeCreated, edges]);

    return { onDragOver, onDrop };
};