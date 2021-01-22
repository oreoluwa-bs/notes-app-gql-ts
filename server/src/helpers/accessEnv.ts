const cache: { [key: string]: any } = {};

const accessEnv = (key: string, defaultValue?: any): any => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} environment variable not found`);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return process.env[key];
};

export default accessEnv;
