import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {Button, Grid, TextField} from '@mui/material';
import Divider from "@mui/material/Divider";
import {useAuthStore} from "../../store/auth";
import toast from "react-hot-toast";

export const AddItem = () => {
  const navigate = useNavigate();
  const token = useAuthStore.getState().access;
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
  });

  const handleFileChange = (e) => {
    setItemData({...itemData, image: e.target.files[0]});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('category', itemData.category);
    formData.append('name', itemData.name);
    formData.append('unit', itemData.unit);
    formData.append('description', itemData.description);
    formData.append('ean', itemData.ean);
    formData.append('stock', itemData.stock);
    formData.append('on_stock', itemData.on_stock);
    formData.append('favorite', itemData.favorite);
    if (itemData.image) {
      formData.append('image', itemData.image);
    }

    try {
      const res = await fetch('/api/v1/add-item/', {
        method: 'POST',
        mode: 'cors',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      toast.success('Artikel erfolgreich hinzugefügt!');
      navigate('/items')
    } catch (e) {
      toast.error('Fehler beim Hinzufügen des Artikels!');
    }
  };

  return (
    <div>
      <h1 className="mb-3">Artikel anlegen</h1>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            type="file"
            accept="image/png, image/jpeg"
            name="image"
            onChange={handleFileChange}
            className="form-control"
          />
          <Divider variant='middle' className='mt-3 mb-3' sx={{opacity: 0.6}}/>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={itemData.name}
              onChange={(e) => setItemData({...itemData, name: e.target.value})}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Kategorie"
              value={itemData.category}
              onChange={(e) => setItemData({...itemData, category: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Maßeinheit"
              type="text"
              value={itemData.unit}
              onChange={(e) => setItemData({...itemData, unit: e.target.value})}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Beschreibung"
              value={itemData.description}
              onChange={(e) => setItemData({...itemData, description: e.target.value})}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Lager"
              type="text"
              value={itemData.stock}
              onChange={(e) => setItemData({...itemData, stock: e.target.value})}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Menge"
              value={itemData.on_stock}
              onChange={(e) => setItemData({...itemData, on_stock: e.target.value})}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="EAN"
              value={itemData.ean}
              onChange={(e) => setItemData({...itemData, ean: e.target.value})}
              required
              fullWidth
            />
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <TextField*/}
          {/*    value={itemData.favorite}*/}
          {/*    onChange={(e) => setItemData({...itemData, favorite: e.target.value})}*/}
          {/*    hidden*/}
          {/*    fullWidth*/}
          {/*    disabled*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Divider variant='middle' className='mt-3 mb-3' sx={{opacity: 0.6}}/>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="inherit">
              Artikel anlegen
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
