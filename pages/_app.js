import "@/styles/globals.css";
import "@/styles/rezepte.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  )
}
