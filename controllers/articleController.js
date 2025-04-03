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