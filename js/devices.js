const DEVICES = {
    apple: {
        label: 'Apple',
        devices: [
            { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', width: 1290, height: 2796, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-15-pro', name: 'iPhone 15 Pro', width: 1179, height: 2556, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-15-plus', name: 'iPhone 15 Plus', width: 1290, height: 2796, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-15', name: 'iPhone 15', width: 1179, height: 2556, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', width: 1290, height: 2796, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-14-pro', name: 'iPhone 14 Pro', width: 1179, height: 2556, safeZoneTop: 120, safeZoneBottom: 34 },
            { id: 'iphone-14-plus', name: 'iPhone 14 Plus', width: 1284, height: 2778, safeZoneTop: 88, safeZoneBottom: 34 },
            { id: 'iphone-14', name: 'iPhone 14', width: 1170, height: 2532, safeZoneTop: 88, safeZoneBottom: 34 },
            { id: 'iphone-se', name: 'iPhone SE', width: 750, height: 1334, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'ipad-pro-129', name: 'iPad Pro 12.9"', width: 2048, height: 2732, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'ipad-pro-11', name: 'iPad Pro 11"', width: 1668, height: 2388, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'ipad-air', name: 'iPad Air', width: 1640, height: 2360, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'ipad-mini', name: 'iPad Mini', width: 1488, height: 2266, safeZoneTop: 40, safeZoneBottom: 0 },
        ]
    },
    samsung: {
        label: 'Samsung',
        devices: [
            { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', width: 1440, height: 3120, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-s24-plus', name: 'Galaxy S24+', width: 1440, height: 3120, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-s24', name: 'Galaxy S24', width: 1080, height: 2340, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra', width: 1440, height: 3088, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-s23', name: 'Galaxy S23', width: 1080, height: 2340, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-a54', name: 'Galaxy A54', width: 1080, height: 2340, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-a34', name: 'Galaxy A34', width: 1080, height: 2340, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'galaxy-tab-s9', name: 'Galaxy Tab S9', width: 1600, height: 2560, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'galaxy-tab-s9-plus', name: 'Galaxy Tab S9+', width: 1752, height: 2800, safeZoneTop: 40, safeZoneBottom: 0 },
        ]
    },
    google: {
        label: 'Google',
        devices: [
            { id: 'pixel-8-pro', name: 'Pixel 8 Pro', width: 1344, height: 2992, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-8', name: 'Pixel 8', width: 1080, height: 2400, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-7-pro', name: 'Pixel 7 Pro', width: 1440, height: 3120, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-7', name: 'Pixel 7', width: 1080, height: 2400, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-7a', name: 'Pixel 7a', width: 1080, height: 2400, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-6-pro', name: 'Pixel 6 Pro', width: 1440, height: 3120, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-6', name: 'Pixel 6', width: 1080, height: 2400, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'pixel-tablet', name: 'Pixel Tablet', width: 1600, height: 2560, safeZoneTop: 40, safeZoneBottom: 0 },
        ]
    },
    generic: {
        label: 'Generic',
        devices: [
            { id: 'fhd-plus', name: 'FHD+ (1080x2400)', width: 1080, height: 2400, safeZoneTop: 60, safeZoneBottom: 0 },
            { id: 'fhd', name: 'FHD (1080x1920)', width: 1080, height: 1920, safeZoneTop: 48, safeZoneBottom: 0 },
            { id: 'qhd-plus', name: 'QHD+ (1440x3200)', width: 1440, height: 3200, safeZoneTop: 80, safeZoneBottom: 0 },
            { id: 'qhd', name: 'QHD (1440x2560)', width: 1440, height: 2560, safeZoneTop: 60, safeZoneBottom: 0 },
            { id: 'hd', name: 'HD (720x1280)', width: 720, height: 1280, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'tablet-10', name: 'Tablet 10" (1200x1920)', width: 1200, height: 1920, safeZoneTop: 40, safeZoneBottom: 0 },
            { id: 'tablet-8', name: 'Tablet 8" (800x1280)', width: 800, height: 1280, safeZoneTop: 40, safeZoneBottom: 0 },
        ]
    }
};

function getDeviceById(deviceId) {
    for (const group of Object.values(DEVICES)) {
        const device = group.devices.find(d => d.id === deviceId);
        if (device) return device;
    }
    return null;
}

function getAllDevicesFlat() {
    const devices = [];
    for (const group of Object.values(DEVICES)) {
        devices.push(...group.devices);
    }
    return devices;
}
