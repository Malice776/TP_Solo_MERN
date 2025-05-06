const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} = require('../controllers/publicationController');

const router = express.Router();

// Route to create a publication
router.post('/', verifyToken, createPublication);

// Route to get all publications
router.get('/', getAllPublications);

// Route to get a single publication by ID
router.get('/:id', getPublicationById);

// Route to update a publication
router.put('/:id', verifyToken, updatePublication);

// Route to delete a publication
router.delete('/:id', verifyToken, deletePublication);

module.exports = router;
