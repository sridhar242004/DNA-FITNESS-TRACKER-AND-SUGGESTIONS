document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const dnaUploadForm = document.getElementById('dnaUploadForm');
  const logoutBtn = document.getElementById('logout');

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (dnaUploadForm) {
    dnaUploadForm.addEventListener('submit', handleDNAUpload);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  const userName = document.getElementById('userName');
  if (userName) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userName.textContent = user.email;
    } else {
      window.location.href = 'login.html';
    }
  }
});

function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Invalid email or password format.');
    return;
  }

  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Registration successful! You can now log in.');
  window.location.href = 'login.html';
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Invalid email or password format.');
    return;
  }

  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = 'dashboard.html';
}

function handleLogout(event) {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function handleDNAUpload(event) {
  event.preventDefault();
  const fileInput = document.getElementById('dnaData');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const dnaData = JSON.parse(e.target.result);
      generateRecommendations(dnaData);
      drawDNAChart(dnaData);
    };
    reader.readAsText(file);
  }
}

function generateRecommendations(dnaData) {
  const recommendationsDiv = document.getElementById('recommendations');
  recommendationsDiv.innerHTML = `
    <h2>Personalized Recommendations</h2>
    <ul>
      ${Object.keys(dnaData).map(key => `
        <li>${dnaData[key].trait}: ${getRecommendation(dnaData[key].genotype)}</li>
      `).join('')}
    </ul>
  `;
}

function getRecommendation(genotype) {
  const recommendations = {
    "CT": "Consider a lactose-free diet.",
    "AA": "Ensure sufficient folate intake.",
    "GG": "Increase omega-3 fatty acids in your diet.",
    "CC": "Monitor triglyceride levels.",
    "TT": "Maintain a balanced diet and regular exercise."
  };
  return recommendations[genotype] || "General healthy diet and exercise.";
}

function drawDNAChart(dnaData) {
  const ctx = document.getElementById('dnaChart').getContext('2d');
  const chartData = {
    labels: Object.keys(dnaData).map(key => dnaData[key].gene),
    datasets: [{
      label: 'Genotype Frequency',
      data: Object.keys(dnaData).map(key => dnaData[key].genotype.length),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }]
  };

  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}
document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  const userName = document.getElementById('userName');

  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }

  if (userName) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userName.textContent = user.email;
      document.getElementById('profileEmail').value = user.email;
      document.getElementById('profilePassword').value = user.password;
    } else {
      window.location.href = 'login.html';
    }
  }
});

function handleProfileUpdate(event) {
  event.preventDefault();
  const email = document.getElementById('profileEmail').value;
  const password = document.getElementById('profilePassword').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Invalid email or password format.');
    return;
  }

  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Profile updated successfully.');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}
