import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from "react-router";


function Loading({ text = "Loading..." }) {
  return (
    <div className="text-gray-300 font-bold flex h-screen justify-center items-center bg-neutral-950 gap-2">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      {text}
    </div>
  );
}



function App() {
  const [movies, getMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  let navigate = useNavigate();


  async function getMovie(id) {


    navigate(`/movie-des/${id}`)




  }



  async function changePage(num: number) {
    // let num = currentPage
    try {
      let res = await axios.get(`http://localhost:3000/get-page?num=${num}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

    setCurrentPage(num)
  }

  useEffect(() => {

    setLoading(true)

    async function getRes() {
      const response = await axios.get(
        "http://localhost:3000/"
      );
      getMovies(response.data.movies)
      // console.log(response.data.movies)
      setLoading(false)
    }

    getRes()

  }, [])


  useEffect(() => {

    setLoading(true)

    async function getRes() {

      console.log(currentPage)
      const response = await axios.get(
        `http://localhost:3000/get-page?num=${currentPage}`
      );
      getMovies(response.data.movies)
      console.log(response.data.movies)
      setLoading(false)
    }

    getRes()

  }, [currentPage])


  return (
    <>
      <div className='bg-neutral-950 w-full min-h-screen'>
        {
          loading ? <div className='text-gray-300 font-bold flex h-full justify-center items-center bg-neutral-950'> <Loading /> </div>
            : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8 min-h-screen">
              {movies?.map((movie) => (
                <div
                  onClick={async () => {
                    let id = movie._id
                    let des = await getMovie(id) //returns description and other details of the movie  

                    // console.log(des)
                    // navigate('/') // navigate to a new page which would display all the details 
                  }}
                  key={movie.title}
                  className="group relative rounded-lg overflow-hidden hover:cursor-pointer bg-neutral-900 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] flex items-center justify-center bg-neutral-800 text-neutral-500 text-sm">
                      No poster
                    </div>
                  )}

                  {/* rating badge */}
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-semibold px-2 py-1 rounded-full">
                    ★ {movie.imdb?.rating ?? '—'}
                  </div>

                  {/* title bar */}
                  <div className="p-2">
                    <p className="text-neutral-200 text-sm font-medium truncate">
                      {movie.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        }

        <div className='flex w-full justify-center pb-8'>
          <div className='flex gap-2 px-4 py-2 max-w-4xl bg-neutral-900 rounded-lg'>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={async () => {
                  // setCurrentPage(num)
                  await changePage(num)
                }}
                className={`w-9 h-9 flex hover:cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === num
                  ? "bg-amber-400 text-neutral-900"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default App