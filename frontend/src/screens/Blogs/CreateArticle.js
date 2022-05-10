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

	const blogCreate = useSelector((state) => state.blogCreate);
	const [imageMessage, setImageMessage] = useState(null);
	const { loading, error, blog } = blogCreate;

	console.log(blog);

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
					console.log(data);
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

	return (
		<MainScreen title="Create a Article">
			<Card>
				<Card.Header>Create a new Article</Card.Header>
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
					</Form>
				</Card.Body>

				<Card.Footer className="text-muted">Creating on - {new Date().toLocaleDateString()}</Card.Footer>
			</Card>
		</MainScreen>
	);
}

export default CreateBlog;
