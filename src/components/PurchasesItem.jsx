import React from 'react';

const PurchasesItem = ({purchases, itemDate}) => {

    const options = {year: 'numeric', month: 'long' , day:'numeric'};
    const date = new Date(itemDate).toLocaleDateString('en-us',options)


    return (
        <div>
            <h3>{date}</h3>
            {
                purchases.map(purchase =>(
                    <div key={purchase.id}>
                        <h5>{purchase.title}</h5>
                        <p>PRICE: {purchase.price}</p>
                        <p>QUANTITY:{purchase.productsInCart.quantity}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default PurchasesItem;