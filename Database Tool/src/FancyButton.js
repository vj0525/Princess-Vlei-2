import './FancyButton.css';
export default function Button( {title} ){
    return (
        <div className="fancy-button">
            {title}
        </div>
    )
}