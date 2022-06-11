import getFileData from './fileReader.js';
import parse from './parsers.js';
import makeTree from './treeBuilder.js';
import getFormater from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const fileData1 = getFileData(path1);
  const fileData2 = getFileData(path2);
  const fileParse1 = parse(fileData1);
  const fileParse2 = parse(fileData2);
  const tree = makeTree(fileParse1, fileParse2);
  return getFormater(tree, format);
};

export default genDiff;
