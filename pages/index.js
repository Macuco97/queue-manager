import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'React'


export default function Home() {
  return (
    <>
      <div className = "flex flex-row h-14 bg-gradient-to-r from-gray-100 to-gray-200 ">
        <div className = "text-3xl self-center align-middle basis-9/12 m-5">
          Queue Manager
        </div>
        <button className = "bg-gray-300 hover:bg-gray-400 basis-1/4 h-1/2 m-3 rounded-full">
            Login
        </button>
      </div>
      <div className="container mx-auto">
        
      </div>
    </>
  )
}
