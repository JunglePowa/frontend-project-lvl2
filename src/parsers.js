import yaml from 'js-yaml';

const parse = (fileData, type) => {
  if (type === 'json') {
    return JSON.parse(fileData);
  }
  if (type === 'yml' || type === 'yaml') {
    return yaml.load(fileData);
  }
  throw new Error('Uknow data type');
};

export default parse;
