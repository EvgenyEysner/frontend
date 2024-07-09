import {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {loginRequest} from '../api/api';
import {toast} from 'react-hot-toast';
import {useAuthStore} from '../redux/auth';

export const Login = () => {
    const navigate = useNavigate();
    const {isAuth, setToken} = useAuthStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await loginRequest(email, password);
            console.log(response)
            setToken(response.access, response.refresh);
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            setError(error.response?.message || "Login failed, please try again.");
            toast.error("There was an error, please try again.");
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (isAuth) return <Navigate to="/"/>;

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h3>Einloggen</h3>
            <div className="mb-3">
                <input className="form-control"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type="email"
                       name="email"
                       id="email"
                       placeholder="name@company.com"
                       required
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    value={password}
                    type="password"
                    className="form-control"
                    placeholder="**********"
                    name="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}
