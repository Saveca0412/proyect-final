import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PurchasesItem from '../components/PurchasesItem';
import { getPurchasesThunk } from '../store/slices/Purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases?.data.purchases)
    
    useEffect(() =>{
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div>
            <h1> My Purchases</h1>
            {
            <div>
            {
                purchases?.map(purchase =>(

                    <div key={purchase?.id}>
                    <hr />
                        <PurchasesItem purchases={purchase.cart.products} itemDate={purchase.createdAt}/>
                    <hr />
                    {/* <h3>
                        {purchase?.cart.products[0]?.title}
                    </h3>
                    <div>
                    PRICE: {purchase?.cart.products[0]?.price}
                    </div>
                     */}
                    <hr />
                    </div>
                ))
            }
            </div> 
            }
        </div>
    );
 };

 export default Purchases;