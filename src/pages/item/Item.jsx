import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Loader} from '../../UI/loader/Loader'
import {useAuthStore} from '../../store/auth'
import EditIcon from '@mui/icons-material/Edit'
import {Link, Navigate} from 'react-router-dom'
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material'

export const Item = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true) // Specifies whether further articles can be loaded
  const observer = useRef() // Reference for the Intersection Observer
  const token = useAuthStore.getState().access
  const {isAuth} = useAuthStore()

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1) // Load next page
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore],
  )

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/v1/items/?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten')
        }
        const data = await response.json()
        const newItems = data.results

        setData((prevItems) => {
          const ids = new Set(prevItems.map((item) => item.id))
          const filteredItems = newItems.filter((item) => !ids.has(item.id))
          return [...prevItems, ...filteredItems]
        })

        if (newItems.length === 0 || newItems.length < 10) {
          setHasMore(false) // No more items available
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [page, token])

  // Get current user
  useEffect(() => {
    const fetchUserMe = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/v1/me/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten')
        }
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching data: ', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserMe()
  }, [])

  if (isLoading && page === 1) {
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader/>
      </div>
    )
  }

  if (!isAuth) return <Navigate to='/'/>

  return (
    <>
      {data.map((item, index) => {
        if (data.length === index + 1) {
          return (
            <Grid container spacing={2} justifyContent='center' key={item.id}>
              <Grid item xs={12} md={6} mt={3}>
                <Card ref={lastItemRef}>
                  <CardMedia component='img' height='140' image={item.image} alt={item.name}/>
                  <CardContent>
                    <Typography variant='h5' component='div'>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Kategorie: {item.category}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Verfügbar: {item.on_stock}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Einheit: {item.unit}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      EAN: {item.ean}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Lager: {item.stock}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )
        } else {
          return (
            <Grid container spacing={2} justifyContent='center' key={item.id}>
              <Grid item xs={12} md={6} mt={3}>
                <Card>
                  <CardMedia component='img' height='140' image={item.image} alt={item.name}/>
                  <CardContent>
                    <Typography variant='h5' component='div'>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Kategorie: {item.category}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Verfügbar: {item.on_stock}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Einheit: {item.unit}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      EAN: {item.ean}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Lager: {item.stock}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/edit-item/${item.ean}`} style={{textDecoration: 'none'}}>
                      {user.perms === 4 ? <EditIcon color='action' fontSize='large'/> : null}
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )
        }
      })}
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>Keine weiteren Artikel</p>}
    </>
  )
}
