document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selection ---
    const toggleIngredientsBtn = document.getElementById('toggle-ingredients');
    const ingredientsList = document.getElementById('ingredients-list');
    
    const toggleStepsBtn = document.getElementById('toggle-steps');
    const stepsList = document.getElementById('steps-list');

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const instructions = document.querySelectorAll('#instructions-ol li');
    const progressBar = document.getElementById('progress-bar');
    
    let currentStep = -1;
    const totalSteps = instructions.length;

    // --- Toggle Visibility Functionality ---
    toggleIngredientsBtn.addEventListener('click', () => {
        ingredientsList.classList.toggle('show');
        toggleIngredientsBtn.textContent = ingredientsList.classList.contains('show') ? 'Hide' : 'Show';
    });

    toggleStepsBtn.addEventListener('click', () => {
        stepsList.classList.toggle('show');
        toggleStepsBtn.textContent = stepsList.classList.contains('show') ? 'Hide' : 'Show';
    });

    // --- "Start Cooking" Functionality ---
    startBtn.addEventListener('click', () => {
        // Automatically expand the steps if they are collapsed
        if (!stepsList.classList.contains('show')) {
            stepsList.classList.add('show');
            toggleStepsBtn.textContent = 'Hide';
        }

        startBtn.style.display = 'none';
        nextBtn.style.display = 'inline-block';
        currentStep = 0;
        highlightCurrentStep();
        updateProgressBar();
    });

    // --- "Next Step" Functionality ---
    nextBtn.addEventListener('click', () => {
        currentStep++;
        if (currentStep < totalSteps) {
            highlightCurrentStep();
            updateProgressBar();
        } else {
            // Recipe is finished
            alert('Congratulations! You have finished the recipe. 🍰');
            resetCooking();
        }
    });

    // --- Helper Functions ---
    function highlightCurrentStep() {
        // Remove highlight from all steps
        instructions.forEach(step => {
            step.classList.remove('highlighted-step');
        });
        
        // Add highlight to the current step
        if (currentStep >= 0 && currentStep < totalSteps) {
            instructions[currentStep].classList.add('highlighted-step');
        }
    }

    function updateProgressBar() {
        const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    function resetCooking() {
        currentStep = -1;
        instructions.forEach(step => step.classList.remove('highlighted-step'));
        progressBar.style.width = '0%';
        startBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
    }
});