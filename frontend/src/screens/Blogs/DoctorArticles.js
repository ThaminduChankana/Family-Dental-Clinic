import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAction, listBlogs } from "../../actions/blogsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../Blogs/blogs.css";
import swal from "sweetalert";

const DoctorArticles = ({ search }) => {
	const dispatch = useDispatch();

	const [num, setNum] = useState(0);
	const incNum = () => {
		setNum(num + 1);
	};

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const blogList = useSelector((state) => state.blogList);
	const { loading, blogs, error } = blogList;

	const blogCreate = useSelector((state) => state.blogCreate);
	const { success: successCreate } = blogCreate;

	const blogUpdate = useSelector((state) => state.blogUpdate);
	const { success: successUpdate } = blogUpdate;

	const blogDelete = useSelector((state) => state.blogDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = blogDelete;

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

	const history = useHistory();

	useEffect(() => {
		dispatch(listBlogs());
		if (!doctorInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, doctorInfo, successCreate, history, successUpdate, successDelete]);
	if (doctorInfo) {
		return (
			<div className="doctorArticles">
				<MainScreen title={`Welcome To Blog ${doctorInfo && doctorInfo.name}..`}>
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
					<Link to="doctor">
						<Button style={{ marginLeft: 10, marginBottom: 6, float: "left" }} size="lg">
							Back to operations page
						</Button>
					</Link>
					<Link to="doctor-create-article">
						<Button style={{ marginRight: 10, marginBottom: 6, float: "right" }} size="lg">
							+ Create New Article
						</Button>
					</Link>
					<br></br>
					<br></br>
					<br></br>
					{error && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
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

										<div>
											<Button href={`/doctor-single-article/${blog._id}`}>Edit</Button>
											<Button variant="danger" className="mx-2" onClick={() => deleteHandler(blog._id)}>
												Delete
											</Button>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Card.Img
												style={{ paddingLeft: 0, width: 0, height: 0 }}
												variant="top"
												src="https://www.americandentalclinic.com/wp-content/uploads/2022/05/shutterstock_717174625.jpg"
											></Card.Img>
											<img
												alt={"blogImg"}
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
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
};

export default DoctorArticles;
