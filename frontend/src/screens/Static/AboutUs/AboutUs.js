import React from "react";
import { Card } from "react-bootstrap";
import "./AboutUs.css";
function AboutUs() {
	return (
		<div className="about">
			<div className="aboutTop"></div>
			<div className="aboutBg">
				<br></br>
				<h1 style={{ alignSelf: "center", marginLeft: "35%", marginRight: "35%", fontSize: "90px" }}> About Us</h1>
				<br></br>
				<Card
					style={{
						borderWidth: 2.0,
						borderRadius: 20,
						marginBottom: 90,
						paddingInline: 10,
						background: "#f6f6f6f0",
						marginLeft: "10%",
						marginRight: "10%",
					}}
				>
					<Card.Body>
						<h3>
							<b>WHY CHOOSE US?</b>
						</h3>
						<p>
							Our team of dedicated dental professionals are enthusiastic about their dentistry. As a team, they work
							together to compl​ement and support each other to provide you with an excellent comprehensive range of
							dental treatments from smile enhancements to routine family check​-ups. We understand that every
							individual is unique so we provide a customised level of personalised care. Therefore, you can be
							confident that you’re receiving the best and most appropriate treatment for your dental needs. Our
							satisfaction is in providing high-quality dental treatment that is long-lasting, so that you can achieve
							good oral health and maintain a wonderful, bright healthy smile.
						</p>

						<br />

						<h3>
							<b>EXCELLENCE IN DENAL CARE</b>
						</h3>
						<p>
							Our commitment to excel in our profession is further evident by our unique approach to stand behind our
							treatment to you. As a result, we offer limited dental warranty for the investment you have made in
							preserving your oral health. Our goal is not only to treat your current dental problems but also to
							educate you in preventing further tooth decay. We would like to be proactive in helping you maintain your
							oral health at its best for the years to come.
						</p>
						<br />
						<h3>
							<b>EXPERIENCED STAFF</b>
						</h3>
						<p>
							Meet the team! All our staff are continually training further to enable us to keep up to date with the
							latest advances in the dental world. All our staff are very experienced and GDC registered. We maintain
							high ethical standards and have the same goals of providing high standard dentistry in a comfortable pain
							free surrounding.
						</p>
						<br />
						<h3>
							<b>ETHICAL DENTAL CARE</b>
						</h3>
						<p>
							Our dentists and hygienists believe that it is important to make your teeth look great, the health of your
							teeth however is the most important aspect. We will spend the extra time to be transparent with all our
							treatment and what to expect from them.
						</p>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default AboutUs;
