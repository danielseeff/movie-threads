import axios from 'axios';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// const API_KEY = '9972c5440cf041882de4e13449359f59'
// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function POST(req) {
    const { movie_id, customer_id, comment, date } = await req.json();
    try {
        await sql`BEGIN`;
        await sql`
            INSERT INTO comments (customer_id, comment_content, date, movie_id)
            VALUES (${customer_id}, ${comment}, ${date}, ${movie_id})
        `;
        // await addNewColumn();
        await sql`COMMIT`;
        return NextResponse.json(comment);
    } catch (error) {
        await sql`ROLLBACK`;
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const movie_id = searchParams.get('movie_id');

    if (!movie_id) {
        return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
    }
    try {
        const comments = await sql`
        SELECT * FROM comments
        WHERE movie_id = ${movie_id}
    `;

    console.log(JSON.stringify(comments.rows, null, 2))

    // Optional: Remove transaction management for a simple SELECT query
    // await sql`COMMIT`;

        if (!comments.rows.length) {
            return NextResponse.json({ message: 'No comments found' }, { status: 404 });
        }

        return NextResponse.json(comments.rows);
    } catch (error) {
    
        // Optional: Rollback if you are using transactions
        // await sql`ROLLBACK`;

        console.error("Error fetching comments:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}