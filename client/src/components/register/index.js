import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";

import { ReactComponent as Smiley } from "../../resources/smiley.svg";

const Register = props => {
	const handleRedirect = () => {
		props.history.push("/login");
	};

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
		const response = await fetch("/public/register", {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: form.username.value,
				email: form.email.value,
				password: form.password1.value,
				password2: form.password2.value
			})
		});
		setIsLoading(false);
		let resp = await response.json();
		if (response.ok) {
			//setError({ type: "success", payload: resp.message });
			document.getElementById("reg-success").className =
				"flex-col center text-dark bg-light p-3 m-2 display-3";
			document.getElementById("reg-form").className = "d-none";
			setTimeout(() => {
				props.history.push("/login");
			}, 4500);
		} else {
			setError({ type: "warning", payload: resp.message });
		}
	};

	const [errorObj, setError] = useState({ type: "success", payload: [] });
	const errorLogs = () => {
		const errorResult = errorObj.payload.map((err, id) => (
			<div key={`error_${id}`} className={`bg-${errorObj.type} w-100 p-2 mb-1`}>
				{err}
			</div>
		));
		return errorResult;
	};

	return (
		<div className="section-95 theme-blue flex-col p-3">
			<Form
				onSubmit={handleSubmit}
				className="bg-light text-dark p-3"
				id="reg-form"
			>
				<h1 className="text-center">
					REGISTER <FontAwesomeIcon icon={"user-plus"} />
				</h1>

				<div>{errorLogs()}</div>

				<Form.Group controlId="formUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						name="username"
						type="text"
						placeholder="Enter Username"
					/>
				</Form.Group>

				<Form.Group controlId="formEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control name="email" type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password1"
						className="mb-2"
						type="password"
						placeholder="Password"
					/>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						name="password2"
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Form.Group>
					<Button className="w-100" variant="primary" type="submit">
						{handleSpinner()}
					</Button>
				</Form.Group>

				<Form.Group>
					<Button className="w-100" variant="warning" onClick={handleRedirect}>
						Login
					</Button>
				</Form.Group>
			</Form>

			<div className="d-none" id="reg-success">
				<h3>Yay, account created successfully</h3>
				<div className="mb-5">Redirecting...</div>
				<Smiley className="animated flip infinite" />
			</div>
		</div>
	);
};

export default withRouter(Register);
