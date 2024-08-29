import { useState } from 'react';
import { Movie } from '@/app/lib/definitions'
import styles from './DropdownMovieSearch.module.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

interface DropdownMovieSearchProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie | null) => void;
}

const DropdownMovieSearch: React.FC<DropdownMovieSearchProps> = ({ movies, onMovieSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
    const handleSearch = (e: { target: { value: any; }; }) => {
      const term = e.target.value;
      setSearchTerm(term);
      onMovieSelect(null);
  
      if (term.length > 0) {
        if (!Array.isArray(movies)) {
          console.error('Expected movies to be an array');
        } else {
          const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(term.toLowerCase())
          );
          setFilteredMovies(filtered);
          setIsDropdownVisible(true);
        }
      } else {
        setFilteredMovies([]);
        setIsDropdownVisible(false);
      }
        
    };
  
    const handleSelect = (movie: Movie) => {
      setSearchTerm(movie.title);
      setIsDropdownVisible(false);
      onMovieSelect(movie);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        {isDropdownVisible && (
          <Box sx={{ width: '100%', maxWidth: 360, border: '1px solid grey', bgcolor: 'background.paper' }}>
          <List>
            {filteredMovies.map((movie, index) => (
              <ListItem disablePadding>
                <ListItemButton 
                key={index} 
                onClick={() => handleSelect(movie)}>
                <ListItemText primary={movie.title} />
                </ListItemButton>
              </ListItem>
              
            ))}
          </List>
        </Box>
      )}
    </div>
      
    );
  };
  export default DropdownMovieSearch;