import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { setCookie } from "../../helper/cookies";

const Login = props => {
	const handleRedirect = () => {
		props.history.push("/register");
	};

	// Setup the spinner animation for the submission button
	const [isLoading, setIsLoading] = useState(false);
	const handleSpinner = () => {
		if (isLoading) {
			return (
				<div>
					<Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					Loading...
				</div>
			);
		} else {
			return "Submit";
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);
		const form = e.currentTarget;
		const response = await fetch("/public/login", {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: form.email.value,
				password: form.password.value
			})
		});
		setIsLoading(false);
		let resp = await response.json();
		if (response.ok) {
			setError({
				type: "success",
				payload: ["Login Successful. Redirecting..."]
			});
			setCookie("username", resp.username, 9999);
			setTimeout(() => {
				props.history.push("/");
			}, 4500);
		} else {
			setError({ type: "danger", payload: [resp.message] });
		}
	};

	// Setup user error logs for display
	const [errorObj, setError] = useState({ type: "success", payload: [] });
	const errorLogs = () => {
		const classStyle = `bg-${errorObj.type} font-weight-bold text-white w-100 p-2 mb-1`;
		const errorResult = errorObj.payload.map((err, id) => (
			<div key={`error_${id}`} className={classStyle}>
				{err}
			</div>
		));
		return errorResult;
	};

	return (
		<div className="section-95 theme-blue flex-col p-3">
			<Form onSubmit={handleSubmit} className="bg-light text-dark p-3">
				<h1 className="text-center">
					LOGIN <FontAwesomeIcon icon={"sign-out-alt"} />
				</h1>

				<div>{errorLogs(errorObj)}</div>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control name="email" type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Form.Group>
					<Button
						className="w-100"
						variant="primary"
						type="submit"
						name="subButton"
					>
						{handleSpinner()}
					</Button>
				</Form.Group>

				<Form.Group>
					<Button className="w-100" variant="danger" onClick={handleRedirect}>
						Register
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default withRouter(Login);
