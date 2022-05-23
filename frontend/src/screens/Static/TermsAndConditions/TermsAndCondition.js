import React from "react";
import { Card } from "react-bootstrap";
import "./TermsAndCondtion.css";
import MainScreen from "../../../components/MainScreen";
function TermsAndCondtions() {
	return (
		<div className="TermsAndCondtionBackground">
			<br></br>
			<MainScreen title="Terms & Conditions">
				<br></br>
				<br></br>
				<Card
					style={{
						borderWidth: 2.0,
						borderRadius: 20,
						marginBottom: 90,
						paddingInline: 10,
						background: "#f6f6f6f0",
					}}
				>
					<div
						style={{
							marginLeft: "5%",
							marginRight: "5%",
							marginTop: 60,
						}}
					>
						<br></br>
						<h2> FAMILY DENTAL CLINIC TERMS & CONDITIONS</h2>
						<br></br>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								we”, “us”, “FAMILY DENTAL CLINIC” refers to the clinic run by dental clinic.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								you”, “client”, “patient” refers to a customer of Absolute Health.
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> GENERAL</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								By becoming or being a customer at the Absolute Health Clinic, your agreement with these terms and
								conditions is implied.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								These terms and conditions may be updated at our discretion without prior notice.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								It is your responsibility to read and understand these terms and conditions, a written copy of which is
								available on request
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> MAKING BOOKINGS</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								You may book appointments with us in person, by telephone or by email.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								Advanced bookings may be refused to clients who have missed appointments without giving at least 48
								hours notice.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								The contents of the clinic diary are confidential. You should not attempt to view the diary when making
								a booking in person.
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> ARRIVAL TIMES</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								We recommend that you arrive before your appointment time, allowing sufficient travel time during the
								traffic rush hours
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If you arrive more than 10 minutes late for your appointment, we may reschedule your treatment for
								another time and you may be charged a late cancellation fee.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If you arrive late and agree to receive a shorter treatment than normal, you agree to pay the full cost
								of that treatment.
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> REFUNDS</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								At our discretion, we can offer a full refund on retail products if they are unused, in their original
								packaging, in a fully saleable condition and are accompanied by proof of purchase, presented within 28
								days of purchase.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								We do not offer a refund for treatments unless we acknowledge that the service received was below the
								professional standard we strive to achieve.
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> PAYMENT</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								We may ask you for full payment, or a deposit in advance, in order to secure any booking. This payment
								is non-refundable in the absence of mitigating circumstances but may be put towards the cost of future
								treatment or any cancellation charges that apply.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								Mitigating circumstances include genuine, unforeseen ill health or personal crisis.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								In the majority of cases, payment is completed on the day of treatment. If you do not pay in full on the
								day of your treatment, we will not accept further bookings until any outstanding amounts have been paid
								in full.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								We accept payment by cash, or debit & credit cards (but not cheques or Lavish/Tesco vouchers). Receipts
								for debit & credit cards can be provided as an email or SMS text message. A printed receipt can be
								requested if needed.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If your treatment relates to an insurance claim and we accept you as a patient, having agreed fees in
								advance with your insurer, we will invoice your insurer after you have been discharged (you will not
								need to pay up front).
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If you have cover with a private (cash-back) health scheme - e.g. SimplyHealth - you will need to pay
								for each treatment and claim back the cost yourself (a receipt will be provided for this purpose). To
								avoid disappointment, please check with your insurer before receiving treatment that the therapy is
								covered by your scheme. Podiatry and Osteopathy treatments should be covered by all health insurance
								schemes.
							</li>
						</ul>
						<br></br>
						<br></br>
						<h2> COMPLAINTS</h2>
						<ul>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If you have a complaint about the service you have received at Absolute Health please speak to one of
								the clinic managers.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If the clinic manager is unable to resolve your complaint at the time, you may put your complaint in
								writing to the directors of BB Osteopaths Limited for further consideration.
							</li>
							<li
								style={{
									fontSize: 20,
								}}
							>
								If your complaint relates to Osteopathic treatment please request a separate Complaints Procedure form.
							</li>
						</ul>
						<br></br>
						<br></br>
					</div>
				</Card>
				<br></br>
				<br></br>
			</MainScreen>
		</div>
	);
}
export default TermsAndCondtions;
