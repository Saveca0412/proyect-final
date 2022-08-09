import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
                    <p key={purchase?.id}>
                    <hr />
                        {purchase?.createdAt}
                    <h3>
                        {purchase?.cart.products[0]?.title}
                    </h3>
                    <p>
                    PRICE: {purchase?.cart.products[0]?.price}
                    </p>
                    
                    <hr />
                    </p>
                ))
            }
            </div> 
            }
        </div>
    );
 };

 export default Purchases;