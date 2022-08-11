import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/Products.slice';
import '../styles/productDetail.css'
import cart from '../images/cart6.gif'
import left from '../images/left.png'
import right from '../images/right.png'
import { addCartThunk } from '../store/slices/cart.slice';


const ProductDetail = () => {

    const allProduct = useSelector(state => state.prduct);
    const [productsDetail, setProductsDetail] = useState({});
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const [imgProduct, setImgProduct] = useState([]);
    const [quantity, setQuantity] = useState(1)

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [id])

    useEffect(() => {
        const productFind = allProduct.find(productItem => productItem.id === Number(id))
        setProductsDetail(productFind);

        const filteredProducts = allProduct.filter(productItem =>
            productItem.category.id === productFind.category.id)
        let suggestedFiltered = filteredProducts.filter(product => product?.id !== productsDetail?.id)
        setSuggestedProducts(suggestedFiltered)
       setImgProduct( productsDetail?.productImgs)
    }, [allProduct])

    
    const nextImage = ()=>{
        if ( imgIndex >= 2 ) {
          setImgIndex( 0 )
        }else{
          setImgIndex( imgIndex + 1)
        }
      }
      const previousImage = ()=>{
        if ( imgIndex == 0 ) {
          setImgIndex( 2 )
        }else{
          setImgIndex( imgIndex - 1)
        }
      }
      const sendToCart =( )=>{
        const body = {
          id: productsDetail.id,
          quantity
        }
        dispatch( addCartThunk( body ) )
        setQuantity(1)
        alert( 'Sent to cart' )
      }

    return (
      
        <div className='mother'>
            <article className='image_content'> 
            <img src={imgProduct?.[imgIndex]}
              className='main'
            alt="productImg" />
             <p className='left'
              onClick={ previousImage }
            ><img src={left} alt=""/></p>

            <p className='right'
              onClick={ nextImage }
            ><img src={right} alt=""/></p>
             </article>
                    <h1>{productsDetail?.title}</h1>
                    <img src={productsDetail?.Imgs} alt="" />
                    <h2>Price: {productsDetail?.price}</h2>
                    <p>Description:
                        <br />
                        {productsDetail?.description}
                    </p>
                    <div className='quantity'>
                      <div className='quantity-name'>Quantity</div>
                      <div className='quantity-data'>
                        <button className='turn-quantity'
                        disabled={quantity === 1}
                        onClick={ ()=> setQuantity( quantity - 1)}
                        >
                          -
                          </button>
                        <p className='quantity-number'>{quantity}</p>
                        <button
                        className='turn-quantity'
                        onClick={ ()=> setQuantity( quantity + 1)}>
                          +
                          </button>
                        
                    </div>
                    <br />
                    <div className='buy' onClick={ sendToCart }>
                      <img src={cart} alt="" />
                    </div>
                    <br />

                    <div className='box-price'>
                      <div className='price'>
                          Price ${productsDetail?.price} 
                          <br />
                           Total ${quantity * productsDetail?.price}
                      </div>
                    </div>
                  </div>
                <div className="product_card-box">
                    {
                        suggestedProducts.map(prduct => (
                            <article onClick={() => navigate(`/products/${prduct.id}`)}
                            key={prduct.id} className='product-card'>
                                <div className='image_box'>
                                    <img src={prduct.productImgs[0]} alt="product-image" className='product-image' />
                                </div>
                                <div className='product-data'>
                                    <h4>{prduct.title}</h4>
                                    <p>Price: <br />${prduct.price}</p>
                                </div>
                                <div className='cart_box' onClick={ sendToCart }><img src={cart} alt="" /></div>
                            </article>

                        ))
                    }
                </div>
            
            
        </div>
    );
}
export default ProductDetail;