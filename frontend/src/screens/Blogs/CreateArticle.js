import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAction } from "../../actions/blogsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateBlog({ history }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(
		"https://www.americandentalclinic.com/wp-content/uploads/2022/04/shutterstock_1893722440.jpg"
	);

	const dispatch = useDispatch();

	const demoHandler = async (e) => {
		e.preventDefault();
		setTitle("Here’s Why Putting Off Root Canal Can Be Dangerous");
		setDescription(
			"Root canal therapy basically involves restoring the function, and appearance of a decayed or infected tooth. Many people put off this procedure due to the fear of possible discomfort or about how long it’ll take to recover. The good news is that a root canal treatment is actually quite straightforward and far more comfortable and painless with a very short recovery period, thanks to modern advancements in dental technology. "
		);
		setImage("https://www.americandentalclinic.com/wp-content/uploads/2022/05/shutterstock_766328671.jpg");
	};

	const blogCreate = useSelector((state) => state.blogCreate);
	const [imageMessage, setImageMessage] = useState(null);
	const { loading, error } = blogCreate;

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

	const resetHandler = () => {
		setTitle("");
		setDescription("");
		setImage("");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!title || !description || !image) return;
		dispatch(createBlogAction(title, description, image));

		resetHandler();
		history.push("/doctor-articles");
	};

	useEffect(() => {}, []);

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	if (doctorInfo) {
		return (
			<div className="createArticles">
				<MainScreen title="Create a Article">
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
							<h3 style={{ alignSelf: "center", marginLeft: "40%", marginRight: "40%" }}>Create a new Article</h3>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="title">
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										value={title}
										placeholder="Enter the Article Title"
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										value={description}
										placeholder="Enter the Article Description"
										rows={10}
										onChange={(e) => setDescription(e.target.value)}
										required
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
										label="Upload Article Image"
										custom
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary">
									Create Article
								</Button>
								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset Feilds
								</Button>
								<Button variant="info" onClick={demoHandler}>
									Demo
								</Button>
							</Form>
						</Card.Body>

						<Card.Footer style={{ borderRadius: 20, marginBottom: 30, background: "white" }} className="text-muted">
							Created on - {new Date().toLocaleDateString()}
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

export default CreateBlog;
