import { usePageView } from "@/hooks/use-page-view";
import Head from "next/head";

const Page = () => {
  usePageView();
  return (
    <>
      <Head>
        <title>Devias Kit PRO</title>
      </Head>
      <main>
        <h1>Hello World</h1>
      </main>
    </>
  );
};

export default Page;
