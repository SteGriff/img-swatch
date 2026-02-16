// Quick test script for the endpoints
const PORT = process.env.PORT || 3003;
const testUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Yellow_warbler_%2882905%29.jpg/960px-Yellow_warbler_%2882905%29.jpg';
const encodedUrl = encodeURIComponent(testUrl);

async function testProxy() {
  console.log('\n🧪 Testing proxy endpoint...');
  try {
    const response = await fetch(`http://localhost:${PORT}/api/proxy/${encodedUrl}`);
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('CORS:', response.headers.get('access-control-allow-origin'));
    
    const buffer = await response.arrayBuffer();
    console.log('Image size:', buffer.byteLength, 'bytes');
    console.log('✅ Proxy endpoint works!');
    return true;
  } catch (err) {
    console.error('❌ Proxy endpoint failed:', err.message);
    return false;
  }
}

async function testAPI() {
  console.log('\n🧪 Testing API endpoint...');
  try {
    const response = await fetch(`http://localhost:${PORT}/api/${encodedUrl}?n=5`);
    console.log('Status:', response.status);
    
    const data = await response.json();
    console.log('Colors returned:', data.length);
    console.log('Sample color:', data[0]);
    console.log('✅ API endpoint works!');
    return true;
  } catch (err) {
    console.error('❌ API endpoint failed:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting tests on port', PORT);
  console.log('Test URL:', testUrl);
  
  const proxyOk = await testProxy();
  const apiOk = await testAPI();
  
  console.log('\n📊 Results:');
  console.log('  Proxy:', proxyOk ? '✅' : '❌');
  console.log('  API:', apiOk ? '✅' : '❌');
  
  process.exit(proxyOk && apiOk ? 0 : 1);
}

// Give server time to start if just launched
setTimeout(runTests, 2000);
