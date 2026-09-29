import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Cart({cartItems,setCartItems}){
    const [complete,setComplete]= useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);
    function increaseQty(item){
        if (item.product.stock <= item.qty){
            return;
        }
        const updatedItems = cartItems.map((i)=>{
            if(i.product._id === item.product._id){
                return {...i, qty: i.qty + 1};
            }
            return i;
        })
        setCartItems(updatedItems)
    }

    function decreaseQty(item){
        if (item.qty > 1){
            const updatedItems = cartItems.map((i)=>{
                if(i.product._id === item.product._id){
                    return {...i, qty: i.qty - 1};
                }
                return i;
            })
            setCartItems(updatedItems)
        }
        
    }


    function removeItem(item){
        if (!window.confirm(`Remove ${item.product.name} from your cart?`)) return;

        const updatedItems = cartItems.filter((i)=>{
            return i.product._id !== item.product._id;
        })
        setCartItems(updatedItems)
    }

    function placeOrder (){
        setPlacingOrder(true);
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'}/order`,{
            method : "POST",
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(cartItems)
        })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error('Order failed.')))
        .then(()=>{setCartItems([]);
            setComplete(true);
            toast.success("Order Success!")
        })
        .catch(() => toast.error('Unable to place order. Please try again.'))
        .finally(() => setPlacingOrder(false));
    }

    const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    return  cartItems.length >0 ? <Fragment><div className="container container-fluid cart-page">
    <h2 className="mt-5">Your Cart: <b>{itemCount} items</b></h2>
    
    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
            {cartItems.map((item)=>
            (<Fragment key={item.product._id}>
            <hr />
            <div className="cart-item">
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img src={item.product.images?.[0]?.image || '/images/products/1.jpg'} alt={item.product.name} height="90" width="115"/>
                    </div>

                    <div className="col-5 col-lg-3">
                    <Link to={"/product/"+item.product._id}>{item.product.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">₹{item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={()=> decreaseQty(item)}>-</span>
                            <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                            <span className="btn btn-primary plus" onClick={()=>increaseQty(item)}>+</span>
                        </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <button type="button" aria-label={`Remove ${item.product.name}`} id="delete_cart_item" onClick = {()=> removeItem(item)} className="fa fa-trash btn btn-danger"></button>
                    </div>

                </div>
            </div>
            </Fragment>)
            )}
        </div>

        <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">{itemCount} (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">₹{total.toFixed(2)}</span></p>

                <hr />
                <button id="checkout_btn" onClick={placeOrder} disabled={placingOrder} className="btn btn-primary btn-block">{placingOrder ? 'Placing order...' : 'Place Order'}</button>
            </div>
        </div>
    </div>
</div>
</Fragment> : (!complete ? <div className="cart-empty"><h2>Your Cart Is Empty</h2><p>Save your favourites here and come back when you are ready.</p><Link to="/" className="btn btn-primary">Continue shopping</Link></div> : <div className="cart-empty"><h2>Order Completed!</h2><p>Your order was placed successfully.</p><Link to="/" className="btn btn-primary">Continue shopping</Link></div>)
}