const fs = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
    try {
        console.log(request.url)
        const body = fs.readFileSync('../' + request.url)
        response.end(body)
    }
    catch (e) {
        const body = fs.readFileSync('../index.html')
        response.end(body)
    }
    

});

server.listen(3000);
console.log('server started!')