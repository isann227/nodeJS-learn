import React, { useState, useEffect } from "react";

export default function Hooks() {
  const [count, setCount] = useState(0);

  // useEffect jalan setiap kali 'count' berubah
  useEffect(() => {
    console.log(`Count berubah jadi: ${count}`);
  }, [count]);

  return (
    <div>
      <h2>Hooks Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
