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
						<ui className="list-unstyled">
							<li>HOME</li>
							<li>ABOUT US</li>
							<li>DOCTORS BLOG</li>
							<li>SHEDULE</li>
						</ui>
					</div>
					{/* Column3 */}
					<div className="col">
						<h4>POPULAR LINKS</h4>
						<ui className="list-unstyled">
							<li>REVEIWS</li>
							<li>Q & A</li>
							<li>TERMS & CONDITIONS</li>
							<li><a href="../../screens/StaticPages/Services.js">SERVICES</a></li>
						</ui>
					</div>
					{/* Column4 */}
					<div className="col">
						<h4>CONTACT</h4>
						<ui className="list-unstyled">
							<li>ADDRESS : 276/2F, Wackwalla Road, Galle</li>
							<li>PHONE : 071 818 7288</li>
							<li>EMAIL : familydentalclinic@gmail.com</li>
						</ui>
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
