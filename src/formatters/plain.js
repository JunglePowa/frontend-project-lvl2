import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (data, keyName) => data
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      name, type, children, value, value1, value2,
    }) => {
      const path = `${keyName}${name}`;

      switch (type) {
        case 'added': {
          return `Property '${path}' was added with value: ${getValue(value)}`;
        }
        case 'deleted': {
          return `Property '${path}' was removed`;
        }
        case 'changed': {
          return `Property '${path}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        }
        case 'nested': {
          return iter(children, `${path}.`);
        }
        default:
          throw new Error('Unknow data type');
      }
    }).join('\n');

  return iter(tree, []);
};

export default plain;
