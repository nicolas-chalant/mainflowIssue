import { memo, useEffect } from 'react'; 
import { Handle, Position, NodeResizer } from 'reactflow'; 
import { FlowchartNodeData } from '../../types';
import { isBackgroundLight } from '../../../../helpers/helper';

const ResizableNode = ({ data }: { data: FlowchartNodeData }) => { 
  const color = data.color || 'transparent';
  
  return ( 
    <div style={{ 
      color: data.color, 
      fontWeight: "bold", 
      width: '100%', 
      height: '100%', 
      borderRadius: '8px', 
      position: 'relative' 
    }}>
      <NodeResizer minWidth={100} minHeight={30} /> 
      <div style={{ 
        backgroundColor: data.color, 
        color: isBackgroundLight(color)? "black" : "white", 
        padding: "8px", 
        borderRadius: "8px 8px 0 0", 
        margin: 0 
      }}> 
        {data.theme} 
      </div> 
    </div>
  ); 
}; 

export default memo(ResizableNode);
