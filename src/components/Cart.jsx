import { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {buyCartThunk, getCartThunk, removeCartProductThunk} from '../store/slices/cart.slice'
import buy from '../images/buy.png'
import trash from '../images/trash.gif'

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();

   const cartProducts = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [cartProducts]);

  const getTotal =( products  ) => {
    let total = 0
    products?.forEach( product => {
      total += product.price * product.productsInCart.quantity
    })
     return new Intl.NumberFormat().format(total)
  }
  const getQuantity =( products  ) => {
    let quantity = 0
    products?.forEach( product => {
      quantity += Number(product.productsInCart.quantity)
    })
    return new Intl.NumberFormat().format( quantity )
  }
  
  return(

  <Offcanvas show={show} onHide={handleClose}placement='end' >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='buy'   onClick={ ()=> dispatch(buyCartThunk( )) } style={{display: 'inline-block'}}>
                      <img src={buy} alt="" />
            </div>
          <h4>Total: ${getTotal( cartProducts )}</h4>
          <p>Quantity: ( {getQuantity( cartProducts )} )</p>
          {
            cartProducts.map( item => (
              <div key={item.id} className='cart-item'>
                <p onClick={ ()=> navigate(`/products/${item.id}` )}>{item.title}   ${new Intl.NumberFormat().format(item.price)}</p>
                <p>{item.productsInCart.quantity}</p>
                <div className='buy' onClick={ ()=> dispatch(removeCartProductThunk(item.id)) }>
                   <img src={trash} alt="" />
                    </div>
              </div>
            ) )
          }
        </Offcanvas.Body>
      </Offcanvas>
  )
};

export default Cart;
