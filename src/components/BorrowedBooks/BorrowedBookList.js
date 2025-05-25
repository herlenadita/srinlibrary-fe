import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BorrowedBookList({ borrowedBooks, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Book Title</TableCell>
            <TableCell sx={{ color: 'white' }}>Member Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Borrow Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Return Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borrowedBooks && borrowedBooks.length > 0 ? (
            borrowedBooks.map((bb) => (
              <TableRow key={bb.id}>
                <TableCell>{bb.book?.title}</TableCell>
                <TableCell>{bb.member?.name}</TableCell>
                <TableCell>{bb.borrowDate ? bb.borrowDate.split('T')[0] : ''}</TableCell>
                <TableCell>{bb.returnDate ? bb.returnDate.split('T')[0] : ''}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(bb)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(bb.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No borrowed books found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
