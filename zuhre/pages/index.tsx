import { useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import { GoogleLogin } from 'react-google-login';
const Home: NextPage = () => {
  type User = {
    firstname: string,
    lastname: string,
    email: string
  }
  const [user: User, setUser] = useState(null);
  const responseSuccessGoogle = async (res: any) => {
    console.log(res)
    try {
      const response = await axios.post("auth/google", {
        tokenId: res.tokenId
      })
      setUser(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const responseErrorGoogle = (error: any) => {
    console.log(error)
  }
  return (
    <>
      <Head>
        <title>Zuhre</title>
        <meta name="description" content="About Zuhre beauty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? (
        <div>
          <h1>Login With Google</h1>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GACLIENTID || ""}
            buttonText="Login With Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      )
        :
        (
          <div>
            <h1>Welcome {user.firstname + " " + user.lastname}</h1>
          </div>
        )
      }

    </>

  )
}

export default Home
