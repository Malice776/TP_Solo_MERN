const Publication = require('../models/Publication');

exports.createPublication = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPublication = new Publication({
      title,
      content,
      authorId: req.user.id, // Attach the logged-in user's ID
    });

    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    if (publication.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, content } = req.body;
    publication.title = title || publication.title;
    publication.content = content || publication.content;

    await publication.save();
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    // Rechercher la publication par ID
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    // Vérifier si l'utilisateur a le droit de supprimer
    if (publication.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Supprimer la publication
    await Publication.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error("Error during delete:", error);
    res.status(500).json({ error: error.message });
  }
};
