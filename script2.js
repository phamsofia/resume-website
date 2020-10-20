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

const dataSource = String(process.env.DATASOURCE)

const displayData = (path) => {
    const fs = require('fs')
    fs.readFile(path, (err, data) => {
        if(err) throw err;
        const list = data.toString().trim().split('\n').sort()
        list.splice(list.length-1)
        const array = new Array()
        for (i in list) {
            var items = list[i].split(',')
            array.push({timestamp: Number(items[0]), ipAddress: items[1], conversion: items[2]})
        }
        for (i in array) {
            console.log('===' + (Number(i)+1).toString() + '===\n' 
            + 'Timestamp: ' + String(array[i].timestamp) + '\n'
            + 'IP Address: ' + String(array[i].ipAddress) + '\n'
            + 'Conversion: ' + String(array[i].conversion))
        }
    }
    ); 
}

displayData(dataSource)
