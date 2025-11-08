import {
  Component,
  type Context,
  type ContextType,
  type ErrorInfo,
} from "react";
import apiStore from "./demos/mobx.js";
import { type ICtxType, Ctx } from "./ctx.js";

interface IProps {
  propsName: string;
  propsAge: number;
  setPropsAge: (newAge: number) => void;
}

interface IState {
  stateName: string;
  stateAge: number;
}

interface ISnapshot {
  props: IProps;
  state: IState;
  ctx: ICtxType;
}

class App extends Component<
  IProps /** P */,
  IState /** S */,
  ISnapshot /** SS */
> {
  static contextType = Ctx;

  declare context: ContextType<Context<ICtxType>>;
  // declare context: ICtxType;

  // readonly props: Readonly<IProps>;
  state: Readonly<IState> = {
    stateName: "state",
    stateAge: 2,
  };

  // setState
  // forceUpdate
  constructor(props: IProps) {
    super(props);
    console.log(`[constructor] props:`, props);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("[componentDidCatch] error:", error, "errorInfo:", errorInfo);
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
      "[componentDidUpdate] prevProps:",
      prevProps,
      "prevState:",
      prevState,
      "snapshot:",
      snapshot,
    );
  }

  shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
    nextContext: ICtxType,
  ): boolean {
    console.log(
      "[shouldComponentUpdate] nextProps:",
      nextProps,
      "nextState:",
      nextState,
      "nextContext:",
      nextContext,
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
      ctx: this.context,
    };
  }

  handlePropsAge = () => {
    const { propsAge, setPropsAge } = this.props;
    setPropsAge(propsAge + 1);
  };

  handleStateAge = () => {
    const { stateAge } = this.state;
    this.setState({
      stateAge: stateAge + 1,
    });
  };

  handleContextAge = () => {
    this.context.ctxAge++;
  };

  render() {
    const { propsName, propsAge } = this.props;
    const { stateName, stateAge } = this.state;
    const { ctxName, ctxAge } = this.context;

    return (
      <>
        <header>
          <p>Props</p>
          <div>propName: {propsName}</div>
          <div>propAge: {propsAge}</div>
          <button onClick={this.handlePropsAge}>addAge</button>
        </header>

        <hr />

        <main>
          <p>State</p>
          <div>stateName: {stateName}</div>
          <div>stateAge: {stateAge}</div>
          <button onClick={this.handleStateAge}>addAge</button>
        </main>

        <hr />

        <footer>
          <p>Context</p>
          <div>ctxName: {ctxName}</div>
          <div>ctxAge: {ctxAge}</div>
          <button onClick={this.handleContextAge}>addAge</button>
        </footer>
      </>
    );
  }
}

export default App;
