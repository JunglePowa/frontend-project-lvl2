import yaml from 'js-yaml';
//получает на вход объект с данными файла и типом данных
const parse = (fileData) => {
    if (fileData.type === '.json') {
        const data = fileData.data;
        return JSON.parse(data);
    }
    if (fileData.type === '.yml' || fileData.type === '.yaml') {
        const data = fileData.data;
        return yaml.load(data);
    }
    
};

export default parse;
