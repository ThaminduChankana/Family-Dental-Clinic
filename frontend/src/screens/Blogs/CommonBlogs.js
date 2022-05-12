import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listBlogsForUsers } from "../../actions/blogsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const CommonBlogs = () => {
	const dispatch = useDispatch();

	const [num, setNum] = useState(0);
	const incNum = () => {
		setNum(num + 1);
	};

	const blogListforUsers = useSelector((state) => state.blogListforUsers);
	const { loading, blogs, error } = blogListforUsers;

	console.log(blogs);

	useEffect(() => {
		dispatch(listBlogsForUsers());
	}, dispatch);

	return (
		<MainScreen title={`Welcome To Blog`}>
			<h1
				style={{
					display: "flex",
					marginLeft: "10px",
					width: "500px",
				}}
			>
				Family Dental Clinic Blog
			</h1>
			<br></br>

			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{blogs?.map((blog) => (
				<Accordion key={blog._id}>
					<Card style={{ margin: 10 }}>
						<Card.Header style={{ display: "flex" }}>
							<span
								style={{
									color: "black",
									textDecoration: "none",
									flex: 1,
									cursor: "pointer",
									alignSelf: "center",
									fontSize: 18,
								}}
							>
								<Accordion.Toggle onClick={incNum} as={Card.Text} variant="link" eventKey="0">
									{blog.title}
								</Accordion.Toggle>
							</span>

							<div></div>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<Card.Img
									style={{ paddingLeft: 0, width: 0, height: 0 }}
									variant="top"
									src="https://media.istockphoto.com/photos/daily-oral-hygiene-teeth-and-toothbrush-on-a-blue-background-picture-id1307187783?b=1&k=20&m=1307187783&s=170667a&w=0&h=LVgOH_YH6mCHzj3k2p8O6auTo-5Hn4ydjojEHuTRQo4="
								></Card.Img>
								<img src={blog.image} style={{ paddingLeft: 200, width: 900, height: 300 }} variant="top" />
								<h4>
									<Badge varient="success">View Count: {num} </Badge>
								</h4>

								<blockquote className="blockquote mb-0">
									<p style={{ margin: 10 }}>{blog.description}</p>
									<footer className="blockquote-footer">
										Created on {""} <cite title="Source Title">{blog.createdAt.substring(0, 10)}</cite>
									</footer>
								</blockquote>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			))}
		</MainScreen>
	);
};

export default CommonBlogs;
