import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { GameCard } from "@/components/gamecard";
import { Metadata } from "next";


interface PropsParams{
    params: {
        id: string;
    }
}

// Retornar uma Promisse
export async function generateMetadata({params}: PropsParams): Promise<Metadata> {

    try{

        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { cache: "no-store" })
        .then((res) => res.json())
        .catch(() => {
            return{
                title: "For-Gamers - Descubra jogos incríveis"
            }
        })

        return {
            title: response.title,
            description: `${response.description.slice(0, 100)}...`,
            openGraph: {
                title: response.title,
                images: [response.image_url],
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true,
                }
            }
        }

    } catch(err) {
        return{
            title: "For-Gamers - Descubra jogos incríveis"
        }
    }
    
}

async function getGameSorted() {
    
    try{

        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" })
        return res.json();

    } catch(err){
        throw new Error('Failed to fetch data')
    }

}

async function getData(id: number){

    try{

        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: "no-store" })
        return res.json();

    } catch(err){
        throw new Error('Failed to fetch data');
    }
}

export default async function Game({ params: {id} }: { params: {id: number} }){

    const game: GameProps = await getData(id);
    const sortedGame: GameProps = await getGameSorted();

    if(!game){
        redirect("/");
    }

    return(
        <main className="text-white w-full mt-[143px]">
            <div className=" mb-[57px] w-full relative h-86 sm:h-106">
                <Image 
                src={game.image_url}
                alt={game.title}
                fill={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                className="object-cover opacity-60 brightness-90 "
                >

                </Image>
                
            </div>
            <Container>
                <h1 className="text-3xl font-semibold mb-[25px]">{game.title}</h1>
                <p className="mb-[15px]">{game.description}</p>
                <h2 className="text-[22px] font-semibold mb-[15px]">Plataformas disponíveis</h2>
                <div className="flex flex-col gap-2 mb-[20px]">
                    {game.platforms.map((item) => (
                        <p key={item}>{item} </p>
                    ))}
                </div>
                <h2 className="text-[22px] font-semibold mb-[15px]">Categorias</h2>
                <div className="flex flex-col gap-2 mb-[20px]">
                    {game.categories.map((item) => (
                        <p key={item}>{item} </p>
                    ))}
                </div>
                <h2 className="text-[22px] font-semibold mb-[15px]">Lançamento</h2>
                <p className="mb-[20px]">{game.release}</p>
                <h2 className="text-[22px] font-semibold mb-[20px]">Outros jogos que recomendamos:</h2>
                <div className="mb-[20px] grid ">
                    <GameCard item={sortedGame}/>
                </div>
            </Container>
        </main>
    )
}