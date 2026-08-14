[browser] Login failed FirebaseError: Firebase: Error (auth/popup-closed-by-user). (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/installHook.js:1:174822)
GET / 200 in 262ms (next.js: 11ms, application-code: 252ms)
[browser] CMS fetch failed for /globals/footer: Not Found
at fetchCMS (src/lib/cms.ts:15:15)
at async getCMSFooter (src/lib/cms.ts:56:16)
at async loadFooter (src/components/Footer.tsx:16:22)
13 |
14 | if (!res.ok) {

> 15 | console.error(`CMS fetch failed for ${path}: ${res.statusText}`)

     |               ^

16 | return null
17 | }
18 | (src/lib/cms.ts:15:15)
GET /api/globals/footer 404 in 270ms (next.js: 13ms, application-code: 258ms)
[browser] Login failed FirebaseError: Firebase: Error (auth/popup-closed-by-user). (src/components/Navbar.tsx:25:15)
