import Categories from './Categories/Categories'
import Category from './Category/Category'
import App from './Home/App'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './Product/Product'
import Cart from './Cart/Cart'
import OrderHistory from './OrderHistory/OrderHistory'
import Account from './Account/Account'
import ProductSearch from './ProductSearch/ProductSearch'
import InfoPage from './InfoPage/InfoPage'
const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<App />} path='/home' />
            <Route element={<Cart />} path='/cart' />
            <Route element={<Account />} path='/account' />
            <Route element={<OrderHistory />} path='/history' />
            <Route element={<Categories />} path='/home/categories/' />
            <Route element={<Category />} path='/home/categories/:id' />
            <Route element={<Product />} path='/home/categories/:id/product' />
            <Route element={<ProductSearch />} path='/home/product' />
            <Route element={<InfoPage />} path='/home/infopage' />
            <Route path='*' element={<div>  Not found  </div>} />
            {/* <Route element={<Cart />} path='/cart/:variant_id' /> */}
        </Routes>
    </BrowserRouter>
}

export default Router