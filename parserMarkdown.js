const fs = require('fs');
const path = require('path');

function parser (data) {
    const h1Pattern = new RegExp(/^# (.*$)/, 'gim')
    const h2Pattern = new RegExp(/^## (.*$)/, 'gim')
    const h3Pattern = new RegExp(/^### (.*$)/, 'gim')
    const h4Pattern = new RegExp(/^#### (.*$)/, 'gim')
    const h5Pattern = new RegExp(/^##### (.*$)/, 'gim')
    const h6Pattern = new RegExp(/^###### (.*$)/, 'gim')

    const boldPattern = new RegExp(/\*\*(.*)\*\*/, 'gim')
    const italicPattern = new RegExp(/\_\_(.*)\_\_/, 'gim')

    data = data.replace(/^\s*(\n)?(.+)/gm, function(d){
        if (/^\s*#/.test(d)) {
          return  d;
        } else {
          return '<p>' + d + '</p>';
        }
    })
    
    data = data.replace(h1Pattern, '<h1>$1</h1>')
    data = data.replace(h2Pattern, '<h2>$1</h2>')
    data = data.replace(h3Pattern, '<h3>$1</h3>')
    data = data.replace(h4Pattern, '<h4>$1</h4>')
    data = data.replace(h5Pattern, '<h5>$1</h5>')
    data = data.replace(h6Pattern, '<h6>$1</h6>')

    data = data.replace(boldPattern, '<strong>$1</strong>')
    data = data.replace(italicPattern, '<em>$1</em>')

    return `
        <html>
            <body>
                ${data}
            </body>
        </html
    `
}

function readFile (markdownPath) {
    fs.readFile(markdownPath, 'utf-8', (err, data) => {
        if (!err) {
            const html = parser(data)
            
            fs.writeFile('output.html', html, (error) => {
                console.log(error)
            })

        }
    })
}

const markdownPath = path.join(__dirname, 'prueba.md');
readFile(markdownPath)