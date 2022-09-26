import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = 3001;

app.use(express.json());

app.post("/deliver", async (req, res) => {
	try {
		const { body } = req;
		const { email, name, text } = body;

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false, // upgrade later with STARTTLS
			auth: {
				user: "silviosperanza97@gmail.com",
				pass: "gpplvkkygoqaluhr",
			},
		});

		const emailContent = `name:${name}, email: ${email}, content: ${text}`;

		let info = await transporter.sendMail({
			from: "silviosperanza97@gmail.com", // sender address
			to: "silviosperanza97@gmail.com", // list of receivers
			subject: `${name} - Enquiry`, // Subject line
			text: emailContent, // plain text body
		});

		console.log("Message sent: %s", info.messageId);

		console.log(body);
		res.status(200).send({ message: "Hello World!" });
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
