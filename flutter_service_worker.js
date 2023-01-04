'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "915bddd1f1b6dd57e307adcb8c6b37fa",
"assets/assets/images/cc.png": "5a1a7772fe184bc3018fd61cecf3f128",
"assets/assets/images/coal.png": "50efa41c3965aafb11d68f3eb67e0ada",
"assets/assets/images/CPU.png": "0d0a74eae8704f88904bd7fdfcfec1cd",
"assets/assets/images/credit.png": "1883f29d4be880af49fde9fc10654597",
"assets/assets/images/ddos.png": "c2bff8cb3fafbc9387b81c74789d2edd",
"assets/assets/images/diamond.png": "17b8ffdf93c238687c42cc6a76f638b5",
"assets/assets/images/emerald.png": "c17b6ef8ae0ce9cdb59f5345b8ebd5df",
"assets/assets/images/ethernet.png": "768c9bf25700cd248b6b1d95b611693c",
"assets/assets/images/france.png": "f32fa43e07d99c1098b8ed4a0bcffad5",
"assets/assets/images/ftp.png": "5df818e96af79763eac0ad67777ec929",
"assets/assets/images/germany.png": "aa14499703bbc52bff3fc44b6cfb1724",
"assets/assets/images/gold.png": "67d1c84c7ef6f2e4b46728b6a19c08fe",
"assets/assets/images/greece.png": "0ca11ccfa204d906dce8c6648525a810",
"assets/assets/images/iron.png": "e9172fb2474834634f02bc704ea1ef13",
"assets/assets/images/lapis.png": "90f05e86b219784899780d2eea2693fb",
"assets/assets/images/location.jpg": "6557533f19b5c4bfc3739d2951bcbf43",
"assets/assets/images/logo-full.png": "a1bdca1faf94275235a2071f6d99a53f",
"assets/assets/images/netherlands.png": "f1a4235dfbd1d27466369e2605d2009e",
"assets/assets/images/north%2520america.png": "760554e76a2d94a45a9c7b7f7abb057e",
"assets/assets/images/play.jpg": "46d0727f7117c7f446bfd442f2c14ca7",
"assets/assets/images/pp.png": "2adb69dada0d9b4ba457cd586b971a06",
"assets/assets/images/price.jpg": "05396d5dd3a59a9032944c0bda442229",
"assets/assets/images/redstone.png": "a2cfe3d5692b385105f38e5afb7c3270",
"assets/assets/images/social-facebook.png": "eebbc8ca1a482f43e2e122a21e324fe9",
"assets/assets/images/social-google.png": "6ca54d2a588f8ecb2f1db4a05e92f84a",
"assets/assets/images/stone.png": "f445768df5fb9092882c815743d8e92f",
"assets/assets/images/support.png": "4e20524fe71dc803b8e88800ff4f8f51",
"assets/assets/images/sweden.png": "d8a7dc2d830fdbf63bac610d714c4a78",
"assets/assets/images/united%2520kindom.png": "0ff5d3a1089bf8d541aff696391bef1b",
"assets/assets/images/unlimited.png": "901ad6cea31267b50f3da8f166490c44",
"assets/assets/images/wallpaper.jpg": "654ef942a107be84a17e6dc8296f324c",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "99c8d9cec6936a74c59584a4fa94442e",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "4c4d18f10ca416befdf584f966a59b8d",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "5e95797b2ef715e9fdf5a27a575f5136",
"/": "5e95797b2ef715e9fdf5a27a575f5136",
"main.dart.js": "ce338bd37e40e94d60f34f07da7ea5ef",
"manifest.json": "a9a6fc8d1fe311548f76cb15ce98b711",
"style.css": "1c4781bf6604b687320c4b0cdcca3ef9",
"version.json": "5ab905c7d4f26c8b56f55bb966102575"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
