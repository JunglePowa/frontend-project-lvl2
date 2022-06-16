import * as path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import makeTree from './treeBuilder.js';
import getFormater from './formatters/index.js';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filePath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getFileType = (filePath) => path.extname(filePath).slice(1);
const genDiff = (path1, path2, format = 'stylish') => {
  const fileData1 = getFileData(path1);
  const fileData2 = getFileData(path2);
  const fileType1 = getFileType(path1);
  const fileType2 = getFileType(path2);
  const fileParse1 = parse(fileData1, fileType1);
  const fileParse2 = parse(fileData2, fileType2);
  const tree = makeTree(fileParse1, fileParse2);
  return getFormater(tree, format);
};

export default genDiff;
