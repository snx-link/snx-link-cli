snx-link-cli
============

SNX Link Command Line Interface

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@snx-link/snx-link-cli.svg)](https://npmjs.org/package/@snx-link/snx-link-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@snx-link/snx-link-cli.svg)](https://npmjs.org/package/@snx-link/snx-link-cli)
[![License](https://img.shields.io/npm/l/@snx-link/snx-link-cli.svg)](https://github.com/snx-link/snx-link-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @snx-link/snx-link-cli
$ snxlink COMMAND
running command...
$ snxlink (-v|--version|version)
@snx-link/snx-link-cli/0.0.1 darwin-x64 node-v12.16.2
$ snxlink --help [COMMAND]
USAGE
  $ snxlink COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`snxlink help [COMMAND]`](#snxlink-help-command)
* [`snxlink users`](#snxlink-users)

## `snxlink help [COMMAND]`

display help for snxlink

```
USAGE
  $ snxlink help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `snxlink users`

List all registered users with attributes

```
USAGE
  $ snxlink users

OPTIONS
  -j, --json  Print result as JSON
```

_See code: [src/commands/users.js](https://github.com/snx-link/snx-link-cli/blob/v0.0.0/src/commands/users.js)_
<!-- commandsstop -->
