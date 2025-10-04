document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Crowd Status Elements ---
    const crowdStatusText = document.getElementById('crowd-status-text');
    const crowdProgressBar = document.getElementById('crowd-progress-bar');
    const crowdPercentage = document.getElementById('crowd-percentage');

    // --- Dynamic Weather Elements ---
    const weatherStatus = document.getElementById('weather-status');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDescription = document.getElementById('weather-description');

    // --- Dynamic Date Element ---
    const liveDateElement = document.getElementById('live-date');

    /**
     * Updates the crowd status display.
     * @param {string} status - 'Low', 'Moderate', or 'High'.
     * @param {number} percentage - A number from 0 to 100.
     */
    function updateCrowdStatus(status, percentage) {
        if (crowdStatusText && crowdProgressBar && crowdPercentage) {
            crowdStatusText.textContent = status;
            // Reset classes and add the correct one based on status
            crowdStatusText.className = 'tag';
            if (status === 'Low') {
                crowdStatusText.classList.add('tag-green');
            } else if (status === 'Moderate') {
                crowdStatusText.classList.add('tag-yellow');
            } else { // High
                crowdStatusText.classList.add('tag-red'); // Assuming you might add a tag-red style
            }

            crowdProgressBar.style.width = `${percentage}%`;
            crowdPercentage.textContent = `${percentage}%`;
        }
    }

    /**
     * Updates the weather display.
     * @param {string} status - e.g., 'Cloudy', 'Rainy'.
     * @param {string} icon - The name of the lucide icon (e.g., 'cloud', 'cloud-rain').
     * @param {string} tempHtml - The HTML for the temperature display.
     * @param {string} description - A short weather description.
     */
    function updateWeather(status, icon, tempHtml, description) {
        if (weatherStatus && weatherIcon && weatherTemp && weatherDescription) {
            weatherStatus.textContent = status;
            // Reset classes and add the correct one
            weatherStatus.className = 'tag';
            if (status === 'Clear') {
                weatherStatus.classList.add('tag-green');
            } else {
                weatherStatus.classList.add('tag-blue');
            }

            weatherIcon.setAttribute('data-lucide', icon);
            // We need to re-run createIcons to render the new icon
            lucide.createIcons();

            weatherTemp.innerHTML = tempHtml;
            weatherDescription.textContent = description;
        }
    }

    /**
     * Updates the live date display with the current date.
     */
    function updateLiveDate() {
        if (liveDateElement) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            // Using 'en-GB' for a day-month-year format which is common in India.
            liveDateElement.textContent = now.toLocaleDateString('en-GB', options);
        }
    }

    // --- Example Usage ---
    // This is where you would fetch real data.
    // For now, we'll just simulate updating the values after a few seconds.

    setTimeout(() => {
        // Example: Update crowd status to "High"
        updateCrowdStatus('High', 85);

        // Example: Update weather to "Cloudy"
        updateWeather('Cloudy', 'cloud', '28°<span class="text-xl">/22°C</span>', 'Partly cloudy with a chance of rain.');

    }, 5000); // Update after 5 seconds

    // --- Initializations ---
    updateLiveDate(); // Set the date as soon as the page loads

    // --- Map Zoom Controls ---
    const mapIframe = document.getElementById('location-map-iframe');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');

    function changeMapZoom(direction) {
        if (!mapIframe) return;

        try {
            const url = new URL(mapIframe.src);
            const params = url.searchParams;
            let currentZoom = parseInt(params.get('z'), 10);

            if (!isNaN(currentZoom)) {
                const newZoom = Math.max(1, Math.min(21, currentZoom + direction)); // Clamp zoom between 1 and 21
                params.set('z', newZoom);
                mapIframe.src = url.toString();
            }
        } catch (error) {
            console.error("Error changing map zoom:", error);
        }
    }
    if(zoomInBtn) zoomInBtn.addEventListener('click', () => changeMapZoom(1));
    if(zoomOutBtn) zoomOutBtn.addEventListener('click', () => changeMapZoom(-1));
});
