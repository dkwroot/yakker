import React from "react";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Display = props => {
	// Determine size and active element of pagination
	const displayPaginate = () => {
		let items = [];
		const lowerRange =
			props.state.activePage - 1 > 0 ? props.state.activePage - 1 : 1;
		let upperRange =
			lowerRange + 5 < props.state.maxPages
				? lowerRange + 5
				: props.state.maxPages;
		for (let i = lowerRange; i <= upperRange; i++) {
			items.push(
				<Pagination.Item
					key={i}
					active={props.state.activePage === i}
					onClick={e => props.handlePage(i)}
				>
					{i}
				</Pagination.Item>
			);
		}
		return items;
	};

	const displayGallery = () => {
		const result = props.state.userGallery.map((user, id) => (
			<div
				key={`user_${id}`}
				className="flex-col center border col-12 col-sm-4 col-md-3"
				style={{ height: "230px", width: "200" }}
				onClick={e => props.handleGallery(user.username)}
			>
				<div
					className="bg-center"
					style={{
						height: "200px",
						width: "100%",
						backgroundImage: `url(${user.picture})`
					}}
				/>
				<div>
					<b>{user.username}</b>
				</div>
			</div>
		));

		return result;
	};

	return (
		<div>
			<div className="section-75 theme-blue d-flex justify-content-center">
				<div className="m-2 flex-col w-100" style={{ maxWidth: "1200px" }}>
					<div className="d-flex">
						<input
							style={{ minWidth: "220px", maxWidth: "400px" }}
							id="user-search"
							className="w-25"
							type="text"
							placeholder="Search Users"
							onKeyDown={props.handleSearch}
						/>
						<div className="px-2" onClick={props.handleSearch}>
							<FontAwesomeIcon icon={"search"} />
						</div>
					</div>
					<div className="bg-light text-dark flex-col center">
						<div className="row w-100 p-2">{displayGallery()}</div>
						<Pagination>
							<Pagination.Prev
								onClick={() => {
									props.handlePageStep(true);
								}}
							/>
							{displayPaginate()}
							<Pagination.Next
								onClick={() => {
									props.handlePageStep(false);
								}}
							/>
						</Pagination>
					</div>
				</div>
			</div>
			<div className="section-20 bg-dark flex-col justify-content-center text-white">
				<div className="d-flex justify-content-center mt-2">
					<div className="flex-col mx-4">LINKS</div>
					<div className="flex-col mx-4">LINKS</div>
					<div className="flex-col mx-4">LINKS</div>
				</div>
				<div className="d-flex justify-content-center flex-grow-1 align-items-end my-2">
					Copyright Derek Root
				</div>
			</div>
		</div>
	);
};

export default Display;
