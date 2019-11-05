import React, { useEffect, useState } from "react";
import Display from "./display";

const PublicProfile = props => {
	const [userError, setUserError] = useState(false);
	const [userData, setUserData] = useState({
		username: null,
		bio: null,
		picture: null,
		comments: null
	});

	useEffect(() => {
		setUserError(false);
		const {
			match: { params }
		} = props;

		const getUser = async () => {
			const response = await fetch(`/public/profile/${params.username}`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				const resp = await response.json();
				setUserData(resp.payload);
			} else {
				setUserError(true);
			}
		};
		getUser();
	}, []);

	if (userError) return <div>USER NOT FOUND!</div>;
	if (userData.username === null) return <div>LOADING...</div>;
	return <Display userData={userData} />;
};

export default PublicProfile;
