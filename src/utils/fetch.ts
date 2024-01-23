const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};
type HttpMethod = (typeof METHODS)[keyof typeof METHODS];
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  timeout?: number;
}

class HTTPTransport {
  queryStringify(data: Record<string, any>): string {
    return !data
      ? ""
      : "?" +
          Object.keys(data)
            .map((key) => key + "=" + data[key])
            .join("&");
  }

  get = (url: string, options: RequestOptions = {}) => {
    const fullUrl = options.data ? `${url}?${this.queryStringify(options.data)}` : url;
    const getOptions = { ...options, method: METHODS.GET };
    return this.request(fullUrl, getOptions, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}) => {
    const postOptions = { ...options, method: METHODS.POST };
    return this.request(url, postOptions);
  };

  put = (url: string, options: RequestOptions = {}) => {
    const putOptions = { ...options, method: METHODS.PUT };
    return this.request(url, putOptions);
  };

  delete = (url: string, options: RequestOptions = {}) => {
    const deleteOptions = { ...options, method: METHODS.DELETE };
    return this.request(url, deleteOptions);
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { method, headers, data } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    const combinedHeaders = { ...defaultHeaders, ...headers };

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method || METHODS.GET, url);
      if (headers) {
        for (const [header, value] of Object.entries(combinedHeaders)) {
          xhr.setRequestHeader(header, value);
        }
      }
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === "GET") {
        console.log("sending");
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
      setTimeout(() => {
        xhr.abort();
        reject(new Error("Request timed out"));
      }, timeout);
    });
  };
}
