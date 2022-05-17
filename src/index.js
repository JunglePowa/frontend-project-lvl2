import fs from 'fs';
import _ from 'lodash';

export const genDiff = (path1, path2) => {
    const filePath1 = fs.readFileSync(path1, 'utf-8');
    const filePath2 = fs.readFileSync(path2, 'utf-8');
    const json1 = JSON.parse(filePath1);
    const json2 = JSON.parse(filePath2);
    return compareFiles(json1, json2);
}

const compareFiles = (data1, data2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const allKeys = _.union(keys1, keys2);
    const tempArr = [...allKeys];
    let diffStirng = '';
    tempArr.sort().map((key) => {
      if (!_.has(data1, key)) {
        return diffStirng += `  + ${key}: ${data2[key]}\n`;
      }
      else if (!_.has(data2, key)) {
        return diffStirng += `  - ${key}: ${data1[key]}\n`;
      }
      else if (data1[key] !== data2[key]) {
        return diffStirng += `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
      }
      else return diffStirng += `    ${key}: ${data1[key]}\n`;
    })
    return `{\n${diffStirng}}`;
  }