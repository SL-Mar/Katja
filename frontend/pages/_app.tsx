// pages/_app.tsx
import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <main className="flex-1 flex w-full overflow-hidden">
          <Component {...pageProps} />
        </main>
        {/* footer… */}
      </div>
    </>
  );
}
