import React from "react";
import "./footer.css";
import logo1 from "../../Images/logo1.png";

function Footer() {
	return (
		<div className="main-footer">
			<div className="container">
				<div className="row">
					{/* Column1 */}
					<div className="col">
						<h4>FAMILY DENTAL CLINIC</h4>
						<h1 className="list-unstyled" style={{ fontSize: 15 }}>
							<img src={logo1} alt="" style={{ paddingLeft: 0, width: 120, height: 120, paddingRight: 5 }} />
						</h1>
					</div>

					{/* Column2 */}
					<div className="col">
						<h4>QUICK LINKS</h4>
						<li className="list-unstyled">
							<a href="/">HOME</a>
							<br></br>
							<a href="/aboutus">ABOUT US</a>
							<br></br>
							<a href="/articles">DOCTORS BLOG</a>
							<br></br>
							<a href="/schedules">SCHEDULE</a>
						</li>
					</div>
					{/* Column3 */}
					<div className="col">
						<h4>POPULAR LINKS</h4>
						<li className="list-unstyled">
							<a href="/common-view-feedback">REVEIWS</a>
							<br></br>
							<a href="/common-view-question">Q & A</a>
							<br></br>
							<a href="/TermsAndCondtions">TERMS & CONDITIONS</a>
							<br></br>
							<a href="/services">SERVICES</a>
						</li>
					</div>
					{/* Column4 */}
					<div className="col">
						<h4>CONTACT</h4>
						<ul className="list-unstyled">
							<li>ADDRESS : 276/2F, Wackwalla Road, Galle</li>
							<li>PHONE : 071 818 7288</li>
							<li>EMAIL : familydentalclinic@gmail.com</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className="row">
					<p className="col-sm">
						&copy;{new Date().getFullYear()} site by ByteBusters | Family Dental Clinic | All rights reserved |
					</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
