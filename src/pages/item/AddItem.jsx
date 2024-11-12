import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Grid, TextField } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'
import { Dropdown } from '../../utils/dropDown'
import { fetchCategories, fetchStocks } from '../../api/api'
import { Loader } from '../../UI/loader/Loader'
import { unitOptions } from '../../utils/selectOptions'
import { createHandleFileChange, createHandleInputChange } from '../../utils/handleChange'

export const AddItem = () => {
  const navigate = useNavigate()
  const token = useAuthStore.getState().access
  const [itemData, setItemData] = useState({
    image: null,
    category: '',
    name: '',
    unit: '',
    description: '',
    ean: '',
    stock: '',
    on_stock: '',
    favorite: 4,
  })
  const [categories, setCategories] = useState([])
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      try {
        const [categoryData, stockData] = await Promise.all([
          fetchCategories(token),
          fetchStocks(token),
        ])

        setCategories(categoryData.results || [])
        setStocks(stockData.results || [])
      } catch (err) {
        setError(`Fehler beim Laden der Daten: ${err.message}`)
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAllData()
  }, [token])

  const handleInputChange = createHandleInputChange(setItemData)
  const handleFileChange = createHandleFileChange(setItemData)

  const validateForm = () => {
    if (!itemData.name || !itemData.category || !itemData.unit) {
      toast.error('Bitte füllen Sie alle erforderlichen Felder aus')
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    const formData = new FormData()
    Object.keys(itemData).forEach((key) => {
      formData.append(key, itemData[key])
    })

    try {
      const res = await fetch('/api/v1/add-item/', {
        method: 'POST',
        mode: 'cors',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error()
      toast.success('Artikel erfolgreich hinzugefügt!')
      navigate('/items')
    } catch (e) {
      toast.error(`Fehler beim Hinzufügen des Artikels: ${e.message}`)
    }
  }

  if (isLoading || categories.length === 0 || stocks.length === 0)
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader />
      </div>
    )

  const mapToDropdownOptions = (items, labelKey) =>
    items.map((item) => ({ value: item[labelKey], label: item[labelKey] }))

  return (
    <div>
      <h1 className='mb-3'>Artikel anlegen</h1>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            type='file'
            accept='image/png, image/jpeg'
            name='image'
            onChange={handleFileChange}
            className='form-control'
          />
          <Divider variant='middle' className='mt-3 mb-3' sx={{ opacity: 0.6 }} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Name'
              value={itemData.name}
              onChange={handleInputChange('name')}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              label='Kategorie'
              value={itemData.category}
              onChange={(e) => handleInputChange('category')(e)}
              options={mapToDropdownOptions(categories, 'name')}
            />
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              label='Maßeinheit'
              value={itemData.unit}
              onChange={(e) => handleInputChange('unit')(e)}
              options={unitOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Beschreibung'
              value={itemData.description}
              onChange={handleInputChange('description')}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              label='Lager'
              value={itemData.stock}
              onChange={(e) => handleInputChange('stock')(e)}
              options={mapToDropdownOptions(stocks, 'name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Menge'
              value={itemData.on_stock}
              onChange={handleInputChange('on_stock')}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='EAN'
              value={itemData.ean}
              onChange={handleInputChange('ean')}
              required
              fullWidth
            />
          </Grid>
          <Divider variant='middle' className='mt-3 mb-3' sx={{ opacity: 0.6 }} />
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='inherit'>
              Artikel anlegen
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
