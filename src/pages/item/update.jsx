import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAuthStore} from "../../store/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";
import {Loader} from "../../UI/loader/Loader";


export const Update = () => {
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
        <Container>
            <Row>
                <Col>
                    <form className="mt-5" key={value.id} onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='id'
                                value={value.id}
                                hidden={true}
                                className="form-control"
                                readOnly={true}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="file"
                                accept="image/*"
                                name='image'
                                className="form-control"
                                onChange={(e) => setValue({...value, image: e.target.files[0]})}
                                required={false}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='name'
                                value={value.name}
                                className="form-control"
                                onChange={(e) => setValue({...value, name: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='unit'
                                value={value.unit}
                                className="form-control"
                                onChange={(e) => setValue({...value, unit: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='category'
                                value={value.category}
                                className="form-control"
                                onChange={(e) => setValue({...value, category: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='description'
                                value={value.description}
                                className="form-control"
                                onChange={(e) => setValue({...value, description: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='ean'
                                value={value.ean}
                                className="form-control"
                                onChange={(e) => setValue({...value, ean: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='stock'
                                value={value.stock}
                                className="form-control"
                                onChange={(e) => setValue({...value, stock: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='on_stock'
                                value={value.on_stock}
                                className="form-control"
                                onChange={(e) => setValue({...value, on_stock: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name='favorite'
                                value={value.favorite}
                                className="form-control"
                                onChange={(e) => setValue({...value, favorite: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Speichern</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
