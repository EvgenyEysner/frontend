import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'
import { Loader } from '../../UI/loader/Loader'
import { Grid, TextField, Button } from '@mui/material'
import { fetchCategories, fetchItem, fetchStocks, updateItem } from '../../api/api'
import { Dropdown } from '../../utils/dropDown'
import { colorOptions, unitOptions } from '../../utils/selectOptions'
import { createHandleFileChange, createHandleInputChange } from '../../utils/handleChange'

export const ItemUpdate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)
  const [itemData, setItemData] = useState({
    id: '',
    image: null,
    category: '',
    name: '',
    unit: '',
    description: '',
    ean: '',
    stock: '',
    on_stock: '',
    favorite: '',
  })
  const [categories, setCategories] = useState([])
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState('')
  const token = useAuthStore.getState().access

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      try {
        const [item, categoryData, stockData] = await Promise.all([
          fetchItem(params.name, token),
          fetchCategories(token),
          fetchStocks(token),
        ])

        setItemData({
          id: item.id,
          category: item.category,
          name: item.name,
          unit: item.unit,
          description: item.description,
          ean: item.ean,
          stock: item.stock,
          on_stock: item.on_stock,
          favorite: item.favorite,
        })
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
  }, [params.name, token])

  const handleInputChange = createHandleInputChange(setItemData)
  const handleFileChange = createHandleFileChange(setItemData)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    Object.entries(itemData).forEach(([key, val]) => {
      if (key !== 'image' || val) formData.append(key, val)
    })
    if (itemData.image) formData.append('image', itemData.image)

    try {
      await updateItem(params.name, formData, token)
      toast.success('Artikel erfolgreich aktualisiert!')
      navigate('/items')
    } catch (err) {
      toast.error(`Fehler beim Aktualisieren des Artikels: ${err.message}`)
    }
  }

  if (isLoading || categories.length === 0 || stocks.length === 0) {
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader />
      </div>
    )
  }

  const mapToDropdownOptions = (items, labelKey) =>
    items.map((item) => ({ value: item[labelKey], label: item[labelKey] }))

  return (
    <div className='container mx-auto mt-5'>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <TextField
              label='Name'
              name='name'
              value={itemData.name}
              onChange={handleInputChange('name')}
              fullWidth
            />
            <TextField
              type='file'
              accept='image/*'
              name='image'
              onChange={handleFileChange}
              fullWidth
            />
            <Dropdown
              label='Maßeinheit'
              value={itemData.unit}
              onChange={handleInputChange('unit')}
              options={unitOptions}
            />
            <Dropdown
              label='Kategorie'
              value={itemData.category}
              onChange={handleInputChange('category')}
              options={mapToDropdownOptions(categories, 'name')}
            />
            <TextField
              label='Beschreibung'
              name='description'
              multiline
              rows={4}
              value={itemData.description}
              onChange={handleInputChange('description')}
              fullWidth
            />
            <TextField
              label='EAN'
              name='ean'
              value={itemData.ean}
              onChange={handleInputChange('ean')}
              fullWidth
            />
            <Dropdown
              label='Lager'
              value={itemData.stock}
              onChange={handleInputChange('stock')}
              options={mapToDropdownOptions(stocks, 'name')}
            />
            <TextField
              label='Verfügbar'
              name='on_stock'
              value={itemData.on_stock}
              onChange={handleInputChange('on_stock')}
              fullWidth
            />
            <Dropdown
              label='Favorite'
              value={itemData.favorite}
              onChange={handleInputChange('favorite')}
              options={colorOptions}
            />
            <Button type='submit' variant='contained' color='inherit'>
              Speichern
            </Button>
            <Button
              type='button'
              variant='contained'
              color='inherit'
              onClick={() => navigate('/items')}
              className='float-end'
            >
              Zurück
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
