import axios from 'axios';
import { sql } from '@vercel/postgres';

// const API_KEY = '9972c5440cf041882de4e13449359f59'
// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

console.log("REACHED COMMENTS")

async function insertComment(movie_id, customer_id, comment, date) {

  console.log("ARRIVED");
  await sql`
    INSERT INTO comments (customer_id, movie_id, comment, date)
    VALUES (${customer_id}, ${movie_id}, ${comment}, ${date})
  `;
  console.log("Success!!!");
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("REACHED BITCH")
    const { movie_id, customer_id, comment, date } = req.body;
    try {
        console.log("Entered PostInsertComment")
        await sql`BEGIN`;
        await insertComment(customer_id,movie_id,comment,date);
        // await addNewColumn();
        await sql`COMMIT`;

        return res.status(200).json({ message: 'Database updated ' });
    } catch (error) {
        await sql`ROLLBACK`;
        return res.json({ error }, { status: 500 });
    }
  }
}