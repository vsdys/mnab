const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getQuiz = async (req, res) => {
  const { data, error } = await supabase.from('quiz_questions').select('*');

  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.submitQuiz = async (req, res) => {
  const userAnswers = req.body.answers; // [{questionId, selectedOption}]
  let resultScore = 0;

  // Fetch all quiz questions
  const { data: questions } = await supabase.from('quiz_questions').select('*');

  // Calculate score clearly
  userAnswers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      resultScore += question.weights[answer.selectedOption];
    }
  });

  // Example logic clearly defined (you'll adjust it later):
  const profile = resultScore > 10 ? 'Left-Libertarian' : 'Right-Conservative';

  res.json({ profile, recommendedTags: profile === 'Left-Libertarian' ? ['equality', 'freedom'] : ['economy', 'traditional'] });
};