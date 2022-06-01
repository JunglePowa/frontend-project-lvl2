import _ from 'lodash';
import { parse } from '../src/parsers.js';
import makeTree from '../src/treeBuilder.js';
import render from '../src/formater.js';

export const genDiff = (path1, path2, formater = 'stylish') => {
    const fileParse1 = parse(path1);
    const fileParse2 = parse(path2);
    const tree = makeTree(fileParse1, fileParse2);
    return render(tree, formater);
}

