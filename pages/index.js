import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

const [client, setClient] = useState()
const [newClient, setNewClient] = useState()
const [login, setLogin] = useState()
const [blockScreen, setBlockScreen] = useState()


const changeNewClientMenu = () => {
  setNewClient(!newClient)
  setBlockScreen(!blockScreen)
}

const deleteClient = position => {
  const options = {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({position: position})}
  fetch(`api/database`, options)
    .then(response => response.json())
    .then(response => setClient(response))
    .catch(err => console.error(err));
}

const createClient = e => {
  e.preventDefault()
  const event = e.target
  const name = event.PatientNameInput.value
  const phone = event.PatientPhoneInput.value
  const body = {
    name: name,
    phone: phone
  }
  const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}
  fetch(`api/database`, options)
    .then(response => response.json(response))
    .then(response => setClient(response))
    .catch(err => console.error(err))
  }

useEffect(() => {
  const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
  fetch('api/database', options)
    .then(response => response.json())
    .then(response => setClient(response))
    .catch(err => console.error(err));
 },[])

  return (
    <>
    {
      newClient && 
      <div className = "flex w-screen h-screen fixed bg-transparent place-content-center place-items-center z-50">
        <form onSubmit = {e => createClient(e) } className = {`relative w-1/3 h-1/6 flex flex-col flex-wrap gap-x-2 border-2 border-double bg-slate-400 p-2 place-content-center`}>
            <label id = "PatientNameLabel" className = {``}>Novo Paciente </label>
            <input id = 'PatientNameInput' className = {` pl-1 w-5/6`}/>
            <label id = 'PatientPhoneLabel' className = {``}>Telefone </label>
            <input id = 'PatientPhoneInput' className = {` pl-1 w-5/6`}/>
            <button className = 'justify-self-end bg-slate-300 mt-2 w-16 rounded-full '>
              Criar
            </button>
            <svg onClick = {() => changeNewClientMenu()} className="absolute top-1 right-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
            </svg>
        </form>
      </div>
    }
    {
      blockScreen &&  
      <div className = "flex w-screen h-screen fixed bg-black opacity-75">
      </div>
    }
      <div className = {`flex flex-col w-screen h-screen mx-0`}>

        <div className = "flex flex-row h-20 bg-gradient-to-r from-gray-100 to-gray-200 ">
          <div className = "text-2xl self-center align-middle basis-1/2 m-5">
            Queue Manager
          </div>
          <button onClick = {() => changeNewClientMenu()} className = "bg-gray-300 hover:bg-gray-400 basis-1/4 h-9/12 m-3 rounded-full">
              Adicionar Cliente
          </button>
          <button className = "bg-gray-300 hover:bg-gray-400 basis-1/4 h-9/12 m-3 rounded-full">
              Login
          </button>
        </div>

        <table class="border-separate mx-auto mt-16 border-spacing-y-5 border-spacing-x-2 w-9/12">
            <thead>
            <tr>
                <th colspan = '4' className = {`border-4 border-slate-400 text-3xl`}>
                  EM ATENDIMENTO
                </th>
              </tr>
            </thead>
            <tbody>
                {
                  client &&
                  client.map( (item, index) => {
                    if(index == 0) {
                      return (
                        <tr className = {``}>
                          <td class="shadow-lg shadow-grey-500/50 border-b-4 border-r-4 border-slate-500 font-mono text-center text-3xl bg-lime-300">
                            {item.name}
                          </td>
                          <td className="shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                            </svg>
                          </td>
                          <td className="shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                          </td>
                          <td className = "shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10"
                              onClick = {() => deleteClient(item.position)}    
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.383 12.25c.806 0 1.533-.446 2.031-1.08a9.04 9.04 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V4.75A.75.75 0 0113 4a2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H12.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H4.654m10.598-9.75H13M4.654 20.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368A12 12 0 011 17.125c0-1.553.295-3.036.831-4.398.306-.774 1.086-1.227 1.918-1.227h1.053c.472 0 .745.556.5.96A8.958 8.958 0 004 17.124c0 1.194.232 2.333.654 3.375z" />
                            </svg>

                          </td>
                        </tr>
                      )
                    }
                    
                  })

                }
            </tbody>
        </table>

        <hr className = {`border-slate-500 border-dotted border-4 mx-4`}/>

        <table class="border-separate mx-auto mt-16 border-spacing-2 w-9/12">
          <thead>
            <tr>
                <th colspan = '4' className = {`border-4 border-slate-400 text-3xl`}>
                  EM ESPERA
                </th>
              </tr>
            </thead>
            <tbody>
                {
                  client &&
                  client.map( (item, index) => {
                    if (index != 0) {
                      return (
                        <tr className>
                          <td class="shadow-lg shadow-grey-500/50 border-b-4 border-r-4 border-slate-500 font-mono text-center text-3xl bg-gray-100">
                            {item.position}
                          </td>
                          <td class="shadow-lg shadow-grey-500/50 border-b-4 border-r-4 border-slate-500 font-mono text-center text-3xl bg-gray-100">
                            {item.name}
                          </td>
                          <td className="shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                            </svg>
                          </td>
                          <td className="shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                            </svg>
                          </td>
                          <td className = "shadow-lg shadow-grey-500/50 border-b-4 border-slate-500 font-mono text-center bg-gray-100 w-10 h-10"
                              onClick = {() => deleteClient(item.position)}    
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </td>

                        </tr>
                      )
                    
                    }
                  })
                
                }
            </tbody>
        </table>

      </div>
      
      
    </>
  )
}
