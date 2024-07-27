export function http({
  url,
  body,
  method,
  timeout
}: {
  url: string | URL;
  body?: Document | XMLHttpRequestBodyInit;
  method?: string;
  timeout?: number;
}) {
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.response);
          resolve({ data: result });
        } catch (e) {
          resolve({ data: xhr.response });
        }
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText || 'request failed!'
        });
      }
    };
    xhr.timeout = timeout || 5000;
    xhr.open(method || 'POST', url, true);
    xhr.send(body);
  });
}
