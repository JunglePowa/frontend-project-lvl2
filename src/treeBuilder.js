import _ from 'lodash';

const makeTree = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const allKeys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(allKeys);
    const tree = sortedKeys.map((key) => {
      if (!_.has(data1, key)) {
        return { name : key, value : data2[key], type : 'added' };
      }
      if (!_.has(data2, key)) {
        return { name : key, value : data1[key], type : 'deleted' };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
        name: key,
        type: 'changed',
        valueBefore: data1[key],
        valueAfter: data2[key]
        }
      }
      if (data1[key] === data2[key]) {
        return { name : key, value : data1[key], type : 'unchanged' }
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          name: key,
          type: 'object',
          children: makeTree(data1[key], data2[key]),
        };
      }

    })
    return tree
  }

  export default makeTree;