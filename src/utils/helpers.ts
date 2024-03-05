// trim elements from string
export const trim = function (str: string, chars?: string) {
  if (!chars) {
    return str.trim();
  }
  const regExp = new RegExp(`^[${chars}]+|[${chars}]+$`, "g");
  return str.replace(regExp, "");
};

type Indexed<T = unknown> = {
  [key in string]: T;
};
interface State {
  [key: string]: any;
}
// merge arrays

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === "object" && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === "[object Object]";
}

export const merge = function (lhs: Indexed, rhs: Indexed): Indexed {
  const result = { ...lhs };

  for (const key in rhs) {
    if (isPlainObject(rhs[key])) {
      result[key] = isPlainObject(lhs[key]) ? merge(lhs[key] as Indexed, rhs[key] as Indexed) : rhs[key];
    } else {
      result[key] = rhs[key];
    }
  }

  return result;
};

/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */
export const set = function (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  // Код
  if (typeof object !== "object" || object === null) {
    return object;
  }
  const keys = path.split(".");
  let current = object as Indexed;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Indexed;
  }
  const finalKey = keys[keys.length - 1];
  current[finalKey] = value;
  return object;
};

export const isEqual = function (a: State, b: State): boolean {
  // Get the keys of both objects
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // Check if the number of keys is different
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // Check if all keys in 'a' exist in 'b' and have the same values
  for (const key of aKeys) {
    const aValue = a[key];
    const bValue = b[key];

    // Check if the values are objects and perform a deep comparison
    if (aValue instanceof Object && bValue instanceof Object) {
      if (!isEqual(aValue, bValue)) {
        return false;
      }
    } else if (aValue !== bValue) {
      // If values are not objects, perform a direct comparison
      return false;
    }
  }

  return true;
};
export const cloneDeep = function <T extends object = object>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = cloneDeep((obj as { [key: string]: any })[key]);
      }
    }
    return clonedObj;
  } else {
    return obj;
  }
};

type StringIndexed = Record<string, any>;

export const queryStringify = function (data: StringIndexed): string | never {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData,
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object") {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
};
