import { useContext } from "react";
import { MainFlow } from "../../../../contexts/MainFlow";
import { LinkDisplayProps, LinkData } from "../../types";

const LinkDisplay: React.FC<LinkDisplayProps> = ({ link }) => {
    const { selectedLink, setSelectedLink } = useContext(MainFlow);

    const handleClick = () => {
        if (selectedLink === link) {
            setSelectedLink({} as LinkData);
        } else {
            setSelectedLink(link);
        }
    };

    const isSelected = selectedLink === link;

    return (
        <div className="link-item">
            <div
                className={`link-row ${isSelected ? 'selected' : ''}`}
                onClick={() => handleClick()}
            >
                <div className="link-details">
                    <div className="link-names">
                        <div>{link.functionalName}</div>
                        <div className="technicalName">{link.technicalName}</div>
                    </div>
                    <div className="link-type">{link.linkType}</div>
                </div>
            </div>
            {link.children && link.children.map((child, index) => (
                <div key={index} className="link-item">
                    <LinkDisplay link={child} />
                </div>
            ))}
        </div>
    )
};

export default LinkDisplay;