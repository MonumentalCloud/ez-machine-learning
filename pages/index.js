import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {signIn, useSession} from 'next-auth/client';
import Main from '../component/main/main.js'

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>My EZ Machine Learning</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {session? <Main />
: <div>
      <h1>Please sign in here</h1> <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      </div> }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://marvinlee.work"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Marvin Lee
        </a>
      </footer>
    </div>
  )
}
