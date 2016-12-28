#!/usr/bin/env node
let a = require("authenticator");
let spawn = require("child_process").spawn;
let fs = require("fs");
let os = require("os");
let path = require("path");

let configPath = path.join(os.homedir(), "/.config/auth/tokens");

// Check if the "tokens" file is present
if (!fs.existsSync(configPath)) {
	console.log(`Error: No token file found at ${configPath}`);
	process.exit(1);
}

// Attempt to grab the tokens
let tokens;

try {
	tokens = JSON.parse(fs.readFileSync(configPath));
} catch (e) {
	console.log(`Could not parse config file at ${configPath}`);
	process.exit(1);
}

// Get the arguments
let args = process.argv.splice(2, process.argv.length);
let argString = args.join(" ").toLowerCase();
let found = false;

// Called once found
let success = output => {
	found = true;
	console.log(output);

	let proc = spawn("pbcopy");
	proc.stdin.write(output);
	proc.stdin.end();
}

// Check them for names or alts
tokens.forEach(token => {

	let output = a.generateToken(token.secret);

	// Check for the primary name
	if (token.name.toLowerCase() === argString) success(output);

	// Check alternate names
	token.alt.forEach(alt => {
		if (argString === alt && !found) success(output);
	});
});

// Show error if short name is not found
if (!found && args.length > 0) {
	console.log(`Could not find a "${argString}" token`);
}

// If not shown, then show all
if (args.length === 0) {

	console.log(`Usage: auth <name|alt>
Generate your two factor authentication codes
(Available tokens are shown below)
	`);

	tokens.forEach(token => {
		console.log("  " + token.name + " (" + token.alt.join(", ") + ")");
	});

	console.log();
}
