import { createContext, type Context } from "react";

export interface ICtxType {
  ctxName: string;
  ctxAge: number;
  setCtxAge: (newAge: number) => void;
}

export const Ctx: Context<ICtxType> = createContext<ICtxType>({
  ctxName: "",
  ctxAge: 0,
  setCtxAge: () => {
    throw new Error("Unimplemented");
  },
});
