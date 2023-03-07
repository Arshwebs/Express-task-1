const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const folderPath = path.join(__dirname, "my_folder");

// Endpoint to create a text file with current timestamp
app.post("/createFile", (req, res) => {
	const date = new Date();
	const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.txt`;
	const filePath = path.join(folderPath, fileName);
	const fileContent = date.toString();

	fs.writeFile(filePath, fileContent, err => {
		if (err) {
			console.error(err);
			res.status(500).send("Error creating file");
		} else {
			res.status(200).send("File created successfully");
		}
	});
});

// Endpoint to retrieve all text files in folder
app.get("/files", (req, res) => {
	fs.readdir(folderPath, (err, files) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error reading folder");
		} else {
			const textFiles = files.filter(file => file.endsWith(".txt"));
			res.status(200).send(textFiles);
		}
	});
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
