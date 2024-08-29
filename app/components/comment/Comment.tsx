import { useState } from 'react';
import { Movie, SingleComment } from '@/app/lib/definitions'
import Box from '@mui/material/Box';
import { formatDate } from '@/app/helper-functions/TransformDates'

interface CommentProps {
    comment: SingleComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {

    const transformedDate = formatDate(comment.date);
    
    return (

        <Box>
            <div>{comment.comment_content}</div>
            <div>UserID: {comment.customer_id}</div>
            <div>{transformedDate}</div>
        </Box>

    )
}
export default Comment;

