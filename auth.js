#!/usr/bin/env node
const a = require("authenticator");
const spawn = require("child_process").spawn;
const fs = require("fs");
const os = require("os");
const path = require("path");

let configPath = path.join(os.homedir(), "/.config/auth/tokens");

if (!fs.existsSync(configPath)) {
	console.log(`Error: No token file found at ${configPath}`);
	process.exit(1);
}

let tokens;

try {
	tokens = JSON.parse(fs.readFileSync(configPath));
} catch (e) {
	console.log(`Could not parse config file at ${configPath}`);
	process.exit(1);
}

let args = process.argv.splice(2, process.argv.length);
let argString = args.join(" ").toLowerCase();
let found = false;

let success = output => {
	found = true;
	console.log(output);

	if (os.platform() === "darwin") {
		let proc = spawn("pbcopy");
		proc.stdin.write(output);
		proc.stdin.end();
	}
}

tokens.forEach(token => {
	let output = a.generateToken(token.secret);

	if (token.name.toLowerCase() === argString)
		success(output);

	token.alt.forEach(alt => {
		if (argString === alt && !found)
			success(output);
	});
});

if (!found && args.length) {
	console.log(`Could not find a "${argString}" token`);
}

if (!args.length) {

	console.log(`Usage: auth <name|alt>
Generate your two factor authentication codes
(Available tokens are shown below)
	`);

	tokens.forEach(token => {
		console.log(`  ${token.name} (${token.alt.join(", ")})`);
	});

	console.log();
}
