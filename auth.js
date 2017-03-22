#!/usr/bin/env node

"use strict";

const authenticator = require("authenticator");
const ncp = require("copy-paste");

const fs = require("fs");
const os = require("os");
const path = require("path");

let config = path.join(os.homedir(), "/.local/share/auth/tokens");

let error = message => {
	console.log(`Error: ${message}`);
	process.exit(1);
};

fs.readFile(config, "utf8", (err, data) => {
	if (err) error(`No token file found at ${config}`);
	parseConfig(data);
});

let parseConfig = config => {

	try {
		var tokens = JSON.parse(config);
	} catch (e) {
		error(`Could not parse the file at ${config}`);
	}

	parseArgs(tokens);

};

let parseArgs = tokens => {

	let args = process.argv.splice(2, process.argv.length);
	let query = args.join(" ").toLowerCase();

	if (args.length) searchTokens(tokens, query);
	else printHelp(tokens);

};

let searchTokens = (tokens, query) => {

	let token = tokens.find(token => {

		let name = token.name.toLowerCase() === query;
		let alt = token.alt.find(alt => alt.toLowerCase() === query);
		return name || alt;

	});

	if (token) generateToken(token.secret);
	else error(`Could not find a "${query}" token`);

};

let generateToken = secret => {

	let output = authenticator.generateToken(secret);
	console.log(output);
	ncp.copy(output);

};

let printHelp = tokens => {

	console.log(`Usage: auth <name|alt>
Generate your two factor authentication codes
(Available tokens are shown below)
	`);

	tokens.forEach(token => {
		console.log(`  ${token.name} (${token.alt.join(", ")})`);
	});

	console.log();

};
