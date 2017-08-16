# auth [![npm version](https://badge.fury.io/js/authcli.svg)](https://badge.fury.io/js/authcli)
A simple CLI app for managing your two-factor authentication tokens

## Installation
You can install with `npm install -g authcli`. If you do not wish to install from `npm`, you can install it manually:

```console
$ git clone https://github.com/sam3d/auth
$ cd ./auth
$ npm install
$ npm link
```

## Usage
The app can be used by the `auth` command.

```console
$ auth
Usage: auth <name|alt> [--qr]
Generate your two factor authentication codes
(Available tokens are shown below)

  Google (g, go)
  GitHub (gh, hub)

$ auth gh
104295
```

It reads the tokens from a `.json` file located at `$HOME/.local/share/auth/tokens` (not `tokens.json`). The contents of the file should resemble something like this:

```json
[
	{
		"name": "Google",
		"alt": ["g", "go"],
		"secret": "61f91a36a 751666f9 78ec5dd50e4c1e7 654580e1"
	},
	{
		"name": "GitHub",
		"alt": ["gh", "hub"],
		"secret": "Dcb2 9d7f a652 17A7 bf18 54bb bfc5"
	}
]
```

You can also generate QR code tokens to import into Google Authenticator or another similar application that accepts QR codes for quick and easy importing. For any code, just add the `--qr` flag and it will output both the secret and generated QR code (e.g. `auth gh --qr`);

### Adding your own tokens
If you wish to add your own token, do it in the structure above with a `name` string, `alt` array and a `secret` string (the spaces and capital letters don't matter and will be stripped out during parsing). The `alt` codes allow you to type `auth gh` instead of `auth github` (names are case insensitive).


### Copying to the clipboard
It uses the [`node-copy-paste`](https://github.com/xavi-/node-copy-paste) library to copy the token value to the clipboard on Mac OS X (using [`pbcopy`](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man1/pbcopy.1.html)), Linux, FreeBSD & OpenBSD (using [`xclip`](http://www.cyberciti.biz/faq/xclip-linux-insert-files-command-output-intoclipboard/)) and on Windows (using [`clip`](http://www.labnol.org/software/tutorials/copy-dos-command-line-output-clipboard-clip-exe/2506/)).
