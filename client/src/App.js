import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Courses from './components/courses'
import Enrolled from './components/enrolled'
import Navbar from './layout/navbar'
import LoginForm, {action} from './components/loginform'
import './App.css'


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
        <Route path="/courses" element={<Courses />} />
        <Route path="enrolled" element={<Enrolled/>} />
        <Route path="user" element={<LoginForm/>} loader={action}/>
    </Route>
))



function App() {
    return <RouterProvider router={router} />
}

export default App;