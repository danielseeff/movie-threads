"use client"

import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '@/app/api/fetch-movies/routes';
import DropdownMovieSearch from '../components/dropdown-movie-search/DropdownMovieSearch';
import CommentSections from '../components/comments-section/CommentsSection';
//import { PostInsertComment } from '@/app/api/routes';
import { Movie } from '@/app/lib/definitions'
import { Button } from '../ui/button';

export default function Page() {
  const [comment, setComment] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const customerId = 'd6e15727-9fe1-4961-8c5b-ea44a9bd81ad';
  const date = '2023-02-10' // Use current date

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await fetchPopularMovies();
      setMovies(fetchedMovies);
    };
    fetchData();
  }, []);

  const handleMovieSelect = (movie: Movie | null) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: selectedMovie?.id,
          customer_id: customerId,
          comment: comment,
          date: date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComment('');
      } else {
        console.log(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log(`Error: nah`);
    }

  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      {movies.length > 0 ? (
        <div>
          <DropdownMovieSearch movies={movies} onMovieSelect={handleMovieSelect}></DropdownMovieSearch>
          {selectedMovie !== null ? (
            <div>
              <input
              placeholder='Enter your comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleSubmit}>Submit Comment</Button>
              <CommentSections movie={selectedMovie} commentUpdated={comment}></CommentSections>
            </div>
          ) : (
            <div></div>
          )}
          
        </div>
            
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}