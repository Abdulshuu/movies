import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";




function FullCard() {

    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const navigate = useNavigate()

    let { id } = useParams()

    useEffect(() => {
        setLoading(true)

        async function getMovie() {
            try {

                let res = await axios.get(`http://localhost:3000/get-movie?id=${id}`)
                console.log("data : ", res.data.movie[0])
                let movie = res.data.movie[0]
                setMovie(movie)
            } catch (error) {
                console.log(error)
            }

        }

        getMovie()
        setLoading(false)
    }, [])




    return (
        loading ? (
            <div className='text-gray-300 font-bold flex h-screen justify-center items-center bg-neutral-950 gap-2'>
                <div className="w-5 h-5  border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                Loading...
            </div>
        ) : (
            <div className='min-h-screen w-full bg-neutral-950 p-6'>
                {/* Side Icon */}
                <div
                    className=' w-1/10  rounded-lg flex items-center justify-center bg-neutral-900 border border-neutral-800 p-4 text-neutral-200 hover:cursor-pointer'
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <p className='text-xs'> Go back </p>
                </div>

                <div className='grid grid-cols-3 gap-4 max-w-5xl mx-auto  border-white'>



                    {/* Poster / hero image */}
                    <div className='col-span-3 rounded-lg overflow-hidden shadow-lg'>
                        <img
                            src={movie.poster}
                            alt={movie.title || "Movie poster"}
                            className='w-full max-h-[500px] object-cover object-top'
                        />
                    </div>

                    {/* Info cards */}
                    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-4 text-neutral-200'>
                        <p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>Rating</p>
                        <p className='text-lg font-semibold text-amber-400'>★ {movie.imdb?.rating ?? '—'}</p>
                    </div>

                    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-4 text-neutral-200'>
                        <p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>Genre</p>
                        <p className='text-lg font-semibold'>{movie.genres?.[0] ?? 'N/A'}</p>
                    </div>

                    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-4 text-neutral-200'>
                        <p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>Type</p>
                        <p className='text-lg font-semibold capitalize'>{movie.type ?? 'N/A'}</p>
                    </div>
                    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-4 text-neutral-200'>
                        <p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>Released</p>
                        <p className='text-lg font-semibold capitalize'>{movie.released?.slice(0, 7) ?? 'N/A'}</p>
                    </div>
                    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-4 text-neutral-200'>
                        <p className='text-xs text-neutral-500 uppercase tracking-wide mb-1'>Directors</p>
                        <p className='text-lg font-semibold capitalize'>{movie.directors?.map((director, index) => (
                            <p key={index} >{director}</p>
                        )) ?? 'N/A'}</p>
                    </div>

                    {/* Title + plot */}
                    <div className='col-span-3 mt-2'>
                        <h1 className='text-2xl font-bold text-neutral-100 mb-2'>{movie.title}</h1>
                        <p className='text-neutral-400 leading-relaxed'>{movie.fullplot}</p>
                    </div>

                    <div className='flex gap-4 flex-col'>

                        {
                            movie?.cast?.map((actor, index) => (
                                <div className='flex'>
                                    <div className='rounded-lg bg-neutral-900  border-neutral-800 h-96 min-w-72 items-center justify-center border-2 flex p-4 ' key={index}>
                                        <p className='text-white font-bold '>{actor} </p>
                                    </div>
                                    <div className='text-white'>
                                        something
                                    </div>
                                </div>

                            ))
                        }
                    </div>

                </div>
            </div>
        )
    )
}

export { FullCard }


