// History

let history = [];

const savedHistory =
    localStorage.getItem(
        "licenseHistory"
    );

if (savedHistory) {

    history =
        JSON.parse(savedHistory);

}

// License Analysis

function analyzeLicenses() {

    const licenseNames = {

        "ENTERPRISEPACK":
            "Microsoft 365 E3",

        "SPE_E5":
            "Microsoft 365 E5",

        "EMSPREMIUM":
            "Enterprise Mobility + Security E5",

        "POWER_BI_PRO":
            "Power BI Pro"

    };

    const input =
        document
            .getElementById(
                "licenseInput"
            )
            .value;

    const results =
        document
            .getElementById(
                "results"
            );

    results.innerHTML = "";

    let licenses;

    let totalUsage = 0;

    let criticalCount = 0;

    try {

        licenses =
            JSON.parse(input);

    } catch {

        results.innerHTML =
            `
            <div class="card">
                Invalid JSON
            </div>
            `;

        return;

    }

    licenses.forEach(license => {

        const assigned =
            license.consumedUnits;

        const enabled =
            license.prepaidUnits.enabled;

        const available =
            enabled - assigned;

        const usage =
            Math.round(
                (assigned / enabled) * 100
            );

        totalUsage += usage;

        let risk = "Healthy";

        if (usage >= 90) {

            risk = "Critical";

            criticalCount++;

        }
        else if (usage >= 75) {

            risk = "Warning";

        }

        const div =
            document.createElement(
                "div"
            );

        div.classList.add(
            "card"
        );

        div.innerHTML =
            `
            <h3>
                ${licenseNames[
                    license.skuPartNumber
                ] || license.skuPartNumber}
            </h3>

            <p>
                Assigned:
                ${assigned}
            </p>

            <p>
                Available:
                ${available}
            </p>

            <p>
                Usage:
                ${usage}%
            </p>

            <p>
                Risk:
                ${risk}
            </p>
            `;

        results.appendChild(div);

    });

    const averageUsage =
        Math.round(
            totalUsage /
            licenses.length
        );

    document.getElementById(
        "totalLicenses"
    ).textContent =
        licenses.length;

    document.getElementById(
        "averageUsage"
    ).textContent =
        averageUsage + "%";

    document.getElementById(
        "criticalCount"
    ).textContent =
        criticalCount;

    history.unshift({

        date:
            new Date()
                .toLocaleString(),

        totalLicenses:
            licenses.length,

        averageUsage:
            averageUsage,

        criticalCount:
            criticalCount

    });

    renderHistory();

}

// History

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
            `${item.date} | ` +
            `${item.totalLicenses} Licenses | ` +
            `Avg Usage: ${item.averageUsage}% | ` +
            `Critical: ${item.criticalCount}`;

        historyList.appendChild(li);

    });

    localStorage.setItem(
        "licenseHistory",
        JSON.stringify(history)
    );

}

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "licenseHistory"
    );

    renderHistory();

}

function exportCSV() {

    let csv =
        "Date,TotalLicenses,AverageUsage,CriticalLicenses\n";

    history.forEach(item => {

        csv +=
            `"${item.date}",` +
            `${item.totalLicenses},` +
            `${item.averageUsage},` +
            `${item.criticalCount}\n`;

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
        "m365-license-report.csv";

    a.click();

    URL.revokeObjectURL(
        url
    );

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

// Load History

renderHistory();