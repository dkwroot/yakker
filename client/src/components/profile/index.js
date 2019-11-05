import React, { useState, useEffect } from "react";

import Display from "./display";

const Profile = () => {
	const [editMode, setEditMode] = useState(false);
	const [userData, setUserData] = useState({
		picture: null,
		username: null,
		bio: null
	});
	const [userComments, setUserComments] = useState([]);
	const [editErrors, setEditErrors] = useState([]);
	const [commentErrors, setCommentErrors] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await fetch("/secure/profile", {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				const resp = await response.json();
				setUserData({
					picture: resp.payload.picture,
					username: resp.payload.username,
					bio: resp.payload.bio
				});
				setUserComments(resp.payload.comments);
			}
		};
		getData();
	}, []);

	const handleEdit = async e => {
		const imageURL = document.getElementById("imageURL").value;
		const bioData = document.getElementById("biography").value;

		const response = await fetch("/secure/profile", {
			method: "PUT",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				picture: imageURL,
				bio: bioData
			})
		});
		const resp = await response.json();
		if (response.ok) {
			setEditMode(false);
			setUserData({
				...userData,
				picture: resp.payload.picture,
				bio: resp.payload.bio
			});
		} else {
			setEditErrors(resp.message);
		}
	};

	const handleComment = async () => {
		const commentBox = document.getElementById("commentbox");
		const newComment = commentBox.value;
		const response = await fetch("/secure/addcomment", {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				comment: newComment
			})
		});
		const resp = await response.json();
		if (response.ok) {
			setUserComments([resp.message, ...userComments]);
			commentBox.value = "";
		} else {
			setCommentErrors(resp.message);
		}
	};

	const handleDeleteComment = async date => {
		const response = await fetch("/secure/deletecomment", {
			method: "DELETE",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				date: date
			})
		});
		if (response.ok) {
			const comments = userComments.filter(comment => comment.date !== date);
			setUserComments(comments);
		}
	};

	return (
		<Display
			handleDeleteComment={handleDeleteComment}
			handleComment={handleComment}
			handleEdit={handleEdit}
			editMode={editMode}
			editErrors={editErrors}
			userData={userData}
			userComments={userComments}
			setEditMode={setEditMode}
			commentErrors={commentErrors}
		/>
	);
};

export default Profile;
