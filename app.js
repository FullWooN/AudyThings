// 1. CLASS (Kelas Dasar)
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
        this.borrowedBy = null;
    }

    // Method untuk meminjam buku
    borrow(memberName) {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            this.borrowedBy = memberName;
            return true;
        }
        return false;
    }

    // Method untuk mengembalikan buku
    returnBook() {
        this.isBorrowed = false;
        this.borrowedBy = null;
    }

    // Method untuk menampilkan informasi buku
    getInfo() {
        return `${this.title} oleh ${this.author}`;
    }
}

// 2. ENCAPSULATION (Dengan Private Field)
class Library {
    #books = []; // Private property

    // Method untuk menambahkan buku
    addBook(book) {
        this.#books.push(book);
        this.renderBooks();
    }

    // Method untuk meminjam buku
    borrowBook(bookTitle, memberName) {
        const book = this.#books.find(b => b.title === bookTitle && !b.isBorrowed);
        if (book) {
            book.borrow(memberName);
            this.renderBooks();
            this.renderBorrowedBooks();
            return true;
        }
        return false;
    }

    // Method untuk mendapatkan daftar buku yang tersedia
    getAvailableBooks() {
        return this.#books.filter(book => !book.isBorrowed);
    }

    // Method untuk mendapatkan daftar buku yang dipinjam
    getBorrowedBooks() {
        return this.#books.filter(book => book.isBorrowed);
    }

    // Method untuk render daftar buku
    renderBooks() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        
        this.#books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = `book-card ${book.isBorrowed ? 'borrowed' : ''}`;
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Status: ${book.isBorrowed ? 'Dipinjam oleh ' + book.borrowedBy : 'Tersedia'}</p>
            `;
            bookList.appendChild(bookCard);
        });

        this.updateBookSelect();
    }

    // Method untuk render buku yang dipinjam
    renderBorrowedBooks() {
        const borrowedBooks = document.getElementById('borrowedBooks');
        borrowedBooks.innerHTML = '';
        
        this.getBorrowedBooks().forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card borrowed';
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Dipinjam oleh: ${book.borrowedBy}</p>
            `;
            borrowedBooks.appendChild(bookCard);
        });
    }

    // Method untuk update dropdown buku
    updateBookSelect() {
        const bookSelect = document.getElementById('bookSelect');
        bookSelect.innerHTML = '';
        
        this.getAvailableBooks().forEach(book => {
            const option = document.createElement('option');
            option.value = book.title;
            option.textContent = book.getInfo();
            bookSelect.appendChild(option);
        });
    }
}

// 3. INHERITANCE (Pewarisan)
class EBook extends Book {
    constructor(title, author, fileFormat) {
        super(title, author);
        this.fileFormat = fileFormat;
    }

    // Override method getInfo
    getInfo() {
        return `${super.getInfo()} (Format: ${this.fileFormat})`;
    }
}

// 4. POLYMORPHISM (Polimorfisme)
function displayBookInfo(book) {
    console.log(book.getInfo());
}

// Inisialisasi library
const myLibrary = new Library();

// Fungsi untuk menambahkan buku
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    
    if (title && author) {
        const newBook = new Book(title, author);
        myLibrary.addBook(newBook);
        
        // Reset form
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
    } else {
        alert('Judul dan penulis harus diisi!');
    }
}

// Fungsi untuk meminjam buku
function borrowBook() {
    const memberName = document.getElementById('memberName').value;
    const bookTitle = document.getElementById('bookSelect').value;
    
    if (memberName && bookTitle) {
        if (myLibrary.borrowBook(bookTitle, memberName)) {
            document.getElementById('memberName').value = '';
        } else {
            alert('Buku tidak tersedia atau tidak ditemukan!');
        }
    } else {
        alert('Nama anggota dan buku harus dipilih!');
    }
}

// Contoh data awal
myLibrary.addBook(new Book('Harry Potter', 'J.K. Rowling'));
myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien'));
myLibrary.addBook(new EBook('Clean Code', 'Robert C. Martin', 'PDF'));