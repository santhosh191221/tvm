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

    // --- Dynamic Traffic Elements ---
    const trafficStatusText = document.getElementById('traffic-status-text');
    const trafficDescription = document.getElementById('traffic-description');
    const trafficRoutesStatus = document.getElementById('traffic-routes-status');
    const trafficParkingStatus = document.getElementById('traffic-parking-status');

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
     * Updates the traffic advisory display.
     * @param {string} status - 'Normal', 'Moderate', or 'Heavy'.
     * @param {string} description - A short traffic summary.
     * @param {object} routes - Status and color for main routes.
     * @param {object} parking - Status and color for parking.
     */
    function updateTrafficStatus(status, description, routes, parking) {
        if (trafficStatusText && trafficDescription && trafficRoutesStatus && trafficParkingStatus) {
            // Update main status text and color
            trafficStatusText.textContent = status;
            trafficStatusText.className = 'tag'; // Reset
            if (status === 'Normal') trafficStatusText.classList.add('tag-green');
            else if (status === 'Moderate') trafficStatusText.classList.add('tag-yellow');
            else trafficStatusText.classList.add('tag-red'); // Assuming a 'tag-red' style exists

            // Update description
            trafficDescription.textContent = description;

            // Update routes status
            trafficRoutesStatus.textContent = routes.status;
            trafficRoutesStatus.className = `font-semibold ${routes.color}`;

            // Update parking status
            trafficParkingStatus.textContent = parking.status;
            trafficParkingStatus.className = `font-semibold ${parking.color}`;
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

    // --- Dynamic Data Simulation ---
    // Arrays of possible states to cycle through for a dynamic effect.
    const crowdStates = [
        { status: 'Low', percentage: 30 },
        { status: 'Moderate', percentage: 65 },
        { status: 'High', percentage: 90 },
        { status: 'Moderate', percentage: 55 }
    ];
    let currentCrowdIndex = 0;

    const weatherStates = [
        { status: 'Clear', icon: 'sun', tempHtml: '32°<span class="text-xl">/25°C</span>', description: 'Sunny, with light breeze.' },
        { status: 'Cloudy', icon: 'cloud', tempHtml: '28°<span class="text-xl">/22°C</span>', description: 'Partly cloudy skies.' },
        { status: 'Rainy', icon: 'cloud-rain', tempHtml: '26°<span class="text-xl">/21°C</span>', description: 'Light showers expected.' },
        { status: 'Clear', icon: 'moon', tempHtml: '24°<span class="text-xl">/20°C</span>', description: 'Clear night sky.' }
    ];
    let currentWeatherIndex = 0;

    const trafficStates = [
        { status: 'Normal', description: 'Smooth traffic flow around temple.', routes: { status: 'Clear', color: 'text-green-600' }, parking: { status: 'Available', color: 'text-green-600' } },
        { status: 'Moderate', description: 'Minor congestion on Girivalam path.', routes: { status: 'Busy', color: 'text-yellow-600' }, parking: { status: 'Limited', color: 'text-yellow-600' } },
        { status: 'Heavy', description: 'Heavy traffic due to evening rituals.', routes: { status: 'Congested', color: 'text-red-600' }, parking: { status: 'Full', color: 'text-red-600' } },
        { status: 'Normal', description: 'Traffic has eased after the main event.', routes: { status: 'Clear', color: 'text-green-600' }, parking: { status: 'Available', color: 'text-green-600' } }
    ];
    let currentTrafficIndex = 0;


    /**
     * Simulates a live update by cycling through predefined states.
     */
    function simulateLiveUpdates() {
        // Update Crowd Status
        const crowd = crowdStates[currentCrowdIndex];
        updateCrowdStatus(crowd.status, crowd.percentage);
        currentCrowdIndex = (currentCrowdIndex + 1) % crowdStates.length;

        // Update Weather
        const weather = weatherStates[currentWeatherIndex];
        updateWeather(weather.status, weather.icon, weather.tempHtml, weather.description);
        currentWeatherIndex = (currentWeatherIndex + 1) % weatherStates.length;

        // Update Traffic
        const traffic = trafficStates[currentTrafficIndex];
        updateTrafficStatus(traffic.status, traffic.description, traffic.routes, traffic.parking);
        currentTrafficIndex = (currentTrafficIndex + 1) % trafficStates.length;
    }

    // --- Initializations ---
    updateLiveDate(); // Set the date as soon as the page loads
    simulateLiveUpdates(); // Initial update on load
    setInterval(simulateLiveUpdates, 8000); // Re-run the simulation every 8 seconds

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
