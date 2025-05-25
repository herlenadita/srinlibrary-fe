import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button  
} from '@mui/material';

import { fetchEntities, createEntity, updateEntity, deleteEntity } from './services/api';

import BookForm from './components/Books/BookForm';
import BookList from './components/Books/BookList';

import AuthorForm from './components/Authors/AuthorForm';
import AuthorList from './components/Authors/AuthorList';

import MemberForm from './components/Members/MemberForm';
import MemberList from './components/Members/MemberList';

import BorrowedBookForm from './components/BorrowedBooks/BorrowedBookForm';
import BorrowedBookList from './components/BorrowedBooks/BorrowedBookList';

function a11yProps(index) {
  return {
    id: `library-tab-${index}`,
    'aria-controls': `library-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`library-tabpanel-${index}`}
      aria-labelledby={`library-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Book form & selection
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookForm, setBookForm] = useState({ title: '', category: '', publishingYear: '', authorId: '' });

  // Author form & selection
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorForm, setAuthorForm] = useState({ name: '' });

  // Member form & selection
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', email: '', phone: '' });

  // BorrowedBook form & selection
  const [selectedBorrowedBook, setSelectedBorrowedBook] = useState(null);
  const [borrowedBookForm, setBorrowedBookForm] = useState({ bookId: '', memberId: '', borrowDate: '', returnDate: '' });

  // BorrowedBook search
  const [searchBorrowTitle, setSearchBorrowTitle] = useState('');
  const [searchBorrowMember, setSearchBorrowMember] = useState('');
  const [searchBorrowDate, setSearchBorrowDate] = useState('');

  useEffect(() => {
    if (tabIndex === 0) loadBooks();
    else if (tabIndex === 1) loadAuthors();
    else if (tabIndex === 2) loadMembers();
    else if (tabIndex === 3) loadBorrowedBooks();
  }, [tabIndex]);

  // Loaders
  async function loadBooks() {
    try {
      const data = await fetchEntities('books');
      setBooks(data);
    } catch {
      alert('Failed to fetch books');
    }
  }
  async function loadAuthors() {
    try {
      const data = await fetchEntities('authors');
      setAuthors(data);
    } catch {
      alert('Failed to fetch authors');
    }
  }
  async function loadMembers() {
    try {
      const data = await fetchEntities('members');
      setMembers(data);
    } catch {
      alert('Failed to fetch members');
    }
  }
  async function loadBorrowedBooks() {
    try {
      let url = `borrowedBooks`;
      const params = new URLSearchParams();
      if (searchBorrowTitle) params.append('bookTitle', searchBorrowTitle);
      if (searchBorrowMember) params.append('memberName', searchBorrowMember);
      if (searchBorrowDate) params.append('borrowDate', searchBorrowDate);
      const paramString = params.toString();
      const endpoint = paramString ? `${url}?${paramString}` : url;

      const data = await fetchEntities(endpoint);
      setBorrowedBooks(data);
    } catch {
      alert('Failed to fetch borrowed books');
    }
  }

  // Generic save and delete functions
  async function saveEntity(entity, id, data, resetForm, reloadFunc) {
    try {
      if (id) await updateEntity(entity, id, data);
      else await createEntity(entity, data);
      resetForm();
      reloadFunc();
    } catch {
      alert(`Failed to save ${entity}`);
    }
  }
  async function removeEntity(entity, id, reloadFunc) {
    if (!window.confirm(`Delete this ${entity.slice(0, -1)}?`)) return;
    try {
      await deleteEntity(entity, id);
      reloadFunc();
    } catch {
      alert(`Failed to delete ${entity.slice(0, -1)}`);
    }
  }

  // Book Handlers
  const submitBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.authorId) {
      alert('Title and Author are required');
      return;
    }
    saveEntity(
      'books',
      selectedBook?.id,
      {
        title: bookForm.title,
        category: bookForm.category,
        publishingYear: parseInt(bookForm.publishingYear) || null,
        author: { id: parseInt(bookForm.authorId) },
      },
      () => {
        setBookForm({ title: '', category: '', publishingYear: '', authorId: '' });
        setSelectedBook(null);
      },
      loadBooks
    );
  };
  const startEditBook = (book) => {
    setSelectedBook(book);
    setBookForm({
      title: book.title,
      category: book.category,
      publishingYear: book.publishingYear || '',
      authorId: book.author?.id || '',
    });
  };
  const cancelEditBook = () => {
    setSelectedBook(null);
    setBookForm({ title: '', category: '', publishingYear: '', authorId: '' });
  };
  const deleteBook = (id) => removeEntity('books', id, loadBooks);

  // Author Handlers
  const submitAuthor = (e) => {
    e.preventDefault();
    if (!authorForm.name) {
      alert('Name is required');
      return;
    }
    saveEntity(
      'authors',
      selectedAuthor?.id,
      authorForm,
      () => {
        setAuthorForm({ name: '' });
        setSelectedAuthor(null);
      },
      loadAuthors
    );
  };
  const startEditAuthor = (author) => {
    setSelectedAuthor(author);
    setAuthorForm({ name: author.name });
  };
  const cancelEditAuthor = () => {
    setSelectedAuthor(null);
    setAuthorForm({ name: '' });
  };
  const deleteAuthor = (id) => removeEntity('authors', id, loadAuthors);

  // Member Handlers
  const submitMember = (e) => {
    e.preventDefault();
    if (!memberForm.name) {
      alert('Name is required');
      return;
    }
    saveEntity(
      'members',
      selectedMember?.id,
      memberForm,
      () => {
        setMemberForm({ name: '', email: '', phone: '' });
        setSelectedMember(null);
      },
      loadMembers
    );
  };
  const startEditMember = (member) => {
    setSelectedMember(member);
    setMemberForm({ name: member.name, email: member.email, phone: member.phone });
  };
  const cancelEditMember = () => {
    setSelectedMember(null);
    setMemberForm({ name: '', email: '', phone: '' });
  };
  const deleteMember = (id) => removeEntity('members', id, loadMembers);

  // Borrowed Book Handlers
  const submitBorrowedBook = (e) => {
    e.preventDefault();
    if (!borrowedBookForm.bookId || !borrowedBookForm.memberId || !borrowedBookForm.borrowDate) {
      alert('Book, Member, and Borrow Date are required');
      return;
    }
    saveEntity(
      'borrowedBooks',
      selectedBorrowedBook?.id,
      {
        book: { id: parseInt(borrowedBookForm.bookId) },
        member: { id: parseInt(borrowedBookForm.memberId) },
        borrowDate: borrowedBookForm.borrowDate,
        returnDate: borrowedBookForm.returnDate || null,
      },
      () => {
        setBorrowedBookForm({ bookId: '', memberId: '', borrowDate: '', returnDate: '' });
        setSelectedBorrowedBook(null);
      },
      loadBorrowedBooks
    );
  };
  const startEditBorrowedBook = (bb) => {
    setSelectedBorrowedBook(bb);
    setBorrowedBookForm({
      bookId: bb.book?.id || '',
      memberId: bb.member?.id || '',
      borrowDate: bb.borrowDate ? bb.borrowDate.split('T')[0] : '',
      returnDate: bb.returnDate ? bb.returnDate.split('T')[0] : '',
    });
  };
  const cancelEditBorrowedBook = () => {
    setSelectedBorrowedBook(null);
    setBorrowedBookForm({ bookId: '', memberId: '', borrowDate: '', returnDate: '' });
  };
  const deleteBorrowedBook = (id) => removeEntity('borrowedBooks', id, loadBorrowedBooks);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        SRIN Library
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(_, newVal) => setTabIndex(newVal)} centered>
          <Tab label="Books" {...a11yProps(0)} />
          <Tab label="Authors" {...a11yProps(1)} />
          <Tab label="Members" {...a11yProps(2)} />
          <Tab label="Borrowed Books" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <BookForm
          authors={authors}
          form={bookForm}
          setForm={setBookForm}
          onSubmit={submitBook}
          onCancel={cancelEditBook}
          editing={!!selectedBook}
        />
        <BookList books={books} onEdit={startEditBook} onDelete={deleteBook} />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <AuthorForm
          form={authorForm}
          setForm={setAuthorForm}
          onSubmit={submitAuthor}
          onCancel={cancelEditAuthor}
          editing={!!selectedAuthor}
        />
        <AuthorList authors={authors} onEdit={startEditAuthor} onDelete={deleteAuthor} />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <MemberForm
          form={memberForm}
          setForm={setMemberForm}
          onSubmit={submitMember}
          onCancel={cancelEditMember}
          editing={!!selectedMember}
        />
        <MemberList members={members} onEdit={startEditMember} onDelete={deleteMember} />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <BorrowedBookForm
          books={books}
          members={members}
          form={borrowedBookForm}
          setForm={setBorrowedBookForm}
          onSubmit={submitBorrowedBook}
          onCancel={cancelEditBorrowedBook}
          editing={!!selectedBorrowedBook}
        />
        <Box sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search Borrowed Books
          </Typography>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); loadBorrowedBooks(); }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Book Title"
                  fullWidth
                  value={searchBorrowTitle}
                  onChange={(e) => setSearchBorrowTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Member Name"
                  fullWidth
                  value={searchBorrowMember}
                  onChange={(e) => setSearchBorrowMember(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  type="date"
                  label="Borrow Date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={searchBorrowDate}
                  onChange={(e) => setSearchBorrowDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={1} textAlign="right">
                <Button type="submit" variant="contained" color="primary">
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <BorrowedBookList
          borrowedBooks={borrowedBooks}
          onEdit={startEditBorrowedBook}
          onDelete={deleteBorrowedBook}
        />
      </TabPanel>
    </Container>
  );
}
