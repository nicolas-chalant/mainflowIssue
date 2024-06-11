import React, { useContext, useEffect, useState } from "react";
import { MainFlow } from "../../../../contexts/MainFlow";
import { LinkContent } from "../../../../contexts/LinkContext";
import { isBackgroundLight } from "../../../../helpers/helper";
import { LinkData, ObjectByTheme, ObjectByThemeItem } from "../../types";
import "../../styles/Sidebar.scss";
import DraggableObject from "../chart/DraggableObject";
import LinkDisplay from "../chart/LinkDisplay";

const enrichLinks = (links: LinkData[], linkTypes: Record<string, string>): LinkData[] => {
    return links.map(link => ({
        ...link,
        linkType: linkTypes[link.key] || "Ref-Ref",
        children: link.children ? enrichLinks(link.children, linkTypes) : []
    }));
};

const MainflowSidebar: React.FC = () => {
    const { selectedNode } = useContext(MainFlow);
    const { linksByTheme } = useContext(LinkContent);
    const initialData = JSON.parse(localStorage.getItem('themeSelectorData') || '{}');
    const [selectedLinkType, setSelectedLinkType] = useState(initialData.selectedLinkType || {});
    const [enrichedLinks, setEnrichedLinks] = useState<LinkData[]>([]);

    const [objectByTheme, setObjectByTheme] = useState<ObjectByTheme>({
        "Special Theme": [
            {
                "id": "object-1",
                "type": "ResizableParentNode",
                "position": {
                    "x": 378.1326329686697,
                    "y": 91.2297594757083
                },
                "data": {
                    "className": "node-conteneur",
                    "category": "container",
                    "label": "Special Theme",
                    "color": "#060637",
                    "minWidth": 400,
                    "minHeight": 200
                },
                "style": {
                    "zIndex": -1,
                    "color": "#060637",
                    "background": "#060637",
                    "width": "auto",
                    "height": "auto"
                },
                "width": 400,
                "height": 200,
                "selected": false,
                "positionAbsolute": {
                    "x": 378.1326329686697,
                    "y": 91.2297594757083
                },
                "dragging": false,
                "hidden": false,
                "draggable": true
            },
            {
                "id": "object-2",
                "type": "ResizableParentNode",
                "position": {
                    "x": 378.1326329686697,
                    "y": 91.2297594757083
                },
                "data": {
                    "className": "node-conteneur",
                    "category": "container",
                    "label": "Special Theme",
                    "color": "#060637",
                    "minWidth": 400,
                    "minHeight": 200
                },
                "style": {
                    "zIndex": -1,
                    "color": "#060637",
                    "background": "#060637",
                    "width": "auto",
                    "height": "auto"
                },
                "width": 400,
                "height": 200,
                "selected": false,
                "positionAbsolute": {
                    "x": 378.1326329686697,
                    "y": 91.2297594757083
                },
                "dragging": false,
                "hidden": false,
                "draggable": true
            }
        ]
    });

    useEffect(() => {
        if (selectedNode?.data?.theme) {
            const links = linksByTheme[selectedNode.data.theme];
            if (links) {
                const enriched = enrichLinks(links, selectedLinkType);
                setEnrichedLinks(enriched);
            } else {
                setEnrichedLinks([]);
            }
        }
    }, [selectedNode, linksByTheme, selectedLinkType]);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, label: string) => {
        event.dataTransfer.setData('application/reactflow', label);
    };

    return (
        <div className="sidebar-container">
            {selectedNode && selectedNode.data && (
                <div>
                    <div className="theme-label" style={{ backgroundColor: selectedNode.data.color, color: isBackgroundLight(selectedNode.data.color) ? "black" : "white" }}>
                        {selectedNode.data.label}
                    </div>
                    <div className="section-title">Links</div>
                    <div className="link-container">
                        {enrichedLinks.map((link, index) => (
                            <LinkDisplay key={index} link={link} />
                        ))}
                    </div>
                    <div className="section-title">Objects</div>
                    <div className="object-container">
                        {objectByTheme[selectedNode.data.label]?.map((object: ObjectByThemeItem, i: number) => (
                            <div className="object-item">
                                <DraggableObject
                                    key={i}
                                    label={object.id}
                                    onDragStart={handleDragStart}
                                />
                            </div>
                        ))}
                    </div>


                </div>
            )}

            {(!selectedNode || !selectedNode.data || !selectedNode.data.color) && (
                <div className="no-selection-message">
                    Please select a theme to display its links and objects
                </div>
            )}
        </div>
    );
};

export default MainflowSidebar;