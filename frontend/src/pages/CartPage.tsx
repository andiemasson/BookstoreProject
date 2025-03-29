import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItems";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>
            <div className="mt-3">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong>: 
                                    Quantity: {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button 
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => removeFromCart(item.bookId)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-3 p-3 bg-light rounded">
                <h3>Total: ${totalCost.toFixed(2)}</h3>
            </div>

            <div className="mt-3">
                <button className="btn btn-primary me-2">Checkout</button>
                <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                >
                    Continue Browsing
                </button>
            </div>
        </div>
    );
}

export default CartPage;