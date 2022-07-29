import Head from "next/head";

const Page = ({ children, title, description, url, type, image }) => {
  const urlEnv = process.env.NEXT_PUBLIC_URL;
  return (
    <>
      <Head>
        <title>{title || "Default Title"}</title>
        <meta
          name="description"
          content={description || "Default description"}
        />

        <meta property="og:url" content={url || urlEnv} />
        <meta property="og:type" content={type || "website"} />
        <meta property="og:title" content={title || "Default Title"} />
        <meta
          property="og:description"
          content={description || "Default description"}
        />
        <meta
          property="og:image"
          itemProp="image"
          content={image || "image url default"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={urlEnv} />
        <meta property="twitter:url" content={url || urlEnv} />
        <meta name="twitter:title" content={title || "Default Title"} />
        <meta
          name="twitter:description"
          content={description || "Default description"}
        />
        <meta name="twitter:image" content={image || "image url default"} />
      </Head>
      {children}
    </>
  );
};

export default Page;
