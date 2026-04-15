import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Copy, Globe, RefreshCw, Dumbbell, Apple, Calendar, TrendingUp } from 'lucide-react';

const FitnessPromptBuilder = () => {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    limitations: [],
    environment: '',
    level: '',
    duration: '',
    age: '',
    experience: '',
    equipment: [],
    // Module selection
    modules: {
      workout: true,
      nutrition: false,
      weekly: false,
      monthly: false,
      progress: false
    },
    // Nutrition specific
    nutritionGoal: '',
    dietType: '',
    cookingTime: '',
    mealsPerDay: '',
    // Weekly planner specific
    restDays: [],
    stressDays: [],
    trainingPriority: '',
    // Monthly plan specific
    timeHorizon: '4',
    deloadWeek: true,
    progressionType: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const translations = {
    en: {
      title: 'Comprehensive Fitness Prompt Builder',
      subtitle: 'Create personalized AI fitness prompts',
      steps: ['Goal', 'Profile', 'Modules', 'Details', 'Review'],
      next: 'Next',
      back: 'Back',
      confirm: 'Review',
      generate: 'Generate Prompt',
      restart: 'Start Over',
      copy: 'Copy Prompt',
      copied: 'Copied!',
      
      // Step 1: Goals
      goalTitle: 'What is your primary fitness goal?',
      goals: {
        weightLoss: 'Weight Loss',
        muscleGain: 'Muscle Gain',
        rehabilitation: 'Rehabilitation',
        endurance: 'Endurance',
        flexibility: 'Flexibility',
        general: 'General Fitness'
      },
      
      // Step 2: Profile
      profileTitle: 'Tell us about yourself',
      age: 'Age (optional)',
      agePlaceholder: 'e.g., 25',
      experience: 'Training Experience (optional)',
      experiencePlaceholder: 'e.g., 2 years of gym training',
      limitationsTitle: 'Any limitations or concerns?',
      limitationsSubtitle: 'Select all that apply',
      limitations: {
        kneeInjury: 'Knee Injury/Pain',
        backPain: 'Back Pain',
        shoulderIssue: 'Shoulder Issues',
        noEquipment: 'No Equipment',
        noiseConstraint: 'Noise Concerns',
        smallSpace: 'Limited Space',
        none: 'No Limitations'
      },
      environmentTitle: 'Where will you train?',
      environments: {
        home: 'Home',
        gym: 'Gym',
        outdoor: 'Outdoor',
        office: 'Office'
      },
      levelTitle: 'What is your fitness level?',
      levels: {
        beginner: 'Beginner',
        beginnerDesc: 'New to training',
        intermediate: 'Intermediate',
        intermediateDesc: '6+ months experience',
        advanced: 'Advanced',
        advancedDesc: '2+ years experience'
      },
      durationTitle: 'Available time per session?',
      durations: {
        '15': '15 minutes',
        '30': '30 minutes',
        '45': '45 minutes',
        '60': '60 minutes',
        '90': '90+ minutes'
      },
      equipment: 'Available Equipment',
      equipmentOptions: {
        dumbbells: 'Dumbbells',
        barbell: 'Barbell',
        kettlebell: 'Kettlebell',
        resistanceBands: 'Resistance Bands',
        pullupBar: 'Pull-up Bar',
        none: 'None (Bodyweight only)'
      },
      
      // Step 3: Modules
      modulesTitle: 'What do you need?',
      modulesSubtitle: 'Select all modules you want',
      moduleWorkout: 'Workout Plan',
      moduleWorkoutDesc: 'Exercise routines and training programs',
      moduleNutrition: 'Nutrition Plan',
      moduleNutritionDesc: 'Meal planning and dietary guidance',
      moduleWeekly: 'Weekly Schedule',
      moduleWeeklyDesc: 'Day-by-day training structure',
      moduleMonthly: 'Monthly Plan',
      moduleMonthlyDesc: 'Periodization and long-term progression',
      moduleProgress: 'Progress Analysis',
      moduleProgressDesc: 'Track and analyze your fitness journey',
      
      // Step 4: Module Details
      detailsTitle: 'Module Details',
      // Nutrition
      nutritionGoalTitle: 'Nutrition Goal',
      nutritionGoals: {
        fatLoss: 'Fat Loss',
        muscleGain: 'Muscle Gain',
        maintenance: 'Maintenance',
        performance: 'Performance'
      },
      dietTypeTitle: 'Diet Preference',
      dietTypes: {
        omnivore: 'Omnivore',
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        keto: 'Keto',
        paleo: 'Paleo',
        flexible: 'Flexible'
      },
      cookingTimeTitle: 'Cooking Time Available',
      cookingTimes: {
        minimal: 'Minimal (< 15 min)',
        moderate: 'Moderate (15-30 min)',
        extended: 'Extended (30+ min)'
      },
      mealsPerDayTitle: 'Meals per Day',
      // Weekly
      restDaysTitle: 'Preferred Rest Days',
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stressDaysTitle: 'High-Stress Days',
      trainingPriorityTitle: 'Training Priority',
      priorities: {
        strength: 'Strength',
        conditioning: 'Conditioning',
        mobility: 'Mobility',
        balanced: 'Balanced'
      },
      // Monthly
      progressionTypeTitle: 'Progression Type',
      progressionTypes: {
        linear: 'Linear',
        undulating: 'Undulating',
        block: 'Block Periodization'
      },
      
      // Confirmation
      confirmationTitle: '🤖 Review Your Settings',
      confirmationSubtitle: 'Everything look good?',
      edit: 'Edit',
      looksGood: 'Generate Prompt',
      
      // Prompt
      promptTitle: 'Your AI Fitness Prompt',
      promptSubtitle: 'Copy this prompt and use it with any AI assistant',
      disclaimer: '⚠️ Disclaimer: This service does not replace medical or professional consultation. Consult healthcare professionals for serious concerns.'
    },
    ko: {
      title: '종합 피트니스 프롬프트 빌더',
      subtitle: '맞춤형 AI 피트니스 프롬프트 생성',
      steps: ['목표', '프로필', '모듈', '세부사항', '확인'],
      next: '다음',
      back: '이전',
      confirm: '확인',
      generate: '프롬프트 생성',
      restart: '처음부터',
      copy: '프롬프트 복사',
      copied: '복사됨!',
      
      goalTitle: '주요 피트니스 목표가 무엇인가요?',
      goals: {
        weightLoss: '체중 감량',
        muscleGain: '근육 증가',
        rehabilitation: '재활',
        endurance: '지구력 향상',
        flexibility: '유연성 향상',
        general: '전반적인 건강'
      },
      
      profileTitle: '자신에 대해 알려주세요',
      age: '나이 (선택사항)',
      agePlaceholder: '예: 25',
      experience: '운동 경력 (선택사항)',
      experiencePlaceholder: '예: 헬스장 2년 경력',
      limitationsTitle: '제약사항이나 우려사항이 있나요?',
      limitationsSubtitle: '해당하는 모든 항목을 선택하세요',
      limitations: {
        kneeInjury: '무릎 부상/통증',
        backPain: '허리 통증',
        shoulderIssue: '어깨 문제',
        noEquipment: '운동 기구 없음',
        noiseConstraint: '층간소음 주의',
        smallSpace: '좁은 공간',
        none: '제약사항 없음'
      },
      environmentTitle: '어디서 운동하시나요?',
      environments: {
        home: '집',
        gym: '헬스장',
        outdoor: '야외',
        office: '사무실'
      },
      levelTitle: '운동 수준이 어떻게 되시나요?',
      levels: {
        beginner: '초급',
        beginnerDesc: '운동을 처음 시작',
        intermediate: '중급',
        intermediateDesc: '6개월 이상 경험',
        advanced: '고급',
        advancedDesc: '2년 이상 경험'
      },
      durationTitle: '세션당 가능한 시간은?',
      durations: {
        '15': '15분',
        '30': '30분',
        '45': '45분',
        '60': '60분',
        '90': '90분 이상'
      },
      equipment: '사용 가능한 장비',
      equipmentOptions: {
        dumbbells: '덤벨',
        barbell: '바벨',
        kettlebell: '케틀벨',
        resistanceBands: '저항 밴드',
        pullupBar: '철봉',
        none: '없음 (맨몸만)'
      },
      
      modulesTitle: '무엇이 필요하신가요?',
      modulesSubtitle: '원하는 모든 모듈을 선택하세요',
      moduleWorkout: '운동 계획',
      moduleWorkoutDesc: '운동 루틴과 트레이닝 프로그램',
      moduleNutrition: '영양 계획',
      moduleNutritionDesc: '식단 계획과 영양 가이드',
      moduleWeekly: '주간 일정',
      moduleWeeklyDesc: '요일별 트레이닝 구조',
      moduleMonthly: '월간 계획',
      moduleMonthlyDesc: '주기화와 장기 진행',
      moduleProgress: '진행 분석',
      moduleProgressDesc: '피트니스 여정 추적 및 분석',
      
      detailsTitle: '모듈 세부사항',
      nutritionGoalTitle: '영양 목표',
      nutritionGoals: {
        fatLoss: '체지방 감량',
        muscleGain: '근육 증가',
        maintenance: '유지',
        performance: '퍼포먼스'
      },
      dietTypeTitle: '식단 선호',
      dietTypes: {
        omnivore: '잡식',
        vegetarian: '채식',
        vegan: '비건',
        keto: '케토',
        paleo: '팔레오',
        flexible: '유연함'
      },
      cookingTimeTitle: '요리 가능 시간',
      cookingTimes: {
        minimal: '최소 (< 15분)',
        moderate: '보통 (15-30분)',
        extended: '충분 (30분 이상)'
      },
      mealsPerDayTitle: '하루 식사 횟수',
      restDaysTitle: '선호하는 휴식일',
      weekdays: ['월', '화', '수', '목', '금', '토', '일'],
      stressDaysTitle: '스트레스가 높은 날',
      trainingPriorityTitle: '트레이닝 우선순위',
      priorities: {
        strength: '근력',
        conditioning: '컨디셔닝',
        mobility: '이동성',
        balanced: '균형'
      },
      progressionTypeTitle: '진행 방식',
      progressionTypes: {
        linear: '선형',
        undulating: '파동형',
        block: '블록 주기화'
      },
      
      confirmationTitle: '🤖 설정 검토',
      confirmationSubtitle: '모든 것이 맞나요?',
      edit: '수정하기',
      looksGood: '프롬프트 생성',
      
      promptTitle: '생성된 AI 피트니스 프롬프트',
      promptSubtitle: '이 프롬프트를 복사하여 AI 어시스턴트에 사용하세요',
      disclaimer: '⚠️ 면책 조항: 본 서비스는 의료 또는 전문 상담을 대체하지 않습니다. 심각한 문제가 있다면 전문의 상담을 받으세요.'
    }
  };

  const t = translations[lang];

  const generatePrompt = () => {
    const getRiskFlags = () => {
      const flags = [];
      if (formData.limitations.includes(t.limitations.kneeInjury)) flags.push(lang === 'en' ? 'knee_injury' : '무릎_부상');
      if (formData.limitations.includes(t.limitations.backPain)) flags.push(lang === 'en' ? 'back_pain' : '허리_통증');
      if (formData.limitations.includes(t.limitations.shoulderIssue)) flags.push(lang === 'en' ? 'shoulder_issue' : '어깨_문제');
      return flags;
    };

    const selectedModules = Object.keys(formData.modules).filter(m => formData.modules[m]);

    const prompt = lang === 'en' ? `# MASTER SYSTEM PROMPT

You are an elite human performance coach.

You have expertise in:
- Exercise science & sports medicine
- Nutrition & body composition
- Behavior change & habit formation
- Long-term planning and progression

Your priorities:
1. Safety first (injury prevention & recovery)
2. Sustainability over intensity
3. Progressive overload with recovery
4. Clear, actionable output

You must:
- Respect all user constraints
- Never hallucinate medical advice
- Flag risk signals clearly

---

## USER PROFILE

**Primary Goal**: ${formData.goal}
**Fitness Level**: ${formData.level}
${formData.age ? `**Age**: ${formData.age}\n` : ''}${formData.experience ? `**Experience**: ${formData.experience}\n` : ''}**Limitations/Injuries**: ${formData.limitations.length > 0 ? formData.limitations.join(', ') : 'None'}
**Training Environment**: ${formData.environment}
**Available Time**: ${formData.duration} minutes per session
${formData.equipment.length > 0 ? `**Equipment**: ${formData.equipment.join(', ')}\n` : ''}**Risk Flags**: ${getRiskFlags().length > 0 ? getRiskFlags().join(', ') : 'None'}

---

## REQUEST TYPE

Generate the following modules:
${formData.modules.workout ? '- [x] Workout Plan\n' : ''}${formData.modules.nutrition ? '- [x] Nutrition Plan\n' : ''}${formData.modules.weekly ? '- [x] Weekly Schedule\n' : ''}${formData.modules.monthly ? '- [x] Monthly Plan\n' : ''}${formData.modules.progress ? '- [x] Progress Analysis\n' : ''}
---

${formData.modules.workout ? `## WORKOUT REQUIREMENTS

- Training Frequency: Based on available time and recovery needs
- Style Preference: ${formData.trainingPriority || 'Balanced'}
- Equipment: ${formData.equipment.length > 0 ? formData.equipment.join(', ') : 'Bodyweight only'}
- Noise/Space Constraints: ${formData.limitations.filter(l => l === t.limitations.noiseConstraint || l === t.limitations.smallSpace).join(', ') || 'None'}

**Constraints**:
- MUST avoid movements that aggravate injuries
- MUST include warm-up & cooldown
${formData.limitations.includes(t.limitations.kneeInjury) ? '- MUST NOT: jumping, deep squats, lunges\n' : ''}${formData.limitations.includes(t.limitations.backPain) ? '- MUST NOT: heavy spinal loading, overhead pressing\n' : ''}${formData.limitations.includes(t.limitations.shoulderIssue) ? '- MUST NOT: overhead movements, heavy pulling\n' : ''}
**Output Format**:
| Exercise | Sets | Reps/Duration | Rest | RPE | Reason | Safety Notes | Alternative |
|----------|------|---------------|------|-----|--------|--------------|-------------|

---
` : ''}
${formData.modules.nutrition ? `## NUTRITION REQUIREMENTS

- Nutrition Goal: ${formData.nutritionGoal || 'Not specified'}
- Diet Preference: ${formData.dietType || 'Flexible'}
- Cooking Skill & Time: ${formData.cookingTime || 'Moderate'}
- Meals per day: ${formData.mealsPerDay || '3'}

**Guidelines**:
- Prioritize whole foods and adequate protein
- Account for training demands and recovery
- Provide practical, sustainable recommendations

---
` : ''}
${formData.modules.weekly ? `## WEEKLY STRUCTURE

- Preferred Rest Days: ${formData.restDays.length > 0 ? formData.restDays.join(', ') : 'Flexible'}
- High-stress days: ${formData.stressDays.length > 0 ? formData.stressDays.join(', ') : 'None specified'}
- Training Priority: ${formData.trainingPriority || 'Balanced'}

**Structure**:
- Balance training stress across the week
- Account for recovery and lifestyle factors
- Provide day-by-day breakdown

---
` : ''}
${formData.modules.monthly ? `## PERIODIZATION RULES

- Time Horizon: ${formData.timeHorizon} weeks
- Deload Required: ${formData.deloadWeek ? 'Yes (Week 4)' : 'No'}
- Progression Type: ${formData.progressionType || 'Linear'}

**Phases**:
- Week 1-2: Accumulation
- Week 3: Intensification
- Week 4: Deload/Recovery

---
` : ''}
${formData.modules.progress ? `## PROGRESS TRACKING

Provide framework for:
- Measurable performance metrics
- Body composition tracking (if relevant)
- Subjective feedback (energy, recovery, mood)
- Adjustment triggers (when to modify plan)

---
` : ''}
## OUTPUT ORDER (STRICT)

1. **Summary** (3 bullets max)
2. **Main Plan** (tables only - no prose)
3. **Risk Flags** (if any safety concerns)
4. **Adjustment Logic** (why this specific plan for this user)
5. **Next Action** (clear 1-week focus)

---

⚠️ **DISCLAIMER**: This is general fitness guidance and does not replace professional medical or coaching consultation.` 
    
    : 
    
    `# 마스터 시스템 프롬프트

당신은 엘리트 인간 퍼포먼스 코치입니다.

전문 분야:
- 운동 과학 및 스포츠 의학
- 영양 및 체성분
- 행동 변화 및 습관 형성
- 장기 계획 및 진행

우선순위:
1. 안전 우선 (부상 예방 및 회복)
2. 강도보다 지속 가능성
3. 회복을 동반한 점진적 과부하
4. 명확하고 실행 가능한 결과물

필수 사항:
- 모든 사용자 제약사항 존중
- 의학적 조언 날조 금지
- 위험 신호 명확히 표시

---

## 사용자 프로필

**주요 목표**: ${formData.goal}
**운동 수준**: ${formData.level}
${formData.age ? `**나이**: ${formData.age}\n` : ''}${formData.experience ? `**경력**: ${formData.experience}\n` : ''}**제약사항/부상**: ${formData.limitations.length > 0 ? formData.limitations.join(', ') : '없음'}
**훈련 환경**: ${formData.environment}
**가능한 시간**: 세션당 ${formData.duration}분
${formData.equipment.length > 0 ? `**장비**: ${formData.equipment.join(', ')}\n` : ''}**위험 플래그**: ${getRiskFlags().length > 0 ? getRiskFlags().join(', ') : '없음'}

---

## 요청 유형

다음 모듈을 생성하세요:
${formData.modules.workout ? '- [x] 운동 계획\n' : ''}${formData.modules.nutrition ? '- [x] 영양 계획\n' : ''}${formData.modules.weekly ? '- [x] 주간 일정\n' : ''}${formData.modules.monthly ? '- [x] 월간 계획\n' : ''}${formData.modules.progress ? '- [x] 진행 분석\n' : ''}
---

${formData.modules.workout ? `## 운동 요구사항

- 훈련 빈도: 가능한 시간과 회복 필요에 따라
- 스타일 선호: ${formData.trainingPriority || '균형'}
- 장비: ${formData.equipment.length > 0 ? formData.equipment.join(', ') : '맨몸만'}
- 소음/공간 제약: ${formData.limitations.filter(l => l === t.limitations.noiseConstraint || l === t.limitations.smallSpace).join(', ') || '없음'}

**제약사항**:
- 부상을 악화시키는 동작 절대 금지
- 워밍업 및 쿨다운 필수 포함
${formData.limitations.includes(t.limitations.kneeInjury) ? '- 절대 금지: 점프, 깊은 스쿼트, 런지\n' : ''}${formData.limitations.includes(t.limitations.backPain) ? '- 절대 금지: 무거운 척추 부하, 오버헤드 프레스\n' : ''}${formData.limitations.includes(t.limitations.shoulderIssue) ? '- 절대 금지: 오버헤드 동작, 무거운 당기기\n' : ''}
**출력 형식**:
| 운동 | 세트 | 반복/시간 | 휴식 | RPE | 이유 | 안전 사항 | 대체 운동 |
|------|------|-----------|------|-----|------|----------|----------|

---
` : ''}
${formData.modules.nutrition ? `## 영양 요구사항

- 영양 목표: ${formData.nutritionGoal || '지정되지 않음'}
- 식단 선호: ${formData.dietType || '유연함'}
- 요리 기술 및 시간: ${formData.cookingTime || '보통'}
- 하루 식사 횟수: ${formData.mealsPerDay || '3'}

**가이드라인**:
- 전체 식품과 충분한 단백질 우선
- 훈련 요구와 회복 고려
- 실용적이고 지속 가능한 권장사항 제공

---
` : ''}
${formData.modules.weekly ? `## 주간 구조

- 선호하는 휴식일: ${formData.restDays.length > 0 ? formData.restDays.join(', ') : '유연함'}
- 스트레스가 높은 날: ${formData.stressDays.length > 0 ? formData.stressDays.join(', ') : '지정되지 않음'}
- 훈련 우선순위: ${formData.trainingPriority || '균형'}

**구조**:
- 주 전체에 걸쳐 훈련 스트레스 균형
- 회복 및 라이프스타일 요인 고려
- 일별 세부 계획 제공

---
` : ''}
${formData.modules.monthly ? `## 주기화 규칙

- 시간 범위: ${formData.timeHorizon}주
- 디로드 필요: ${formData.deloadWeek ? '예 (4주차)' : '아니오'}
- 진행 유형: ${formData.progressionType || '선형'}

**단계**:
- 1-2주차: 축적
- 3주차: 강화
- 4주차: 디로드/회복

---
` : ''}
${formData.modules.progress ? `## 진행 추적

다음을 위한 프레임워크 제공:
- 측정 가능한 성과 지표
- 체성분 추적 (관련 시)
- 주관적 피드백 (에너지, 회복, 기분)
- 조정 트리거 (계획 수정 시점)

---
` : ''}
## 출력 순서 (엄격)

1. **요약** (최대 3개 항목)
2. **주요 계획** (표만 - 산문 금지)
3. **위험 플래그** (안전 우려사항이 있는 경우)
4. **조정 논리** (이 사용자를 위한 특정 계획인 이유)
5. **다음 액션** (명확한 1주 집중 사항)

---

⚠️ **면책 조항**: 이것은 일반적인 피트니스 가이드이며 전문 의료 또는 코칭 상담을 대체하지 않습니다.`;

    return prompt;
  };

  const handleNext = () => {
    if (step === 5) {
      setShowConfirmation(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerate = () => {
    setShowPrompt(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      const textArea = document.createElement('textarea');
      textArea.value = generatePrompt();
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        console.error('Fallback copy failed:', err2);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setFormData({
      goal: '',
      limitations: [],
      environment: '',
      level: '',
      duration: '',
      age: '',
      experience: '',
      equipment: [],
      modules: {
        workout: true,
        nutrition: false,
        weekly: false,
        monthly: false,
        progress: false
      },
      nutritionGoal: '',
      dietType: '',
      cookingTime: '',
      mealsPerDay: '',
      restDays: [],
      stressDays: [],
      trainingPriority: '',
      timeHorizon: '4',
      deloadWeek: true,
      progressionType: ''
    });
    setShowConfirmation(false);
    setShowPrompt(false);
  };

  const toggleLimitation = (limitation) => {
    if (limitation === t.limitations.none) {
      setFormData({ ...formData, limitations: [] });
    } else {
      const newLimitations = formData.limitations.includes(limitation)
        ? formData.limitations.filter(l => l !== limitation)
        : [...formData.limitations.filter(l => l !== t.limitations.none), limitation];
      setFormData({ ...formData, limitations: newLimitations });
    }
  };

  const toggleEquipment = (equipment) => {
    if (equipment === t.equipmentOptions.none) {
      setFormData({ ...formData, equipment: [] });
    } else {
      const newEquipment = formData.equipment.includes(equipment)
        ? formData.equipment.filter(e => e !== equipment)
        : [...formData.equipment.filter(e => e !== t.equipmentOptions.none), equipment];
      setFormData({ ...formData, equipment: newEquipment });
    }
  };

  const toggleModule = (module) => {
    setFormData({
      ...formData,
      modules: {
        ...formData.modules,
        [module]: !formData.modules[module]
      }
    });
  };

  const toggleWeekday = (day, field) => {
    const current = formData[field];
    const newDays = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];
    setFormData({ ...formData, [field]: newDays });
  };

  const canProceed = () => {
    if (step === 1) return formData.goal !== '';
    if (step === 2) return formData.environment !== '' && formData.level !== '' && formData.duration !== '';
    if (step === 3) return Object.values(formData.modules).some(v => v);
    if (step === 4) {
      if (formData.modules.nutrition && !formData.nutritionGoal) return false;
      return true;
    }
    if (step === 5) return true;
    return false;
  };

  if (showPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.promptTitle}</h1>
                <p className="text-gray-600 mt-1">{t.promptSubtitle}</p>
              </div>
              <button
                onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {generatePrompt()}
              </pre>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">{t.disclaimer}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? t.copied : t.copy}
              </button>
              <button
                onClick={handleRestart}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {t.restart}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.confirmationTitle}</h2>
                <p className="text-gray-600 mt-1">{t.confirmationSubtitle}</p>
              </div>
              <button
                onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Goal & Profile</div>
                <div className="font-semibold text-gray-800">{formData.goal} • {formData.level}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Modules</div>
                <div className="font-semibold text-gray-800">
                  {Object.keys(formData.modules).filter(m => formData.modules[m]).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all shadow-md"
              >
                {t.back}
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                {t.generate}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t.title}</h1>
              <p className="text-gray-600 mt-1">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {t.steps.map((label, idx) => (
                <div key={idx} className="text-center flex-1">
                  <div className={`text-xs ${step > idx ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    step >= s ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.goalTitle}</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(t.goals).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setFormData({ ...formData, goal: value })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.goal === value
                        ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{value}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.profileTitle}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.agePlaceholder}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={t.experiencePlaceholder}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="p-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none col-span-2"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.limitationsTitle}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(t.limitations).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => toggleLimitation(value)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        formData.limitations.includes(value)
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.environmentTitle}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(t.environments).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, environment: value })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.environment === value
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.levelTitle}</h3>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, level: t.levels[level] })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.level === t.levels[level]
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-semibold">{t.levels[level]}</div>
                      <div className="text-sm text-gray-600">{t.levels[`${level}Desc`]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.durationTitle}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(t.durations).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, duration: key })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.duration === key
                          ? 'border-orange-600 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.equipment}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(t.equipmentOptions).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => toggleEquipment(value)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        formData.equipment.includes(value)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Modules */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{t.modulesTitle}</h2>
                <p className="text-sm text-gray-600 mb-4">{t.modulesSubtitle}</p>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'workout', icon: Dumbbell, title: t.moduleWorkout, desc: t.moduleWorkoutDesc, color: 'blue' },
                  { key: 'nutrition', icon: Apple, title: t.moduleNutrition, desc: t.moduleNutritionDesc, color: 'green' },
                  { key: 'weekly', icon: Calendar, title: t.moduleWeekly, desc: t.moduleWeeklyDesc, color: 'purple' },
                  { key: 'monthly', icon: Calendar, title: t.moduleMonthly, desc: t.moduleMonthlyDesc, color: 'orange' },
                  { key: 'progress', icon: TrendingUp, title: t.moduleProgress, desc: t.moduleProgressDesc, color: 'pink' }
                ].map(({ key, icon: Icon, title, desc, color }) => (
                  <button
                    key={key}
                    onClick={() => toggleModule(key)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.modules[key]
                        ? `border-${color}-600 bg-gradient-to-br from-${color}-50 to-${color}-100 shadow-md`
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 ${formData.modules[key] ? `text-${color}-600` : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div className={`font-semibold ${formData.modules[key] ? `text-${color}-700` : 'text-gray-800'}`}>{title}</div>
                        <div className="text-sm text-gray-600 mt-1">{desc}</div>
                      </div>
                      {formData.modules[key] && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Module Details */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.detailsTitle}</h2>
              
              {formData.modules.nutrition && (
                <div className="space-y-4 p-4 bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-green-800">Nutrition Details</h3>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.nutritionGoalTitle}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.nutritionGoals).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, nutritionGoal: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.nutritionGoal === value
                              ? 'border-green-600 bg-green-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.dietTypeTitle}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(t.dietTypes).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, dietType: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.dietType === value
                              ? 'border-green-600 bg-green-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.cookingTimeTitle}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(t.cookingTimes).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, cookingTime: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.cookingTime === value
                              ? 'border-green-600 bg-green-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.mealsPerDayTitle}</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['2', '3', '4', '5+'].map((num) => (
                        <button
                          key={num}
                          onClick={() => setFormData({ ...formData, mealsPerDay: num })}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            formData.mealsPerDay === num
                              ? 'border-green-600 bg-green-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.modules.weekly && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-purple-800">Weekly Schedule Details</h3>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.restDaysTitle}</label>
                    <div className="grid grid-cols-7 gap-1">
                      {t.weekdays.map((day, idx) => (
                        <button
                          key={day}
                          onClick={() => toggleWeekday(day, 'restDays')}
                          className={`p-2 rounded-lg border-2 transition-all text-xs ${
                            formData.restDays.includes(day)
                              ? 'border-purple-600 bg-purple-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.stressDaysTitle}</label>
                    <div className="grid grid-cols-7 gap-1">
                      {t.weekdays.map((day, idx) => (
                        <button
                          key={day}
                          onClick={() => toggleWeekday(day, 'stressDays')}
                          className={`p-2 rounded-lg border-2 transition-all text-xs ${
                            formData.stressDays.includes(day)
                              ? 'border-red-600 bg-red-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.trainingPriorityTitle}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.priorities).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, trainingPriority: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.trainingPriority === value
                              ? 'border-purple-600 bg-purple-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.modules.monthly && (
                <div className="space-y-4 p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-semibold text-orange-800">Monthly Plan Details</h3>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.progressionTypeTitle}</label>
                    <div className="space-y-2">
                      {Object.entries(t.progressionTypes).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, progressionType: value })}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            formData.progressionType === value
                              ? 'border-orange-600 bg-orange-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!formData.modules.nutrition && !formData.modules.weekly && !formData.modules.monthly && (
                <div className="text-center text-gray-500 py-8">
                  No additional details needed for selected modules
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all shadow-md flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                {t.back}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                canProceed()
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 5 ? t.confirm : t.next}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPromptBuilder;
