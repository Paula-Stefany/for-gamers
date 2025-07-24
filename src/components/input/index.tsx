'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation";


export function Input(){
    const [input, setInput] = useState<string>('');
    const router = useRouter();

    function handleSearch(event: FormEvent){
        event.preventDefault();

        if(input === '') return;
        router.push(`/game/search/${input}`);

    }

    return(
        <form className="flex h-[40px] gap-[10px] mt-[20px] text-[14px]" onSubmit={handleSearch}>
              <input className="w-full  rounded-[10px] border-2 border-[#5C5C5C] bg-[#37373C] opacity-61 text-white px-2 outline-none" placeholder="The last of us" type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)} />
              <button className="w-[122px] bg-[linear-gradient(90deg,_#272B36_0%,_#2E2C5C_49%,_#5C5A81_100%)] text-white rounded-[10px] cursor-pointer opacity-90 hover:opacity-100 " type="submit">Search</button>
        </form>
    )
}