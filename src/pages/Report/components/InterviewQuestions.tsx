import { useState } from 'react';
import type { Question } from '../../../modules/analytics/dto/analysisReport';

interface InterviewQuestionsProps {
  technical: Question[];
  behavioral: Question[];
}

const difficultyFromQuestion = (question: string): { label: string; className: string } => {
  const lower = question.toLowerCase();
  if (lower.includes('[hard')) return { label: 'Hard', className: 'bg-red-50 text-danger' };
  if (lower.includes('[medium')) return { label: 'Medium', className: 'bg-blue-50 text-blue-700' };
  return { label: 'Easy', className: 'bg-green-50 text-green-700' };
};

// Strip the difficulty prefix like "[HARD - TECHNICAL]" from the question text
const cleanQuestion = (question: string) => question.replace(/^\[.*?\]\s*/i, '');

function QuestionCard({ q }: { q: Question }) {
  const difficulty = difficultyFromQuestion(q.question);
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex justify-between items-start gap-4 mb-4">
        <h3 className="font-headline text-[1.1rem] font-bold text-primary max-w-2xl leading-snug">
          {cleanQuestion(q.question)}
        </h3>
        <span className={`px-3 py-1 text-[9px] font-label font-bold rounded-full uppercase shrink-0 ${difficulty.className}`}>
          {difficulty.label}
        </span>
      </div>

      <div className="pl-4 border-l-[3px] border-border/80 mb-6">
        <p className="font-serif text-[13px] text-muted italic">Interviewer evaluates: {q.intent}</p>
      </div>

      {q.suggestedTalkingPoints && q.suggestedTalkingPoints.length > 0 && (
        <div>
          <p className="font-label text-[9px] uppercase tracking-widest text-muted mb-3">Suggested Talking Points:</p>
          <ul className="list-disc pl-5 space-y-2 text-[13.5px] font-body text-primary-700">
            {q.suggestedTalkingPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function InterviewQuestions({ technical, behavioral }: InterviewQuestionsProps) {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical');
  const questions = activeTab === 'technical' ? technical : behavioral;

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-border/80 mb-6">
        <button
          onClick={() => setActiveTab('technical')}
          className={`pb-3 border-b-[3px] font-label text-[11px] font-bold tracking-widest uppercase transition-colors ${
            activeTab === 'technical'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-muted hover:text-secondary cursor-pointer'
          }`}
        >
          Technical Questions {technical.length > 0 && `(${technical.length})`}
        </button>
        <button
          onClick={() => setActiveTab('behavioral')}
          className={`pb-3 border-b-[3px] font-label text-[11px] font-bold tracking-widest uppercase transition-colors ${
            activeTab === 'behavioral'
              ? 'border-secondary text-secondary'
              : 'border-transparent text-muted hover:text-secondary cursor-pointer'
          }`}
        >
          Behavioral Questions {behavioral.length > 0 && `(${behavioral.length})`}
        </button>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-10 text-muted font-body">No questions available.</div>
        ) : (
          questions.map((q) => <QuestionCard key={q._id} q={q} />)
        )}
      </div>
    </div>
  );
}
