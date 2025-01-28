import { useState } from 'react'
import Login from './component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login1 from './component/Login1'
import Register from './component/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>App Component</h3>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Landing />} /> */}
          {/* <Route exact path="/login" element={<Login />} /> */}
          <Route exact path="/" element={<Login1 />} />      
          <Route exact path="/register" element={<Register />} />
          {/* <Route path="/about/*" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project-type" element={<ProjectType />} />
          <Route path="/project-category" element={<ProjectTypeCategory />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
