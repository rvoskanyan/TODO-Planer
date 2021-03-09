import { workers } from '../constants';
import ServerWorker from './ServerWorker';

export default class DataController {
  constructor(worker = workers.locale) {
    if (!DataController._instance) {
      switch (worker) {
        case workers.server: {
          this.doer = new ServerWorker();
          break;
        }
        case workers.locale: {
          this.doer = new LsControl();
          break;
        }
        default: return worker.notFound;
      }

      DataController._instance = this;
    }

    return DataController._instance;
  }

  static getInstance() {
    return this._instance;
  }
}
