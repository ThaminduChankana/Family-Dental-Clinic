import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAction, updateBlogAction } from "../../actions/blogsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import swal from "sweetalert";

function SingleBlog({ match, history }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [date, setDate] = useState("");
	const [imageMessage, setImageMessage] = useState("");

	const dispatch = useDispatch();

	const blogUpdate = useSelector((state) => state.blogUpdate);
	const { loading, error } = blogUpdate;

	const blogDelete = useSelector((state) => state.blogDelete);
	const { loading: loadingDelete, error: errorDelete } = blogDelete;

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteBlogAction(id));
					swal({
						title: "Success!",
						text: "Deleted Article Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
				history.push("/doctor-articles");
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Article",
					type: "error",
				});
			});
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/doctor/blogs/${match.params.id}`);

			setTitle(data.title);
			setDescription(data.description);
			setImage(data.image);
			setDate(data.updatedAt);
		};

		fetching();
	}, [match.params.id, date]);

	const resetHandler = () => {
		setTitle("");
		setDescription("");
		setImage("");
	};

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateBlogAction(match.params.id, title, description, image));
		if (!title || !description || !image) return;

		resetHandler();
		history.push("/doctor-articles");
	};

	const postDetails = (images) => {
		if (images === "https://www.americandentalclinic.com/wp-content/uploads/2022/04/shutterstock_1893722440.jpg") {
			return setImageMessage("Please Select an Image");
		}
		setImageMessage(null);
		if (images.type === "image/jpeg" || images.type === "image/png" || images.type === "image/jpg") {
			const data = new FormData();
			data.append("file", images);
			data.append("upload_preset", "dentalblogs");
			data.append("cloud_name", "family-dental-clinic");
			fetch("https://api.cloudinary.com/v1_1/family-dental-clinic/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setImage(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setImageMessage("Please Select an Image");
		}
	};

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	if (doctorInfo) {
		return (
			<div className="singleArticles">
				<MainScreen title="Update Article">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/doctor-articles"
					>
						{" "}
						Back to Article List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="createAr"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<Card.Header
							className="createArHead"
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "white",
							}}
						>
							<h3 style={{ alignSelf: "center", marginLeft: "40%", marginRight: "40%" }}>Edit Your Article</h3>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										value={title}
										placeholder="Enter the title"
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										value={description}
										placeholder="Enter the Description"
										rows={10}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Form.Group>
								{description && (
									<Card>
										<Card.Header>Article Preview</Card.Header>
										<Card.Body>
											<ReactMarkdown>{description}</ReactMarkdown>
										</Card.Body>
									</Card>
								)}

								{imageMessage && <ErrorMessage variant="danger">{imageMessage}</ErrorMessage>}
								<Form.Group controlId="image">
									<Form.Label>Article Image</Form.Label>
									<Form.File
										onChange={(e) => postDetails(e.target.files[0])}
										id="custom-file"
										type="image/png"
										label="Upload Article Picture"
										custom
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary">
									Update Article
								</Button>
								<Button onClick={() => deleteHandler(match.params.id)} className="mx-2" variant="danger">
									Delete Article
								</Button>
							</Form>
						</Card.Body>

						<Card.Footer style={{ borderRadius: 20, marginBottom: 30, background: "white" }} className="text-muted">
							{" "}
							Updated on - {date.substring(0, 10)}
						</Card.Footer>
					</Card>
					<br></br>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}

export default SingleBlog;
