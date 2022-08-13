import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { StyledFooter } from "./styles/layoutStyle";

function Footer() {
	return (
		<StyledFooter>
			<ul>
				<li>
					{/* temp */}
					<span style={{ fontSize: "12px" }}>오컵</span>
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FiMail />
				</li>
			</ul>
			<p>
				COPYRIGHT © 오늘의 컵홀더
				<br />
				ALL RIGHTS RESERVED.
			</p>
		</StyledFooter>
	);
}

export default Footer;
