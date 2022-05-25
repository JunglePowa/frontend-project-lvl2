import _ from 'lodash';

const formater = (tree) => {
 const iter = (node) => {
     const newNode = [...node];
     newNode.flatMap((key) => {
         console.log(key.type)
        });
         
     return newNode
    }
 return iter(tree);
}
export default formater