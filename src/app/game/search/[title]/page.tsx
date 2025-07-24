import { GameProps } from '@/utils/types/game'
import { Container } from '@/components/container';
import { Input } from '@/components/input';
import { GameCard } from '@/components/gamecard';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';


interface SearchParams {
  params: Promise<{title: string}>;
}

async function getGameData(title: string) {

    try{
        const decodeTitle = decodeURI(title);

        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`);
        return res.json();

    }catch{
        return null;
    }
    
}

export default async function Search({ params } : SearchParams){

    const {title} = await params;

    const games: GameProps[] = await getGameData(title);

    return(
        <main className='w-full'>
            <Container>
                <section className=' mt-[57px] mb-[57px]'>
                    <Input></Input>
                    <h1 className='text-center text-[22px] mt-[57px] mb-[57px] md:text-[28px] font-semibold bg-gradient-to-r from-[#918E8E] via-[#706E6E] to-[#585858] text-transparent bg-clip-text'>Games found</h1>

                    { !games ? (
                        <div className='text-white flex flex-col gap-4 justify-center items-center'>
                            <p className=' text-[18px]'>No games were found :/</p>
                            <Link href={'/'}>
                                <button className='py-2 px-4 bg-[#272B36] rounded w-fit flex items-center gap-2 cursor-pointer'> <FaArrowLeft size={20}/> Back to Home</button>
                            </Link>
                          
                        </div>
                    ) : (
                         <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg: grid-cols-4'>
                            { games.map((item) => (
                            <GameCard key={item.id} item={item}/>
                            )) }
                        </div>
                    )}
                   
                </section>
               
            </Container>
           
        </main>
    )

}