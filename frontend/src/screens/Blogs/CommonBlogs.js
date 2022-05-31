import { useEffect, useState } from "react";
import { Accordion, Badge, Card, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";

import { useDispatch, useSelector } from "react-redux";
import { listBlogsForUsers } from "../../actions/blogsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const CommonBlogs = ({ search }) => {
	const dispatch = useDispatch();

	const [num, setNum] = useState(0);
	const incNum = () => {
		setNum(num + 1);
	};

	const blogListforUsers = useSelector((state) => state.blogListforUsers);
	const { loading, blogs, error } = blogListforUsers;

	useEffect(() => {
		dispatch(listBlogsForUsers());
	}, [dispatch]);

	return (
		<div className="commonArticles">
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
				{blogs
					?.filter((filteredBlog) => filteredBlog.title.toLowerCase().includes(search.toLowerCase()))
					.map((blog) => (
						<Accordion key={blog._id}>
							<Card
								style={{
									margin: 10,
									borderRadius: 25,
									borderWidth: 1.0,
									borderColor: "rgb(0,0,0,0.5)",
									marginTop: 20,
									paddingInline: 10,
									background: "rgb(235, 235, 235)",
								}}
							>
								<Card.Header
									style={{
										display: "flex",
										paddingInline: 10,
										borderRadius: 25,
										marginTop: 10,
										marginBottom: 10,
										borderColor: "black",
										background: "rgba(255, 255, 255)",
									}}
								>
									<Col>
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
												<h4 style={{ alignSelf: "center", marginTop: 48 }}>{blog.title}</h4>
											</Accordion.Toggle>
										</span>
									</Col>
									<Col>
										<img
											alt="blogimg"
											src={blog.image}
											style={{
												borderRadius: 10,
												marginRight: 15,
												marginTop: 15,
												float: "right",
												width: 200,
												height: 100,
											}}
											variant="top"
										/>
									</Col>
									<div></div>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Card.Img
											style={{ paddingLeft: 0, width: 0, height: 0 }}
											variant="top"
											src="https://media.istockphoto.com/photos/daily-oral-hygiene-teeth-and-toothbrush-on-a-blue-background-picture-id1307187783?b=1&k=20&m=1307187783&s=170667a&w=0&h=LVgOH_YH6mCHzj3k2p8O6auTo-5Hn4ydjojEHuTRQo4="
										></Card.Img>
										<img
											alt="blogimg"
											src={blog.image}
											style={{ paddingLeft: 100, width: 900, height: 300 }}
											variant="top"
										/>
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
		</div>
	);
};

export default CommonBlogs;
