import * as path from 'path';
import fs from 'fs';
//получает путь и возвращает объект с данными и типом файла
const getFileData = (filePath) => {
    const data = {
        data : fs.readFileSync(filePath, 'utf-8'),
        type : path.extname(filePath)
    }
    return data;
  };
  
  export default getFileData;
