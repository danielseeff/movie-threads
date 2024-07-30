import axios from 'axios';
import { sql } from '@vercel/postgres';

const API_KEY = '9972c5440cf041882de4e13449359f59'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: 1,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies', error);
    throw error;
  }
};

export { fetchPopularMovies };

// const API_KEY = '9972c5440cf041882de4e13449359f59'
// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function insertComment(movie_id, customer_id, comment, date) {

  console.log("ARRIVED");
  await sql`
    INSERT INTO comments (customer_id, movie_id, comment, date)
    VALUES (${customer_id}, ${movie_id}, ${comment}, ${date})
  `;
  console.log("Success!!!");
}

export async function POST(movie_id, customer_id, comment, date) {
  try {
    console.log("Entered PostInsertComment")
    await sql`BEGIN`;
    await insertComment(customer_id,movie_id,comment,date);
    // await addNewColumn();
    await sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}