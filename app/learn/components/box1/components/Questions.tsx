export type QuestionForm = {
  title: string;
  questions: Question[];
};

export type Question = {
  no: number;
  question: string;
  options: string[];
  correctAnswer: string;
  answer: string | null;
};

export type BonusQuestion = {
  question: string;
  answer: number | null;
  backgroundInfo: string;
};

export const question1: Question = {
  no: 1,
  question: 'What does the Price to Earnings (P/E) ratio measure?',
  options: ['Profitability', 'Growth Potential', 'Valuation', 'Liquidity'],
  answer: null,
  correctAnswer:
    'Valuation. The P/E ratio measures the valuation of a stock by comparing its current market price per share to its earnings per share (EPS). A high P/E ratio suggests that investors are willing to pay more for each unit of earnings, indicating potentially overvalued stocks, while a low P/E ratio may signal undervalued stock.'
};

export const question2: Question = {
  no: 2,
  question: 'How can investors use the P/E ratio when picking stocks?',
  options: [
    'To predict future earnings',
    'To assess risk',
    'To evaluate groth potential',
    'To gauge relative value'
  ],
  answer: null,
  correctAnswer:
    'To gauge relative value. Investors us the P/E ratio to compare valuation of different stocks within the same industry against the market average. Warren Buffet famously said: It is far better to buy a wonderful company at a fair price than a fair company at a wonderful price.'
};

export const question3: Question = {
  no: 3,
  question:
    'Which of the following statements is true regarding the historical difference in P/E ratios between the Amazon and Nike stocks?',
  options: [
    'Amazon typically has a lower P/E ratio than Nike',
    'Nike typically has a lower P/E ratio than Amazon',
    'Both have similar P/E ratios historically',
    'P/E ratios are not comparable between these companies'
  ],
  answer: null,
  correctAnswer:
    'Nike typically has a lower P/E ratio than Amazon. Historically, Nike has maintained a more moderate valuation compared to Amazon due to differences in growth prospects, profit margins and market perception.'
};

export const question4: Question = {
  no: 4,
  question: 'What does a high P/E ratio indicate about a stock?',
  options: [
    'Undervaluation',
    'Overvaluation',
    'Stable growth',
    'Low profitability'
  ],
  answer: null,
  correctAnswer:
    'Overvaluation. A high P/E ratio suggests that investors are paying a premium fot the current earnings of a company. This may not be justified by its growth prospects or financial performance. As Warren Buffet advised: Whether we are talking about socks or stocks, I like buying quality merchandise when it is marked down.'
};

export const question5: Question = {
  no: 5,
  question: 'In what scenario might a low P/E ratio be misleading?',
  options: [
    'During market downturn',
    'When comparing across indutries',
    'When considering growth stocks',
    'When assessing small-cap companies'
  ],
  answer: null,
  correctAnswer:
    'When considering growth stocks. Growth stocks ofter reinvest most of their earnings back into the company to fuel expansion, resulting in lower current earnings and a higher potential for future growth. Therefore, a low P/E ratio for a growth stock may not accurately reflect its growth potential or investment value. As Peter Lynch famously said: Just because a stock is cheaper does not mean it is better value'
};

export const question6: Question = {
  no: 6,
  question:
    'What is historically considered the long-term average P/E ratio for the stock market?',
  options: ['+/ 20', '+/ 25', '+/ 15', '+/ 10'],
  answer: null,
  correctAnswer:
    '+/ 15. Historically, the long-term average P/E ratio for the stock market has been around 15. This ratio provides a baseline for evaluating whether the market as a whole is overvalued or undervalued. When the market P/E is significantly above or below its average, it may indicate potential opportunities or risk for investors. However, it is important to note that this average can vary over time due to changes in economic conditions, investor sentiment, and other factors. As Benjamin Graham, the father of value investing, famously said: In the short run, the market is a voting machine, but in the long run it is a weighing machine.'
};

export const bonusQuestion: BonusQuestion = {
  question:
    "What do you expect Nike's P/E ratio to be on the next earnings report (June 27th)?",
  answer: null,
  backgroundInfo:
    'Average P/E ratio over the previous 10 years: 36.3, Last 4:, August 2023: 30.01, November 2023: 31.78, February 2024: 30.21, April 2024: 27.25,'
};

export const questions1: QuestionForm = {
  title: 'Price to Earnings (P/E) Ratio Questions',
  questions: [question1, question2, question3, question4, question5, question6]
};
