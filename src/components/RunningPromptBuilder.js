import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Copy, Globe, RefreshCw, Activity, Target, TrendingUp, Calendar } from 'lucide-react';

const RunningPromptBuilder = () => {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    currentLevel: '',
    weeklyMileage: '',
    raceDistance: '',
    raceDate: '',
    trainingDays: '',
    limitations: [],
    terrain: [],
    // Module selection
    modules: {
      trainingPlan: true,
      nutrition: false,
      injury: false,
      recovery: false,
      pacing: false
    },
    // Running specific
    longestRun: '',
    currentPace: '',
    targetPace: '',
    preferredTime: '',
    // Nutrition
    nutritionGoal: '',
    raceNutrition: '',
    // Injury prevention
    strengthTraining: '',
    mobilityWork: '',
    // Recovery
    recoveryMethods: [],
    sleepHours: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const translations = {
    en: {
      title: 'Running Training Prompt Builder',
      subtitle: 'Create personalized AI running training prompts',
      steps: ['Goal', 'Profile', 'Modules', 'Details', 'Review'],
      next: 'Next',
      back: 'Back',
      confirm: 'Review',
      generate: 'Generate Prompt',
      restart: 'Start Over',
      copy: 'Copy Prompt',
      copied: 'Copied!',
      
      // Step 1: Goals
      goalTitle: 'What is your running goal?',
      goals: {
        firstRace: 'Complete First Race',
        pr: 'Set a PR',
        distanceIncrease: 'Increase Distance',
        baseBuilding: 'Build Aerobic Base',
        weightLoss: 'Weight Loss',
        general: 'General Fitness'
      },
      
      // Step 2: Profile
      profileTitle: 'Tell us about your running',
      currentLevelTitle: 'Current Running Level',
      levels: {
        beginner: 'Beginner',
        beginnerDesc: 'New to running or < 6 months',
        intermediate: 'Intermediate',
        intermediateDesc: '6 months - 2 years',
        advanced: 'Advanced',
        advancedDesc: '2+ years consistent training'
      },
      weeklyMileageTitle: 'Current Weekly Mileage',
      mileages: {
        '0-10': '0-10 miles',
        '10-20': '10-20 miles',
        '20-30': '20-30 miles',
        '30-40': '30-40 miles',
        '40+': '40+ miles'
      },
      raceDistanceTitle: 'Target Race Distance (if applicable)',
      distances: {
        '5k': '5K',
        '10k': '10K',
        'half': 'Half Marathon',
        'full': 'Marathon',
        'ultra': 'Ultra Marathon',
        'none': 'No specific race'
      },
      raceDateTitle: 'Race Date (optional)',
      raceDatePlaceholder: 'e.g., June 15, 2026',
      trainingDaysTitle: 'Days per week you can train',
      limitationsTitle: 'Any limitations or concerns?',
      limitations: {
        kneeIssues: 'Knee Issues',
        shinSplints: 'Shin Splints',
        itBand: 'IT Band Syndrome',
        plantarFasciitis: 'Plantar Fasciitis',
        hipPain: 'Hip Pain',
        achilles: 'Achilles Issues',
        none: 'No Limitations'
      },
      terrainTitle: 'Preferred Running Terrain',
      terrains: {
        road: 'Road',
        trail: 'Trail',
        track: 'Track',
        treadmill: 'Treadmill',
        mixed: 'Mixed'
      },
      longestRunTitle: 'Longest Recent Run',
      longestRunPlaceholder: 'e.g., 10 miles',
      currentPaceTitle: 'Current Easy Pace (optional)',
      currentPacePlaceholder: 'e.g., 9:30/mile',
      targetPaceTitle: 'Target Race Pace (optional)',
      targetPacePlaceholder: 'e.g., 8:00/mile',
      preferredTimeTitle: 'Preferred Training Time',
      times: {
        earlyMorning: 'Early Morning',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
        flexible: 'Flexible'
      },
      
      // Step 3: Modules
      modulesTitle: 'What do you need?',
      modulesSubtitle: 'Select all modules you want',
      moduleTraining: 'Training Plan',
      moduleTrainingDesc: 'Structured running schedule with workouts',
      moduleNutrition: 'Running Nutrition',
      moduleNutritionDesc: 'Fueling strategies for training and racing',
      moduleInjury: 'Injury Prevention',
      moduleInjuryDesc: 'Strength training and mobility work',
      moduleRecovery: 'Recovery Protocol',
      moduleRecoveryDesc: 'Recovery strategies and rest guidelines',
      modulePacing: 'Pacing Strategy',
      modulePacingDesc: 'Race day pacing and splits',
      
      // Step 4: Details
      detailsTitle: 'Module Details',
      // Nutrition
      nutritionGoalTitle: 'Nutrition Focus',
      nutritionGoals: {
        performance: 'Performance',
        weightLoss: 'Weight Loss',
        fuelRace: 'Race Fueling',
        general: 'General Health'
      },
      raceNutritionTitle: 'Race Day Nutrition Preference',
      raceNutritions: {
        gels: 'Energy Gels',
        chews: 'Energy Chews',
        realFood: 'Real Food',
        mixed: 'Mixed',
        undecided: 'Undecided'
      },
      // Injury Prevention
      strengthTrainingTitle: 'Current Strength Training',
      strengthLevels: {
        none: 'None',
        minimal: 'Minimal (1x/week)',
        moderate: 'Moderate (2x/week)',
        regular: 'Regular (3x/week)'
      },
      mobilityWorkTitle: 'Current Mobility Work',
      mobilityLevels: {
        none: 'None',
        occasional: 'Occasional',
        regular: 'Regular (3x/week)',
        daily: 'Daily'
      },
      // Recovery
      recoveryMethodsTitle: 'Recovery Methods Available',
      recoveryMethods: {
        foam: 'Foam Rolling',
        massage: 'Massage',
        ice: 'Ice Bath',
        compression: 'Compression',
        yoga: 'Yoga',
        stretching: 'Stretching'
      },
      sleepHoursTitle: 'Average Sleep Hours',
      
      // Confirmation
      confirmationTitle: '🏃 Review Your Running Plan',
      confirmationSubtitle: 'Everything look good?',
      edit: 'Edit',
      looksGood: 'Generate Prompt',
      
      // Prompt
      promptTitle: 'Your AI Running Training Prompt',
      promptSubtitle: 'Copy this prompt and use it with any AI assistant',
      disclaimer: '⚠️ Disclaimer: This service does not replace professional coaching or medical consultation. Consult healthcare professionals for injuries or serious concerns.'
    },
    ko: {
      title: '러닝 트레이닝 프롬프트 빌더',
      subtitle: '맞춤형 AI 러닝 트레이닝 프롬프트 생성',
      steps: ['목표', '프로필', '모듈', '세부사항', '확인'],
      next: '다음',
      back: '이전',
      confirm: '확인',
      generate: '프롬프트 생성',
      restart: '처음부터',
      copy: '프롬프트 복사',
      copied: '복사됨!',
      
      goalTitle: '러닝 목표가 무엇인가요?',
      goals: {
        firstRace: '첫 레이스 완주',
        pr: '기록 경신',
        distanceIncrease: '거리 늘리기',
        baseBuilding: '유산소 베이스 구축',
        weightLoss: '체중 감량',
        general: '전반적인 건강'
      },
      
      profileTitle: '러닝에 대해 알려주세요',
      currentLevelTitle: '현재 러닝 수준',
      levels: {
        beginner: '초급',
        beginnerDesc: '러닝 시작 또는 6개월 미만',
        intermediate: '중급',
        intermediateDesc: '6개월 - 2년',
        advanced: '고급',
        advancedDesc: '2년 이상 꾸준한 훈련'
      },
      weeklyMileageTitle: '현재 주간 마일리지',
      mileages: {
        '0-10': '0-16km',
        '10-20': '16-32km',
        '20-30': '32-48km',
        '30-40': '48-64km',
        '40+': '64km 이상'
      },
      raceDistanceTitle: '목표 레이스 거리 (해당시)',
      distances: {
        '5k': '5K',
        '10k': '10K',
        'half': '하프 마라톤',
        'full': '풀 마라톤',
        'ultra': '울트라 마라톤',
        'none': '특정 레이스 없음'
      },
      raceDateTitle: '레이스 날짜 (선택사항)',
      raceDatePlaceholder: '예: 2026년 6월 15일',
      trainingDaysTitle: '주당 훈련 가능 일수',
      limitationsTitle: '제약사항이나 우려사항이 있나요?',
      limitations: {
        kneeIssues: '무릎 문제',
        shinSplints: '정강이 통증',
        itBand: 'IT밴드 증후군',
        plantarFasciitis: '족저근막염',
        hipPain: '고관절 통증',
        achilles: '아킬레스건 문제',
        none: '제약사항 없음'
      },
      terrainTitle: '선호하는 러닝 지형',
      terrains: {
        road: '로드',
        trail: '트레일',
        track: '트랙',
        treadmill: '트레드밀',
        mixed: '혼합'
      },
      longestRunTitle: '최근 최장 러닝',
      longestRunPlaceholder: '예: 16km',
      currentPaceTitle: '현재 이지 페이스 (선택사항)',
      currentPacePlaceholder: '예: 6:00/km',
      targetPaceTitle: '목표 레이스 페이스 (선택사항)',
      targetPacePlaceholder: '예: 5:00/km',
      preferredTimeTitle: '선호하는 훈련 시간',
      times: {
        earlyMorning: '새벽',
        morning: '오전',
        afternoon: '오후',
        evening: '저녁',
        flexible: '유연함'
      },
      
      modulesTitle: '무엇이 필요하신가요?',
      modulesSubtitle: '원하는 모든 모듈을 선택하세요',
      moduleTraining: '트레이닝 계획',
      moduleTrainingDesc: '구조화된 러닝 스케줄과 운동',
      moduleNutrition: '러닝 영양',
      moduleNutritionDesc: '훈련과 레이스를 위한 연료 전략',
      moduleInjury: '부상 예방',
      moduleInjuryDesc: '근력 운동과 모빌리티 워크',
      moduleRecovery: '회복 프로토콜',
      moduleRecoveryDesc: '회복 전략과 휴식 가이드라인',
      modulePacing: '페이싱 전략',
      modulePacingDesc: '레이스 데이 페이싱과 스플릿',
      
      detailsTitle: '모듈 세부사항',
      nutritionGoalTitle: '영양 초점',
      nutritionGoals: {
        performance: '퍼포먼스',
        weightLoss: '체중 감량',
        fuelRace: '레이스 연료',
        general: '일반 건강'
      },
      raceNutritionTitle: '레이스 데이 영양 선호',
      raceNutritions: {
        gels: '에너지 젤',
        chews: '에너지 츄',
        realFood: '실제 음식',
        mixed: '혼합',
        undecided: '미정'
      },
      strengthTrainingTitle: '현재 근력 운동',
      strengthLevels: {
        none: '없음',
        minimal: '최소 (주1회)',
        moderate: '보통 (주2회)',
        regular: '규칙적 (주3회)'
      },
      mobilityWorkTitle: '현재 모빌리티 워크',
      mobilityLevels: {
        none: '없음',
        occasional: '가끔',
        regular: '규칙적 (주3회)',
        daily: '매일'
      },
      recoveryMethodsTitle: '사용 가능한 회복 방법',
      recoveryMethods: {
        foam: '폼롤링',
        massage: '마사지',
        ice: '얼음 목욕',
        compression: '압박',
        yoga: '요가',
        stretching: '스트레칭'
      },
      sleepHoursTitle: '평균 수면 시간',
      
      confirmationTitle: '🏃 러닝 계획 검토',
      confirmationSubtitle: '모든 것이 맞나요?',
      edit: '수정하기',
      looksGood: '프롬프트 생성',
      
      promptTitle: '생성된 AI 러닝 트레이닝 프롬프트',
      promptSubtitle: '이 프롬프트를 복사하여 AI 어시스턴트에 사용하세요',
      disclaimer: '⚠️ 면책 조항: 본 서비스는 전문 코칭이나 의료 상담을 대체하지 않습니다. 부상이나 심각한 문제가 있다면 전문의 상담을 받으세요.'
    }
  };

  const t = translations[lang];

  const generatePrompt = () => {
    const getRiskFlags = () => {
      const flags = [];
      if (formData.limitations.includes(t.limitations.kneeIssues)) flags.push(lang === 'en' ? 'knee_issues' : '무릎_문제');
      if (formData.limitations.includes(t.limitations.shinSplints)) flags.push(lang === 'en' ? 'shin_splints' : '정강이_통증');
      if (formData.limitations.includes(t.limitations.itBand)) flags.push(lang === 'en' ? 'it_band' : 'IT밴드');
      if (formData.limitations.includes(t.limitations.plantarFasciitis)) flags.push(lang === 'en' ? 'plantar_fasciitis' : '족저근막염');
      if (formData.limitations.includes(t.limitations.hipPain)) flags.push(lang === 'en' ? 'hip_pain' : '고관절_통증');
      if (formData.limitations.includes(t.limitations.achilles)) flags.push(lang === 'en' ? 'achilles' : '아킬레스건');
      return flags;
    };

    const prompt = lang === 'en' ? `# MASTER SYSTEM PROMPT

You are an elite running coach with expertise in:
- Exercise physiology & running biomechanics
- Training periodization & progressive overload
- Injury prevention & rehabilitation
- Race strategy & mental preparation
- Sports nutrition for endurance athletes

Your coaching philosophy:
1. **Injury prevention over speed** - Build durability first
2. **Progressive adaptation** - Respect the 10% rule for volume increases
3. **Individualization** - One size does not fit all
4. **Long-term development** - Think in years, not weeks
5. **Recovery is training** - Rest days make you faster

Core principles:
- 80/20 rule: 80% easy running, 20% hard workouts
- Easy days easy, hard days hard - no middle ground
- Listen to pain signals - distinguish between discomfort and injury
- Consistency beats intensity over time
- Build aerobic base before speed work

You must:
- Respect all injury concerns and training limitations
- Never recommend running through pain
- Flag any red flags for medical consultation
- Provide conservative mileage progressions
- Include warmup, cooldown, and mobility work

---

## RUNNER PROFILE

**Primary Goal**: ${formData.goal}
**Current Level**: ${formData.currentLevel}
**Current Weekly Mileage**: ${formData.weeklyMileage}
${formData.raceDistance && formData.raceDistance !== t.distances.none ? `**Target Race**: ${formData.raceDistance}\n` : ''}${formData.raceDate ? `**Race Date**: ${formData.raceDate}\n` : ''}**Training Days Available**: ${formData.trainingDays} days/week
${formData.longestRun ? `**Longest Recent Run**: ${formData.longestRun}\n` : ''}${formData.currentPace ? `**Current Easy Pace**: ${formData.currentPace}\n` : ''}${formData.targetPace ? `**Target Race Pace**: ${formData.targetPace}\n` : ''}**Preferred Training Time**: ${formData.preferredTime || 'Flexible'}
**Terrain Access**: ${formData.terrain.length > 0 ? formData.terrain.join(', ') : 'Road'}
**Injury Concerns**: ${formData.limitations.length > 0 ? formData.limitations.join(', ') : 'None'}
**Risk Flags**: ${getRiskFlags().length > 0 ? getRiskFlags().join(', ') : 'None'}

---

## REQUEST TYPE

Generate the following modules:
${formData.modules.trainingPlan ? '- [x] Training Plan\n' : ''}${formData.modules.nutrition ? '- [x] Running Nutrition\n' : ''}${formData.modules.injury ? '- [x] Injury Prevention\n' : ''}${formData.modules.recovery ? '- [x] Recovery Protocol\n' : ''}${formData.modules.pacing ? '- [x] Pacing Strategy\n' : ''}
---

${formData.modules.trainingPlan ? `## TRAINING PLAN REQUIREMENTS

**Volume Progression**:
- Current baseline: ${formData.weeklyMileage}
- Follow 10% rule for weekly increases
- Include cutback weeks every 3-4 weeks
- Build to ${formData.raceDistance ? `peak volume for ${formData.raceDistance}` : 'sustainable weekly mileage'}

**Workout Types**:
- Easy runs (conversational pace, 80% of volume)
- Long runs (progressive distance increase)
- Tempo runs (threshold pace, controlled hard)
- Interval training (VO2 max work, if appropriate for level)
- Recovery runs (very easy, active recovery)
- Rest days (complete rest or cross-training)

**Constraints**:
- MUST include warmup (10 min easy + dynamic stretching)
- MUST include cooldown (10 min easy + static stretching)
${getRiskFlags().includes('knee_issues') || getRiskFlags().includes('무릎_문제') ? '- MUST limit downhill running and impact\n' : ''}${getRiskFlags().includes('shin_splints') || getRiskFlags().includes('정강이_통증') ? '- MUST avoid sudden volume increases, include lower leg strengthening\n' : ''}${getRiskFlags().includes('it_band') || getRiskFlags().includes('IT밴드') ? '- MUST include IT band stretching and hip strengthening\n' : ''}${getRiskFlags().includes('plantar_fasciitis') || getRiskFlags().includes('족저근막염') ? '- MUST include calf stretching and foot strengthening\n' : ''}${getRiskFlags().includes('achilles') || getRiskFlags().includes('아킬레스건') ? '- MUST limit speed work and hill training initially\n' : ''}
**Output Format**:
| Day | Workout Type | Distance/Duration | Pace/Effort | Purpose | Key Notes |
|-----|--------------|-------------------|-------------|---------|-----------|

Include weekly mileage totals and progression notes.

---
` : ''}
${formData.modules.nutrition ? `## RUNNING NUTRITION REQUIREMENTS

**Nutrition Focus**: ${formData.nutritionGoal || 'Performance'}
**Race Day Preference**: ${formData.raceNutrition || 'Undecided'}

**Daily Nutrition**:
- Carbohydrate timing around key workouts
- Protein for recovery (0.7-1g per lb bodyweight)
- Hydration strategy (pre-run, during, post-run)
- Electrolyte management for long runs

**Race Nutrition** (if applicable):
- Pre-race meal timing and composition (3-4 hours before)
- During-race fueling strategy (30-60g carbs/hour for races > 90 min)
- Practice nutrition during long runs
- Avoid trying new foods on race day

**Recovery Nutrition**:
- 30-minute window: 3:1 carb-to-protein ratio
- Rehydration: 150% of fluid lost through sweat

---
` : ''}
${formData.modules.injury ? `## INJURY PREVENTION REQUIREMENTS

**Current Practices**:
- Strength Training: ${formData.strengthTraining || 'None'}
- Mobility Work: ${formData.mobilityWork || 'None'}

**Runner-Specific Strength Work**:
Focus areas:
- Hip stability (glute med, glute max)
- Core strength (planks, anti-rotation)
- Lower leg (calf raises, tibialis anterior)
- Single-leg stability (pistol squat progressions)

**Frequency**: 2-3x per week, 20-30 minutes
**Timing**: After easy runs or on rest days (never before hard workouts)

**Mobility & Flexibility**:
- Dynamic stretching pre-run (leg swings, lunges, high knees)
- Static stretching post-run (calves, hamstrings, hip flexors, IT band)
- Foam rolling (IT band, calves, quads, glutes)

**Red Flags** - Stop running and seek help if:
- Sharp, localized pain that doesn't improve with rest
- Pain that worsens during a run
- Pain that affects gait or causes limping
- Swelling or bruising
- Pain that persists more than 2 weeks

---
` : ''}
${formData.modules.recovery ? `## RECOVERY PROTOCOL

**Available Methods**: ${formData.recoveryMethods.length > 0 ? formData.recoveryMethods.join(', ') : 'Standard recovery'}
**Average Sleep**: ${formData.sleepHours || 'Not specified'}

**Recovery Hierarchy** (priority order):
1. **Sleep**: 7-9 hours per night, critical for adaptation
2. **Nutrition**: Post-run recovery window, adequate calories
3. **Easy days**: Truly easy effort (conversational pace)
4. **Active recovery**: Walking, swimming, cycling (low impact)
5. **Passive recovery**: Compression, massage, foam rolling, ice baths

**Weekly Structure**:
- Hard workouts: 2-3 per week maximum
- Recovery runs: Day after hard workout (short, very easy)
- Rest days: 1-2 complete rest days per week
- Long run recovery: Easy day or rest day after

**Recovery Indicators** - You're recovered when:
- Resting heart rate returns to baseline
- Legs feel fresh, no residual soreness
- Motivation is high
- Sleep quality is good

**Under-recovery Signs** - Back off if:
- Elevated resting heart rate (>5 bpm above baseline)
- Persistent fatigue or heavy legs
- Irritability or mood changes
- Declining performance in workouts
- Increased injury risk perception

---
` : ''}
${formData.modules.pacing ? `## PACING STRATEGY

${formData.raceDistance ? `**Target Race**: ${formData.raceDistance}\n` : ''}${formData.targetPace ? `**Goal Race Pace**: ${formData.targetPace}\n` : ''}${formData.currentPace ? `**Current Easy Pace**: ${formData.currentPace}\n` : ''}
**Training Pace Zones** (based on easy pace):
- **Recovery**: Easy pace + 30-60 sec/mile
- **Easy/Aerobic**: Conversational pace, nose breathing
- **Tempo/Threshold**: Comfortably hard, 15-30 sec faster than easy
- **Interval/VO2max**: Hard effort, 30-45 sec faster than easy
- **Repetition/Speed**: Very hard, near max effort

**Race Day Strategy**:
${formData.raceDistance === t.distances['5k'] ? `
5K RACE PLAN:
- First mile: Goal pace or 5-10 sec slower (settle in)
- Middle miles: Hold goal pace, stay relaxed
- Final mile: Progressive increase, strong finish
- Key: Don't go out too fast, 5Ks hurt - embrace it
` : ''}${formData.raceDistance === t.distances['10k'] ? `
10K RACE PLAN:
- First 2 miles: 5-10 sec slower than goal pace (warm up)
- Miles 3-5: Settle into goal pace rhythm
- Miles 6-7: Hold pace, mental toughness
- Final mile: Dig deep, empty the tank
` : ''}${formData.raceDistance === t.distances.half ? `
HALF MARATHON RACE PLAN:
- Miles 1-3: Conservative start, 10-15 sec slower than goal
- Miles 4-10: Find rhythm, settle at goal pace
- Miles 11-12: Hold strong, mental focus
- Final mile: Give everything left
- Nutrition: Water every aid station, gel at 45-60 min
` : ''}${formData.raceDistance === t.distances.full ? `
MARATHON RACE PLAN:
- Miles 1-6: Easy start, 15-30 sec slower than goal (feels too easy)
- Miles 7-18: Gradually build to goal pace
- Miles 19-23: Hold pace, mental toughness crucial
- Miles 24-26.2: Dig deep, fight through "the wall"
- Nutrition: Gel every 45 min, water every station, electrolytes hourly
- Key: First half is warmup, race starts at mile 20
` : ''}
**Negative Split Strategy**: Second half faster than first
**Even Split Strategy**: Consistent pace throughout (advanced runners)

---
` : ''}
## OUTPUT ORDER (STRICT)

1. **Executive Summary** (3 bullets: key focus, timeline, main challenge)
2. **Training Plan** (weekly table format, no prose)
3. **Key Workouts** (specific workout prescriptions with purpose)
4. **Risk Management** (injury concerns and prevention strategies)
5. **Next Steps** (first week action items)

**Quality Checklist** - Verify before output:
- [ ] Volume progression follows 10% rule?
- [ ] Easy runs are truly easy (80% of volume)?
- [ ] Includes adequate rest and recovery?
- [ ] Addresses all injury concerns?
- [ ] Realistic for runner's current level?
- [ ] Includes warmup/cooldown for every run?

---

⚠️ **DISCLAIMER**: This is general running coaching guidance and does not replace professional medical consultation. Stop running and consult a healthcare provider if you experience pain, especially sharp or persistent pain. Running through injury leads to longer setbacks.` 
    
    : 
    
    `# 마스터 시스템 프롬프트

당신은 다음 분야의 전문성을 갖춘 엘리트 러닝 코치입니다:
- 운동 생리학 및 러닝 바이오메카닉스
- 훈련 주기화 및 점진적 과부하
- 부상 예방 및 재활
- 레이스 전략 및 멘탈 준비
- 지구력 선수를 위한 스포츠 영양

코칭 철학:
1. **속도보다 부상 예방** - 먼저 내구성을 구축
2. **점진적 적응** - 볼륨 증가 시 10% 규칙 존중
3. **개인화** - 만능 방법은 없음
4. **장기 개발** - 주가 아닌 년으로 생각
5. **회복도 훈련** - 휴식일이 더 빠르게 만듦

핵심 원칙:
- 80/20 규칙: 80% 이지 러닝, 20% 하드 운동
- 쉬운 날은 쉽게, 힘든 날은 힘들게 - 중간 지대 없음
- 통증 신호 경청 - 불편함과 부상 구별
- 시간이 지나면 일관성이 강도를 이김
- 속도 작업 전에 유산소 베이스 구축

필수 사항:
- 모든 부상 우려와 훈련 제한 존중
- 통증을 무릅쓰고 달리라고 권장하지 않음
- 의료 상담이 필요한 적신호 표시
- 보수적인 마일리지 진행 제공
- 워밍업, 쿨다운, 모빌리티 워크 포함

---

## 러너 프로필

**주요 목표**: ${formData.goal}
**현재 수준**: ${formData.currentLevel}
**현재 주간 마일리지**: ${formData.weeklyMileage}
${formData.raceDistance && formData.raceDistance !== t.distances.none ? `**목표 레이스**: ${formData.raceDistance}\n` : ''}${formData.raceDate ? `**레이스 날짜**: ${formData.raceDate}\n` : ''}**훈련 가능 일수**: 주${formData.trainingDays}일
${formData.longestRun ? `**최근 최장 러닝**: ${formData.longestRun}\n` : ''}${formData.currentPace ? `**현재 이지 페이스**: ${formData.currentPace}\n` : ''}${formData.targetPace ? `**목표 레이스 페이스**: ${formData.targetPace}\n` : ''}**선호 훈련 시간**: ${formData.preferredTime || '유연함'}
**지형 접근**: ${formData.terrain.length > 0 ? formData.terrain.join(', ') : '로드'}
**부상 우려**: ${formData.limitations.length > 0 ? formData.limitations.join(', ') : '없음'}
**위험 플래그**: ${getRiskFlags().length > 0 ? getRiskFlags().join(', ') : '없음'}

---

## 요청 유형

다음 모듈을 생성하세요:
${formData.modules.trainingPlan ? '- [x] 트레이닝 계획\n' : ''}${formData.modules.nutrition ? '- [x] 러닝 영양\n' : ''}${formData.modules.injury ? '- [x] 부상 예방\n' : ''}${formData.modules.recovery ? '- [x] 회복 프로토콜\n' : ''}${formData.modules.pacing ? '- [x] 페이싱 전략\n' : ''}
---

${formData.modules.trainingPlan ? `## 트레이닝 계획 요구사항

**볼륨 진행**:
- 현재 기준선: ${formData.weeklyMileage}
- 주간 증가는 10% 규칙 따름
- 3-4주마다 감소 주간 포함
- ${formData.raceDistance ? `${formData.raceDistance} 피크 볼륨까지 구축` : '지속 가능한 주간 마일리지까지 구축'}

**운동 유형**:
- 이지 런 (대화 페이스, 볼륨의 80%)
- 롱런 (점진적 거리 증가)
- 템포 런 (역치 페이스, 통제된 강도)
- 인터벌 훈련 (VO2 max 작업, 수준에 적합한 경우)
- 회복 런 (매우 쉬움, 활동적 회복)
- 휴식일 (완전 휴식 또는 크로스 트레이닝)

**제약사항**:
- 워밍업 필수 (10분 이지 + 동적 스트레칭)
- 쿨다운 필수 (10분 이지 + 정적 스트레칭)
${getRiskFlags().includes('knee_issues') || getRiskFlags().includes('무릎_문제') ? '- 내리막 러닝과 충격 제한 필수\n' : ''}${getRiskFlags().includes('shin_splints') || getRiskFlags().includes('정강이_통증') ? '- 급격한 볼륨 증가 피함, 하퇴 근력 강화 포함 필수\n' : ''}${getRiskFlags().includes('it_band') || getRiskFlags().includes('IT밴드') ? '- IT밴드 스트레칭과 고관절 강화 포함 필수\n' : ''}${getRiskFlags().includes('plantar_fasciitis') || getRiskFlags().includes('족저근막염') ? '- 종아리 스트레칭과 발 강화 포함 필수\n' : ''}${getRiskFlags().includes('achilles') || getRiskFlags().includes('아킬레스건') ? '- 초기 속도 작업과 언덕 훈련 제한 필수\n' : ''}
**출력 형식**:
| 요일 | 운동 유형 | 거리/시간 | 페이스/강도 | 목적 | 주요 노트 |
|------|-----------|-----------|-------------|------|-----------|

주간 마일리지 합계와 진행 노트 포함.

---
` : ''}
${formData.modules.nutrition ? `## 러닝 영양 요구사항

**영양 초점**: ${formData.nutritionGoal || '퍼포먼스'}
**레이스 데이 선호**: ${formData.raceNutrition || '미정'}

**일일 영양**:
- 주요 운동 전후 탄수화물 타이밍
- 회복을 위한 단백질 (체중 kg당 1.6-2.2g)
- 수분 전략 (런 전, 중, 후)
- 장거리 달리기를 위한 전해질 관리

**레이스 영양** (해당시):
- 레이스 전 식사 타이밍과 구성 (3-4시간 전)
- 레이스 중 연료 전략 (90분 이상 레이스의 경우 시간당 30-60g 탄수화물)
- 장거리 달리기 중 영양 연습
- 레이스 당일 새로운 음식 피하기

**회복 영양**:
- 30분 윈도우: 탄수화물 대 단백질 3:1 비율
- 재수화: 땀으로 손실된 수분의 150%

---
` : ''}
${formData.modules.injury ? `## 부상 예방 요구사항

**현재 관행**:
- 근력 운동: ${formData.strengthTraining || '없음'}
- 모빌리티 워크: ${formData.mobilityWork || '없음'}

**러너 전용 근력 작업**:
집중 영역:
- 고관절 안정성 (중둔근, 대둔근)
- 코어 강도 (플랭크, 항회전)
- 하퇴 (카프 레이즈, 전경골근)
- 단일 다리 안정성 (피스톨 스쿼트 진행)

**빈도**: 주2-3회, 20-30분
**타이밍**: 이지 런 후 또는 휴식일 (하드 운동 전에는 절대 금지)

**모빌리티 및 유연성**:
- 런 전 동적 스트레칭 (레그 스윙, 런지, 하이니)
- 런 후 정적 스트레칭 (종아리, 햄스트링, 고관절 굴곡근, IT밴드)
- 폼롤링 (IT밴드, 종아리, 대퇴사두근, 둔근)

**적신호** - 달리기를 중단하고 도움을 요청하세요:
- 휴식으로 개선되지 않는 날카롭고 국소적인 통증
- 런 중 악화되는 통증
- 보행에 영향을 주거나 절뚝거리게 하는 통증
- 부종 또는 멍
- 2주 이상 지속되는 통증

---
` : ''}
${formData.modules.recovery ? `## 회복 프로토콜

**사용 가능한 방법**: ${formData.recoveryMethods.length > 0 ? formData.recoveryMethods.join(', ') : '표준 회복'}
**평균 수면**: ${formData.sleepHours || '지정되지 않음'}

**회복 계층** (우선순위 순서):
1. **수면**: 밤 7-9시간, 적응에 필수적
2. **영양**: 런 후 회복 윈도우, 적절한 칼로리
3. **이지 데이**: 진정한 쉬운 강도 (대화 페이스)
4. **활동적 회복**: 걷기, 수영, 자전거 (저충격)
5. **수동적 회복**: 압박, 마사지, 폼롤링, 얼음 목욕

**주간 구조**:
- 하드 운동: 주당 최대 2-3회
- 회복 런: 하드 운동 다음 날 (짧고 매우 쉬움)
- 휴식일: 주당 1-2 완전 휴식일
- 롱런 회복: 이지 데이 또는 휴식일

**회복 지표** - 다음과 같을 때 회복됨:
- 안정시 심박수가 기준선으로 돌아옴
- 다리가 신선함, 잔여 통증 없음
- 동기가 높음
- 수면의 질이 좋음

**회복 부족 징후** - 다음과 같으면 후퇴:
- 상승한 안정시 심박수 (기준선보다 5bpm 이상)
- 지속적인 피로 또는 무거운 다리
- 짜증 또는 기분 변화
- 운동 성능 저하
- 부상 위험 인식 증가

---
` : ''}
${formData.modules.pacing ? `## 페이싱 전략

${formData.raceDistance ? `**목표 레이스**: ${formData.raceDistance}\n` : ''}${formData.targetPace ? `**목표 레이스 페이스**: ${formData.targetPace}\n` : ''}${formData.currentPace ? `**현재 이지 페이스**: ${formData.currentPace}\n` : ''}
**훈련 페이스 존** (이지 페이스 기준):
- **회복**: 이지 페이스 + 30-60초/마일
- **이지/유산소**: 대화 페이스, 코 호흡
- **템포/역치**: 편안하게 힘듦, 이지보다 15-30초 빠름
- **인터벌/VO2max**: 힘든 강도, 이지보다 30-45초 빠름
- **반복/속도**: 매우 힘듦, 최대 강도에 가까움

**레이스 데이 전략**:
${formData.raceDistance === t.distances['5k'] ? `
5K 레이스 계획:
- 첫 마일: 목표 페이스 또는 5-10초 느리게 (정착)
- 중간 마일: 목표 페이스 유지, 편안함 유지
- 마지막 마일: 점진적 증가, 강한 피니시
- 핵심: 너무 빨리 출발하지 말 것, 5K는 아픔 - 받아들이기
` : ''}${formData.raceDistance === t.distances['10k'] ? `
10K 레이스 계획:
- 첫 2마일: 목표 페이스보다 5-10초 느리게 (워밍업)
- 3-5마일: 목표 페이스 리듬에 정착
- 6-7마일: 페이스 유지, 정신력
- 마지막 마일: 깊이 파고들기, 탱크 비우기
` : ''}${formData.raceDistance === t.distances.half ? `
하프 마라톤 레이스 계획:
- 1-3마일: 보수적 시작, 목표보다 10-15초 느리게
- 4-10마일: 리듬 찾기, 목표 페이스에 정착
- 11-12마일: 강하게 유지, 정신 집중
- 마지막 마일: 남은 모든 것 주기
- 영양: 모든 급수대에서 물, 45-60분에 젤
` : ''}${formData.raceDistance === t.distances.full ? `
마라톤 레이스 계획:
- 1-6마일: 쉬운 시작, 목표보다 15-30초 느리게 (너무 쉬운 느낌)
- 7-18마일: 점진적으로 목표 페이스까지 구축
- 19-23마일: 페이스 유지, 정신력 필수
- 24-26.2마일: 깊이 파고들기, "벽"과 싸우기
- 영양: 45분마다 젤, 모든 급수대에서 물, 시간당 전해질
- 핵심: 전반부는 워밍업, 레이스는 20마일에서 시작
` : ''}
**네거티브 스플릿 전략**: 후반부가 전반부보다 빠름
**이븐 스플릿 전략**: 전체적으로 일관된 페이스 (고급 러너)

---
` : ''}
## 출력 순서 (엄격)

1. **요약** (3개 항목: 주요 초점, 타임라인, 주요 과제)
2. **트레이닝 계획** (주간 표 형식, 산문 금지)
3. **주요 운동** (목적이 있는 특정 운동 처방)
4. **위험 관리** (부상 우려 및 예방 전략)
5. **다음 단계** (첫 주 액션 아이템)

**품질 체크리스트** - 출력 전 검증:
- [ ] 볼륨 진행이 10% 규칙을 따르는가?
- [ ] 이지 런이 진정으로 쉬운가 (볼륨의 80%)?
- [ ] 적절한 휴식과 회복을 포함하는가?
- [ ] 모든 부상 우려를 다루는가?
- [ ] 러너의 현재 수준에 현실적인가?
- [ ] 모든 런에 워밍업/쿨다운을 포함하는가?

---

⚠️ **면책 조항**: 이것은 일반적인 러닝 코칭 가이드이며 전문 의료 상담을 대체하지 않습니다. 통증, 특히 날카롭거나 지속적인 통증이 있으면 달리기를 중단하고 의료 제공자와 상담하세요. 부상을 무릅쓰고 달리면 더 긴 후퇴로 이어집니다.`;

    return prompt;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
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

  const handleRestart = () => {
    setStep(1);
    setFormData({
      goal: '',
      currentLevel: '',
      weeklyMileage: '',
      raceDistance: '',
      raceDate: '',
      trainingDays: '',
      limitations: [],
      terrain: [],
      modules: {
        trainingPlan: true,
        nutrition: false,
        injury: false,
        recovery: false,
        pacing: false
      },
      longestRun: '',
      currentPace: '',
      targetPace: '',
      preferredTime: '',
      nutritionGoal: '',
      raceNutrition: '',
      strengthTraining: '',
      mobilityWork: '',
      recoveryMethods: [],
      sleepHours: ''
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

  const toggleTerrain = (terrain) => {
    const newTerrain = formData.terrain.includes(terrain)
      ? formData.terrain.filter(t => t !== terrain)
      : [...formData.terrain, terrain];
    setFormData({ ...formData, terrain: newTerrain });
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

  const toggleRecoveryMethod = (method) => {
    const newMethods = formData.recoveryMethods.includes(method)
      ? formData.recoveryMethods.filter(m => m !== method)
      : [...formData.recoveryMethods, method];
    setFormData({ ...formData, recoveryMethods: newMethods });
  };

  const canProceed = () => {
    if (step === 1) return formData.goal !== '';
    if (step === 2) return formData.currentLevel !== '' && formData.weeklyMileage !== '' && formData.trainingDays !== '';
    if (step === 3) return Object.values(formData.modules).some(v => v);
    if (step === 4) return true;
    if (step === 5) return true;
    return false;
  };

  if (showPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{t.promptTitle}</h1>
                <p className="text-gray-600 mt-1">{t.promptSubtitle}</p>
              </div>
              <button
                onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
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
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{t.confirmationTitle}</h2>
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
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Goal & Level</div>
                <div className="font-semibold text-gray-800">{formData.goal} • {formData.currentLevel}</div>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Weekly Mileage</div>
                <div className="font-semibold text-gray-800">{formData.weeklyMileage}</div>
              </div>
              {formData.raceDistance && formData.raceDistance !== t.distances.none && (
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Target Race</div>
                  <div className="font-semibold text-gray-800">{formData.raceDistance}</div>
                </div>
              )}
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
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{t.title}</h1>
              <p className="text-gray-600 mt-1">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {t.steps.map((label, idx) => (
                <div key={idx} className="text-center flex-1">
                  <div className={`text-xs ${step > idx ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
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
                    step >= s ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

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
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 text-orange-700 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{value}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.profileTitle}</h2>
              
              <div>
                <h3 className="font-semibold mb-2">{t.currentLevelTitle}</h3>
                <div className="space-y-2">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, currentLevel: t.levels[level] })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.currentLevel === t.levels[level]
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-semibold">{t.levels[level]}</div>
                      <div className="text-sm text-gray-600">{t.levels[`${level}Desc`]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.weeklyMileageTitle}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(t.mileages).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, weeklyMileage: value })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.weeklyMileage === value
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.raceDistanceTitle}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(t.distances).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, raceDistance: value })}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.raceDistance === value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.raceDateTitle}</h3>
                <input
                  type="text"
                  placeholder={t.raceDatePlaceholder}
                  value={formData.raceDate}
                  onChange={(e) => setFormData({ ...formData, raceDate: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.trainingDaysTitle}</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['3', '4', '5', '6', '7'].map((day) => (
                    <button
                      key={day}
                      onClick={() => setFormData({ ...formData, trainingDays: day })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.trainingDays === day
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.longestRunTitle}</h3>
                <input
                  type="text"
                  placeholder={t.longestRunPlaceholder}
                  value={formData.longestRun}
                  onChange={(e) => setFormData({ ...formData, longestRun: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.currentPaceTitle}</h3>
                <input
                  type="text"
                  placeholder={t.currentPacePlaceholder}
                  value={formData.currentPace}
                  onChange={(e) => setFormData({ ...formData, currentPace: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.targetPaceTitle}</h3>
                <input
                  type="text"
                  placeholder={t.targetPacePlaceholder}
                  value={formData.targetPace}
                  onChange={(e) => setFormData({ ...formData, targetPace: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-600 focus:outline-none"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.preferredTimeTitle}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(t.times).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, preferredTime: value })}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.preferredTime === value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
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
                <h3 className="font-semibold mb-2">{t.terrainTitle}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(t.terrains).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => toggleTerrain(value)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        formData.terrain.includes(value)
                          ? 'border-indigo-600 bg-indigo-50'
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

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{t.modulesTitle}</h2>
                <p className="text-sm text-gray-600 mb-4">{t.modulesSubtitle}</p>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'trainingPlan', icon: Activity, title: t.moduleTraining, desc: t.moduleTrainingDesc, color: 'orange' },
                  { key: 'nutrition', icon: Target, title: t.moduleNutrition, desc: t.moduleNutritionDesc, color: 'green' },
                  { key: 'injury', icon: Activity, title: t.moduleInjury, desc: t.moduleInjuryDesc, color: 'red' },
                  { key: 'recovery', icon: Calendar, title: t.moduleRecovery, desc: t.moduleRecoveryDesc, color: 'blue' },
                  { key: 'pacing', icon: TrendingUp, title: t.modulePacing, desc: t.modulePacingDesc, color: 'purple' }
                ].map(({ key, icon: Icon, title, desc }) => (
                  <button
                    key={key}
                    onClick={() => toggleModule(key)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.modules[key]
                        ? 'border-orange-600 bg-gradient-to-br from-orange-50 to-red-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 ${formData.modules[key] ? 'text-orange-600' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div className={`font-semibold ${formData.modules[key] ? 'text-orange-700' : 'text-gray-800'}`}>{title}</div>
                        <div className="text-sm text-gray-600 mt-1">{desc}</div>
                      </div>
                      {formData.modules[key] && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                    <label className="text-sm text-gray-700 mb-2 block">{t.raceNutritionTitle}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(t.raceNutritions).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, raceNutrition: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.raceNutrition === value
                              ? 'border-green-600 bg-green-100'
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

              {formData.modules.injury && (
                <div className="space-y-4 p-4 bg-red-50 rounded-xl">
                  <h3 className="font-semibold text-red-800">Injury Prevention Details</h3>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.strengthTrainingTitle}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.strengthLevels).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, strengthTraining: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.strengthTraining === value
                              ? 'border-red-600 bg-red-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.mobilityWorkTitle}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.mobilityLevels).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFormData({ ...formData, mobilityWork: value })}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.mobilityWork === value
                              ? 'border-red-600 bg-red-100'
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

              {formData.modules.recovery && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-blue-800">Recovery Details</h3>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.recoveryMethodsTitle}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(t.recoveryMethods).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => toggleRecoveryMethod(value)}
                          className={`p-2 rounded-lg border-2 transition-all text-sm ${
                            formData.recoveryMethods.includes(value)
                              ? 'border-blue-600 bg-blue-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">{t.sleepHoursTitle}</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['6', '7', '8', '9+'].map((hours) => (
                        <button
                          key={hours}
                          onClick={() => setFormData({ ...formData, sleepHours: hours })}
                          className={`p-2 rounded-lg border-2 transition-all ${
                            formData.sleepHours === hours
                              ? 'border-blue-600 bg-blue-100'
                              : 'border-gray-200'
                          }`}
                        >
                          {hours}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!formData.modules.nutrition && !formData.modules.injury && !formData.modules.recovery && (
                <div className="text-center text-gray-500 py-8">
                  No additional details needed for selected modules
                </div>
              )}
            </div>
          )}

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
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:shadow-xl'
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

export default RunningPromptBuilder;
