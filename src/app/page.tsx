import { Container } from "@/components/container";
import { GameProps } from '@/utils/types/game'
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightSquare } from 'react-icons/bs';
import { Input } from '@/components/input'
import { GameCard } from '@/components/gamecard'


async function getDalyGame() {
  try{

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {next: {revalidate: 320}})
    return res.json();

  } catch(err){
    throw new Error('Failed to fetch data' + err);

  }
}

async function getGamesData() {
  try{

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {next: {revalidate: 320}})
    return res.json();

  } catch(err){
    throw new Error('Failed to fetch data' + err);

  }
}

export default async function Home() {

  const dalyGame: GameProps = await getDalyGame();
  const allGames: GameProps[] = await getGamesData();

  return (
      <main className="w-full">
        <Container>
          <section className="flex flex-col mt-[57px]">
            <h1 className="text-center text-[22px] md:text-[28px] font-semibold bg-gradient-to-r from-[#918E8E] via-[#706E6E] to-[#585858] text-transparent bg-clip-text mb-[57px]">We separate  a exclusive game for you</h1>
            <Link href={`/game/${dalyGame.id}`}>
              <div className="h-[443px]  w-full relative">
                <div className="flex gap-4 items-center justify-center
                 absolute z-20 bottom-0 p-3 ">
                  <p className="font-bold text-[25px] text-white">{dalyGame.title}</p>
                  <BsArrowRightSquare size={22} color="white"/>
                </div>
                <Image 
                src={dalyGame.image_url} 
                alt={`${dalyGame.title}`} 
                priority={ true } 
                quality={ 100 }
                className="h-fit object-cover rounded-[20px] opacity-60 brightness-90 hover:opacity-70"
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw">       
                </Image>
              </div>
            </Link>
            <Input/>
           
          </section>
          <section className="flex flex-col mt-[57px] mb-[57px]">
            <h2 className="text-center text-3xl mb-[57px] font-semibold bg-gradient-to-r from-[#918E8E] via-[#706E6E] to-[#585858] text-transparent bg-clip-text">Game catalog</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              { allGames.map((item) => (
                <GameCard key={item.id} item={item}/>
                
              )) }
            </div>
          </section>
        </Container>
      </main> 
  );
}
