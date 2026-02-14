/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";

import { useChat } from "@ai-sdk/react";
import { Ref, useEffect, useImperativeHandle, useRef } from "react";

export interface IExpose {
  sendMessage: Function;
}

interface IProps {
  ref: Ref<IExpose>;
}

export default function Chat({ ref }: IProps) {
  const { messages, sendMessage } = useChat();

  useImperativeHandle(ref, () => ({ sendMessage }), [sendMessage]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, partIdx) => (
            <div key={message.id + partIdx}>
              {part.type === "text" ? part.text : ""}
            </div>
          ))}
        </div>
      ))}
      <div ref={containerRef} />
    </>
  );
}
