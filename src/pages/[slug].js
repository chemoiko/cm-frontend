import Head from "next/head";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Detail.module.css";
import { FACHECircle, FaCheckCircle } from "react-icons/fa";

function Campaign({ data }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  console.log("email :>> ", email);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify({
        email,
        campaign: data.id,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Sending data:", { email, campaignId: data.id });

    setIsSubmitting(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribers`, options)
      .then((res) => res.json())
      .then((response) => {
        setIsSubmitted(true);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <Head>
        <title>{data.title}</title>

        <meta name="description" content={data.description} />
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.main}></div>

        <div className={styles.contents}>
          <Image
            className={styles.img}
            src={"https://res.cloudinary.com/dygwea5h1/" + data.logo}
            height={120}
            width={120}
            alt="Campaign banner"
          />

          <div className={styles.grid}>
            <div className={styles.left}>
              <Link href={"/" + data.slug}>
                <h1 className={styles.title}>{data.title}</h1>
              </Link>
              <p className={styles.description}>{data.description}</p>
            </div>
            <div className={styles.right}>
              {!isSubmitted ? (
                <div className={styles.rightContents}>
                  <form onSubmit={handleOnSubmit}>
                    <div className={styles.formGroup}>
                      <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className={styles.submit}>
                      <input
                        className={styles.button}
                        type="submit"
                        name="email"
                        value="SUBSCRIBE"
                        required
                      />
                      <p className={styles.consent}>
                        We respect your privacy, Unsubscribe anytime
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className={styles.thankyou}>
                  <div className={styles.icon}>
                    <FaCheckCircle size={17} color="green" />
                  </div>
                  <div className={styles.message}>
                    <h1>Thank you for subscribing</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.imgContainer}>
          <div className={styles.grid}></div>
        </div>

        <div className={styles.rightItems}>
          <p>{dateFormat(data.created_at, "dS mmmm, yyyy, h:MM TT")}</p>
        </div>
        <footer className={styles.footer}>
          <Link href="/">
            <p>Go back </p>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`);

  const data = await response.json();

  const allSlugs = data.map((item) => item.slug);

  const paths = allSlugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}`
  );

  console.log(
    "Fetching from URL:",
    `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}`
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
export default Campaign;
