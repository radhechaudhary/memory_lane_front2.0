/**
 * Milestone categories and types for significant life events
 */

export const MILESTONE_TYPES = {
  life_event: "Life Event",
  achievement: "Achievement",
  birthday: "Birthday",
  anniversary: "Anniversary",
  wedding: "Wedding",
  graduation: "Graduation",
  new_job: "New Job",
  travel: "Travel",
  health: "Health",
  relationship: "Relationship",
  family: "Family",
  creative: "Creative",
  other: "Other",
};

export const MILESTONE_TYPE_ICONS = {
  life_event: "🎉",
  achievement: "🏆",
  birthday: "🎂",
  anniversary: "💕",
  wedding: "💒",
  graduation: "🎓",
  new_job: "💼",
  travel: "✈️",
  health: "💪",
  relationship: "👥",
  family: "👨‍👩‍👧‍👦",
  creative: "🎨",
  other: "⭐",
};

export const MILESTONE_COLORS = {
  life_event: "from-purple-400 to-purple-600",
  achievement: "from-yellow-400 to-orange-600",
  birthday: "from-pink-400 to-pink-600",
  anniversary: "from-red-400 to-red-600",
  wedding: "from-rose-400 to-rose-600",
  graduation: "from-blue-400 to-blue-600",
  new_job: "from-green-400 to-emerald-600",
  travel: "from-cyan-400 to-blue-600",
  health: "from-lime-400 to-green-600",
  relationship: "from-pink-400 to-rose-600",
  family: "from-amber-400 to-orange-600",
  creative: "from-violet-400 to-purple-600",
  other: "from-amber-400 to-orange-600",
};

// Reminder options
export const REMINDER_OPTIONS = [
  { value: "on_date", label: "On the day" },
  { value: "1_day_before", label: "1 day before" },
  { value: "3_days_before", label: "3 days before" },
  { value: "1_week_before", label: "1 week before" },
  { value: "1_month_before", label: "1 month before" },
  { value: "none", label: "No reminder" },
];

export const REMINDER_DAYS_MAP = {
  on_date: 0,
  "1_day_before": 1,
  "3_days_before": 3,
  "1_week_before": 7,
  "1_month_before": 30,
  none: null,
};

// Reflection prompts for different milestone types
export const REFLECTION_PROMPTS = {
  life_event: [
    "What made this moment so special?",
    "How has this event changed your life?",
    "Who was by your side during this moment?",
    "What emotions did you feel?",
    "What do you want to remember most about this day?",
  ],
  achievement: [
    "What efforts led to this achievement?",
    "How did you overcome challenges?",
    "Who supported you in this journey?",
    "What did you learn from this experience?",
    "What's next after this achievement?",
  ],
  birthday: [
    "What's changed since last year?",
    "What are your hopes for the year ahead?",
    "What are you grateful for?",
    "Who made your day special?",
    "What's your favorite birthday memory?",
  ],
  anniversary: [
    "What do you love most about this person/event?",
    "How have you both/things changed since then?",
    "What's your favorite memory together?",
    "What are you most grateful for?",
    "What does this milestone mean to you?",
  ],
  wedding: [
    "How did your story begin?",
    "What made you know they were the one?",
    "Who was there to celebrate with you?",
    "What's your favorite moment from the day?",
    "What are your hopes for the future?",
  ],
  graduation: [
    "What did you learn about yourself?",
    "Who helped you reach this milestone?",
    "What are you most proud of?",
    "What's your next big goal?",
    "How will you use your education?",
  ],
  new_job: [
    "What excites you about this opportunity?",
    "What challenges do you look forward to?",
    "How does this fit your career goals?",
    "Who supported your journey?",
    "What do you hope to achieve in this role?",
  ],
  travel: [
    "What was the most memorable moment?",
    "What surprised you the most?",
    "What did you learn from this experience?",
    "Who did you share this with?",
    "How did this trip change your perspective?",
  ],
  health: [
    "What inspired this health milestone?",
    "What challenges did you overcome?",
    "How do you feel now?",
    "Who supported you?",
    "What's your next health goal?",
  ],
  relationship: [
    "What do you appreciate about this person?",
    "How has this relationship grown?",
    "What's your favorite shared memory?",
    "What does this person mean to you?",
    "What are your shared dreams?",
  ],
  family: [
    "What makes this moment special?",
    "How has your family evolved?",
    "What family traditions matter most?",
    "Who do you love most?",
    "What do you want to preserve for future generations?",
  ],
  creative: [
    "What inspired this creative work?",
    "What was your creative process?",
    "What are you most proud of?",
    "Who did you share this with?",
    "What's your next creative project?",
  ],
  other: [
    "What does this milestone mean to you?",
    "How did you feel when it happened?",
    "Who was important during this time?",
    "What will you remember most?",
    "How has this changed you?",
  ],
};

/**
 * Get reflection prompts for a milestone type
 */
export const getReflectionPrompts = (type) => {
  return REFLECTION_PROMPTS[type] || REFLECTION_PROMPTS.other;
};

/**
 * Get random reflection prompt
 */
export const getRandomReflectionPrompt = (type) => {
  const prompts = getReflectionPrompts(type);
  return prompts[Math.floor(Math.random() * prompts.length)];
};

/**
 * Calculate reminder date
 */
export const calculateReminderDate = (milestoneDate, reminderOption) => {
  const days = REMINDER_DAYS_MAP[reminderOption];
  if (days === null) return null;

  const date = new Date(milestoneDate);
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Check if reminder should be triggered
 */
export const shouldTriggerReminder = (reminderDate) => {
  if (!reminderDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reminder = new Date(reminderDate);
  reminder.setHours(0, 0, 0, 0);

  return today.getTime() === reminder.getTime();
};
