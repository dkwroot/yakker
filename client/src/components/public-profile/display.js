import React from "react";
import { Media } from "react-bootstrap";

const Display = props => {
	const userData = props.userData;
	const buildProfile = () => (
		<div
			className="border p-2"
			style={{ minWidth: "280px", maxWidth: "400px" }}
		>
			<img
				src={`${userData.picture}`}
				alt={`${userData.username}`}
				className="mw-100 mh-100"
			/>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "100px auto"
				}}
			>
				<div className="text-right mr-2">
					<b>Username:</b>
				</div>
				<div>{`${userData.username}`}</div>
				<div className="text-right mr-2">
					<b>Bio:</b>
				</div>
				<div>{`${userData.bio}`}</div>
			</div>
		</div>
	);

	const buildComments = () => {
		if (userData.comments === null) return null;
		const commentPosts = userData.comments.map((comment, id) => (
			<Media className="p-1 my-2 border" key={`commentID_${id}`}>
				<img
					src={`${userData.picture}`}
					alt={`${userData.username}`}
					className="h-100"
					style={{ maxWidth: "100px", maxHeight: "60px" }}
				/>
				<Media.Body>
					<p className="m-1">{comment.comment}</p>
					<i className="mt-1 ml-1 text-bottom" style={{ fontSize: "8px" }}>
						{comment.date}
					</i>
				</Media.Body>
			</Media>
		));

		return <div>{commentPosts}</div>;
	};

	if (userData.username === null) return <div>NO USER FOUND</div>;
	return (
		<div className="d-flex justify-content-center">
			<div
				className="d-flex w-100 flex-wrap justify-content-center"
				style={{ maxWidth: "1200px" }}
			>
				{buildProfile()}
				<div
					className="overflow-auto flex-grow-1 ml-2"
					style={{ minHeight: "300px", maxHeight: "90vh", maxWidth: "790px" }}
				>
					{buildComments()}
				</div>
			</div>
		</div>
	);
};

export default Display;
