import React, { useRef } from "react";
import { Media, Button, Overlay } from "react-bootstrap";

const Display = props => {
	const BuildComments = () => {
		const result = props.userComments.map((comment, id) => {
			const currTime = new Date(comment.date);
			const localTime = currTime.toLocaleString();
			return (
				<Media key={`comment_${id}`} className="border m-2">
					<img
						src={props.userData.picture}
						style={{ maxHeight: "64px", maxWidth: "120px" }}
						alt="user"
					/>
					<Media.Body className="px-2">
						<p className="mt-2">{comment.comment}</p>
						<i style={{ fontSize: "8px" }}>{localTime}</i>
					</Media.Body>
					<Button
						onClick={e => props.handleDeleteComment(comment.date)}
						variant="outline-light"
						className="m-2 text-danger"
					>
						x
					</Button>
				</Media>
			);
		});
		return result;
	};

	const BuildProfile = () => {
		const defaultPicture =
			"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
		const target = useRef(null);

		const buildErrors = () => {
			const result = props.editErrors.map((error, id) => (
				<div key={`editError_${id}`}>Error: {error}</div>
			));
			return result;
		};

		if (props.editMode) {
			// Set values for user profile
			return (
				<div>
					<div
						className="bg-light d-flex align-items-end"
						style={{ height: "200px" }}
					>
						<input
							className="w-100"
							type="text"
							placeholder="Input image url"
							defaultValue={
								props.userData.picture === defaultPicture
									? null
									: props.userData.picture
							}
							id="imageURL"
						/>
					</div>
					<div className="d-flex p-1 theme-gray">
						<div className="w-100p">Username:</div>
						<div>{props.userData.username}</div>
					</div>
					<div className="d-flex p-1 bg-light">
						<div className="w-100p">Bio:</div>
						<textarea
							type="text"
							className="w-100"
							placeholder="Say something about yourself..."
							defaultValue={props.userData.bio}
							id="biography"
						/>
					</div>
					<div className="p-1">
						<div className="d-flex justify-content-end">
							<Button
								className="mr-1"
								variant="warning"
								onClick={() => props.setEditMode(false)}
							>
								Cancel
							</Button>
							<Button
								ref={target}
								id="done"
								variant="secondary"
								onClick={props.handleEdit}
							>
								Done
							</Button>
							<Overlay
								target={target.current}
								show={props.editErrors.length > 0}
								placement="bottom"
							>
								<div className="bg-dark text-white p-2">{buildErrors()}</div>
							</Overlay>
						</div>
					</div>
				</div>
			);
		}
		// Else Display user profile data
		return (
			<div>
				<div className="center d-flex bg-light" style={{ height: "200px" }}>
					<img
						src={props.userData.picture}
						className="mw-100 mh-100"
						alt="user"
					/>
				</div>
				<div className="d-flex p-1 theme-gray">
					<div className="w-100p">Username:</div>
					<div className="overflow-hidden">{props.userData.username}</div>
				</div>
				<div className="d-flex p-1 bg-light">
					<div className="w-100p">Bio:</div>
					<div className="">{props.userData.bio}</div>
				</div>
				<div className="p-1">
					<div className="d-flex justify-content-end">
						<Button variant="secondary" onClick={() => props.setEditMode(true)}>
							Edit
						</Button>
					</div>
				</div>
			</div>
		);
	};

	const targetPost = useRef(null);
	const BuildCommentErrors = () => {
		const result = props.commentErrors.map((error, id) => (
			<div key={`commentError_${id}`}>{error}</div>
		));
		return result;
	};
	return (
		<div className="d-flex justify-content-center">
			<div
				className="d-flex w-100 flex-wrap justify-content-center"
				style={{ maxWidth: "1200px" }}
			>
				<div
					className="flex-grow-1 w-30 mt-3"
					style={{ minWidth: "280px", maxWidth: "400px" }}
				>
					{BuildProfile()}
				</div>

				<div className="flex-col flex-grow-1 w-70 p-3">
					<div className="flex-grow-0">
						<textarea
							id="commentbox"
							className="w-100"
							placeholder="comment here..."
						/>
						<div className="d-flex justify-content-end mr-3">
							<Button
								ref={targetPost}
								onClick={props.handleComment}
								variant="outline-dark"
							>
								POST
							</Button>
							<Overlay
								target={targetPost.current}
								placement="bottom"
								show={props.commentErrors.length > 0}
							>
								<div className="bg-dark text-white p-2">
									{BuildCommentErrors()}
								</div>
							</Overlay>
						</div>
					</div>
					<div
						className="mt-3 overflow-auto flex-grow-1"
						style={{ minHeight: "300px", maxHeight: "90vh" }}
					>
						{BuildComments()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Display;
