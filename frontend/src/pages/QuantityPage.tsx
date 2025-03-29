import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/Welcome";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItems";
import ToastNotification from "../components/ToastNotification";

function QuantityPage() {
    const navigate = useNavigate();
    const {title, bookId, price} = useParams();
    const{addToCart} = useCart();
    const[quantity, setQuantity] = useState<number>(1);
    const [showToast, setShowToast] = useState(false)

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || 'No Book Found',
            quantity,
            price: Number(price) || 0
        };
            addToCart(newItem)
            setShowToast(true);
            setTimeout(() => navigate('/cart'), 1500); // Delay navigation to show toast
    };

    return (
        <>
            <WelcomeBand/>
            {/* Add Toast Notification */}
            <ToastNotification 
                message={`Added ${quantity} ${quantity > 1 ? 'copies' : 'copy'} of ${title} to cart`} 
                show={showToast} 
            />
            <h2>Add {title} to cart</h2>

            <div>
                <input type="number" placeholder="Enter Quantity " value={quantity} onChange={(x) => setQuantity(Number(x.target.value))} />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    );
};

export default QuantityPage;