
const stampGrid = document.getElementById("stamp-grid");
const progress = document.getElementById("progress");
const resetButton = document.getElementById("reset-button");
const progressFill = document.getElementById("progress-fill");

// 1. Load previously completed days from Local Storage
let completedDays = JSON.parse(
    localStorage.getItem("completedDays")
) || [];

// 2. Save completed days to Local Storage
function saveProgress() {
    localStorage.setItem(
        "completedDays",
        JSON.stringify(completedDays)
    );
}

// 3. Update the progress counter
function updateProgress() {

    const totalCompleted = completedDays.length;

    const percentage = (totalCompleted / 30) * 100;

    progress.textContent =
        totalCompleted + " / 30 days completed";

    progressFill.style.width = percentage + "%";
}


function showSeal(stamp) {

    const sealImage = document.createElement("img");

    sealImage.src = "images/seal.png";
    sealImage.alt = "seal face";

    stamp.replaceChildren(sealImage);
}

// 4. Create the 30 stamp boxes
for (let day = 1; day <= 30; day++) {

    const stamp = document.createElement("button");

    stamp.classList.add("stamp");
    stamp.type = "button";
    stamp.dataset.day = day;

    // Check whether this day was previously completed
    if (completedDays.includes(day)) {
        showSeal(stamp);
        stamp.disabled = true;
        stamp.classList.add("completed");
    } else {
        stamp.textContent = day;
    }

    // 5. Detect when a stamp is clicked
    stamp.addEventListener("click", function () {

        if (stamp.disabled) {
            return;
        }

        showSeal(stamp);
        stamp.disabled = true;
        stamp.classList.add("completed");

        // Add the completed day to our list
        completedDays.push(day);

        // Save the updated list
        saveProgress();

        // Update the progress counter
        updateProgress();
    });

    stampGrid.appendChild(stamp);
}

// 6. Reset all stamps
resetButton.addEventListener("click", function () {

    if (!confirm("Are you sure you want to reset all 30 stamps?")) {
    return;
}
    const stamps = stampGrid.querySelectorAll(".stamp");

    stamps.forEach(function (stamp) {

        stamp.textContent = stamp.dataset.day;
        stamp.disabled = false;
        stamp.classList.remove("completed");

    });

    // Clear the completed days list
    completedDays = [];

    // Remove saved progress from Local Storage
    localStorage.removeItem("completedDays");

    // Update the progress counter
    updateProgress();
});

// 7. Display the saved progress
updateProgress();
