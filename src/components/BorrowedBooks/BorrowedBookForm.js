import React from 'react';
import { TextField, MenuItem, Button, Grid } from '@mui/material';

export default function BorrowedBookForm({ books, members, form, setForm, onSubmit, onCancel, editing }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Book"
            required
            fullWidth
            value={form.bookId}
            onChange={(e) => setForm({ ...form, bookId: e.target.value })}
          >
            {books.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Member"
            required
            fullWidth
            value={form.memberId}
            onChange={(e) => setForm({ ...form, memberId: e.target.value })}
          >
            {members.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Borrow Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            value={form.borrowDate}
            onChange={(e) => setForm({ ...form, borrowDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Return Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.returnDate}
            onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
            {editing ? 'Update' : 'Add'}
          </Button>
          {editing && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
