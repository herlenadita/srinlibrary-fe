import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookList({ books, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Title</TableCell>
            <TableCell sx={{ color: 'white' }}>Category</TableCell>
            <TableCell sx={{ color: 'white' }}>Publishing Year</TableCell>
            <TableCell sx={{ color: 'white' }}>Author</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books && books.length > 0 ? (
            books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.publishingYear}</TableCell>
                <TableCell>{book.author?.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No books found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
