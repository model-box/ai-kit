import { http } from '../http';

class EventLogger {
  _configs: any;

  constructor() {
    this._configs = {
      appKey: '',
      userId: '',
      version: '0.0.1',
      env: 'beta',
      browserVersion: '0.0.1',
      ua: (window as any).navigator.userAgent
    };
  }

  setConfig() {}

  logEvent( ) {}

  logSuccessEvent() {
    this.logEvent();
  }

  logFailedEvent() {
    this.logEvent();
  }

  sendRequest(url: string, data: any) {

    http({ url, body: JSON.stringify(data) }).catch(() => {
      // ignore
    });
  }
}

export default new EventLogger();
