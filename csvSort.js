// Write a script that takes two environment variables:

// * DATASOURCE that is a path to a CSV with the following columns:
// Timestamp (Number) | IP Address (String) | Conversion (visit|contactUs|gitHub)
// interface Conversion {
//     timestamp: number;
//     ipAddress: string;
//     conversion: 'visit' | 'contactUs' | 'gitHub'
//   }

// * METHOD which is either:
// DISPLAY - Console print the datasource in chronological order with the following format:
// ===1===
// Timestamp: 1234
// IP Address: 0.0.0.0
// Conversion: visit
// ===2===
// ...
// AGGREGATE: Print the number of each conversion type

require('dotenv').config()
const fs = require('fs')

const dataSource = process.env.DATASOURCE
const method = process.env.METHOD

// log each data point 
const displayData = (data) => {
    for (i in data) {
        console.log('===' + (parseInt(i)+1).toString() + '===\n' 
        + 'Timestamp: ' + (data[i].timestamp).toString() + '\n'
        + 'IP Address: ' + (data[i].ipAddress).toString() + '\n'
        + 'Conversion: ' + (data[i].conversion).toString())
    }
}

// to log conversion count 
const aggregateConversion = (data) => {
    const conversionCount = {visit: 0, contactUs: 0, gitHub: 0}
    for (i in data) {
        if (data[i].conversion === 'visit') {
            conversionCount.visit = conversionCount.visit + 1
        }
        else if (data[i].conversion === 'contactUs') {
            conversionCount.contactUs = conversionCount.contactUs + 1
        }
        else {
            conversionCount.gitHub = conversionCount.gitHub + 1
        }
    }
    console.log(conversionCount)
}

// to read data
const readData = (path, method) => {
    fs.readFile(path, (err, data) => {
        if(err) throw err;
        const list = data.toString().trim().split('\n').sort()
        list.splice(list.length-1)
        const array = new Array()
        for (i in list) {
            var items = list[i].trim().split(',')
            array.push({timestamp: parseInt(items[0]), ipAddress: items[1], conversion: items[2]})
        }
        if (method === 'DISPLAY') {
            displayData(array)
        }
        else {
            aggregateConversion(array)
        }
    }
    )
}   

readData(dataSource, method)