import fs from 'fs';
import _ from 'lodash';
import { parse } from '../src/parsers.js'

export const genDiff = (path1, path2) => {
    const fileParse1 = parse(path1);
    const fileParse2 = parse(path2);
    return compareFiles(fileParse1, fileParse2);
}

const compareFiles = (data1, data2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const allKeys = _.union(keys1, keys2);
    const keysArr = [...allKeys];
    let diffStirng = '';
    keysArr.sort().map((key) => {
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