import _ from 'lodash';
import { parse } from './parsers.js';
import makeTree from './treeBuilder.js';
import getFormater from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const fileParse1 = parse(path1);
  const fileParse2 = parse(path2);
  const tree = makeTree(fileParse1, fileParse2);
  return getFormater(tree, format);
};

export default genDiff;
