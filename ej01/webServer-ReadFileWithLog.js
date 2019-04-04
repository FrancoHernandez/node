var http = require('http');
var fs=require('fs');
var logFile = './log.txt';



http.createServer((req, res) => {

  let file='.'+req.url;
  log = "Requested file: " + file
  if(file ==="./log.txt"){
    res.writeHead(403, {'Content-Type': 'text/plain'});
    writeLog(log + " - Status: 403");
    res.end();
  }

  else{
    fs.readFile(file,'utf8',(err,data)=>{
      if(err){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        writeLog(log + " - Status: 404");
        res.end(err.Error);
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        writeLog(log + " - Status: 200");
        res.end(data);
      }
    });
  }
}).listen(8080);

function writeLog(log){
  let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  log = datetime + " - " + log + "\n";
  fs.appendFile(logFile,log,(err) => {
    if(err){
      log.console("LOG Error");
    }
  })
}

console.log('Server ON');
