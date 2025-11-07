import { Component, createContext, type ErrorInfo } from "react";
import apiStore from "./demos/mobx.js";

interface IProps {
  propsName: string;
  propsAge: number;
}

interface IState {
  stateName: string;
  stateAge: number;
}

interface ISnapshot {
  props: IProps;
  state: IState;
}
interface ICtx {
  ctxName: string;
  ctxAge: number;
}

const ctx = createContext<ICtx>({
  ctxName: "context",
  ctxAge: 3,
});

class App extends Component<
  IProps /** P */,
  IState /** S */,
  ISnapshot /** SS */
> {
  static contextType = ctx;
  declare context: React.ContextType<typeof ctx>;

  // readonly props: Readonly<IProps>;
  state: Readonly<IState> = {
    stateName: "state",
    stateAge: 2,
  };

  // setState
  // forceUpdate
  constructor(props: IProps) {
    super(props);
    console.log(`[constructor] props: ${props}`);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(`[componentDidCatch] error: ${error}, errorInfo: ${errorInfo}`);
  }

  componentDidMount() {
    console.log("[componentDidMount]");
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: ISnapshot,
  ): void {
    console.log(
      `[componentDidUpdate] prevProps: ${prevProps}, prevState: ${prevState}, snapshot: ${snapshot}`,
    );
  }
  shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
    nextContext: ICtx,
  ): boolean {
    console.log(
      `[shouldComponentUpdate] nextProps: ${nextProps}, nextState: ${nextState}, nextContext: ${nextContext}`,
    );
    return true;
  }

  componentWillUnmount(): void {
    console.log("[componentWillUnmount]");
    apiStore.setShowToast(false);
  }
  getSnapshotBeforeUpdate() {
    return {
      props: this.props,
      state: this.state,
    };
  }
  render() {
    return <div>Hello, React!</div>;
  }
}

// function App() {
//   return <div>Hello, React!</div>;
// }

export default App;
