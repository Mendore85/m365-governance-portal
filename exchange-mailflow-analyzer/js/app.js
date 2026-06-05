function analyzeMailFlow() {

    const input =
        document
            .getElementById(
                "errorInput"
            )
            .value
            .toLowerCase();

    const results =
        document
            .getElementById(
                "results"
            );

    results.innerHTML = "";

    let analysis = {

        issue:
            "Unknown Issue",

        checks: [],

        powershell: [],

        severity:
            "Medium"

    };

    if (
        input.includes("550 5.7.1")
    ) {

        analysis = {

            issue:
                "Mail blocked or access denied",

            checks: [

                "Check Exchange transport rules",

                "Review Defender quarantine",

                "Verify allow/block lists",

                "Review anti-spam policies"

            ],

            powershell: [

                "Get-TransportRule",

                "Get-MessageTrace",

                "Get-HostedContentFilterPolicy"

            ],

            severity:
                "High"

        };

    }

    else if (
        input.includes("554 5.4.14")
    ) {

        analysis = {

            issue:
                "Hop count exceeded or mail loop detected",

            checks: [

                "Review mail connectors",

                "Inspect forwarding rules",

                "Check hybrid routing",

                "Review accepted domains"

            ],

            powershell: [

                "Get-InboundConnector",

                "Get-OutboundConnector",

                "Get-AcceptedDomain"

            ],

            severity:
                "Critical"

        };

    }

    results.innerHTML =
        `
        <div class="card">

            <h2>
                ${analysis.issue}
            </h2>

            <br>

            <p>
                <strong>
                    Severity:
                </strong>

                ${analysis.severity}
            </p>

            <br>

            <h3>
                Recommended Checks
            </h3>

            <ul>
                ${analysis.checks
                    .map(
                        item =>
                        `<li>${item}</li>`
                    )
                    .join("")}
            </ul>

            <br>

            <h3>
                Suggested PowerShell
            </h3>

            <ul>
                ${analysis.powershell
                    .map(
                        cmd =>
                        `<li>${cmd}</li>`
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