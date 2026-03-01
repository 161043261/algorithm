"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useReducer } from "react";

const getUser = async () => {
  const res = await fetch("/api/user");
  return await res.json();
};

interface IState {
  username: string;
  password: string;
}

interface IAction {
  setState: "setUsername" | "setPassword";
  newValue: string;
}

interface IData {
  code: 0 | 1;
  message: string;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    getUser().then(console.log);
  }, []);

  const reducer = (state: IState, action: IAction) => {
    switch (action.setState) {
      case "setUsername":
        return { ...state, username: action.newValue };
      case "setPassword":
        return { ...state, password: action.newValue };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<IState, [IAction]>(reducer, {
    username: "",
    password: "",
  });

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ setState: "setUsername", newValue: e.target.value });
  };

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ setState: "setPassword", newValue: e.target.value });
  };

  const handleLogin = async () => {
    const { username, password } = state;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { code } = data as IData;
        if (code === 1) {
          router.push("/home");
        } else {
          alert("Login failed");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <Input
          value={state.username}
          className="w-70"
          type="text"
          placeholder="username"
          onChange={handleSetUsername}
        />
        <Input
          value={state.password}
          className="w-70"
          type="password"
          placeholder="password"
          onChange={handleSetPassword}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
}
