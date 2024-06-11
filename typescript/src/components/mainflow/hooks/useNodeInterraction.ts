import { useState, useEffect, useCallback } from 'react';
import { Node, NodeChange, applyNodeChanges } from '@reactflow/core';
import { FlowchartNodeData, useNodeInteractionParams } from '../types';

export const useNodeInterraction = ({
    setIsSidebarOpen,
    setSelectedNode,
    isRedoing,
    activeDragNode,
    isDragging,
    newNodeCreated,
    setNewNodeCreated,
    edges,
    setFlowNodes,
    selectedNode
}: useNodeInteractionParams) => {
    const onNodeClick = (event: any, node: Node<FlowchartNodeData>) => {
        setIsSidebarOpen(true);
        if (node.data.isThemeNode) {
            setSelectedNode(node);
        }
    };


    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {

            if (isRedoing) return;
            setFlowNodes((currentNodes) => {
                const newNodes = applyNodeChanges(changes, currentNodes);

                changes.forEach((change) => {
                    if (change.type === 'position') {
                        const originalNode = currentNodes.find((n) => n.id === change.id);
                        if (originalNode?.data.isThemeNode) {
                            const deltaX = change.position ? (change.position.x ?? 0) - originalNode.position.x : 0;
                            const deltaY = change.position ? (change.position.y ?? 0) - originalNode.position.y : 0;

                            newNodes.forEach((node) => {
                                if (node.data.parentId === change.id) {
                                    node.position.x += deltaX;
                                    node.position.y += deltaY;
                                }
                            });
                        }
                    }
                });

                const modifiedNodes = newNodes.map((node) => {
                    if (!node.data.isThemeNode && activeDragNode === node.id) {
                        const nodeUnderObject = newNodes.find((themeNode) => {
                            if (!themeNode.data.isThemeNode) return false;
                            const themeNodeRect = {
                                x: themeNode.position.x,
                                x2: themeNode.position.x + parseInt(String(themeNode.style?.width ?? "300"), 10),
                                y: themeNode.position.y,
                                y2: themeNode.position.y + parseInt(String(themeNode.style?.height ?? "150"), 10),
                            };
                            const nodeRect = {
                                x: node.position.x,
                                x2: node.position.x + 100,
                                y: node.position.y,
                                y2: node.position.y + 50,
                            };
                            return (
                                nodeRect.x2 >= themeNodeRect.x &&
                                nodeRect.x <= themeNodeRect.x2 &&
                                nodeRect.y2 >= themeNodeRect.y &&
                                nodeRect.y <= themeNodeRect.y2
                            );
                        });

                        const isOverDifferentTheme = nodeUnderObject && nodeUnderObject.id !== node.data.parentId && nodeUnderObject.id !== selectedNode?.id;

                        return {
                            ...node,
                            style: {
                                ...node.style,
                                border: isOverDifferentTheme ? '2px solid red' : nodeUnderObject ? '2px solid green' : '2px solid red',
                                borderRadius: 7,
                            },
                        };
                    } else if (!node.data.isThemeNode) {
                        return {
                            ...node,
                            style: { ...node.style, border: 'none' },
                        };
                    }
                    return node;
                });

                if (!isDragging && !newNodeCreated) {
                    // console.log('onNodesChange inside the if')
                    //todo : understand how to not call updateStateHistory when we redo an action (because the futureStates is set to [] when we redo an action)
                    // updateStateHistory({ nodes: modifiedNodes, edges });
                } else if (newNodeCreated) {
                    setNewNodeCreated(false);
                }

                return modifiedNodes;
            });
        },
        [ edges, activeDragNode, selectedNode]
    );
    return { onNodeClick, onNodesChange };
};