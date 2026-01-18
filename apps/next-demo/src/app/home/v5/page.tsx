"use client";

import { action, IState } from "@/app/lib/login/actions";
import { useActionState } from "react";

const initialState: IState = { message: "" };

export default function Login() {
  const [state, formAction, isPending] = useActionState<IState, FormData>(
    action,
    initialState,
  );

  return (
    <>
      <h1>{isPending ? "Loading..." : state.message}</h1>
      <div className="w-20 mx-auto mt-20">
        <form action={formAction} className="flex flex-col gap-2">
          {/* input 必须有 name 属性, 作为 formData 对象的 key */}
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          {/* button type 属性值必须是 submit, 触发表单提交 */}
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}
