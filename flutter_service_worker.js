'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "10167d4631732b485c81c4d26d98e330",
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
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "7495537b0a71d77059ec962d870a3d8f",
"favicon.png": "4c4d18f10ca416befdf584f966a59b8d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "730090c6c55ce1dd30d6994d8a3f7c4a",
"/": "730090c6c55ce1dd30d6994d8a3f7c4a",
"main.dart.js": "73a187aa106d48fa4556e45e0f591d9c",
"main.dart.js_1.part.js": "a72bcaa59c3c8c81c5f38dc195240d67",
"main.dart.js_10.part.js": "071e7e494058e3359d0b07d985aecdd1",
"main.dart.js_11.part.js": "b4638b89bc8ad4ce0e954af54f1f35d7",
"main.dart.js_2.part.js": "2426495b848742d4edbb4bb0f3aab5ca",
"main.dart.js_3.part.js": "a0101dabca86a362fe98aceef17ac439",
"main.dart.js_4.part.js": "141158ac49dca53e714b1c905c1a7dae",
"main.dart.js_5.part.js": "3d226d300e143607f5cd01e62bfaf5c9",
"main.dart.js_6.part.js": "a580f829c51fec8a1d08321c266ea776",
"main.dart.js_7.part.js": "e98ed4bef788729297117997d92b743f",
"main.dart.js_8.part.js": "abac8e32aa96a369efd9fd359e751eff",
"main.dart.js_9.part.js": "225c8864433f9bbd9bada22de181c543",
"manifest.json": "a9a6fc8d1fe311548f76cb15ce98b711",
"style.css": "06d959574656848dc02e6a08f5c68d7e",
"version.json": "be4e7a1f06d1da23c4135387c010b4ec"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
