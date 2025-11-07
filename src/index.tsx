import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Component, createContext, type Context } from "react";
import "./main.css";

const container = document.getElementById("webpack");

if (!container) {
  throw new Error("container === null");
}

const root = createRoot(container);

interface IState {
  name: string;
  age: number;
}

export interface ICtxType {
  ctxName: string;
  ctxAge: number;
  setCtxAge: (newAge: number) => void;
}

export const Ctx: Context<ICtxType> = createContext<ICtxType>(
  {} as ICtxType /* initialVal */,
);

class Layout extends Component<Record<string, never>, IState> {
  state = {
    name: "layout",
    age: 1,
  };

  setAge = (newAge: number) => {
    this.setState({
      age: newAge,
    });
  };

  handleAge = () => {
    const { age } = this.state;
    this.setState({ age: age + 1 });
  };

  render() {
    const { name, age } = this.state;
    return (
      <>
        <header className="bg-slate-300">
          <p>State</p>
          <div>name: {name}</div>
          <div>age: {age}</div>
          <button onClick={this.handleAge}>addAge</button>
        </header>

        <main>
          <Ctx.Provider
            value={{ ctxName: name, ctxAge: age, setCtxAge: this.setAge }}
          >
            <App propsName={name} propsAge={age} setPropsAge={this.setAge} />

            <hr />

            {
              <Ctx.Consumer>
                {(ctxVal) => {
                  const { ctxName, ctxAge, setCtxAge } = ctxVal;
                  const handleClick = () => {
                    setCtxAge(ctxAge + 1);
                  };
                  return (
                    <>
                      <p>Consumer</p>
                      <div>ctxName: {ctxName}</div>
                      <div>ctxAge: {ctxAge}</div>
                      <button onClick={handleClick}>addAge</button>
                    </>
                  );
                }}
              </Ctx.Consumer>
            }
          </Ctx.Provider>
        </main>
      </>
    );
  }
}

root.render(<Layout />);
