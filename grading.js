// This file contains functions related to the essay grading logic

// Sample essay analysis function (in a real app, this would call an API)
function analyzeEssay(prompt, submission) {
  // This is a placeholder for actual analysis logic
  // In a real application, this would call an AI service API

  return {
    wordCount: countWords(submission),
    paragraphCount: countParagraphs(submission),
    sentenceCount: countSentences(submission),
    wordsPerSentence: calculateWordsPerSentence(submission),
    validationResults: {
      plagiarism: Math.random() > 0.8 ? "warning" : "success",
      aiGenerated: Math.random() > 0.8 ? "warning" : "success",
      grammar: Math.random() > 0.5 ? "warning" : "success",
      relevance: Math.random() > 0.8 ? "warning" : "success",
    },
  }
}

// Helper functions for text analysis
function countWords(text) {
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

function countParagraphs(text) {
  return text.split(/\n\s*\n/).filter((para) => para.trim().length > 0).length || 1
}

function countSentences(text) {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length || 1
}

function calculateWordsPerSentence(text) {
  const words = countWords(text)
  const sentences = countSentences(text)
  return (words / sentences).toFixed(1)
}

// Grade calculation based on rubric
function calculateGrade(criteriaScores) {
  let totalWeightedScore = 0
  let totalWeight = 0

  criteriaScores.forEach((criteria) => {
    totalWeightedScore += (criteria.score * criteria.weight) / 100
    totalWeight += criteria.weight
  })

  // Normalize if weights don't add up to 100
  if (totalWeight > 0 && totalWeight !== 100) {
    totalWeightedScore = (totalWeightedScore / totalWeight) * 100
  }

  return Math.round(totalWeightedScore)
}

// Generate feedback based on scores and analysis
function generateFeedback(criteriaScores, analysis) {
  // This is a placeholder for actual feedback generation
  // In a real application, this would use AI to generate personalized feedback

  const strengths = [
    "Clear thesis statement that effectively addresses the prompt",
    "Strong supporting evidence for main arguments",
    "Well-structured paragraphs with clear topic sentences",
    "Effective use of transitions between ideas",
    "Appropriate academic language and vocabulary",
  ]

  const weaknesses = [
    "Some arguments could be developed more thoroughly",
    "A few minor grammatical errors throughout the essay",
    "Additional examples would strengthen key points",
    "Consider addressing counterarguments more explicitly",
    "Conclusion could more effectively synthesize main points",
  ]

  // Select random strengths and weaknesses based on scores
  const selectedStrengths = []
  const selectedWeaknesses = []

  const avgScore = criteriaScores.reduce((sum, item) => sum + item.score, 0) / criteriaScores.length

  // Select more strengths for higher scores, more weaknesses for lower scores
  const numStrengths = Math.min(Math.round(avgScore / 20) + 1, 4)
  const numWeaknesses = Math.min(5 - numStrengths, 3)

  // Randomly select strengths and weaknesses
  for (let i = 0; i < numStrengths; i++) {
    const randomIndex = Math.floor(Math.random() * strengths.length)
    selectedStrengths.push(strengths[randomIndex])
    strengths.splice(randomIndex, 1)
  }

  for (let i = 0; i < numWeaknesses; i++) {
    const randomIndex = Math.floor(Math.random() * weaknesses.length)
    selectedWeaknesses.push(weaknesses[randomIndex])
    weaknesses.splice(randomIndex, 1)
  }

  return {
    strengths: selectedStrengths,
    weaknesses: selectedWeaknesses,
    overall: generateOverallAssessment(avgScore),
  }
}

function generateOverallAssessment(score) {
  if (score >= 90) {
    return "This is an excellent essay that demonstrates thorough understanding of the topic and exceptional writing skills. The argument is well-developed, coherent, and supported with relevant evidence."
  } else if (score >= 80) {
    return "This is a strong essay that demonstrates clear understanding of the topic and effective writing skills. The argument is well-developed and supported with relevant evidence."
  } else if (score >= 70) {
    return "This is a good essay that demonstrates understanding of the topic and competent writing skills. The argument is generally well-developed with some supporting evidence."
  } else if (score >= 60) {
    return "This essay demonstrates basic understanding of the topic and adequate writing skills. The argument could be more fully developed and better supported with evidence."
  } else {
    return "This essay needs improvement in developing a clear argument and supporting it with evidence. Focus on organizing ideas more effectively and providing specific examples to support claims."
  }
}
