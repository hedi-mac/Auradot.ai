"use client";
import HomePage from "./home/page";
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch('http://localhost/php/test.php');
      const data = await res.text();
      setMessage(data);
    };
    fetchMessage();
  }, []);

  return (
    <>
    <main className="main_page">
    <div>{message}</div>
      <HomePage />
    </main>
    </>
  );
}
