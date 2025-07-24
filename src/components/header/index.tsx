import Link from 'next/link'


export function Header(){
    return(
        <header className="bg-[#272B36] w-full h-[143px] flex m-auto items-center flex-col text-white fixed top-0 left-0 z-50 shadow-md">
            <div className='h-[27px] flex w-full mx-auto bg-[#232325] uppercase items-center justify-center text-center'>
                <p className='text-[12px]'>The best games are here</p>
            </div>
            <div className='m-auto px-4  md:max-w-7xl w-full flex text-white items-center'>
                <nav className='flex text-[16px] items-center gap-[22px] md:gap-[47px] md:text-[18px] '>
                    <Link href={'/'} className='text-[18px] md:text-[25px]'>FOR-GAMERS</Link>
                    <Link href={'/'}>Games</Link>
                </nav>
            </div>
            
        </header>
    )
}