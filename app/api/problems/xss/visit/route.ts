import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// POST - Spawn headless browser to visit comments page
export async function POST(request: NextRequest) {
  try {
    const browserId = request.cookies.get('browser-id')?.value;

    if (!browserId) {
      return NextResponse.json({ error: 'No browser-id found' }, { status: 400 });
    }

    // Spawn headless browser in background
    spawnBot(browserId).catch(err => {
      console.error('Bot error:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Admin has been notified and will check your comments shortly!'
    });
  } catch (error) {
    console.error('Error spawning bot:', error);
    return NextResponse.json({ error: 'Failed to notify admin' }, { status: 500 });
  }
}

async function spawnBot(browserId: string) {
  let browser;
  try {
    console.log(`[Bot] Spawning bot for browser-id: ${browserId}`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = browser.defaultBrowserContext();
    const page = await browser.newPage();

    // Set admin session cookie with the flag
    await context.setCookie({
      name: 'admin-session',
      value: 'flag_{xss_cookie_monster_nom_nom}',
      domain: 'localhost',
      path: '/',
      httpOnly: false, // Allow JavaScript to read it
    });

    // Set the browser-id cookie so bot sees the correct comments
    await context.setCookie({
      name: 'browser-id',
      value: browserId,
      domain: 'localhost',
      path: '/',
    });


    console.log(`[Bot] Navigating to clean-thoughts page...`);

    // Navigate to the comments page
    await page.goto('http://localhost:3000/problems/clean-thoughts', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    console.log(`[Bot] Waiting for XSS to execute...`);

    // Wait for potential XSS to execute
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(`[Bot] Bot visit complete for browser-id: ${browserId}`);
  } catch (error) {
    console.error('[Bot] Error during bot execution:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
