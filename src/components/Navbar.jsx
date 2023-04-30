import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Navbar = () => {
    return (
        <div style={{ height: '40px' }}>
            <Link to="/">
                <Button>Feed </Button>
            </Link>
            <Link to="/share">
                <Button>Share </Button>
            </Link>
            <Link to="/friends">
                <Button>Friends </Button>
            </Link>


        </div>
    )
}

export default Navbar;
