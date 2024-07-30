"use client"

import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '@/app/api/routes';
//import { PostInsertComment } from '@/app/api/routes';
import { Movie } from '@/app/lib/definitions'
import { Button } from '../ui/button';

export default function Page() {
  const [comment, setComment] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const movieId = ''; // Assign a valid movie ID or handle it dynamically
  const customerId = '12345678';
  const date = new Date().toISOString(); // Use current date

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovies = await fetchPopularMovies();
      setMovies(fetchedMovies);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    console.log("Hi its clicked.");
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movieId,
          customer_id: customerId,
          comment,
          date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
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
          <div>{movies[0].title}</div>
          <input
            placeholder='Enter your comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit Comment</Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  )
}