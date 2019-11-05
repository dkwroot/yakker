import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { withRouter } from "react-router";

import Display from "./display";

const Home = props => {
	const [state, setState] = useState({
		maxPages: 1, // Maximum pages in pagination
		displayNumber: 8, // Number of users displayed in gallery per page
		userFilters: "",
		activePage: 1,
		userGallery: []
	});

	useEffect(() => {
		const queryValues = queryString.parse(props.location.search);
		let page = 1;
		if (queryValues.page !== undefined) page = queryValues.page;

		const getData = async () => {
			const response = await fetch(
				`/public/home?page=${page}&display=${state.displayNumber}&filters=${state.userFilters}`,
				{
					method: "GET",
					credentials: "include",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					}
				}
			);

			if (response.ok) {
				const resp = await response.json();
				setState({
					...state,
					maxPages: resp.count,
					userGallery: resp.payload
				});
			}
		};
		getData();
	}, [state.activePage, state.userFilters]);

	const handlePage = page => {
		setState({
			...state,
			activePage: page
		});
		props.history.push(`/?page=${page}`);
	};

	const handlePageStep = async lower => {
		if (lower) {
			await setState({
				...state,
				activePage: Math.max(state.activePage - 1, 1)
			});
			props.history.push(`/?page=${state.activePage}`);
		} else {
			await setState({
				...state,
				activePage: Math.min(state.activePage + 1, state.maxPages)
			});
			props.history.push(`/?page=${state.activePage}`);
		}
	};

	const handleGallery = username => {
		props.history.push(`/profile/${username}`);
	};

	const handleSearch = e => {
		if (
			(e.target.id === "user-search" && e.keyCode === 13) ||
			e.target.id !== "user-search"
		) {
			const elem = document.getElementById("user-search");
			setState({
				...state,
				userFilters: elem.value
			});
		}
	};

	return (
		<Display
			state={state}
			setState={setState}
			handleGallery={handleGallery}
			handleSearch={handleSearch}
			handlePage={handlePage}
			handlePageStep={handlePageStep}
		/>
	);
};

export default withRouter(Home);
