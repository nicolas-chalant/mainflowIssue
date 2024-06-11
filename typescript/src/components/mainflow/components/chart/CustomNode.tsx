import React, { memo, useContext, useEffect, useState, useRef } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FlowchartNodeData, LinkData } from '../../types';
import { MainFlow } from '../../../../contexts/MainFlow';


const CustomNode = ({ data }: NodeProps<FlowchartNodeData>) => {
  const { selectedLink } = useContext(MainFlow);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    setBool(!isEmptyObject(selectedLink));
  }, [selectedLink]);

  function isEmptyObject(obj: LinkData) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  useEffect(() => {
    console.log("Handles for node:", data.handleIds);
}, [data.handleIds]);


  return (
    <div
      style={{
        padding: '8px',
        border: `1px solid ${data.color}`,
        borderRadius: '4px',
        backgroundColor: 'white',
        color: data.color,
        position: 'relative',
      }}
    >
      {data.label}
      {bool && data && data.handleIds && (
        <>
          <Handle type="target" position={Position.Top} id={data.handleIds.top} />
          <Handle type="source" position={Position.Bottom} id={data.handleIds.bottom}  />
          <Handle type="target" position={Position.Left} id={data.handleIds.left}  />
          <Handle type="source" position={Position.Right} id={data.handleIds.right}  />
        </>
      )}
    </div>
  );
};

export default memo(CustomNode);
