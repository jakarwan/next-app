import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import CardMedia from "@mui/material/CardMedia";

const Home: NextPage = () => {
  return (
    <>
      <video muted loop autoPlay id="myVideo" className='w-full'>
        <source src="video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h5>Jakarwan Borkaew</h5>
    </>
  )
}

export default Home
