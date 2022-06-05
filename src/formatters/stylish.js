import _ from 'lodash';

const stringify = (value, spaces) => {
  const indent = ' '.repeat(spaces + 6);
  const indentClose = ' '.repeat(spaces + 2);

  if (!_.isObject(value)) {
    return value;
  }
  const entries = _.keys(value);
  const nestedValue = entries.map((key) => {
    if (_.isObject(value[key])) {
      return `${indent}${key}: ${stringify(value[key], spaces + 4)}\n`;
    }
    return `${indent}${key}: ${value[key]}\n`;
  });
  return `{\n${nestedValue.join('')}${indentClose}}`;
};

const render = (tree) => {
  const iter = (data, spaces = 2) => data.map((key) => {
    const {
      name, type, children, value, beforeValue, afterValue,
    } = key;
    const indent = ' '.repeat(spaces);
    const indentClose = ' '.repeat(spaces + 2);

    switch (type) {
      case 'added': {
        return `\n${indent}+ ${name}: ${stringify(value, spaces)}`;
      }
      case 'deleted': {
        return `\n${indent}- ${name}: ${stringify(value, spaces)}`;
      }
      case 'nested': {
        return `\n${indent}  ${name}: {${iter(children, spaces + 4).join('')}\n${indentClose}}`;
      }
      case 'changed': {
        return `\n${indent}- ${name}: ${stringify(beforeValue, spaces)}\n${indent}+ ${name}: ${stringify(afterValue, spaces)}`;
      }
      case 'unchanged': {
        return `\n${indent}  ${name}: ${stringify(value, spaces)}`;
      }
      default:
        throw new Error('Uknow data type');
    }
  });

  return `{${iter(tree).join('')}\n}`;
};

const stylish = (data) => {
  const result = render(data);
  return result;
};
export default stylish;
