import React from "react";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white p-4">
      <div className="w-full max-w-2xl mx-auto">
        <ChatWindow />
      </div>
    </div>
  );
}