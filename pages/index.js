import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

const [client, setClient] = useState()
const [newClient, setNewClient] = useState()
const [login, setLogin] = useState()
const [blockScreen, setBlockScreen] = useState()
const [loginMenu, setLoginMenu] = useState()
const [loading, setLoading] = useState()
const[IP, setIP] = useState(process.env.IP)

const changeOrder = (position, action) => {
  setLoading(true)
  const options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      position: position, 
      action: action
    })
  }

  fetch('api/database', options)
    .then(response => response.json())
    .then(response => setClient(response))
    .then(response => setLoading(false))
    .catch(err => console.error(err));
}

const loginAlert = loginStatus => {
  if(loginStatus) {
    setLogin(loginStatus)
    changeLoginMenu()
    alert("You Logged! Now you can create new Patient")
  }
  else {
    alert("User or Password incorrect")
  }
}

const changeNewClientMenu = () => {
  setNewClient(!newClient)
  setBlockScreen(!blockScreen)
}

const changeLoginMenu = () => {
  setBlockScreen(!blockScreen)
  setLoginMenu(!loginMenu)
}

const checkLogin = e => {
  setLoading(true)
  e.preventDefault()
  const event = e.target
  const user = event.user.value
  const password = event.password.value
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user: user, 
      password: password
    })
  };
  
  fetch('api/auth', options)
    .then(response => response.json())
    .then(response => loginAlert(response))
    .then(response => setLoading(false))
    .catch(err => console.error(err));
}

const deleteClient = position => {
  setLoading(true)
  const options = {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({position: position})}
  fetch(`api/database`, options)
    .then(response => response.json())
    .then(response => setClient(response))
    .then(response => setLoading(false))
    .catch(err => console.error(err));
}

const createClient = e => {
  setLoading(true)
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
    .then(response => setLoading(false))
    .catch(err => console.error(err))
  }

useEffect(() => {
  setLoading(true)
  const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};
  fetch('api/database', options)
    .then(response => response.json())
    .then(response => setClient(response))
    .then(response => setLoading(false))
    .catch(err => console.error(err));
 },[])

  return (
    <>
    {
      newClient && 
      <div className = "flex w-screen h-screen fixed bg-transparent place-content-center place-items-center z-50">
        <form onSubmit = {e => createClient(e) } className = {`relative w-96 h-40 flex flex-col flex-wrap gap-x-2 border-2 border-double bg-slate-400 place-content-center`}>
            <label id = "PatientNameLabel" className = {``}>Novo Paciente </label>
            <input id = 'PatientNameInput' className = {` pl-1 w-44`}/>
            <label id = 'PatientPhoneLabel' className = {``}>Telefone </label>
            <input id = 'PatientPhoneInput' className = {` pl-1 w-44`}/>
            <button disabled = {loading} className = {`disabled justify-self-end bg-slate-300 shadow-md mt-2 w-16 ${loading && "opacity-50"}`}>
              Criar
            </button>
            <svg onClick = {() => changeNewClientMenu()} className="absolute top-1 right-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
            </svg>
        </form>
      </div>
    }
    
    {loginMenu && 
      <div className = "flex w-screen h-screen fixed bg-transparent place-content-center place-items-center z-50">
        <form onSubmit = {e => checkLogin(e) } className = {`relative w-96 h-40 flex flex-col flex-wrap gap-x-2 border-2 border-double bg-slate-400 place-content-center`}>
            <label className = {``}>User </label>
            <input id = 'user' className = {`w-80`}/>
            <label className = {``}>Password</label>
            <input id = 'password' className = {` w-80`}/>
            <button disabled = {loading} className = {`disabled justify-self-end bg-slate-300 shadow-md mt-2 w-16 ${loading && "opacity-50"}`}>
              Login In
            </button>
            <svg onClick = {() => changeLoginMenu()} className="absolute top-1 right-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
            </svg>
        </form>
      </div>

    }
    {
      blockScreen &&  
      <div className = "flex w-screen h-screen fixed bg-black opacity-50 z-40">
      </div>
    }
      <div className = {`flex flex-col w-screen h-screen mx-0 relative`}>
        <div className = "flex flex-row h-20 bg-gradient-to-r from-gray-100 to-gray-200 ">
          {
          loading && 
          <svg className="right-0 absolute mr-2 mt-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          }
          <div className = "text-2xl font-serif self-center align-middle basis-1/2 m-5">
            Queue Manager {loading}
          </div>
          {login ? 
            <button onClick = {() => changeNewClientMenu()} className = {`self-center hover:bg-gray-400 w-36 h-8 shadow-md ${loading && `opacity-50`}`} >
               Adicionar Cliente
            </button>
            :
            <button disabled = {loading} onClick = {() => changeLoginMenu()} className = {`self-center hover:bg-gray-400 w-36 h-8 shadow-md ${loading && `opacity-50`}`}>
              Login
              <div className = {`mt-16 bg-slate-500 sm:bg-green-500 md:bg-blue-500 lg:bg-yellow-500 xl:bg-red-500 2xl:bg-pink-500`}>
                Midia Query
              </div>

            </button>
          }
        </div>

        <table className="border-separate mx-auto mt-16 border-spacing-y-5 border-spacing-x-2 w-9/12">
            <thead>
            <tr>
                <th colSpan = '4' className = {`text-2xl font-serif shadow-md bg-slate-100`}>
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
                        <tr className = {`font-serif text-3xl text-center shadow-md divide-x divide-slate-400`}>
                          <td className="">
                            {item.name}
                          </td>
                          {
                            login && 
                            <td className = "border-r-1 border-grey-100"
                             onClick = {() => deleteClient(item.position)}    
                             >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.383 12.25c.806 0 1.533-.446 2.031-1.08a9.04 9.04 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V4.75A.75.75 0 0113 4a2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H12.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H4.654m10.598-9.75H13M4.654 20.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368A12 12 0 011 17.125c0-1.553.295-3.036.831-4.398.306-.774 1.086-1.227 1.918-1.227h1.053c.472 0 .745.556.5.96A8.958 8.958 0 004 17.124c0 1.194.232 2.333.654 3.375z" />
                              </svg>
                            </td>
                          }
                        </tr>
                      )
                    }
                    
                  })

                }
            </tbody>
        </table>

        <hr className = {`border-slate-300 border-solid border-1 mx-4`}/>

        <table className="border-separate mx-8 mt-6 gap-3 border-separate border-spacing-y-2">
          <thead>
            <tr>
                <th colSpan = '5' className = {``}>
                  <div className = {`text-2xl text-center font-serif shadow-md bg-slate-100 w-44 inline px-5`}>
                    EM ESPERA
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
                {
                  client &&
                  client.map( (item, index) => {
                    if (index != 0) {
                      return (
                        <tr className= {`divide-x divide-slate-400`}>
                          <td className={`font-serif bg-slate-200 text-1xl text-center shadow-md divide-x divide-slate-400`}>
                            {item.position}
                          </td>
                          <td className="font-serif text-1xl text-center shadow-md divide-x">
                            {item.name}
                          </td>
                          {
                          login && 
                          <>
                            <td className="font-serif text-3xl text-center shadow-md divide-x divide-slate-400"
                                onClick = {() => changeOrder(item.position, 'goUp')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                              </svg>
                            </td>
                           { 
                           (index + 1 != client.length) && 
                            <td className="font-serif text-3xl text-center shadow-md divide-x divide-slate-400"
                                onClick = {() => changeOrder(item.position, 'goDown')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                              </svg>
                            </td>
                            }
                            <td className = "font-serif text-3xl text-center shadow-md divide-x divide-slate-400"
                                onClick = {() => deleteClient(item.position)}    
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </td>
                          </>
                          }
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
