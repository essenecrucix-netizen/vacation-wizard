// JavaScript logic for the vacation wizard

let answers = {};
const totalQuestions = 9;

function updateProgressBar(currentQuestionNumber) {
  const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function startWizard() {
  const name = document.getElementById('user-name').value;
  if (name) {
    document.getElementById('wizard').dataset.userName = name;
    document.getElementById('start-panel').style.display = 'none';
    document.getElementById('personalized-question1').innerText = `Hi ${name}, when do you want to go on vacation?`;
    nextQuestion(1);
  }
}

function nextQuestion(nextQuestionNumber, answer) {
  // Store the answer
  answers[`question${nextQuestionNumber - 1}`] = answer;

  // Update progress bar
  updateProgressBar(nextQuestionNumber - 1);

  // Hide the current panel
  const currentPanel = document.querySelector('.question-panel:not(.hidden)');
  if (currentPanel) {
    currentPanel.classList.add('hidden');
    setTimeout(() => {
      currentPanel.style.display = 'none';
    }, 500);
  }

  // Show the next panel
  const nextPanel = document.querySelector(`.question-panel[data-question="${nextQuestionNumber}"]`);
  if (nextPanel) {
    setTimeout(() => {
      nextPanel.style.display = 'block';
      nextPanel.classList.remove('hidden');
    }, 500);
  }
}

function showRecommendation(vibe) {
  // Store the vibe answer
  answers['vibe'] = vibe;

  // Update progress bar to complete
  updateProgressBar(totalQuestions);

  // Determine recommendation based on answers (fine-tuned logic)
  let recommendation = "";

  // All-inclusive resort recommendations based on answers
  if (answers['question1'] === 'winter' || answers['question1'] === 'spring' || answers['question1'] === 'summer' || answers['question1'] === 'fall') {
    if (answers['question4'] === 'hot' && answers['question5'] === 'beach') {
      if (answers['question3'] === 'under_2000') {
        recommendation = "We recommend staying at Riu Naiboa, Punta Cana - a budget-friendly all-inclusive resort with great beach access and activities for everyone.";
      } else if (answers['question3'] === '2000_5000') {
        recommendation = "Consider staying at the Royalton Riviera Cancun Resort & Spa in Mexico, which offers a great balance of luxury and value, with all-inclusive amenities and plenty of entertainment options.";
      } else if (answers['question3'] === '5000_10000') {
        recommendation = "An excellent option for you would be Sandals Montego Bay in Jamaica, an upscale all-inclusive resort with private beach access, water sports, and gourmet dining.";
      } else if (answers['question3'] === 'over_10000') {
        recommendation = "For a luxury experience, we suggest Jade Mountain Resort in St. Lucia, an all-inclusive resort with private infinity pools, stunning views, and top-notch service for the ultimate exclusive getaway.";
      }
    } else if (answers['question4'] === 'hot' && answers['question5'] === 'urban') {
      if (answers['question3'] === 'under_2000') {
        recommendation = "Explore the beautiful city of San Juan, Puerto Rico, staying at a budget-friendly all-inclusive resort like the Caribe Hilton, offering a mix of beach and urban experience.";
      } else if (answers['question3'] === '2000_5000') {
        recommendation = "Stay at Fiesta Americana Condesa in Cancun, offering an all-inclusive experience in an urban setting with easy access to cultural landmarks and vibrant nightlife.";
      } else if (answers['question3'] === '5000_10000') {
        recommendation = "Try Hyatt Ziva in Montego Bay, Jamaica - an all-inclusive resort that provides luxury, city excursions, and a beach atmosphere, perfect for those who want the best of both worlds.";
      } else if (answers['question3'] === 'over_10000') {
        recommendation = "Consider Atlantis Paradise Island in the Bahamas, a high-end all-inclusive resort with luxurious accommodations, dining, shopping, and entertainment all within reach.";
      }
    } else if (answers['question4'] === 'mild') {
      recommendation = "Explore the lush, all-inclusive eco-resorts of Costa Rica, such as the Andaz Costa Rica Resort at Peninsula Papagayo, perfect for a mix of adventure and relaxation with breathtaking nature experiences.";
    }
  }

  // Hide the current panel and show the recommendation
  const currentPanel = document.querySelector('.question-panel:not(.hidden)');
  if (currentPanel) {
    currentPanel.classList.add('hidden');
    setTimeout(() => {
      currentPanel.style.display = 'none';
    }, 500);
  }

  setTimeout(() => {
    const recommendationPanel = document.getElementById('recommendation');
    recommendationPanel.style.display = 'block';
    recommendationPanel.classList.remove('hidden');
    document.getElementById('recommendation-text').innerText = recommendation;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 500);
}

function shareFacebookRecommendation() {
  const recommendation = document.getElementById('recommendation-text').innerText;
  const text = `My Perfect Vacation from Travel with Sherry's Vacation Wizard: ${recommendation}`;
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function shareInstagramRecommendation() {
  const recommendation = document.getElementById('recommendation-text').innerText;
  const text = `My Perfect Vacation from Travel with Sherry's Vacation Wizard: ${recommendation}`;
  alert("Instagram does not allow direct sharing from websites, but you can copy this text and share it in your Instagram story or post: \n\n" + text);
}
