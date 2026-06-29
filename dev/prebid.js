const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text, timestamp: new Date().toISOString() });
    
    // Print to our console too
    if (text.includes('[Video Outstream]') || 
        text.includes('renderer') || 
        text.includes('outstream') || 
        text.includes('ANOutstreamVideo') || 
        text.includes('video')) {
      console.log(`[${type.toUpperCase()}] ${text}`);
    }
  });

  // Collect errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push({ message: error.message, stack: error.stack, timestamp: new Date().toISOString() });
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  page.on('requestfailed', request => {
    const failure = request.failure();
    if (failure) {
      console.log(`[REQUEST FAILED] ${request.url()} - ${failure.errorText}`);
    }
  });

  console.log('🌐 Navigating to https://soccerbros.gg/?pbjs_debug=true');
  await page.goto('https://soccerbros.gg/?pbjs_debug=true', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  console.log('⏳ Waiting 10 seconds for page to fully load...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Take initial screenshot
  console.log('📸 Taking full page screenshot...');
  await page.screenshot({ path: 'soccerbros_full_page.png', fullPage: true });

  // Check for asc-video-wrapper
  console.log('\n🔍 Checking for asc-video-wrapper div...');
  const videoWrapperInfo = await page.evaluate(() => {
    const wrapper = document.querySelector('.asc-video-wrapper');
    if (wrapper) {
      return {
        found: true,
        innerHTML: wrapper.innerHTML,
        outerHTML: wrapper.outerHTML.substring(0, 1000), // Limit size
        computedStyle: {
          display: window.getComputedStyle(wrapper).display,
          visibility: window.getComputedStyle(wrapper).visibility,
          width: window.getComputedStyle(wrapper).width,
          height: window.getComputedStyle(wrapper).height,
        },
        boundingRect: wrapper.getBoundingClientRect()
      };
    }
    return { found: false };
  });

  console.log('Video Wrapper Info:', JSON.stringify(videoWrapperInfo, null, 2));

  // Check for video elements
  console.log('\n🎥 Checking for video elements...');
  const videoElements = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video'));
    return videos.map(v => ({
      src: v.src,
      currentSrc: v.currentSrc,
      paused: v.paused,
      ended: v.ended,
      readyState: v.readyState,
      networkState: v.networkState,
      width: v.width,
      height: v.height,
      style: v.getAttribute('style'),
      classes: v.className,
      visible: v.offsetParent !== null
    }));
  });

  console.log('Video Elements:', JSON.stringify(videoElements, null, 2));

  // Check for outstream-related divs
  console.log('\n🔍 Checking for outstream-related elements...');
  const outstreamElements = await page.evaluate(() => {
    const selectors = [
      '[id*="outstream"]',
      '[class*="outstream"]',
      '[id*="video"]',
      '[class*="video"]',
      '.asc-video-wrapper'
    ];
    
    const elements = [];
    selectors.forEach(selector => {
      try {
        const found = Array.from(document.querySelectorAll(selector));
        found.forEach(el => {
          elements.push({
            selector,
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            innerHTML: el.innerHTML.substring(0, 200)
          });
        });
      } catch (e) {
        // Skip invalid selectors
      }
    });
    return elements;
  });

  console.log('Outstream Elements:', JSON.stringify(outstreamElements, null, 2));

  // Filter console messages for relevant ones
  const relevantMessages = consoleMessages.filter(msg => 
    msg.text.includes('[Video Outstream]') ||
    msg.text.includes('renderer') ||
    msg.text.includes('outstream') ||
    msg.text.includes('ANOutstreamVideo') ||
    msg.text.toLowerCase().includes('video')
  );

  console.log('\n📋 Relevant Console Messages:');
  console.log(JSON.stringify(relevantMessages, null, 2));

  // Save all data to a file
  const reportData = {
    url: 'https://soccerbros.gg/?pbjs_debug=true',
    timestamp: new Date().toISOString(),
    videoWrapperInfo,
    videoElements,
    outstreamElements,
    relevantConsoleMessages: relevantMessages,
    allConsoleMessages: consoleMessages,
    errors
  };

  fs.writeFileSync('video_outstream_report.json', JSON.stringify(reportData, null, 2));
  console.log('\n✅ Report saved to video_outstream_report.json');
  console.log('✅ Screenshot saved to soccerbros_full_page.png');

  // Keep browser open for 5 seconds so you can see it
  console.log('\n⏳ Keeping browser open for 5 seconds...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log('✅ Done!');
})();
