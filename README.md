# Cricklytics  
### Player Role Classification & Workload-Based Injury Analytics Platform

Cricklytics is a data-driven cricket analytics system integrating probabilistic player role classification with longitudinal workload modeling to support objective scouting and injury risk analysis.

The platform combines large-scale web scraping, supervised and unsupervised machine learning, temporal workload accumulation logic, and backend integration for structured analytical querying.

---

## Overview

Cricklytics consists of two primary analytical components:

1. **Player Role Classification System**
2. **Workload-Based Injury Risk Analysis Framework**

The system is designed to assist analysts and scouts in understanding player archetypes and identifying workload patterns associated with injury risk.

---

## Key Features

- Large-scale dataset construction via web scraping  
- Probabilistic player role classification (no rigid stat thresholds)  
- Hybrid ML pipeline (supervised + unsupervised learning)  
- Match-by-match workload accumulation modeling  
- Temporal injury pattern analysis  
- Supabase-integrated structured querying  
- Kaggle dataset publication for reproducibility  
- Research presented at Springer Sports ICSE 2025  

---

## Dataset Engineering

### 1. Player Classification Dataset
- Scraped **4,000+ professional T20 player records**
- Extracted performance metrics:
  - Matches
  - Runs
  - Batting Average
  - Strike Rate
  - Fours / Sixes
  - Bowling Economy / Wickets

### 2. Workload & Injury Dataset
- Scraped **11,000+ international match records**
- Focused on **61 international bowlers**
- Chronological match-level workload computation
- Curated workload dataset published on Kaggle

---

## Workload Accumulation Model

A custom workload scoring framework simulates realistic physical stress accumulation.

### Factors Incorporated

- **Format Weightage**  
  Test > ODI > T20I  

- **Match Proximity Compounding**  
  Increased workload for closely scheduled matches  

- **Injury-Proneness Multiplier**  
  Historical injury patterns increase cumulative stress  

- **Bowler-Type Weighting**  
  Pacers weighted higher than spinners  

- **Rest-Day Decay Function**  
  Workload decreases with sufficient recovery time  

Workload is computed match-by-match to generate a longitudinal stress timeline.

---

## Machine Learning Architecture

### Supervised Learning

Models Used:
- Random Forest Classifier  
- MLP (Multi-Layer Perceptron)  

Task:
- Player role classification  

Batsman Roles:
- Anchor  
- Balanced  
- Power Hitter  
- Finisher  

Bowler Roles:
- Elite  
- Economist  
- Wicket Taker  

Cross-validation used for evaluation.

---

### Unsupervised Learning

- PCA for dimensionality reduction  
- K-Means clustering for archetype discovery  

Used to validate role groupings and enable probabilistic assignments rather than rigid statistical thresholds.

---

## System Architecture
Data Scraping → Cleaning & Structuring → Feature Engineering
        ↓
Supervised ML Models (RF, MLP)
        ↓
Unsupervised Analysis (PCA + K-Means)
        ↓
Workload Accumulation Engine
        ↓
Supabase Backend Integration
        ↓
Query-Based Injury Timeline Generation
---

## Backend Integration

- Supabase (PostgreSQL) for structured storage  
- Enables query-based injury timeline generation  
- Supports analytical summaries and match-by-match workload tracking  

---

## Research Contribution

Research based on Cricklytics was presented at:

**Springer Sports ICSE 2025 Conference (New Delhi, Oct 2025)**  
Manuscript currently under review for inclusion in official conference proceedings.

---

## Technologies Used

- Python  
- Pandas  
- NumPy  
- Scikit-learn  
- Supabase (PostgreSQL)  
- BeautifulSoup / Requests (Web Scraping)  
- Matplotlib (Visualization)  

---
