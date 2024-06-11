import React, { useContext, useEffect, useState, useMemo, useRef, CSSProperties } from "react";
import ReactFlow, { Controls, ReactFlowProvider, ReactFlowInstance, NodeProps, Edge } from "reactflow";
import { FlowchartNodeData, FlowchartSchema, LinkData } from "../types";
import { MainFlow } from "../../../contexts/MainFlow";
import ResizableNode from "./chart/ResizableNode";
import { GlobalContext } from "../../../contexts/GlobalContext";
import CustomNode from "./chart/CustomNode";
import debounce from 'lodash/debounce';
import '../styles/Flowchart.scss';
import "reactflow/dist/style.css";
import { useEdges } from "../hooks/useEdges";
import { useDropHandlers } from "../hooks/useDropHandlers";
import { useNodeInterraction } from "../hooks/useNodeInterraction";
import { useFlowchartNode } from "../hooks/useFlowchartNode";
import { LinkContent } from "../../../contexts/LinkContext";

const hardcodedThemes: string[] = ["Special Theme"];
const hardcodedThemeColors: { [key: string]: string } = {
  "Special Theme" : "#FF5733",
};

const Flowchart: React.FC = () => {
  const { selectedNode, setSelectedNode, selectedLink, setSelectedLink } = useContext(MainFlow);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(GlobalContext);
  const [activeDragNode, setActiveDragNode] = useState<string | null>(null);
  const [isFlowchartReset, setIsFlowchartReset] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [newNodeCreated, setNewNodeCreated] = useState(false);
  const [isRedoing, setIsRedoing] = useState(false);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { flowNodes, setFlowNodes } = useFlowchartNode(hardcodedThemes, hardcodedThemeColors);

  const [schema, setSchema] = useState<FlowchartSchema>({
    nodes: [],
    edges: [],
  });

  const nodeTypes = useMemo(
    () => ({
      default: (props: NodeProps<FlowchartNodeData>) => <ResizableNode data={props.data} />,
      customNode: (props: NodeProps<FlowchartNodeData>) => <CustomNode {...props} />,
    }),
    [selectedLink]
  );

  const onInit = (instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  };

  useEffect(() => {
    if (reactFlowInstance) {
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.1 });
      }, 10);
      setIsFlowchartReset(false);
    }
  }, [isSidebarOpen, reactFlowInstance, isFlowchartReset]);

  useEffect(() => {
    const savedSchema = localStorage.getItem('flowchartSchema');
    if (savedSchema) {
      const { nodes, edges } = JSON.parse(savedSchema);
      if (nodes.length === 0 && edges.length === 0) return;
      setFlowNodes(nodes);
      setEdges(edges);
    }
  }, []);

  useEffect(() => {
    setSchema({
      nodes: flowNodes.map((node) => ({
        id: node.id,
        type: node.type as 'default' | 'customNode',
        data: node.data,
        position: node.position,
        style: node.style as CSSProperties,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        style: edge.style as {
          stroke: string;
          strokeDasharray?: string;
          strokeWidth: number;
        },
      })),
    });
  }, [flowNodes, edges]);

  useEffect(() => {
    const debouncedSaveSchema = debounce(() => {
      localStorage.setItem('flowchartSchema', JSON.stringify(schema));
    }, 500);

    debouncedSaveSchema();

    return () => {
      debouncedSaveSchema.cancel();
    };
  }, [schema]);

  const { onConnect } = useEdges({ selectedLink, setEdges });

  const { onDragOver, onDrop } = useDropHandlers({
    reactFlowWrapper,
    reactFlowInstance,
    flowNodes,
    selectedNode,
    setFlowNodes,
    setNewNodeCreated,
    edges
  });


  const { onNodeClick, onNodesChange } = useNodeInterraction({
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
  });

  return (
    <div style={{ height: '100%', width: "100%" }}>
      <ReactFlowProvider>
        <div style={{ height: '80%', width: '100%', paddingTop: "5vh" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={flowNodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            nodesDraggable={true}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            nodeTypes={nodeTypes}
            onInit={onInit}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onConnect={onConnect}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Flowchart;