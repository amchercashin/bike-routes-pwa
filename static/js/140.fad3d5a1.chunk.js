"use strict";(self.webpackChunkbike_routes_pwa=self.webpackChunkbike_routes_pwa||[]).push([[140],{899:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var o=n(43),r=n(216),s=n(475),i=n(896),a=n(419),c=n(23),l=n(30),u=n(36),d=n(318),p=n(228),g=n.n(p),h=(n(433),n(247)),f=n(579);const m=new(g().Icon)({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});function x(e){let{bounds:t}=e;const n=(0,i.ko)();return o.useEffect((()=>{t&&n.fitBounds(t)}),[n,t]),null}function w(e){let{isFullscreen:t,toggleFullscreen:n}=e;const r=(0,i.Po)({});return(0,o.useEffect)((()=>{t&&r.invalidateSize()}),[t,r]),(0,f.jsx)("div",{className:"leaflet-top leaflet-right",children:(0,f.jsx)("div",{className:"leaflet-control leaflet-bar",children:(0,f.jsx)("button",{onClick:n,title:t?"Exit Fullscreen":"Enter Fullscreen",className:"fullscreen-button","aria-label":t?"Exit Fullscreen":"Enter Fullscreen",children:t?(0,f.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,f.jsx)("path",{d:"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"})}):(0,f.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,f.jsx)("path",{d:"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"})})})})})}function j(e){let{getLocation:t,isTracking:n,toggleTracking:o}=e;return(0,f.jsx)("div",{className:"leaflet-bottom leaflet-left",children:(0,f.jsxs)("div",{className:"leaflet-control leaflet-bar geolocation-controls",children:[(0,f.jsx)("button",{onClick:t,children:"\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"}),(0,f.jsxs)("label",{children:[(0,f.jsx)("input",{type:"checkbox",checked:n,onChange:o}),"\u041e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0442\u044c \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"]})]})})}const v=function(e){let{route:t,isOffline:n}=e;const[r,s]=(0,o.useState)(!1),{position:i,lastKnownPosition:p,heading:v,isTracking:b,getLocation:y,toggleTracking:k}=(0,h.V)(),S=(0,o.useCallback)((()=>{s((e=>!e))}),[]),{bounds:E,routeLines:L,routePoints:N}=(0,o.useMemo)((()=>{if(!t||!t.lines&&!t.points)return{bounds:null,routeLines:[],routePoints:[]};const e=[...t.lines?t.lines.flat():[],...t.points?t.points.map((e=>e.coordinates)):[]];let n=g().latLngBounds(e.map((e=>{let[t,n]=e;return[n,t]})));return i?n.extend([i.latitude,i.longitude]):p&&n.extend([p.latitude,p.longitude]),{bounds:n,routeLines:t.lines||[],routePoints:t.points||[]}}),[t,i,p]);if(!E)return null;const F=e=>g().divIcon({className:"location-arrow",html:'<div style="transform: rotate('.concat(v||0,"deg); color: ").concat(e,'; font-size: 16px;">\u27a4</div>'),iconSize:[24,24],iconAnchor:[12,12]}),P=F("red"),M=F("black"),C=E.getCenter();return(0,f.jsxs)("div",{className:"map-container ".concat(r?"fullscreen":""),children:[(0,f.jsxs)(a.W,{center:C,zoom:12,style:{height:"100%",width:"100%"},children:[(0,f.jsx)(c.e,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),L.map(((e,t)=>(0,f.jsx)(l.R,{positions:e.map((e=>{let[t,n]=e;return[n,t]})),color:"blue"},"line-".concat(t)))),N.map(((e,t)=>(0,f.jsx)(u.p,{position:[e.coordinates[1],e.coordinates[0]],icon:m,children:(0,f.jsxs)(d.z,{children:[(0,f.jsx)("strong",{children:e.name}),e.description&&(0,f.jsx)("p",{children:e.description})]})},"point-".concat(t)))),b&&i&&(0,f.jsx)(u.p,{position:[i.latitude,i.longitude],icon:P,children:(0,f.jsx)(d.z,{children:"\u0412\u044b \u0437\u0434\u0435\u0441\u044c (\u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0435 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u043d\u0438\u0435)"})}),!b&&p&&(0,f.jsx)(u.p,{position:[p.latitude,p.longitude],icon:M,children:(0,f.jsx)(d.z,{children:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e\u0435 \u043c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"})}),(0,f.jsx)(x,{bounds:E}),(0,f.jsx)(w,{isFullscreen:r,toggleFullscreen:S}),(0,f.jsx)(j,{getLocation:y,isTracking:b,toggleTracking:k})]}),(0,f.jsx)("div",{className:"map-overlay",style:{position:"absolute",bottom:0,right:220,backgroundColor:"white",padding:"0 5px",fontSize:"12px",zIndex:1e3},children:"\ud83c\uddf7\ud83c\uddfa"}),n&&(0,f.jsx)("div",{className:"map-overlay",style:{position:"absolute",top:10,left:10,backgroundColor:"rgba(255, 255, 255, 0.8)",padding:"5px 10px",borderRadius:"5px",zIndex:1e3},children:"\u041e\u0444\u043b\u0430\u0439\u043d-\u0440\u0435\u0436\u0438\u043c: \u043a\u0430\u0440\u0442\u0430 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043d\u0435\u043f\u043e\u043b\u043d\u043e\u0439"})]})};var b=n(337),y=n(677);const k=function(){const{id:e}=(0,r.g)(),[t,n]=(0,o.useState)(null),[i,a]=(0,o.useState)(null),[c,l]=(0,o.useState)(!0),[u,d]=(0,o.useState)(!navigator.onLine),[p,g]=(0,o.useState)(!1);if((0,o.useEffect)((()=>{const e=()=>d(!1),t=()=>d(!0);return window.addEventListener("online",e),window.addEventListener("offline",t),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",t)}}),[]),(0,o.useEffect)((()=>{document.body.classList.toggle("fullscreen-active",p)}),[p]),(0,o.useEffect)((()=>{!async function(){try{l(!0);let t=await(0,b.aM)(e);if(!t||!u){const n=await fetch("".concat("/bike-routes-pwa","/data/routes/index.json")),o=(await n.json()).find((t=>t.id===e));if(!o)throw new Error("Route info not found");if(await(0,b.wp)(e).catch((()=>null))!==o.version){const n=await fetch("".concat("/bike-routes-pwa","/data/routes/").concat(e,".kml")),r=await n.blob();t=function(e){console.log("Extracting route from GeoJSON:",JSON.stringify(e,null,2));const t={name:"",description:"",lines:[],points:[]};if("FeatureCollection"===e.type){e.features.forEach((e=>{"Point"===e.geometry.type?t.points.push({name:e.properties.name||"",description:e.properties.description||"",coordinates:e.geometry.coordinates}):"LineString"===e.geometry.type?t.lines.push(e.geometry.coordinates):"MultiGeometry"!==e.geometry.type&&"GeometryCollection"!==e.geometry.type||e.geometry.geometries.forEach((e=>{"LineString"===e.type&&t.lines.push(e.coordinates)}))}));const n=e.features.find((e=>e.properties.name&&e.properties.description));n&&(t.name=n.properties.name,t.description=n.properties.description)}return console.log("Extracted route data:",t),t}(await async function(e){const t=await e.text();console.log("Raw KML content:",t.substring(0,500)+"...");const n=(new DOMParser).parseFromString(t,"text/xml");if(n.getElementsByTagName("parsererror").length>0)throw console.error("XML parsing error:",n.getElementsByTagName("parsererror")[0].textContent),new Error("Failed to parse KML file");const o=(0,y.bW)(n);return console.log("Parsed GeoJSON:",JSON.stringify(o,null,2)),o}(new File([r],"".concat(e,".kml")))),t.id=e,t.version=o.version,await(0,b.Fq)(t).catch(console.error)}else t||(t=await(0,b.aM)(e))}n(t)}catch(i){console.error("Error loading route ".concat(e,":"),i),a("\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u0430: ".concat(i.message))}finally{l(!1)}}()}),[e,u]),c)return(0,f.jsx)("div",{children:"Loading..."});if(i)return(0,f.jsxs)("div",{children:["Error: ",i]});if(!t)return(0,f.jsx)("div",{children:"No route data available"});const h=e=>"string"===typeof e?e:e&&"object"===typeof e?"html"===e["@type"]&&e.value?(0,f.jsx)("div",{dangerouslySetInnerHTML:{__html:e.value}}):JSON.stringify(e):"";return(0,f.jsxs)("div",{className:p?"fullscreen-view":"",children:[!p&&(0,f.jsx)("h1",{children:h(t.name)}),!p&&h(t.description),(0,f.jsx)(v,{route:t,isOffline:u,isFullscreen:p,setIsFullscreen:g}),!p&&(0,f.jsx)(s.N_,{to:"/catalog",children:"\u041d\u0430\u0437\u0430\u0434 \u043a \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0443"}),u&&!p&&(0,f.jsx)("div",{children:"\u0412\u044b \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435\u0441\u044c \u0432 \u043e\u0444\u043b\u0430\u0439\u043d-\u0440\u0435\u0436\u0438\u043c\u0435. \u041d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b."})]})}},337:(e,t,n)=>{n.d(t,{Fq:()=>a,O5:()=>d,aM:()=>c,dt:()=>u,wp:()=>l});const o="BikeRoutesDB",r="routes",s="catalog";function i(){return new Promise(((e,t)=>{const n=indexedDB.open(o,8);n.onerror=e=>{console.error("Database error: "+e.target.error),t("Error opening DB: "+e.target.error)},n.onsuccess=t=>{e(t.target.result)},n.onupgradeneeded=e=>{const t=e.target.result;if(!t.objectStoreNames.contains(r)){t.createObjectStore(r,{keyPath:"id"}).createIndex("version","version",{unique:!1})}t.objectStoreNames.contains(s)||t.createObjectStore(s,{keyPath:"id"})}}))}function a(e){return new Promise(((t,n)=>{i().then((o=>{const s=o.transaction(r,"readwrite").objectStore(r).put(e);s.onerror=()=>n("Error saving route"),s.onsuccess=()=>t()})).catch(n)}))}function c(e){return new Promise(((t,n)=>{i().then((o=>{const s=o.transaction(r,"readonly").objectStore(r).get(e);s.onerror=()=>n("Error getting route"),s.onsuccess=()=>t(s.result)})).catch(n)}))}function l(e){return new Promise(((t,n)=>{i().then((o=>{const s=o.transaction(r,"readonly").objectStore(r).get(e);s.onerror=()=>n("Error getting route version"),s.onsuccess=()=>t(s.result?s.result.version:null)})).catch(n)}))}function u(e){return new Promise(((t,n)=>{i().then((o=>{const r=o.transaction(s,"readwrite").objectStore(s).put({id:"main",data:e});r.onerror=()=>n("Error saving catalog"),r.onsuccess=()=>t()})).catch(n)}))}function d(){return new Promise(((e,t)=>{i().then((n=>{const o=n.transaction(s,"readonly").objectStore(s).get("main");o.onerror=()=>t("Error getting catalog"),o.onsuccess=()=>e(o.result?o.result.data:null)})).catch(t)}))}}}]);
//# sourceMappingURL=140.fad3d5a1.chunk.js.map