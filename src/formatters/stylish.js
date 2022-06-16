import _ from 'lodash';

const makeTab = (depth, spaces = 4) => {
  const space = ' ';
  return space.repeat(depth * spaces - 2);
};

const stringify = (value, depth) => {
  const indent = makeTab(depth, 4);
  const indentClose = makeTab(depth - 1, 4);

  if (!_.isObject(value)) {
    return value;
  }

  const entries = _.keys(value);
  const nestedValue = entries.map((key) => {
    if (_.isObject(value[key])) {
      return `${indent}  ${key}: ${stringify(value[key], depth + 1)}\n`;
    }
    return `  ${indent}${key}: ${value[key]}\n`;
  });
  return `{\n${nestedValue.join('')}  ${indentClose}}`;
};

const stylish = (tree) => {
  const iter = (data, depth) => data.map((key) => {
    const {
      name, type, children, value, value1, value2,
    } = key;
    const indent = makeTab(depth);
    switch (type) {
      case 'added': {
        return `\n${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      }
      case 'deleted': {
        return `\n${indent}- ${name}: ${stringify(value, depth + 1)}`;
      }
      case 'nested': {
        return `\n${indent}  ${name}: {${iter(children, depth + 1).join('')}\n  ${indent}}`;
      }
      case 'changed': {
        return `\n${indent}- ${name}: ${stringify(value1, depth + 1)}\n${indent}+ ${name}: ${stringify(value2, depth + 1)}`;
      }
      case 'unchanged': {
        return `\n${indent}  ${name}: ${stringify(value, depth + 1)}`;
      }
      default:
        throw new Error('Uknow data type');
    }
  });

  return `{${iter(tree, 1).join('')}\n}`;
};

export default stylish;
