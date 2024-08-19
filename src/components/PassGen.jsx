import React, { useCallback, useEffect, useState, useRef } from 'react'

function PassGen() {

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(1);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        numAllowed === true ? str += "1234567890" : str;
        charAllowed === true ? str += "!@#$%^&*" : str;
        for (let i = 1; i <= length; i++) {
            let charAtIdx = Math.floor(Math.random() * str.length);
            let char = str.charAt(charAtIdx);
            pass += char;
        }
        setPassword(pass);
    }, [length, numAllowed, charAllowed]);

    const copyToClipboard = () => {
        window.navigator.clipboard.writeText(password);
        passwordRef.current.select();
    }

    useEffect(generatePassword, [length, numAllowed, charAllowed]);

    return (
        <div className='h-dvh w-dvw flex justify-center items-center'>
            <div className='h-40 w-2/6 flex flex-col justify-evenly items-center rounded-md bg-slate-800 max-2xl:w-2/5 max-lg:w-3/5 max-md:w-2/3 max-sm:w-11/12 max-sm:h-2/5 max-sm:justify-evenly'>
                <h1 className='text-2xl font-semibold text-white'>Password Generator</h1>
                <div className='h-7 w-11/12 flex justify-between items-center rounded-md bg-white'>
                    <input
                        type="text"
                        className='h-full w-3/4 rounded-l-md px-1 outline-none text-orange-500'
                        value={password}
                        ref={passwordRef}
                        readOnly
                    />
                    <button
                        className='h-full w-1/4 bg-blue-500 rounded-r-md'
                        onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard(e.target);
                        }}
                    >Copy</button>
                </div>
                <div className='h-7 w-11/12 flex justify-evenly items-center text-white max-sm:h-24 max-sm:flex-col max-sm:justify-evenly max-sm:gap-1'>
                    <input
                        type="range"
                        className="max-sm:w-4/6 cursor-pointer"
                        value={length}
                        min={1}
                        max={30}
                        onChange={(e) => {
                            setLength(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="slider"
                        className='max-sm:text-lg'

                    >Length : {length}</label>
                    <div className='h-auto flex justify-between items-center gap-1'>
                        <label
                            className='cursor-pointer'
                            htmlFor='num'>Number</label>
                        <input
                            id="num"
                            type="checkbox"
                            className='cursor-pointer'
                            defaultChecked={numAllowed}
                            onChange={() => {
                                setNumAllowed(!numAllowed);
                            }}
                        />
                    </div>
                    <div className='h-auto flex justify-between items-center gap-1'>
                        <label
                            className='cursor-pointer'
                            htmlFor='char'>Character</label>
                        <input
                            id='char'
                            type="checkbox"
                            className='cursor-pointer'
                            defaultChecked={charAllowed}
                            onChange={() => {
                                setCharAllowed(!charAllowed);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PassGen
