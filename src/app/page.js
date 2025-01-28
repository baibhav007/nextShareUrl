import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.replace("https://loyaltty.com");
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Hello Loyaltty</h1>
      <p>Redirecting you to the new domain...</p>
    </div>
  );
}
