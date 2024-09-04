import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAuthStore} from "../../store/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import toast from "react-hot-toast";


export const Update = () => {
    const params = useParams()
    const [isLoading, setLoading] = useState(true)
    const [value, setValue] = useState({
        id: '',
        category: '',
        name: '',
        description: '',
        ean: '',
        stock: '',
        on_stock: '',
    })
    const [error, setError] = useState('')
    const token = useAuthStore.getState().access

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/v1/item/${params.name}`, {
                    method: 'GET',
                    mode: 'cors',
                    body: JSON.stringify(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error()

                const result = await res.json()
                console.log("VALUES: ", result.name)
                setValue(
                    {
                        ...value,
                        id: result.id,
                        category: result.category,
                        name: result.name,
                        description: result.description,
                        ean: result.ean,
                        stock: result.stock,
                        on_stock: result.on_stock,
                    })
            } catch (e) {
                setError('Artikel nicht gefunden')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        // const data = {data: value}
        await fetch(`/api/v1/item/${params.name}/`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({value}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error()
            })
            .catch(() => {
                toast.error('Error!')
            })
    }

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
                        <button type="submit" className="btn btn-primary">Speichern</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}