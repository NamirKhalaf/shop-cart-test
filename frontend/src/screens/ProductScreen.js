import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/rating';
import data from '../data';


export default function ProductScreen(props) {
    const product = data.products.find(x => x._id === props.match.params.id);
    if (!product) {
        return <div>Product Not Found</div>;
    }
    useEffect(() => {
        dispatch(detailsProduct (productId));
    },

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty={qty}`);
    };
    
    const [qty, setQty] = useState(1);
    return (
        <div>
            <Link to="/">Back to Result</Link>
            <div className="row top">
                <div className="col-2">
                <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>Price : ${product.price}</li>
                        <li>
                            description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.counInStock > 0 ? (
                                        <span className="success">In Stock</span> ) : (
                                        <span className="error">Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                            <>
                            <li>
                                <div className="row">
                                    <div>Qty</div>
                                    <div>
                                        <select value={qty} onChange={e => setQty(e.target.value)}></select>
                                        {[...Array(product.countInStock).keys()].map(
                                            (x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )
                                        )}
                                    </div>
                                </div>
                                <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                            </li>
                            </>
                                )
                            }

                        </ul>
                    </div>
                
                </div>
            </div>
        </div>
    );
}
