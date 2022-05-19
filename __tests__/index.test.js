import { fileURLToPath } from 'url';
import * as path from 'path';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const flatDiffResult = `{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}`
test('genDiff', () => {
  expect(genDiff(jsonFile1, jsonFile2 )).toMatch(flatDiffResult);
  expect(genDiff(yamlFile1, yamlFile2 )).toMatch(flatDiffResult);
});

