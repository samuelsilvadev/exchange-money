import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import App from './components/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
	.disable('x-powered-by')
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
	.get('/*', (_, res) => {
		const context = {};
		const markup = renderToString(<App />);

		if (context.url) {
			res.redirect(context.url);
		} else {
			res.status(200).send(
				`<!doctype html>
					<html lang="en">
					<head>
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<meta charset="utf-8" />
						<title>Exchange Money</title>
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
						${
							assets.client.css
								? `<link rel="stylesheet" href="${assets.client.css}">`
								: ''
						}
						${
							process.env.NODE_ENV === 'production'
								? `<script src="${assets.client.js}" defer></script>`
								: `<script src="${assets.client.js}" defer crossorigin></script>`
						}
					</head>
					<body>
						<div id="root">${markup}</div>
					</body>
				</html>`
			);
		}
	});

export default server;
