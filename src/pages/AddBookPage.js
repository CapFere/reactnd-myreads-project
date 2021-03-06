import React, { Component } from "react";

import SearchBar from "../components/SearchBar";
import * as BooksAPI from "../BooksAPI";

import Book from "../components/Book";

class AddBookPage extends Component {
  state = {
    query: "",
    searchedBooks: [],
  };

  searchBooks = () => {
    const query = this.state.query.trim();
    if (query !== "") {
      BooksAPI.search(query).then((books) => {
        if (query === this.state.query) {
          this.setState({ searchedBooks: books.error ? [] : books });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };
  handleChange = (event) => {
    this.setState(
      {
        query: event.target.value,
      },
      () => {
        this.searchBooks();
      }
    );
  };
  render() {
    return (
      <div className="search-books">
        <SearchBar handleChange={this.handleChange} query={this.state.query} />
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book) => {
              const exists = this.props.books.find((b) => b.id === book.id);
              if (exists) {
                book.shelf = exists.shelf;
              }
              return (
                <Book
                  key={book.id}
                  book={book}
                  updateBookShelf={this.props.updateBookShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default AddBookPage;
