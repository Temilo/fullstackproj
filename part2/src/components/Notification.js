import React from "react";

const Notification = ({message}) => {
	return (!message) ? null : (
		<div className="error">
			{message}
		</div>
	)
}

export default Notification;