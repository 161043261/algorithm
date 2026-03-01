/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { ChangeEvent, Component, createRef, ReactNode, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Chat from "./components/chat";
import { IExpose as IChatExpose } from "./components/chat";

interface IState {
  inputVal: string;
}

class DynamicComponent extends Component<{}, IState> {
  state = {
    inputVal: "",
  };
  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputVal: e.target.value,
    });
  };

  chatRef = createRef<IChatExpose>();

  handleSendMessage = () => {
    if (!this.chatRef.current) {
      return;
    }
    const { inputVal } = this.state;
    const { sendMessage } = this.chatRef.current;
    sendMessage({ text: inputVal });
    this.setState({ inputVal: "" });
  };

  render(): ReactNode {
    const { inputVal } = this.state;
    return (
      <>
        <Chat ref={this.chatRef} />
        <Input value={inputVal} onChange={this.handleInput} />
        <Button onClick={this.handleSendMessage}>Send message</Button>
      </>
    );
  }
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading Dynamic Content...</div>}>
      <DynamicComponent />
    </Suspense>
  );
}
