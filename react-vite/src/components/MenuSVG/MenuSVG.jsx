
import "./MenuSVG.css";

function MenuSVG({ text, onClick }) {
    if (text == 'DEMO LOGIN' || text == 'LOG OUT') {
        return (
            <svg
                className='menu-svg-blue'
                width='150'
                height='40'
                onClick={onClick}>
                <polygon
                    // points='0,0 140,0 140,20 150,30 150,40 20,40 0,20'
                    points='20,0 150,0 150,10 140,20 140,40 0,40 0,20'
                />
                <text x='75' y='25' textAnchor='middle' fill="#010118">{text}</text>
            </svg>
        )
    }
    return (
        <svg
            className='menu-svg'
            width='150'
            height='40'
            onClick={onClick}>
            <polygon
                points='0,0 140,0 140,20 150,30 150,40 20,40 0,20'
            />
            <text x='75' y='25' textAnchor='middle' fill="#010118">{text}</text>
        </svg>
    )
}

export default MenuSVG;
