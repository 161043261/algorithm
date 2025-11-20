import { action, makeObservable, observable } from "mobx";

interface IErrMsg {
  errCode: number;
  errText: string;
  closable?: boolean;
}

class ApiStore {
  @observable showToast = false;
  @observable errMsg: IErrMsg | null = null;
  private timerId: NodeJS.Timeout | null = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setErrMsg(errMsg: IErrMsg, duration = -1) {
    this.clearTimeout();
    this.errMsg = errMsg;
    this.showToast = true;
    if (duration > 0) {
      this.timerId = setTimeout(() => {
        this.setShowToast(false);
        this.cleanup();
      }, duration);
    }
  }

  setShowToast(shouldShowToast: boolean) {
    this.showToast = shouldShowToast;
    if (!shouldShowToast) {
      this.errMsg = null;
    }
  }

  @action.bound
  clearTimeout() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  @action.bound
  cleanup() {
    this.clearTimeout();
    this.showToast = false;
    this.errMsg = null;
  }
}

const apiStore = new ApiStore();
export default apiStore;
