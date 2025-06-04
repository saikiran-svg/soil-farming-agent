document.addEventListener('DOMContentLoaded', () => {
  const soilForm = document.getElementById('soilForm');
  const resultArea = document.getElementById('resultArea');

  if (!soilForm || !resultArea) {
    console.error('Form or result area not found');
    return;
  }

  soilForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Form submitted'); // Debug log

    const moistureInput = document.getElementById('moisture');
    const phInput = document.getElementById('phlevel');
    const textureInput = document.getElementById('texture');

    const moisture = parseFloat(moistureInput.value);
    const ph = parseFloat(phInput.value);
    const texture = textureInput.value;

    let messages = [];
    let hasIssues = false;

    console.log('Values:', { moisture, ph, texture }); // Debug log

    // Validate inputs
    if (isNaN(moisture) || isNaN(ph) || !texture) {
      console.log('Validation failed'); // Debug log
      resultArea.textContent = 'Please fill out all fields correctly.';
      resultArea.className = 'result error';
      return;
    }

    // Additional validation
    if (moisture < 0 || moisture > 100) {
      resultArea.textContent = 'Soil moisture must be between 0% and 100%.';
      resultArea.className = 'result error';
      return;
    }

    if (ph < 3.5 || ph > 9) {
      resultArea.textContent = 'Soil pH must be between 3.5 and 9.0.';
      resultArea.className = 'result error';
      return;
    }

    // Moisture assessment
    if (moisture < 10) {
      messages.push('🚨 Soil moisture is very low (' + moisture.toFixed(1) + '%); irrigation is needed.');
      hasIssues = true;
    } else if (moisture >= 10 && moisture <= 40) {
      messages.push('✅ Soil moisture is within a healthy range (' + moisture.toFixed(1) + '%).');
    } else {
      messages.push('⚠ Soil moisture is high (' + moisture.toFixed(1) + '%); watch out for waterlogging.');
      hasIssues = true;
    }

    // pH assessment
    if (ph < 5.5) {
      messages.push('🔬 Soil is acidic (pH ' + ph.toFixed(1) + '); consider adding lime to raise pH.');
      hasIssues = true;
    } else if (ph >= 5.5 && ph <= 7.5) {
      messages.push('✅ Soil pH is optimal for most crops (pH ' + ph.toFixed(1) + ').');
    } else {
      messages.push('🔬 Soil is alkaline (pH ' + ph.toFixed(1) + '); you might need to add sulfur or acidifying amendments.');
      hasIssues = true;
    }

    // Texture assessment
    switch (texture) {
      case 'sandy':
        messages.push('🏖 Sandy soil drains quickly but holds fewer nutrients. Consider adding organic matter.');
        break;
      case 'loamy':
        messages.push('🌱 Excellent! Loamy soil is ideal, balancing moisture retention and drainage.');
        break;
      case 'clayey':
        messages.push('🧱 Clayey soil retains water and nutrients well but may cause drainage issues.');
        break;
      case 'silty':
        messages.push('🌾 Silty soil retains nutrients well but can be compacted easily. Avoid working when wet.');
        break;
      default:
        messages.push('Please select a valid soil texture.');
        hasIssues = true;
    }

    // Overall assessment
    if (!hasIssues && texture === 'loamy') {
      messages.push('\n🎉 Overall: Your soil conditions are excellent for most plants!');
    } else if (!hasIssues) {
      messages.push('\n👍 Overall: Your soil conditions are good with minor considerations.');
    } else {
      messages.push('\n📝 Overall: Your soil needs some attention. Address the issues above for better plant health.');
    }

    console.log('Final result:', messages.join('\n\n')); // Debug log
    resultArea.textContent = messages.join('\n\n');
    resultArea.className = hasIssues ? 'result' : 'result success';
  });

  // Add click event as backup
  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function (e) {
      console.log('Button clicked directly');
      // The form submit event should handle this, but this is a backup
      if (e.target.form) {
        e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  }
});
