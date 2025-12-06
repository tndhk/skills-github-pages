/**
 * Main JavaScript for 旅行メモ
 * Handles interactive features and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScroll();
  initAnimationOnScroll();
  initTableOfContents();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when a link is clicked
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isMenuBtn = event.target.closest('#mobile-menu-btn');
    const isMenu = event.target.closest('#mobile-menu');

    if (!isMenuBtn && !isMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offsetTop = target.getBoundingClientRect().top + window.scrollY;
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;

      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Intersection Observer for animations on scroll
 */
function initAnimationOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and animate them
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(card);
  });
}

/**
 * Generate Table of Contents for blog posts
 */
function initTableOfContents() {
  const postContent = document.querySelector('.prose');
  if (!postContent) return;

  const headings = postContent.querySelectorAll('h2, h3');
  if (headings.length < 2) return;

  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'bg-gray-100 rounded-lg p-6 mb-8 sticky top-24';
  tocContainer.innerHTML = '<h3 class="font-bold mb-4">目次</h3><ul class="space-y-2"></ul>';

  const tocList = tocContainer.querySelector('ul');

  // Generate IDs and TOC entries
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const level = heading.tagName === 'H2' ? 0 : 1;
    const li = document.createElement('li');
    li.style.marginLeft = `${level * 1.5}rem`;

    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.className = 'text-primary-600 hover:text-primary-700 hover:underline transition-colors text-sm';
    a.textContent = heading.textContent;

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Insert TOC at the beginning of the post
  postContent.parentElement.insertBefore(tocContainer, postContent);
}

/**
 * Utility: Add dark mode support (for future enhancement)
 */
function setupDarkModeToggle() {
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  if (!darkModeBtn) return;

  // Check for saved preference or system preference
  const isDark = localStorage.getItem('dark-mode') === 'true' ||
    (!localStorage.getItem('dark-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  }

  darkModeBtn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('dark-mode', document.documentElement.classList.contains('dark'));
  });
}

/**
 * Track reading progress
 */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${scrollPercent}%`;
  });
}

/**
 * Copy code blocks to clipboard
 */
function initCodeBlockCopy() {
  document.querySelectorAll('pre').forEach(pre => {
    const codeBlock = pre.querySelector('code');
    if (!codeBlock) return;

    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors';
    copyBtn.textContent = 'コピー';
    copyBtn.style.position = 'relative';
    copyBtn.style.marginBottom = '10px';

    copyBtn.addEventListener('click', function() {
      const text = codeBlock.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'コピーしました!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    });

    pre.parentNode.insertBefore(copyBtn, pre);
  });
}

/**
 * Initialize code block enhancements
 */
function initCodeBlockEnhancements() {
  initCodeBlockCopy();
}

// Initialize code block features
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCodeBlockEnhancements);
} else {
  initCodeBlockEnhancements();
}
