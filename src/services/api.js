const apiUrl = 'http://localhost:8080/api';

export async function fetchEntities(entity) {
  const res = await fetch(`${apiUrl}/${entity}`);
  if (!res.ok) throw new Error('Failed to fetch ' + entity);
  return await res.json();
}

export async function createEntity(entity, data) {
  const res = await fetch(`${apiUrl}/${entity}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create ' + entity);
  return await res.json();
}

export async function updateEntity(entity, id, data) {
  const res = await fetch(`${apiUrl}/${entity}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update ' + entity);
  return await res.json();
}

export async function deleteEntity(entity, id) {
  const res = await fetch(`${apiUrl}/${entity}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete ' + entity);
  return true;
}
