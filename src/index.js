const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World! v1');
});

const server = app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const gracefulShutdown = () => {
	console.log('\nGot SIGINT signal (Ctrl + C). Stopping server...');

	server.close(() => {
		console.log('Server closed. Exiting process.');
		process.exit(0);
	});

	setTimeout(() => {
		console.error('Unable to close server in time. Forcing exit.');
		process.exit(1);
	}, 10000);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
