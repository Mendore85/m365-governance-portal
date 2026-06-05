// History
let history = [];

const savedHistory =
    localStorage.getItem(
        "tagHistory"
    );

if (savedHistory) {

    history =
        JSON.parse(savedHistory);

}

function validateTags() {

    const tagsInput =
        document
            .getElementById(
                "tagsInput"
            )
            .value;

    const results =
        document.getElementById(
            "results"
        );

    results.innerHTML = "";

    let tags;

    try {

        tags =
            JSON.parse(tagsInput);

    } catch {

        results.innerHTML =
            `
            <div class="result-item error">
                Invalid JSON Format
            </div>
            `;

        return;

    }

    const requiredTags = [
        "Environment",
        "Owner",
        "CostCenter",
        "Application"

    ];

    let passed = 0;

    requiredTags.forEach(tag => {

        const div =
            document.createElement(
                "div"
            );

        div.classList.add(
            "result-item"
        );

        if (tags[tag]) {

            passed++;

            div.classList.add(
                "success"
            );

            div.textContent =
                `✅ ${tag} Found`;

        } else {

            div.classList.add(
                "error"
            );

            div.textContent =
                `❌ ${tag} Missing`;

        }

        results.appendChild(div);

    });

    const score =
    Math.round(
        (passed / requiredTags.length)
        * 100
    );

    document.getElementById(
    "scoreText"
    ).textContent =
    `Compliance Score: ${score}%`;

    document.getElementById(
    "progressFill"
    ).style.width =
    score + "%";

    history.unshift(tags);

    renderHistory();

    // Save validation history
    history.unshift(tags);

    renderHistory();

}

// Theme Toggle

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

if (
    localStorage.getItem(
        "theme"
    ) === "light"
) {

    document.body.classList.add(
        "light"
    );

}

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    }
);

// Render History

function renderHistory() {

    const historyList =
        document.getElementById(
            "historyList"
        );

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            JSON.stringify(item);

        historyList.appendChild(li);

    });

    localStorage.setItem(
        "tagHistory",
        JSON.stringify(history)
    );

}

// Clear History

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "tagHistory"
    );

    renderHistory();

}

// Load History on Startup

renderHistory();

function exportCSV() {

    let csv =
        "Environment,Owner,CostCenter,Application\n";

    history.forEach(item => {

        csv +=
            `${item.Environment || ""},` +
            `${item.Owner || ""},` +
            `${item.CostCenter || ""},` +
            `${item.Application || ""}\n`;

    });

    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "tag-validation-report.csv";

    a.click();

    URL.revokeObjectURL(
        url
    );

}