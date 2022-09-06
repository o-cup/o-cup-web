import React from "react";
import { StyledFooter } from "../styles/layoutStyle";
import Icon from "../../Icon/Icons";

function Footer() {
	return (
		<StyledFooter>
			<Icon name="logo" />
			<p>
				CONTACT: TWITTER @OCUP_OFFICIAL
				<br />
				COPYRIGHT © 오늘의 컵홀더
				<br />
				ALL RIGHTS RESERVED.
			</p>
		</StyledFooter>
	);
}

export default Footer;
