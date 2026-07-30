# RhythmBreathe PRD

## Vision

Build a gamified breathing trainer that helps users gradually increase
breathing capacity through adaptive progression instead of abrupt timing
changes.

## Goals

-   Make breathing practice enjoyable.
-   Encourage long-term consistency.
-   Personalize progression.
-   Work offline with localStorage for MVP.

## Target Users

-   Beginners
-   People managing stress
-   Meditation practitioners
-   Athletes

## Core Loop

1.  Start session.
2.  Follow inhale/hold/exhale guidance.
3.  Earn XP.
4.  Rate difficulty.
5.  Update Breath Score.
6.  Unlock themes, badges, and new techniques.

## Progression

### Breath Score

Starts at **3.0**.

Each successful comfortable session: - Easy: +0.05 - Just Right: +0.03 -
Hard: +0.00 - Too Hard: -0.02 (minimum 3.0)

Convert Breath Score into timing:

    Score   Inhale   Hold   Exhale
  ------- -------- ------ --------
     3.00      3.0    3.0      3.0
     3.10      3.1    3.0      3.1
     3.20      3.2    3.1      3.2
     3.50      3.5    3.3      3.5
     4.00      4.0    4.0      4.0

## Game Systems

### XP

-   Complete session: 50 XP
-   Daily streak: 25 XP
-   Weekly challenge: 250 XP

### Levels

1.  Beginner
2.  Comfort
3.  Expansion
4.  Control
5.  Deep Calm
6.  Master

### Unlockables

-   Themes
-   Sounds
-   Guided voices
-   New breathing techniques
-   Achievements

## Features

### MVP

-   Single-page web app
-   Animated breathing circle
-   Adaptive breathing
-   Start/Pause/Reset
-   Session rating
-   XP
-   Streak
-   localStorage persistence

### Future

-   Cloud sync
-   PWA
-   Wearables
-   AI coaching
-   Apple Health / Google Fit

## Data Model

``` json
{
  "breathScore": 3.0,
  "xp": 120,
  "level": 1,
  "streak": 4,
  "sessions": 18,
  "breathingMinutes": 96,
  "unlockedThemes": ["Default"],
  "settings": {
    "sound": true,
    "vibration": true,
    "voice": false
  }
}
```

## Screens

-   Home
-   Session
-   Results
-   Progress
-   Achievements
-   Settings

## Session Flow

Ready → Inhale → Hold → Exhale → Repeat → Rating → Rewards

## Success Metrics

-   7-day retention
-   Average sessions/week
-   Average breathing minutes/day
-   Streak length
-   Breath Score growth

## Tech Stack

-   HTML/CSS/JavaScript (MVP)
-   localStorage
-   Later: React, PWA, backend sync

## Roadmap

### Phase 1

MVP breathing trainer.

### Phase 2

Gamification, achievements, adaptive algorithm.

### Phase 3

Challenges, cloud sync, AI coach, health integrations.
