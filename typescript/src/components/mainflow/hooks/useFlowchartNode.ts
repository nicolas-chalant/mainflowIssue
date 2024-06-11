import { useState } from 'react';
import { FlowchartNodeData } from '../types';
import { Node } from 'reactflow';

export const useFlowchartNode = (themes: string[], themeColors: Record<string, string>) => {
  const [flowNodes, setFlowNodes] = useState<Node<FlowchartNodeData>[]>(() => {
    const maxThemesPerLine = 3;
    const nodeWidth = 300;
    const nodeHeight = 150;
    const nodeMargin = 50;

    return themes.map((theme, index) => {
      const lineIndex = Math.floor(index / maxThemesPerLine);
      const columnIndex = index % maxThemesPerLine;
      const x = columnIndex * (nodeWidth + nodeMargin);
      const y = lineIndex * (nodeHeight + nodeMargin);

      return {
        id: `theme-${index}`,
        type: 'default',
        data: { label: theme, theme, color: themeColors[theme], isThemeNode: true },
        position: { x, y },
        style: {
          width: `${nodeWidth}px`,
          height: `${nodeHeight}px`,
          borderRadius: 10,
          border: `1px solid ${themeColors[theme]}`,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: 0,
        },
      };
    });
  });

  return { flowNodes, setFlowNodes };
};
