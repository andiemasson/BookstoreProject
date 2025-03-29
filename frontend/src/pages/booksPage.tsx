import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Welcome from "../components/Welcome";
import CartSummary from "../components/CartSummary";

function BooksPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);


    return (
        <div className="container-fluid">
            <CartSummary />

            {/* Mobile Filter Button (only shows on small screens) */}
            <button 
                className="btn btn-primary d-md-none mb-3"
                onClick={() => setShowFilters(true)}
            >
                ☰ Filters
            </button>

            {/* Offcanvas Mobile Menu */}
            <div className="offcanvas offcanvas-start d-md-none" tabIndex={-1} id="mobileFilters" style={{ visibility: showFilters ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Filters</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowFilters(false)}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <CategoryFilter 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>
            </div>


            {/* computer layout */}
            <div className="row">
                <div className="col-12">
                    <Welcome />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-3 col-lg-2">
                    <div className="sticky-top" style={{ top: "20px" }}>
                        <CategoryFilter 
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                </div>
                <div className="col-md-9 col-lg-10">
                    <BookList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}

export default BooksPage;