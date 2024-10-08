// JavaScript logic for the vacation wizard

let answers = {};
const totalQuestions = 10;

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
  if (answers['question4'] === 'hot') {
    if (answers['question5'] === 'beach' && answers['question8'] === 'caribbean_mexico') {
      if (answers['question3'] === 'under_2000') {
        recommendation = "We recommend a budget-friendly all-inclusive resort in Punta Cana, Dominican Republic. Enjoy beautiful beaches and amenities like free breakfast, multiple pools, and activities without breaking the bank.";
      } else if (answers['question3'] === '2000_5000') {
        recommendation = "Consider a mid-range all-inclusive resort in Cancun, Mexico, with amenities like on-site dining, spa services, and entertainment options ideal for relaxation and fun.";
      } else if (answers['question3'] === '5000_10000') {
        recommendation = "An upscale all-inclusive resort in Montego Bay, Jamaica, could be perfect for you. Enjoy premium amenities like gourmet restaurants, beach cabanas, water sports, and spa treatments.";
      } else if (answers['question3'] === 'over_10000') {
        recommendation = "For a luxury experience, we recommend staying at a high-end resort in Turks and Caicos, with private villas, butler service, and exclusive beach access for the ultimate vacation.";
      }
    } else if (answers['question5'] === 'urban' && answers['question8'] === 'caribbean_mexico') {
      if (answers['question3'] === 'under_2000') {
        recommendation = "Explore Mexico City on a budget, with affordable boutique hotels and plenty of cultural activities, street food, and historical sights to explore.";
      } else if (answers['question3'] === '2000_5000') {
        recommendation = "Stay in a comfortable mid-range hotel in Havana, Cuba, with access to guided city tours, local restaurants, and vibrant nightlife.";
      } else if (answers['question3'] === '5000_10000') {
        recommendation = "A premium experience in San Juan, Puerto Rico, with stays in luxury hotels offering rooftop pools, fine dining, and historical excursions awaits you.";
      } else if (answers['question3'] === 'over_10000') {
        recommendation = "Enjoy a luxurious urban escape in Cartagena, Colombia, with private guided tours, fine dining experiences, and stays in the best 5-star hotels in the city.";
      }
    }
  } else if (answers['question4'] === 'mild') {
    recommendation = "We recommend exploring the lush landscapes of Costa Rica during the mild season for a mix of adventure and relaxation, with options for budget or luxury stays.";
  } else {
    recommendation = "Based on your preferences, we suggest exploring the beautiful landscapes of New Zealand!";
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
