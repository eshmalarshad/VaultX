import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()

    }, [])

    const copyText = (text) => {
        toast('Copied To Clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            let newPassword = { ...form, id: form.id || uuidv4() }

            // Delete only when editing old password
            if (form.id) {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                })
            }

            setpasswordArray([...passwordArray.filter(item => item.id !== form.id), newPassword])

            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            })

            setform({ site: "", username: "", password: "" })

            toast('Password Saved ', {
                position: "top-center",
                autoClose: 1000,
                theme: "light",
                transition: Flip,
            })

        } else {
            toast("Error: Password not saved!!")
        }
    }
    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.success('Password Deleted Successfully!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }
    const editPassword = (id) => {

        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))


    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"

        }
        else {

            ref.current.src = "icons/eyecross.png"
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Flip}
            />
            <div className='absolute top-14 inset-0 -z-10 w-full'></div>
            <div className=" md:mycontainer top-14 p-3 min-h-[90vh]">
                <h1 className='text-4xl font-bold text-center' >
                    <span className='text-[#A0EDE6]'></span>
                    <span className='text-[#0F172A]'>Vault</span>
                    <span className='text-[#A0EDE6]'>X</span>
                </h1>
                <p className='text-[#0F172A] text-lg text-center' >Your Own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} id='site' name='site' onChange={handleChange} className='rounded-full border border-[#A0EDE6] w-full p-4 py-1' type="text" placeholder='Enter Website URL' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} id='username' name='username' onChange={handleChange} className='rounded-full border border-[#A0EDE6] w-full p-4 py-1' type="text" placeholder='Enter Username' />

                        <div className="relative ">
                            <input ref={passwordRef} value={form.password} name='password' id='password' onChange={handleChange} className='rounded-full border border-[#A0EDE6] w-full p-4 py-1' type="password" placeholder='Enter Password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-[#A0EDE6] rounded-full px-4 py-1 gap-2 w-fit mx-auto hover:bg-[#88DDD6] border border-[#6eb9b3]'>

                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            state="hover-swirl">
                        </lord-icon>
                        Save </button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords To Show</div>}
                    {

                        passwordArray.length != 0 && <table class=" mb-7 table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-[#A0EDE6] text-black'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead >
                            <tbody className='bg-[#f1fffd]'>
                                {passwordArray.map((item) => {
                                    return <tr>
                                        <td className='flex items-center  justify-center items-centerpy-2 text-center '><a target='_blank' href={item.site}>{item.site}</a>
                                            <div className='flex items-center justify-center '>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td >
                                        <td className=' py-2 text-center '>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className=' lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 text-center'>
                                            <span onClick={() => { editPassword(item.id) }} className='cursor-pointer mx-1'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                            <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer mx-1'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>



        </>
    )
}

export default Manager
