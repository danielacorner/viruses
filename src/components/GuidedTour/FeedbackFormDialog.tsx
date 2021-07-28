import { Button, Dialog, TextField } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components/macro";
import { useAtom } from "jotai";
import emailjs from "emailjs-com";
import { animated, useSpring } from "react-spring";
import { isFeedbackFormOpenAtom } from "./GuidedTour";

export default function FeedbackFormDialog() {
	const [isFormOpen, setIsFormOpen] = useAtom(isFeedbackFormOpenAtom);
	const [disabled, setDisabled] = useState(true);

	const springUpDown = useSpring({
		transform: `translateY(${isFormOpen ? 0 : 50}px)`,
		opacity: isFormOpen ? 1 : 0,
	});

	function sendEmail(e) {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_9iixvds",
				"virus-terrarium",
				e.target,
				"user_Q33dPgBWZuQnRTaTJfkVq"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	}

	function handleChange(e) {
		if (disabled) {
			setDisabled(false);
		}
	}
	return (
		<Dialog
			PaperComponent={({ children }) => <>{children}</>}
			open={isFormOpen}
			onClose={() => setIsFormOpen(false)}
		>
			<StyledAnimatedForm
				className="contact-form"
				onSubmit={sendEmail}
				style={springUpDown}
				onChange={handleChange}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2>Get in touch!</h2>
				<TextField
					className="contact-form-input"
					variant="outlined"
					fullWidth={true}
					name="user_name"
					placeholder="Name"
				/>
				<TextField
					className="contact-form-input"
					variant="outlined"
					fullWidth={true}
					type="email"
					name="user_email"
					placeholder="Email"
				/>
				<TextField
					className="contact-form-input"
					multiline={true}
					variant="outlined"
					rows={4}
					name="message"
					placeholder="Message"
				/>
				<Button type="submit" disabled={disabled}>
					Send
				</Button>
			</StyledAnimatedForm>
		</Dialog>
	);
}
const StyledAnimatedForm = styled(animated.form)`
	background: white;
	width: 300px;
	padding: 24px;
	gap: 16px;
	display: grid;
	h2 {
		margin: 0 auto;
	}
`;
