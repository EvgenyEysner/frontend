import './App.css'
import {NavBar} from "./components/Header/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Page} from "./pages/Page";
import {Footer} from "./components/Footer/Footer";

function App() {
    return (
        <>
            <NavBar/>
            <Page/>
            <Footer/>
        </>
    )
}

export default App
