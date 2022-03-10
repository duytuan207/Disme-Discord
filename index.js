const logger = require("./log");
const { spawn } = require('child_process');
const axios = require('axios');
function Start() {
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });
  child.on("close", (codeExit) => {
    if (codeExit == 2) { 
      Start();
    }
    else { 
      return;
    }
  });
}
//_____________________________UPTIME HOST_____________________________//
const app = require("express")();
    app.set('port', (process.env.PORT || 8888));
    app.get('/', function(request, response) {
        var result = 'A simple Discord Bot made D-jukie.'
        response.send(result);
    }).listen(app.get('port'));
    const port = app.get('port');
    logger(`Disme is running, server is listening on ${port}`, '[HOST UPTIME]');
axios.get("https://raw.githubusercontent.com/D-Jukie/Disme-Discord/main/package.json").then((res) => {
    logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VERSION ]");
    logger(res['data']['description'], "[ DESCRIPTION ]");
    logger(res['data']['author'], "[ AUTHOR ]");
});
setTimeout(async function(){
    await new Promise(resolve => setTimeout(resolve, 500))
    logger.banner(String.raw`*******************************************************************`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*             ____            _       _    _                      *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*            |  _ \          | |_   _| | _(_) ___                 *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*            | | | |_____ _  | | | | | |/ / |/ _ \                *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*            | |_| |_____| |_| | |_| |   <| |  __/                *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*            |____/       \___/ \__,_|_|\_\_|\___|                *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*                                                                 *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*  • DisMe is online - Ver. 0.0.1                                 *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*  • Coded by D-Jukie                                             *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*  • Developer: D - Jukie#2456                                    *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*  • Facebook: https://www.facebook.com/PhamVanDien.User          *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*  • Zalo/Momo: 0332222817                                        *`)
    await new Promise(resolve => setTimeout(resolve, 70))
    logger.banner(String.raw`*******************************************************************`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    logger(`Bắt đầu load commands!`, `[LOAD]`)
    Start();
}, 70);

