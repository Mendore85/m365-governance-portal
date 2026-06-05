function generateScript() {

    const service =
        document
            .getElementById(
                "service"
            )
            .value;

    const task =
        document
            .getElementById(
                "task"
            )
            .value;

    const results =
        document
            .getElementById(
                "results"
            );

    let script =
        "# Script not available";

    // Exchange Online

    if (
        service === "Exchange" &&
        task === "Mailbox"
    ) {

        script =
`Connect-ExchangeOnline

Get-Mailbox |
Select DisplayName,
PrimarySmtpAddress`;

    }

    // Microsoft Graph

    else if (
        service === "Graph" &&
        task === "Users"
    ) {

        script =
`Connect-MgGraph

Get-MgUser`;

    }

    // SharePoint Online

    else if (
        service === "SharePoint" &&
        task === "Connect"
    ) {

        script =
`Connect-SPOService `
+
`-Url https://contoso-admin.sharepoint.com`;

    }

    // Azure

    else if (
        service === "Azure" &&
        task === "Groups"
    ) {

        script =
`Connect-AzAccount

Get-AzResourceGroup`;

    }

    results.innerHTML =
        `
        <div class="card">

            <h2>
                Generated Script
            </h2>

            <br>

            <pre>${script}</pre>

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