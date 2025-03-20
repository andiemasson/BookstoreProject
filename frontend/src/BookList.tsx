import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {

    const [books, setBooks] = useState<Book[]>([])
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}&sortAscending=${isAscending}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems/pageSize));
        };

        fetchBooks();
    },[pageSize, pageNum, totalItems, isAscending]);

    const sortBooksByTitle = () => {
        setIsAscending(!isAscending);
    };

    return (
        <>
            <h1>Book List</h1>

            <br/>

            <div>
                <button onClick={sortBooksByTitle} className="mb-3">
                    Sort by Title {isAscending ? "▲" : "▼"}
                </button>
            </div>

            <br/>
            {books.map((b)=> (
                <div id="bookCard" className="card" key={b.bookId}>
                    <h3 className="book-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author: </strong>{b.author}</li>
                            <li><strong>Publisher: </strong>{b.publisher}</li>
                            <li><strong>ISBN: </strong>{b.isbn}</li>
                            <li><strong>Genre: </strong>{b.classification}</li>
                            <li><strong>Category: </strong>{b.category}</li>
                            <li><strong>Number of Pages: </strong>{b.pageCount}</li>
                            <li><strong>Price: </strong>${b.price}</li>
                        </ul>
                    </div>
                </div>
            ))}

            <br/>
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Back</button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i+1} onClick={() => setPageNum(i+1)} disabled={pageNum === (i+1)}>
                    {i+1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br/>
            <br/>
            <label>
                Results per page:
                <select 
                    value={pageSize} 
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </label>
        </>
    );
}

export default BookList;