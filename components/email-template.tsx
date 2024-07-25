import * as React from 'react';

interface EmailTemplateProps {
	name: string;
	email: string;
	message: string;
	date: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, message, date }) => (
	<div>
		<h1>From: {name}</h1>
		<h2>Email: {email}</h2>
		<p>{date}</p>
		<br />
		<p>{message}</p>
	</div>
);
