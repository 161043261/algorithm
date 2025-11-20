import { createContext, useContext, useState } from "react";

interface ICtxType {
  cnt: number;
  setCnt: (cnt: number) => void;
}

const CntCtx = createContext<ICtxType>({} as ICtxType /* initialVal */);

function Child() {
  const ctxVal = useContext<ICtxType>(CntCtx); // ctxVal: readonly
  const { cnt, setCnt } = ctxVal;
  return (
    <>
      <div className="border-t">Child cnt: {cnt} </div>
      <button onClick={() => setCnt(cnt + 1)}>Child addCnt</button>
    </>
  );
}

function Parent() {
  const ctxVal = useContext<ICtxType>(CntCtx); // ctxVal: readonly
  const { cnt, setCnt } = ctxVal;
  return (
    <>
      <div className="border-t">Parent cnt: {cnt}</div>
      <button onClick={() => setCnt(cnt + 1)}>Parent addCnt</button>
      <Child />
    </>
  );
}

export default function App() {
  const [outerCnt, setOuterCnt] = useState(123);
  const [innerCnt, setInnerCnt] = useState(456);
  return (
    <div>
      <div>App outerCnt: {outerCnt}</div>
      <button onClick={() => setOuterCnt(outerCnt + 1)}>App addOuterCnt</button>

      <div>App innerCnt: {innerCnt}</div>
      <button onClick={() => setInnerCnt(innerCnt + 1)}>App addInnerCnt</button>

      {/* props 键名必须是 value */}
      <CntCtx.Provider value={{ cnt: outerCnt, setCnt: setOuterCnt }}>
        <Parent />
        <CntCtx.Consumer>
          {(ctxVal) => "[outer] ctxVal: " + JSON.stringify(ctxVal)}
        </CntCtx.Consumer>

        {/* props 键名必须是 value */}
        <CntCtx.Provider value={{ cnt: innerCnt, setCnt: setInnerCnt }}>
          <Parent />
          <CntCtx.Consumer>
            {(ctxVal) => "[inner] ctxVal: " + JSON.stringify(ctxVal)}
          </CntCtx.Consumer>
        </CntCtx.Provider>
      </CntCtx.Provider>
    </div>
  );
}
