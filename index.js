const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const CONFIG = require('./config')
const MicroAppService = require('./services/MicroApp/MicroAppService')
const port = CONFIG.PORT || 3002

if (!CONFIG.BUILTS_PATH) {
  console.log('BUILTS_PATH must be defined in config file.')
  return
}

http.createServer(async function (req, res) {
  
  const parsedUrl = url.parse(req.url, true)
  const token = parsedUrl.query.token ? parsedUrl.query.token : null 

  // Checks if request has a token
  if (!token) {
    res.statusCode = 404
    res.end(`Request must have a token param`)
    return
  }

  // Get path to file  
  let pathname = parsedUrl.pathname
  const file = pathname.split('/').pop()
  const ext = path.parse(pathname).ext
  const filename = file.split('.')[0]
  let { microApp, microAppBundle, error } = await MicroAppService.getBuiltPath(filename, token)

  if (error) {
    res.statusCode = 404
    res.end(error)
    return
  }

  pathname = `${CONFIG.BUILTS_PATH}/${microAppBundle.microAppId}-${microAppBundle.commit}${microApp.bundleDir}`

  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  }

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404
      res.end(`File ${pathname} not found!`)
      return
    }

    // if is a directory search for index file matching the extension
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' )
        res.end(data)
      }
    })
  })

}).listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})