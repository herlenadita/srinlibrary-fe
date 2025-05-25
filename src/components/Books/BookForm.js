import React from 'react';
import { TextField, MenuItem, Button, Grid } from '@mui/material';

export default function BookForm({ authors, form, setForm, onSubmit, onCancel, editing }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Title"
            required
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Category"
            fullWidth
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Publishing Year"
            type="number"
            fullWidth
            value={form.publishingYear}
            onChange={(e) => setForm({ ...form, publishingYear: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Author"
            required
            fullWidth
            value={form.authorId}
            onChange={(e) => setForm({ ...form, authorId: e.target.value })}
          >
            {authors.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} textAlign="right">
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
