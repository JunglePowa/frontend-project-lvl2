import * as path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import makeTree from './treeBuilder.js';
import getFormater from './formatters/index.js';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = getFileData(path1);
  const data2 = getFileData(path2);
  const type1 = getType(path1);
  const type2 = getType(path2);
  const parse1 = parse(data1, type1);
  const parse2 = parse(data2, type2);
  const tree = makeTree(parse1, parse2);
  return getFormater(tree, format);
};

export default genDiff;
