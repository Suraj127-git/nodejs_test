const express = require('express');
const serverless = require('serverless-http');


const app = express();
app.use(express.json());

// In-memory data to simulate storage
let items = [];

// GET endpoint - Retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST endpoint - Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json({ message: 'Item created successfully', item: newItem });
});

// PUT endpoint - Update an existing item by index
app.put('/items/:index', (req, res) => {
  const { index } = req.params;
  const updatedItem = req.body;

  if (index >= 0 && index < items.length) {
    items[index] = updatedItem;
    res.json({ message: 'Item updated successfully', item: updatedItem });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE endpoint - Remove an item by index
app.delete('/items/:index', (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < items.length) {
    const deletedItem = items.splice(index, 1);
    res.json({ message: 'Item deleted successfully', item: deletedItem });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Wrap the app with the serverless function
module.exports.handler = serverless(app);
