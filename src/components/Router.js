import Categories from './Categories/Categories'
import Category from './Category/Category'
import App from './Home/App'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './Product/Product'
const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<App />} path='/home' />
            <Route element={<Categories />} path='/home/categories/' />
            <Route element={<Category />} path='/home/categories/:id' />
            <Route element={<Product />} path='/home/categories/:id/product' />
            <Route path='*' element={<div>  Not found  </div>} />
        </Routes>
    </BrowserRouter>
}

export default Router