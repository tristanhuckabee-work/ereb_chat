import "./ServerMenu.css";

function ServerMenu({ server }) {
    const handleClick = (e) => {
        e.preventDefault();
    }

    return (
        <div className='server-menu'>
            {server.name}
        </div>
    )
}

export default ServerMenu;
