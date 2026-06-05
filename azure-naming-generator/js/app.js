// History Array
let history = [];

const savedHistory =
    localStorage.getItem("history");

if (savedHistory) {

    history = JSON.parse(savedHistory);

}

function validateName(
    resourceType,
    generatedName
) {

    if (
        resourceType === "st" &&
        generatedName.length > 24
    ) {

        alert(
            "Storage Account names must be 24 characters or less"
        );

        return false;

    }

    return true;

}

function generateName() {

    const application =
        document
            .getElementById("application")
            .value
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .trim();

    const environment =
        document
            .getElementById("environment")
            .value;

    const region =
        document
            .getElementById("region")
            .value;

    const resourceType =
        document
            .getElementById("resourceType")
            .value;

    const generatedName =
        resourceType +
        application +
        environment +
        region +
        "01";

    // Validate HERE
    if (
        !validateName(
            resourceType,
            generatedName
        )
    ) {
        return;
    }

    document
        .getElementById("result")
        .value =
        generatedName;

    history.unshift(
        generatedName
    );

    renderHistory();

}

function copyName() {

    const result =
        document.getElementById("result");

    navigator.clipboard.writeText(
        result.value
    );

    alert("Name copied to clipboard!");

}

function renderHistory() {

    const historyList =
        document.getElementById(
            "historyList"
        );

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}

// Load history when page opens
renderHistory();

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "history"
    );

    renderHistory();

}

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

function exportCSV() {

    let csv =
        "GeneratedName\n";

    history.forEach(item => {

        csv += item + "\n";

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
        document.createElement("a");

    a.href = url;

    a.download =
        "azure-names.csv";

    a.click();

    URL.revokeObjectURL(
        url
    );

}