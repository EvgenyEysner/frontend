import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Loader } from '../../UI/loader/Loader'
import { useAuthStore } from '../../store/auth'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Link} from "react-router-dom";

export const Item = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true) // Specifies whether further articles can be loaded
  const observer = useRef() // Reference for the Intersection Observer
  const token = useAuthStore.getState().access

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1) // Load next site
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
          mode: 'cors',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Daten')
        }
        const data = await response.json()
        const newItems = data.results

        setData((prevItems) => [...prevItems, ...newItems])
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
  useEffect( () => {
    const fetchUserMe = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/v1/me/`, {
          method: 'GET',
          mode: 'cors',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
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
  if (isLoading)
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader />
      </div>
    )

  if (error.length !== 0 || !data) return <>"Etwas ist schief gelaufen!"</>

  return (
    <div>
      {data.map((item, index) => {
        if (item.length === index + 1) {
          return (
            <Row xs={1} md={2} className='g-4 mt-3 mb-3 justify-content-around'>
              <Col ref={lastItemRef} key={item.id}>
                <Card>
                  <Card.Img variant='top' src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Kategorie: {item.category}
                    </Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Verfügbar: {item.on_stock}
                    </Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>Einheit: {item.unit}</Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>EAN: {item.ean}</Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>Lager: {item.stock}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        } else {
          return (
            <Row xs={1} md={2} className='g-4 mt-3 mb-3 justify-content-around'>
              <Col ref={lastItemRef} key={item.id}>
                <Card>
                  <Card.Img variant='top' src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Kategorie: {item.category}
                    </Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Verfügbar: {item.on_stock}
                    </Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>Einheit: {item.unit}</Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>EAN: {item.ean}</Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>Lager: {item.stock}</Card.Subtitle>
                    <Link
                        to={`/edit-item/${item.ean}`}
                        className='d-flex gap-2 align-items-center text-decoration-none'
                        style={{ color: '#2b3035' }}
                    >
                      {user.perms === 4 ? <b>Bearbeiten</b> : ''}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        }
      })})
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>Keine weiteren Artikel</p>}
    </div>
  )
}
