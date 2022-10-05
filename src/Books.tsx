import React, { FormEvent, useEffect, useState } from "react";
import './Books.css';
import axios from 'axios';

interface Book {
    id?: number;
    title: string;
    pageCount: number | '';
}

export default function Books() {
    const emptyBook: Book = { title: '', pageCount: '' }

    const [books, setBooks] = useState<Book[]>([]);

    const [editBook, setEditBook] = useState<Book>(emptyBook)

    const addBook = () => {
        axios.post<Book>('http://localhost:5118/api/Library', editBook)
            .then(response => {
                if (response.status === 201) {
                    setBooks([...books, response.data]);
                    setEditBook(emptyBook);
                }
            });
    }

    const updateBook = () => {
        axios.put<Book>('http://localhost:5118/api/Library', editBook)
            .then(response => {
                if (response.status === 200) {
                    const updatedBook = response.data;
                    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
                    setEditBook(emptyBook);
                }
            });
    }

    const handleEditBook = (e: FormEvent) => {
        e.preventDefault();
        if (editBook.title.length === 0 || editBook.pageCount === '') {
            return;
        }

        if (editBook.id === undefined) {
            addBook();
        } else {
            updateBook();
        }
    }

    const deleteEditBook = () => {
        if (editBook.id) {
            axios.delete<number>(`http://localhost:5118/api/Library/${editBook.id}`)
                .then(response => {
                    if (response.status === 200) {
                        setBooks(books.filter(b => b.id !== response.data));
                        setEditBook(emptyBook);
                    }
                });
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5118/api/Library')
            .then(response => {
                if (response.status === 200) {
                    setBooks(response.data);
                }
            });
    }, [])

    return (
        <main>

            <h1>Bücher</h1>
            <form onSubmit={e => handleEditBook(e)}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={editBook.title} style={{ flex: '1 0' }}
                           onChange={e => setEditBook({ ...editBook, title: e.target.value })}/>
                    <input type="number" value={editBook.pageCount} style={{ flex: '0 0' }}
                           onChange={e => setEditBook({ ...editBook, pageCount: +e.target.value })}/>
                    <button type="submit" style={{ flex: '0 0' }}>OK</button>
                    {editBook.id && <button type="button" onClick={() => deleteEditBook()}>Löschen</button>}
                </div>
            </form>

            <div className="tableContainer">
                <table>
                    <tbody>
                    <tr>
                        <th style={{width: '80%'}}>Titel</th>
                        <th>Seiten</th>
                    </tr>
                    {books.map(book => (
                        <tr key={book.id} onClick={() => setEditBook(book)}>
                            <td>{book.title}</td>
                            <td>{book.pageCount}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>

            {/*<div className="column">
                <ReactSortable list={list1} setList={setList1} group="shared-group-name">
                    {list1.map((item) => (
                        <div className="listItem" key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>

            </div>
            <div className="column">
                <ReactSortable list={list2} setList={setList2} group="shared-group-name">
                    {list2.map((item) => (
                        <div className="listItem" key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>*/}

        </main>

    );
};
