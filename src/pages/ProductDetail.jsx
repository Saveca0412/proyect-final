import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/Products.slice';

const ProductDetail = () => {

    const allProduct = useSelector(state => state.prduct);
    const [ productsDetail, setProductsDetail ] = useState({});
    const [ suggestedProducts, setSuggestedProducts ] = useState([]);

    const {id} = useParams();

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getProductsThunk())
    },[])

    useEffect(()=>{
        const productFind = allProduct.find(productItem => productItem.id === Number(id))
        setProductsDetail(productFind);
        
        const filteredProducts = allProduct.filter(productItem =>
            productItem.category.id === productFind.category.id)
        setSuggestedProducts(filteredProducts);
    },[allProduct, id])

    return( 
        <div>
            <h1>{productsDetail?.title}</h1>
            <img src={productsDetail?.productImgs} alt="" />
            <h2>Price: {productsDetail?.price}</h2>
            <p>Description:
                <br /> 
                {productsDetail?.description}
            </p>
            <ul>
                {
                    suggestedProducts.map(prduct =>(
                        <li onClick={()=> navigate(`/products/${prduct.id}`)}>
                            <hr />
                            {prduct.title}
                            <hr />
                            <img src={prduct.productImgs} alt="" />
                            <hr />
                        </li> 
                    ))
                }
            </ul>
        </div>
    );
 }
export default ProductDetail;