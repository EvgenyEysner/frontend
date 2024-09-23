import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAuthStore} from "../../store/auth";
import toast from "react-hot-toast";
import {Loader} from "../../UI/loader/Loader";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";


export const ItemUpdate = () => {
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
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
    });
    const [error, setError] = useState('');
    const token = useAuthStore.getState().access;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/v1/item/${params.name}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error();

                const result = await res.json();
                setValue({
                    id: result.id,
                    category: result.category,
                    name: result.name,
                    unit: result.unit,
                    description: result.description,
                    ean: result.ean,
                    stock: result.stock,
                    on_stock: result.on_stock,
                    favorite: result.favorite,
                });
            } catch (e) {
                setError('Artikel nicht gefunden');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.name, token]);  // Dependencies for useEffect

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('id', value.id);
        if (value.image) {
            formData.append('image', value.image)
        }
        formData.append('category', value.category);
        formData.append('name', value.name);
        formData.append('unit', value.unit);
        formData.append('description', value.description);
        formData.append('ean', value.ean);
        formData.append('stock', value.stock);
        formData.append('on_stock', value.on_stock);
        formData.append('favorite', value.favorite);

        try {
            const res = await fetch(`/api/v1/item/${params.name}/`, {
                method: 'PUT',
                mode: 'cors',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error();
            toast.success('Artikel erfolgreich aktualisiert!');
        } catch (e) {
            toast.error('Fehler beim Aktualisieren des Artikels!');
        }

    };

    if (isLoading)
        return (
            <div className='d-flex gap-4 pt-5 justify-content-center'>
                <Loader/>
            </div>
        )

    return (
        <div className='container mx-auto mt-5'>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <TextField
                            hidden
                            label="ID"
                            name="id"
                            value={value.id}
                            disabled
                            className="form-control"
                        />
                        <TextField
                            label="Bild"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="image"
                            onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
                            InputProps={{ disableUnderline: true }}
                            className="form-control"
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={value.name}
                            onChange={(e) => setValue({ ...value, name: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            label="Maßeinheit"
                            name="unit"
                            value={value.unit}
                            onChange={(e) => setValue({ ...value, unit: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            label="Kategorie"
                            name="category"
                            value={value.category}
                            onChange={(e) => setValue({ ...value, category: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            label="Beschreibung"
                            name="description"
                            multiline
                            rows={4}
                            value={value.description}
                            onChange={(e) => setValue({ ...value, description: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            label="EAN"
                            name="ean"
                            value={value.ean}
                            onChange={(e) => setValue({ ...value, ean: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            label="Lager"
                            name="stock"
                            value={value.stock} onChange={(e) => setValue({ ...value, stock: e.target.value })}
                            className="form-control"
                        />
                        <TextField
                            value={value.on_stock} onChange={(e) => setValue({ ...value, on_stock: e.target.value })}
                            name="on_stock"
                            label="Verfügbar"
                            className="form-control"
                        />
                        <TextField
                            value={value.favorite} onChange={(e) => setValue({ ...value, favorite: e.target.value })}
                            label="Favorit"
                            name="favorite"
                            className="form-control"
                        />
                        <Button type="submit" variant="contained" color="inherit">
                            Speichern
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};
