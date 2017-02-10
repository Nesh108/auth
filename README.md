# auth
A simple CLI app for managing your two-factor authentication tokens

## Installation
You can install with `npm install -g authcli`. If you do not wish to install from `npm`, you can install it manually:

```console
git clone https://github.com/sam3d/auth
cd ./auth
npm install
npm link
```

## Usage
The app can be used by the `auth` command.

```console
$ auth
Usage: auth <name|alt>
Generate your two factor authentication codes
(Available tokens are shown below)

  Google (g, go)
  GitHub (gh, hub)

$ auth gh
104295
```

It reads the tokens from a `.json` file located at `$HOME/.config/auth/tokens` (not `tokens.json`). The contents of the file should resemble something like this:

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

Spaces and capital letters will automatically be stripped from the `secret` field. The alt names are shorter names that you can use to generate tokens. On Mac OS X the token value will automatically be copied to the clipboard.
