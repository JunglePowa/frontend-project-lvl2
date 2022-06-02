import stylish from "./stylish.js";
import plain from "./plain.js";

export const getFormater = (tree, format) => {
    if (format === 'plain') {
        return plain(tree);
    }
    return stylish(tree);
}
