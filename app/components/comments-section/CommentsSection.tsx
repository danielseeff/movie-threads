import { useEffect, useState } from 'react';

import { Movie } from '@/app/lib/definitions'
import Comment from '../comment/Comment';
import { SingleComment } from '@/app/lib/definitions'
import { comment } from '@/app/lib/placeholder-data';

interface CommentSectionProps {
    movie: Movie;
    commentUpdated: String
}

const CommentSection: React.FC<CommentSectionProps> = ({ movie, commentUpdated }) => {
    const [comments, setComments] = useState<SingleComment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments?movie_id=${movie?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setComments(data);
                } else {
                    console.error(`Error: ${data}`);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [commentUpdated]);
    
    return (
        <div>
            {comments.map((comment, index) => (
                <Comment comment={comment}></Comment>
            ))}
        </div>
    )
}
export default CommentSection;