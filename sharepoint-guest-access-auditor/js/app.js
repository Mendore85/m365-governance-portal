function auditSharing() {

    const input =
        document
            .getElementById(
                "configInput"
            )
            .value;

    const results =
        document
            .getElementById(
                "results"
            );

    results.innerHTML = "";

    let config;

    try {

        config =
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

    let issues = [];

    let recommendations = [];

    let risk = "Low";

    if (
        config.SharingCapability ===
        "ExternalUserAndGuestSharing"
    ) {

        issues.push(
            "External sharing unrestricted"
        );

        recommendations.push(
            "Restrict external sharing"
        );

        risk = "Medium";

    }

    if (
        config.AnonymousLinksEnabled
    ) {

        issues.push(
            "Anonymous links enabled"
        );

        recommendations.push(
            "Disable Anyone links"
        );

        risk = "High";

    }

    if (
        config.GuestUsers > 100
    ) {

        issues.push(
            "High number of guest users"
        );

        recommendations.push(
            "Review guest accounts"
        );

        risk = "High";

    }

    results.innerHTML =
        `
        <div class="card">

            <h2>
                Risk Level:
                ${risk}
            </h2>

            <br>

            <h3>
                Issues
            </h3>

            <ul>
                ${issues
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ul>

            <br>

            <h3>
                Recommendations
            </h3>

            <ul>
                ${recommendations
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ul>

        </div>
        `;

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