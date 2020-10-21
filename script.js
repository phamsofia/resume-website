const superagent = require('superagent');
const dataSource = 'https://instagram.com'

const writeFile = (response) => {
    const fs = require('fs')
    const myError = (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
      }
    fs.writeFile('instagram.html', response.text, myError)
}

superagent.get(dataSource).then(writeFile)