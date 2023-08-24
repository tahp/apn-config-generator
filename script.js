
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('apnForm');
    const downloadLinkDiv = document.getElementById('downloadLink');
    const profileLink = document.getElementById('profileLink');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('/generate-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const xmlContent = await response.text();

            if (response.ok) {
                const blob = new Blob([xmlContent], { type: 'application/xml' });
                const url = URL.createObjectURL(blob);

                profileLink.href = url;
                downloadLinkDiv.style.display = 'block';
            } else {
                console.error("Server responded with status:", response.status);
                console.error("Server response:", xmlContent);
            }

        } catch (error) {
            console.error("There was an error:", error);
        }
    });
});
