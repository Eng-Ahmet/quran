/* ====== QIBLA COMPASS & GEOLOCATION MODULE ====== */

let qiblaBearing = 0;

function calcularQibla(lat, lng) {
    const meccaLat = 21.422487;
    const meccaLng = 39.826206;
    const lat1 = lat * Math.PI / 180;
    const lat2 = meccaLat * Math.PI / 180;
    const dLng = (meccaLng - lng) * Math.PI / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let brng = Math.atan2(y, x) * 180 / Math.PI;
    return (brng + 360) % 360;
}

async function iniciarQibla() {
    const statusText = document.getElementById('qibla-status');
    const btnInit = document.getElementById('btn-init-qibla');
    const compassContainer = document.getElementById('compass-container');

    if (statusText) statusText.innerText = i18n[currentLang]['qibla_locating'] || "جاري تحديد الموقع...";

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission !== 'granted') {
                if (statusText) statusText.innerText = i18n[currentLang]['qibla_loc_error'] || "تم رفض الإذن.";
                return;
            }
        } catch (e) { console.log(e); }
    }

    if (!navigator.geolocation) {
        if (statusText) statusText.innerText = i18n[currentLang]['qibla_loc_error'] || "الموقع غير مدعوم.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            qiblaBearing = calcularQibla(lat, lng);

            if (btnInit) btnInit.style.display = 'none';
            if (compassContainer) compassContainer.style.display = 'block';
            if (statusText) statusText.innerText = i18n[currentLang]['qibla_success'] || "تم تحديد الموقع. قم بتدوير الهاتف نحو الكعبة المشرفة.";

            window.addEventListener('deviceorientationabsolute', handleOrientation);
            window.addEventListener('deviceorientation', handleOrientation);
        },
        (error) => {
            if (statusText) statusText.innerText = i18n[currentLang]['qibla_loc_error'] || "تعذر الحصول على الموقع.";
        },
        { enableHighAccuracy: true }
    );
}

function handleOrientation(event) {
    let compass = null;
    if (event.webkitCompassHeading) {
        compass = event.webkitCompassHeading;
    } else if (event.alpha != null) {
        compass = 360 - event.alpha;
    }

    if (compass == null) return;

    const compassDial = document.getElementById('compass-dial');
    const qiblaPointer = document.getElementById('qibla-pointer');
    const degreesText = document.getElementById('qibla-degrees');

    if (compassDial) compassDial.style.transform = `rotate(${-compass}deg)`;

    let pointerRotation = qiblaBearing - compass;
    if (qiblaPointer) qiblaPointer.style.transform = `rotate(${pointerRotation}deg)`;

    let degDisplay = Math.round(pointerRotation);
    if (degDisplay < 0) degDisplay += 360;
    if (degreesText) degreesText.innerText = degDisplay + "°";
}
