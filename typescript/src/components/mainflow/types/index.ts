
import { CSSProperties } from 'react';
import { ReactFlowInstance as ReactFlowInstanceBase } from 'reactflow';
import { Node, Edge } from "reactflow";

export interface FlowchartNodeData {
  label: string;
  theme: string;
  color: string;
  linkType?: string;
  isThemeNode?: boolean;
  parentId?: string;
  handleIds?: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}

export interface LinkData {
  functionalName: string;
  technicalName: string;
  key: string;
  id: string;
  theme: string;
  linkType?: string;
  type?: 'inheritance' | 'extension';
  arrowStyle: {
    color: string;
    border: string;
    thickness: string;
    cursor: string;
  };
  children: LinkData[];
  attributes: { isSelected: boolean }[];
}

export interface LinkDisplayProps {
  link: LinkData;
}

export interface ObjectByThemeItem {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    className: string;
    category: string;
    label: string;
    color: string;
    minWidth: number;
    minHeight: number;
  };
  style: {
    zIndex: number;
    color: string;
    background: string;
    width: string;
    height: string;
  };
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: { x: number; y: number };
  dragging: boolean;
  hidden: boolean;
  draggable: boolean;
}

export interface ObjectByTheme {
  [key: string]: ObjectByThemeItem[];
}

export interface DraggableObjectProps {
  label: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, label: string) => void;
}

export interface FlowchartSchema {
  nodes: {
    id: string;
    type: 'default' | 'customNode';
    data: FlowchartNodeData;
    position: {
      x: number;
      y: number;
    };
    style: CSSProperties;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    style: {
      stroke: string;
      strokeDasharray?: string | undefined;
      strokeWidth: number;
    };
  }[];
}

export interface FlowchartState {
  nodes: Node<FlowchartNodeData>[];
  edges: Edge[];
  objectNodesInitialPositions: { [nodeId: string]: { x: number; y: number } };
}

export type UseNodeDragParams = {
  setActiveDragNode: React.Dispatch<React.SetStateAction<string | null>>,
  setInitialNodePosition: React.Dispatch<React.SetStateAction<{ [key: string]: { x: number; y: number } }>>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setFlowNodes: React.Dispatch<React.SetStateAction<Node<FlowchartNodeData>[]>>,
  initialNodePosition: { [key: string]: { x: number; y: number } },
  flowNodes: Node<FlowchartNodeData>[],
  newNodeCreated: boolean,
  setNewNodeCreated: React.Dispatch<React.SetStateAction<boolean>>,
  edges: Edge[]
};

export type UseEdgesParams = {
  selectedLink: LinkData | null,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
};

export type UseDropHandlersParams = {
  reactFlowWrapper: React.RefObject<HTMLDivElement>,
  reactFlowInstance: ReactFlowInstanceBase | null,
  flowNodes: Node<FlowchartNodeData>[],
  selectedNode: Node<FlowchartNodeData> | null,
  setFlowNodes: React.Dispatch<React.SetStateAction<Node<FlowchartNodeData>[]>>,
  setNewNodeCreated: React.Dispatch<React.SetStateAction<boolean>>,
  edges: Edge[]
};

export type useNodeInteractionParams = {
  setIsSidebarOpen: React.Dispatch<boolean>,
  setSelectedNode: (selectedNode: Node<FlowchartNodeData>) => void,
  isRedoing: boolean,
  activeDragNode: string | null,
  isDragging: boolean,
  newNodeCreated: boolean,
  setNewNodeCreated: React.Dispatch<React.SetStateAction<boolean>>,
  edges: Edge[],
  setFlowNodes: React.Dispatch<React.SetStateAction<Node<FlowchartNodeData>[]>>,
  selectedNode: Node<FlowchartNodeData> | null
}

export interface LinksByTheme {
  [theme: string]: LinkData[];
}
