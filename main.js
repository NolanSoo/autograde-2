document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanes = document.querySelectorAll(".tab-pane")

  function setActiveTab(tabId) {
    // Update tab buttons
    tabButtons.forEach((button) => {
      if (button.dataset.tab === tabId) {
        button.classList.add("active")
      } else {
        button.classList.remove("active")
      }
    })

    // Update tab panes
    tabPanes.forEach((pane) => {
      if (pane.id === tabId) {
        pane.classList.add("active")
      } else {
        pane.classList.remove("active")
      }
    })
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab)
    })
  })

  // Navigation buttons
  document.getElementById("continue-to-validation").addEventListener("click", () => {
    setActiveTab("validation")
  })

  document.getElementById("back-to-submission").addEventListener("click", () => {
    setActiveTab("submission")
  })

  document.getElementById("continue-to-grading").addEventListener("click", () => {
    setActiveTab("grading")
  })

  document.getElementById("back-to-validation").addEventListener("click", () => {
    setActiveTab("validation")
  })

  document.getElementById("start-grading").addEventListener("click", () => {
    setActiveTab("results")
    simulateGrading()
  })

  document.getElementById("start-new-grading").addEventListener("click", () => {
    resetForm()
    setActiveTab("submission")
  })

  // Grading type toggle
  const gradingTypeRadios = document.querySelectorAll('input[name="grading-type"]')
  const pointsInput = document.getElementById("points-input")

  gradingTypeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "points") {
        pointsInput.classList.remove("hidden")
      } else {
        pointsInput.classList.add("hidden")
      }
    })
  })

  // Rubric functionality
  document.getElementById("add-criteria").addEventListener("click", addRubricItem)

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-criteria").forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".rubric-item").remove()
    })
  })

  // Download results
  document.getElementById("download-results").addEventListener("click", downloadResults)
})

function addRubricItem() {
  const rubricItems = document.getElementById("rubric-items")
  const newItem = document.createElement("div")
  newItem.className = "rubric-item"
  newItem.innerHTML = `
    <input type="text" class="criteria-input" placeholder="Criteria name">
    <input type="number" class="weight-input" value="0" min="0" max="100">
    <button class="delete-criteria"><i class="fas fa-trash"></i></button>
  `

  rubricItems.appendChild(newItem)

  // Add event listener to the new delete button
  newItem.querySelector(".delete-criteria").addEventListener("click", function () {
    this.closest(".rubric-item").remove()
  })
}

function resetForm() {
  // Reset form fields
  document.getElementById("prompt").value = ""
  document.getElementById("submission").value = ""

  // Reset checkboxes to checked
  document.getElementById("check-plagiarism").checked = true
  document.getElementById("check-ai-generated").checked = true
  document.getElementById("check-grammar").checked = true
  document.getElementById("check-relevance").checked = true

  // Hide results content and show loading
  document.getElementById("results-content").classList.add("hidden")
  document.getElementById("loading-results").classList.remove("hidden")
}

function downloadResults() {
  const prompt = document.getElementById("prompt").value
  const submission = document.getElementById("submission").value
  const grade = document.getElementById("final-grade").textContent
  const feedback = document.getElementById("detailed-feedback").innerText

  let content = `# Essay Grading Results\n\n`
  content += `## Prompt\n${prompt}\n\n`
  content += `## Submission\n${submission}\n\n`
  content += `## Grade\n${grade}%\n\n`
  content += `## Feedback\n${feedback}\n\n`

  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "essay-grading-results.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function simulateGrading() {
  // Show loading state
  document.getElementById("loading-results").classList.remove("hidden")
  document.getElementById("results-content").classList.add("hidden")

  // Simulate API call delay
  setTimeout(() => {
    // Hide loading and show results
    document.getElementById("loading-results").classList.add("hidden")
    document.getElementById("results-content").classList.remove("hidden")

    // In a real app, this would be replaced with actual API call and data processing
  }, 2000)
}
