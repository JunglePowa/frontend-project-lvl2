import _ from 'lodash';

const stringify = (value, depth) => {
  const indent = ' '.repeat(depth + 6);
  const indentClose = ' '.repeat(depth + 2);

  if (!_.isObject(value)) {
    return value;
  }
  const entries = _.keys(value);
  const nestedValue = entries.map((key) => {
    if (_.isObject(value[key])) {
      return `${indent}${key}: ${stringify(value[key], depth + 4)}\n`;
    }
    return `${indent}${key}: ${value[key]}\n`;
  });
  return `{\n${nestedValue.join('')}${indentClose}}`;
};

const stylish = (tree) => {
  const iter = (data, depth = 2) => data.map((key) => {
    const {
      name, type, children, value, value1, value2,
    } = key;
    const indent = ' '.repeat(depth);
    const indentClose = ' '.repeat(depth + 2);

    switch (type) {
      case 'added': {
        return `\n${indent}+ ${name}: ${stringify(value, depth)}`;
      }
      case 'deleted': {
        return `\n${indent}- ${name}: ${stringify(value, depth)}`;
      }
      case 'nested': {
        return `\n${indent}  ${name}: {${iter(children, depth + 4).join('')}\n${indentClose}}`;
      }
      case 'changed': {
        return `\n${indent}- ${name}: ${stringify(value1, depth)}\n${indent}+ ${name}: ${stringify(value2, depth)}`;
      }
      case 'unchanged': {
        return `\n${indent}  ${name}: ${stringify(value, depth)}`;
      }
      default:
        throw new Error('Uknow data type');
    }
  });

  return `{${iter(tree).join('')}\n}`;
};

export default stylish;
