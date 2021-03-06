const Max = require('max-api');
const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const MaxRef = require('./MaxRef.class');
const { parseObjectName, parseObjectDigest, parseObjectDescription, parseInlets, parseOutlets, parseArguments, parseMessages, parseAttributes } = require('./MaxRef.utils');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = parse(body);

            // Parse form
            const maxref = new MaxRef;
            const objectName = parseObjectName(formData);
            maxref.createObjectName(objectName);
            maxref.createDigest(parseObjectDigest(formData));
            maxref.createDescription(parseObjectDescription(formData));
            maxref.createInlets(parseInlets(formData));
            maxref.createOutlets(parseOutlets(formData));
            maxref.createArguments(parseArguments(formData));
            maxref.createMessages(parseMessages(formData));
            maxref.createAttributes(parseAttributes(formData));

            const maxrefXML = maxref.createXML();

            res.writeHead(200, {
                'content-type': 'text/plain'
            });

            fs.writeFile(`./${objectName}.maxref.xml`, maxrefXML, function (err) {
                if (err) {
                    return Max.post(err, 'ERROR');
                }

                const xmlCreationMessage = `MaxRef saved to ./${objectName}.maxref.xml`;

                Max.post(xmlCreationMessage);
                Max.outlet(xmlCreationMessage);
            });

            res.end(maxrefXML);
        });
    }

    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    Max.post(`Server running at http://${hostname}:${port}/`);
});