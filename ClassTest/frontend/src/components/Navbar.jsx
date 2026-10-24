import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav>
			<Link to="/">Home</Link>{' | '}
			<Link to="/form">Profile Form</Link>{' | '}
			<Link to="/api/profile">All Profiles</Link>
		</nav>
	)
}

export default Navbar
