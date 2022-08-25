import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const [client, setClient] = useState()

 useEffect(() => {
  const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};

  fetch('http://127.0.0.1:3001/api/database', options)
    .then(response => response.json())
    .then(response => setClient(response))
    .catch(err => console.error(err));
 },[])

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
      <table class="border-collapse border border-slate-400 mx-auto w-9/12">
          <thead>
            <tr>
              <th class="border border-slate-300 ...">State</th>
              <th class="border border-slate-300 ...">City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 ...">Indiana</td>
              <td class="border border-slate-300 ...">Indianapolis</td>
            </tr>
            <tr>
              <td class="border border-slate-300 ...">Ohio</td>
              <td class="border border-slate-300 ...">Columbus</td>
            </tr>
            <tr>
              <td class="border border-slate-300 ...">Michigan</td>
              <td class="border border-slate-300 ...">Detroit</td>
            </tr>
          </tbody>
      </table>
    </>
  )
}
