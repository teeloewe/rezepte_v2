import { Html, Head, Main, NextScript } from "next/document";
import NavBarComp from "@/components/NavBarComp";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavBarComp />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
