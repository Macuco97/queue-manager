import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AppBar, Toolbar, IconButton, MenuIcon, Typography } from '@mui/material'

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}
