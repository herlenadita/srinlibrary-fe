import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

export default function AuthorForm({ form, setForm, onSubmit, onCancel, editing }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Name"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4} textAlign="right">
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
