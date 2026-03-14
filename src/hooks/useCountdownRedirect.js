import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCountdownRedirect(seconds, path) {
  const [count, setCount] = useState(seconds);
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count <= 1) {
        nav(path, { replace: true });
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, nav, path]);

  return count;
}