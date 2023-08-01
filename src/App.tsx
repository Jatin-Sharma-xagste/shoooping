import { Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return(
  <>
  <ShoppingCartProvider >
  <Navbar/>
  <Container className="mb-4"> 
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/store" element={<Store />}/>
      <Route path="/about" element={<About />}/>
    </Routes>
    
    </Container>
    </ShoppingCartProvider>
    </>
  )
  
}
console.log(App)
export default App
