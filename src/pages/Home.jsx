import React, { useEffect, useState } from 'react';
import { filterCategoryThunk, getProductsThunk, filterHeadlineThunk } from '../store/slices/Products.slice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { Row, Card, Col, InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import '../App.css'
import loupe from '../images/loupe.png'
import cart from '../images/cart6.gif'
import { addCartThunk } from '../store/slices/cart.slice';
//mason@gmail.com
//mason1234

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [productsDetail, setProductsDetail] = useState({});
  const [quantity, setQuantity] = useState(1)
  //const [searchByTitle, setSearchByTitle] = useState([]);

  const products = useSelector((state) => state.prduct);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then((res) => setCategories(res.data.data.categories));

  }, [])
  console.log(categories)

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
    <div>
      <h1>Category</h1>
      <Row>
        <Col lg={3}>
          <ListGroup>
            {categories.map((categories) => (
              <ListGroup.Item
                key={categories.id}
                onClick={() => dispatch(filterCategoryThunk(categories.id))}
              >
                {categories.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="SEARCH PRODUCT"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <Button 
              variant="outline-secondary"
              onClick={() => dispatch(filterHeadlineThunk(searchValue))}
            >
              <img className='loupe' src={loupe} alt="loupe" />
            </Button>
          </InputGroup>
          <div className="product_card-box">
          {
        products.map( item => (
        <article onClick={ () => navigate(`/products/${item.id}`)}
          key={item.id} className='product-card'>
            <div className='image_box'>
              <img src={item.productImgs[0]} alt="product-image" className='product-image'/>
            </div>
            <div className='product-data'>
              <h4>{item.title}</h4>
            <p>Price: <br />${item.price}</p>
            </div>
            <div className='cart_box' onClick={ sendToCart }><img src={cart} alt="" /></div>
        </article>
        ))
      }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;