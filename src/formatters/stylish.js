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
      return `${indent}  ${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `  ${indent}${key}: ${value[key]}`;
  });
  return ['{', ...nestedValue, `${indentClose}  }`].join('\n');
};

const stylish = (tree) => {
  const iter = (data, depth) => data.map((key) => {
    const {
      name, type, children, value, value1, value2,
    } = key;
    const indent = makeTab(depth);
    switch (type) {
      case 'added': {
        return `${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      }
      case 'deleted': {
        return `${indent}- ${name}: ${stringify(value, depth + 1)}`;
      }
      case 'nested': {
        return `${indent}  ${name}: {\n${iter(children, depth + 1).join('\n')}\n${indent}  }`;
      }
      case 'changed': {
        return `${indent}- ${name}: ${stringify(value1, depth + 1)}\n${indent}+ ${name}: ${stringify(value2, depth + 1)}`;
      }
      case 'unchanged': {
        return `${indent}  ${name}: ${stringify(value, depth + 1)}`;
      }
      default:
        throw new Error('Unknown data type');
    }
  });

  return `{\n${iter(tree, 1).join('\n')}\n}`;
};

export default stylish;
