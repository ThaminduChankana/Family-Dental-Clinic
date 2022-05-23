import React from "react";
import { Card } from "react-bootstrap";
import "./services.css";

function Services() {
	return (
		<div>
			<br></br>
			<br></br>
			<Card
				style={{
					borderWidth: 3,
					borderRadius: 20,
					marginBottom: 0,
					paddingInline: 5,
					marginLeft: "3%",
					marginRight: "3%",
				}}
			>
				<Card.Body>
					<div className="hero">
						<div className="hero-content"></div>
					</div>
					<div className="site-section">
						<div className="site-section-inside">
							<div className="section-header">
								<h2>
									<b>Key Features</b>
								</h2>
							</div>

							<div className="feature-box">
								<h5>Orthodontic Services</h5>
							</div>

							<div className="feature-box">
								<h5>Endodontic Procedures</h5>
							</div>

							<div className="feature-box">
								<h5>Periodontal Treatments</h5>
							</div>
						</div>
					</div>

					<div className="site-section site-section-secondary">
						<div className="site-section-inside">
							<div className="section-header">
								<h2>
									<b>Different types of dental services</b>
								</h2>
							</div>

							<div className="testimonial-box">
								<div className="testimonial-content">Their service is by far the most influential I've ever seen.</div>
								<div className="testimonial-author">
									<h5>Cosmetic Dentistry Services</h5>
								</div>
							</div>

							<div className="testimonial-box">
								<div className="testimonial-content">Their service is by far the most influential I've ever seen.</div>
								<div className="testimonial-author">
									<h5>Diagnosis and Preventiative Dental Services</h5>
								</div>
							</div>

							<div className="testimonial-box">
								<div className="testimonial-content">Their service is by far the most influential I've ever seen.</div>
								<div className="testimonial-author">
									<h5>Oral and Maxillofacial Surgery</h5>
								</div>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
			<br></br>
			<br></br>
		</div>
	);
}

export default Services;
