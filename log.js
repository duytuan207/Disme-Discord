const chalk = require('chalk');

module.exports = (data, option) => {
	const rdcl = ['blue', 'yellow', 'green', 'red', 'magenta', 'yellowBright', 'blueBright', 'magentaBright']
	const color = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	const color2 = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ ❕ Lỗi rồi ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ❕ Lỗi rồi ] » ') + data);
			break;
		default:
			console.log(color(`${option} » `) + color2(data));
			break;
	}
}
module.exports.loader = (data, option) => {
	const rdcl = ['blue', 'yellow', 'green', 'red', 'magenta', 'yellowBright', 'blueBright', 'magentaBright']
	const color = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	const color2 = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[DisMe] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[DisMe] » ') + data);
			break;
		default:
			console.log(color(`[DisMe] » `) + color2(data));
			break;
	}
}
module.exports.banner = (data) => {
	const rdcl = ['blue', 'yellow', 'green', 'red', 'magenta', 'yellowBright', 'blueBright', 'magentaBright']
	const color = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	console.log(color(data));
}