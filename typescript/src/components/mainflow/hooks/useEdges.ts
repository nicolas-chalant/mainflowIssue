import { useCallback, useContext } from 'react';
import { Edge, Connection, addEdge } from 'reactflow';
import { LinkData, UseEdgesParams } from '../types';
import { MainFlow } from '../../../contexts/MainFlow';

export const useEdges = ({ selectedLink, setEdges }: UseEdgesParams) => {
  const { setSelectedLink } = useContext(MainFlow);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => {
      console.log('onConnect', params)
      if (params.source && params.target) {
        console.log("params", params)
        const newEdge: Edge<{ style: { stroke: string; strokeDasharray: string | undefined; strokeWidth: number } }> = {
          id: `edge-${Math.random()}`,
          source: params.source,
          target: params.target,
          sourceHandle: params.sourceHandle,
          targetHandle: params.targetHandle,
          style: {
            stroke: selectedLink?.arrowStyle.color || 'black',
            strokeDasharray: selectedLink?.arrowStyle.border === 'dotted' ? '5 5' : 'solid',
            strokeWidth: parseInt(selectedLink?.arrowStyle.thickness || '1', 10)
          },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
      setSelectedLink({} as LinkData);
    },
    [selectedLink, setEdges]
  );

  return { onConnect };
};
