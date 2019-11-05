import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactComponent as Logo } from "../../resources/logo.svg";
import { getCookie, setCookie } from "../../helper/cookies";
import { withRouter } from "react-router";

const NavBar = props => {
	const setUser = () => {
		const username = getCookie("username");
		if (username !== "") {
			return (
				<NavDropdown
					id="nav-dropdown"
					title={<span className="text-white">{username}</span>}
					alignRight
				>
					<NavDropdown.Item active={false} eventKey="profile">
						Profile
					</NavDropdown.Item>
					<NavDropdown.Item active={false} eventKey="logout">
						Logout
					</NavDropdown.Item>
				</NavDropdown>
			);
		} else {
			return (
				<LinkContainer
					exact
					tag={Nav.Link}
					className="nav-link text-white"
					activeClassName="active underline"
					to="/login"
				>
					<Nav.Item>Login</Nav.Item>
				</LinkContainer>
			);
		}
	};

	const handleSelect = async e => {
		switch (e) {
			case "profile":
				props.history.push("/profile");
				break;
			case "logout":
				const response = await fetch("/public/logout", {
					method: "POST",
					credentials: "include",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					setCookie("username", "temp", 0);
					props.history.push("/login");
				}
				break;
			default:
				break;
		}
	};

	return (
		<Navbar collapseOnSelect expand="sm" variant="dark" className="theme-blue">
			<Navbar.Brand className="text-white d-flex center">
				Yakker
				<Logo className="mx-1" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ml-auto">
					<LinkContainer
						exact
						tag={Nav.Link}
						className="nav-link text-white"
						activeClassName="active underline"
						to="/"
					>
						<Nav.Item>Home</Nav.Item>
					</LinkContainer>

					<LinkContainer
						exact
						tag={Nav.Link}
						className="nav-link text-white"
						activeClassName="active underline"
						to="/about"
					>
						<Nav.Item>About</Nav.Item>
					</LinkContainer>
				</Nav>
				<Nav onSelect={handleSelect}>{setUser()}</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default withRouter(NavBar);
