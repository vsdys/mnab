require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.getArticles = async (req, res) => {
  const { data, error } = await supabase.from('articles').select('*');

  if (error) {
    console.error('Error fetching articles:', error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log('Fetched articles:', data);
  res.json(data);
};

exports.getArticlesByCategory = async (req, res) => {
  const { category } = req.params;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category); // Filters by category column

  if (error) {
    console.error('Error fetching filtered articles:', error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'No articles found for this category' });
  }

  res.json(data);
};

exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single(); // only return 1 row

  if (error) {
    console.error('Error fetching article by ID:', error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: 'Article not found' });
  }

  res.json(data);
};
