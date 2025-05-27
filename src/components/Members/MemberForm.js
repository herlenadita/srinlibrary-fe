import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

export default function MemberForm({ form, setForm, onSubmit, onCancel, editing }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Name"
            required
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Phone"
            fullWidth
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={2} textAlign="right">
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
