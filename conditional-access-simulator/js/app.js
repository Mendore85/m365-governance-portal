function evaluateAccess() {

    const location =
        document
            .getElementById(
                "location"
            )
            .value;

    const device =
        document
            .getElementById(
                "device"
            )
            .value;

    const application =
        document
            .getElementById(
                "application"
            )
            .value;

    const results =
        document
            .getElementById(
                "results"
            );

    let policy =
        "Default Access Policy";

    let result =
        "Access Granted";

    let reason =
        "User meets access requirements";

    // Policy Logic

    if (
        device === "Personal"
    ) {

        policy =
            "Block unmanaged devices";

        result =
            "Access Denied";

        reason =
            "Personal device is not compliant";

    }

    if (
        location === "Russia"
    ) {

        policy =
            "Block risky countries";

        result =
            "Access Denied";

        reason =
            "Location blocked by policy";

    }

    results.innerHTML =
        `
        <div class="card">

            <h2>
                ${result}
            </h2>

            <br>

            <p>

                <strong>
                    Matched Policy:
                </strong>

                ${policy}

            </p>

            <br>

            <p>

                <strong>
                    Application:
                </strong>

                ${application}

            </p>

            <br>

            <p>

                <strong>
                    Reason:
                </strong>

                ${reason}

            </p>

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