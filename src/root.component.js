import React, { useState, useEffect } from "react";
import { micro1Subject, micro2Subject } from "@matt/messages";

import "./micro1.css";

export default function Root(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const micro1Sub = micro1Subject.subscribe({
      next: (newMessage) => setMessages([...messages, newMessage])
    });
    return () => micro1Sub.unsubscribe();
  })

  const onClick = (e) => {
    micro2Subject.next('Hello from app1 ' + new Date(Date.now()).toString());
  }

  return (
    <div>
        <section>{props.name} is mounted!</section>
        <button onClick={onClick}>Send message to app2</button>
        <p>Messages from app2:</p>
        {messages.map((message) => {
          return (<p>- {message}</p>)
        })}
    </div>
  );
}
