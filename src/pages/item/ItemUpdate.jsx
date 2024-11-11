import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuthStore } from '../../store/auth'
import toast from 'react-hot-toast'
import { Loader } from '../../UI/loader/Loader'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { fetchCategories, fetchItem, fetchStocks, updateItem } from '../../api/api'

const colorOptions = [
  { value: '1', label: 'Rot' },
  { value: '2', label: 'Gelb' },
  { value: '3', label: 'Grün' },
  { value: '4', label: 'Standard' },
]

const unitOptions = [
  { value: '1', label: 'Stück' },
  { value: '2', label: 'Meter' },
  { value: '3', label: 'Rolle' },
]

const Dropdown = ({ label, value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

export const ItemUpdate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState({
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

        setValue({
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
      } catch {
        setError('Fehler beim Laden der Daten')
      } finally {
        setLoading(false)
      }
    }

    loadAllData()
  }, [params.name, token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    Object.entries(value).forEach(([key, val]) => {
      if (key !== 'image' || val) formData.append(key, val)
    })
    if (value.image) formData.append('image', value.image)

    try {
      await updateItem(params.name, formData, token)
      toast.success('Artikel erfolgreich aktualisiert!')
      navigate('/items')
    } catch {
      toast.error('Fehler beim Aktualisieren des Artikels!')
    }
  }

  if (isLoading)
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader />
      </div>
    )

  return (
    <div className='container mx-auto mt-5'>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <TextField
              label='Name'
              name='name'
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className='form-control'
            />
            <TextField
              type='file'
              accept='image/png, image/jpeg'
              name='image'
              onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
              className='form-control'
            />
            <Dropdown
              label='Maßeinheit'
              value={value.unit}
              onChange={(e) => setValue({ ...value, unit: e.target.value })}
              options={unitOptions}
            />
            <Dropdown
              label='Kategorie'
              value={value.category}
              onChange={(e) => setValue({ ...value, category: e.target.value })}
              options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
            />
            <TextField
              label='Beschreibung'
              name='description'
              multiline
              rows={4}
              value={value.description}
              onChange={(e) => setValue({ ...value, description: e.target.value })}
              className='form-control'
            />
            <TextField
              label='EAN'
              name='ean'
              value={value.ean}
              onChange={(e) => setValue({ ...value, ean: e.target.value })}
              className='form-control'
            />
            <Dropdown
              label='Lager'
              value={value.stock}
              onChange={(e) => setValue({ ...value, stock: e.target.value })}
              options={stocks.map((stock) => ({ value: stock.name, label: stock.name }))}
            />
            <TextField
              label='Verfügbar'
              name='on_stock'
              value={value.on_stock}
              onChange={(e) => setValue({ ...value, on_stock: e.target.value })}
              className='form-control'
            />
            <Dropdown
              label='Favorite'
              value={value.favorite}
              onChange={(e) => setValue({ ...value, favorite: e.target.value })}
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
