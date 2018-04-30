import arrayEach from './array';
import templateEach from './template';

export default (...args) => {
  if (args.length > 1) {
    return templateEach(global)(...args);
  }

  return arrayEach(global)(...args);
};
