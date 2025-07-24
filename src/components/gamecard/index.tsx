import { GameProps } from '@/utils/types/game'
import Link from 'next/link'
import { FaArrowCircleRight } from 'react-icons/fa'
import Image from 'next/image'

interface GameCardProps{
    item: GameProps;
}

export function GameCard({ item }: GameCardProps){
    return(
        <Link href={`/game/${item.id}`}>
            <article className="relative h-[285px] w-full cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <div className="flex w-full items-center absolute z-20 bottom-0 p-3 gap-1">
                    <span className="text-[17px] font-semibold text-white text-ellipsis truncate whitespace-nowrap overflow-hidden">{item.title}</span>
                    <FaArrowCircleRight className="ml-auto flex-shrink-0"  color="white"
                    size={22}/>
                </div>
                <Image 
                src={item.image_url} 
                alt={`${item.title}`}
                priority={true}
                quality={100}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                className="h-fit object-cover rounded-[10px] opacity-60 brightness-90 hover:opacity-70"
                >
                </Image>

            </article>
        </Link>
    )
}