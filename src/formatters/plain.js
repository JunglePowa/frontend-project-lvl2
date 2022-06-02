import _ from 'lodash';

const getValue = (value) => {
    if (_.isObject(value)) {
        return `[complex value]`;
    }
    if (_.isString(value)) {
        return `'${value}'`;
    }
    return value;
  }

  const render = (tree) => {
    const iter = (data, keyName) => {
        const { name, type, children, value, beforeValue, afterValue } = data;
        const path = `${keyName}${name}`;
        
        switch (type) 
        {
            case 'added' : {
                return `Property '${path}' was added with value: ${getValue(value)}\n`;
            }
            case 'deleted' : {
                return `Property '${path}' was removed\n`;
            }
            case 'nested' : {
                return `${children.map((item) => iter(item, `${path}.`)).join('')}`;
            }
            case 'changed' : {
                return `Property '${path}' was updated. From ${getValue(beforeValue)} to ${getValue(afterValue)}\n`;
            } 
        }
        return '';
     }
     
    return iter(tree, '');
};

const plain = (data) => {
    const result = data.map((item) => render(item)).join('');
    return result.trim();
}
  export default plain;