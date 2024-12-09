import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { searchItem } from '../../api/api';
import { useAuthStore } from '../../store/auth';
import { Link } from 'react-router-dom';

export const ItemSearch = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore.getState().access;
  const debounceTimeout = useRef(null);
  const abortControllerRef = useRef(null);

  const loadArticles = useCallback(async () => {
    if (query.length <= 2) {
      setArticles([]);
      return;
    }

    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const data = await searchItem(query, token, { signal: controller.signal });
      setArticles(data.results || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fehler beim Laden der Artikel:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [query, token]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      loadArticles();
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, loadArticles]);

  const handleItemClick = () => {
    setQuery('');
    setArticles([]);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Artikel suchen..."
          variant="standard"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            padding: '8px 16px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
            '& input': {
              color: '#000000',
            },
            '&:focus-within': {
              borderColor: '#1976d2',
              borderRadius: '3px',
              boxShadow: '0 0 4px #1976d2',
            },
          }}
        />
      </Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List
          sx={{
            marginTop: 2,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            position: 'relative',
            width: '100%',
            zIndex: 1, // Hinter dem Suchfeld
          }}
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <ListItem
                key={article.id}
                divider
                component={Link}
                to={`/item-details/${article.ean}`}
                onClick={handleItemClick}
                sx={{
                  padding: '12px 16px',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText primary={article.name} />
              </ListItem>
            ))
          ) : query.length > 2 ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                padding: '16px',
              }}
            >
              Artikel nicht gefunden.
            </Typography>
          ) : null}
        </List>
      )}
    </Box>
  );
};
