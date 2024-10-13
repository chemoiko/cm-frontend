// import "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import Link from "next/link";

export default function Home({ data, error }) {
  const router = useRouter();
  console.log("data :>> ", data);
  console.log("error :>> ", error);

  useEffect(() => {
    console.log("process:>> ", process.env.NEXT_PUBLIC_BASE_URL);
  }, []);

  const handleNavigation = (slug) => {
    router.push("/" + slug);
  };

  return (
    <div>
      <Head>
        <title>Campaign Manager</title>
        <meta name="description" content="A site for campaigns" />
      </Head>

      <div className={styles.main}></div>

      <main className={styles.main}>
        <div className={styles.innerContent}>
          <h1>Availabe campaigns</h1>
          {error && <p>{JSON.stringify(error)}</p>}

          {data.map((element) => (
            <div key={element.slug}>
              <div
                className={styles.item}
                onClick={() => handleNavigation(element.slug)}
              >
                <div className={styles.imgContainer}>
                  <Image
                    className={styles.img}
                    src={"https://res.cloudinary.com/dygwea5h1/" + element.logo}
                    height={120}
                    width={120}
                    alt="Campaign banner"
                  />
                </div>

                <div className={styles.rightItems}>
                  <Link href={"/" + element.slug}>{element.title}</Link>
                  <p>{element.description}</p>
                  <p>
                    {dateFormat(element.created_at, "dS mmmm, yyyy, h:MM TT")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  //for getting data at buildtime
  let data = [];
  let error = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`
    );

    data = await response.json();
  } catch (err) {
    error = err.message ? err.message : "someting went wrong";
  }

  if (!data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      error,
    },
  };
}
