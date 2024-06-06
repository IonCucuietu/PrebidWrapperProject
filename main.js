import './style.css';
import './prebid-config.js';

console.log('main.js loaded');

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite</h1>
  <div id="test-div" style="width: 300px; height: 250px; border: 1px solid #000;"></div>
`;

console.log('HTML structure set');