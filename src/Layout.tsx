import App from "./App";
import { Component, createRef } from "react";
import { Ctx } from "./ctx";

interface IState {
  name: string;
  age: number;
}

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

  appRef = createRef<App>();

  getAppSnapshot = () => {
    if (this.appRef.current) {
      return this.appRef.current.getSnapshot();
    }
    return null;
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
            <App
              propsName={name}
              propsAge={age}
              setPropsAge={this.setAge}
              ref={this.appRef}
            />

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

        <footer>
          <button onClick={() => console.log(this.getAppSnapshot())}>
            getAppSnapshot
          </button>
        </footer>
      </>
    );
  }
}

export default Layout;
