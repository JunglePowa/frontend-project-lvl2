import { fileURLToPath } from 'url';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const testFileStylish = getFixturePath('expectedDataStylish.txt');
const expectedDataStylish = fs.readFileSync(testFileStylish, 'utf-8');
const testFilePlain = getFixturePath('expectedDataPlain.txt');
const expectedDataPlain = fs.readFileSync(testFilePlain, 'utf-8');
const testFileJson = getFixturePath('expectedDataJson.txt');
const expectedDataJson = fs.readFileSync(testFileJson, 'utf-8');

test('genDiff', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toEqual(expectedDataStylish);
  expect(genDiff(yamlFile1, yamlFile2)).toEqual(expectedDataStylish);
  expect(genDiff(yamlFile1, yamlFile2, 'plain')).toEqual(expectedDataPlain);
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toEqual(expectedDataPlain);
  expect(genDiff(yamlFile1, yamlFile2, 'json')).toMatch(expectedDataJson);
  expect(genDiff(jsonFile1, jsonFile2, 'json')).toMatch(expectedDataJson);
});
