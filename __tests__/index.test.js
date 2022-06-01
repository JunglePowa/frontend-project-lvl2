import { fileURLToPath } from 'url';
import * as path from 'path';
import { genDiff } from '../src/index.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const testFile = getFixturePath('expectedData.txt');
const expectedData = fs.readFileSync(testFile, 'utf-8');
console.log(testFile);

test('genDiff', () => {
  expect(genDiff(jsonFile1, jsonFile2 )).toEqual(expectedData);
  expect(genDiff(yamlFile1, yamlFile2 )).toEqual(expectedData);
});

