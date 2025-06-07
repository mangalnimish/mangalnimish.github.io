// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sample Data
const projects = [
    {
        id: 1,
        year: '2023',
        title: 'Enterprise Dashboard',
        role: 'Lead Product Manager',
        summary: 'Led the development of a comprehensive analytics dashboard',
        metrics: '45% increase in user engagement',
        link: '#'
    },
    // Add more projects as needed
];

const skills = {
    product: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile/Scrum', 'Data Analysis', 'Figma'],
    technical: ['SQL', 'Python', 'API Design', 'Git', 'HTML/CSS', 'JavaScript'],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Stakeholder Management', 'Team Collaboration']
};

const blogPosts = [
    {
        title: 'The Future of Product Management',
        excerpt: 'Exploring emerging trends and methodologies in product management...',
        date: 'June 1, 2025',
        link: '#'
    },
    // Add more blog posts as needed
];

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Navbar Scroll Effect
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--light)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }
}

// Project Filtering
function filterProjects(year) {
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(project => {
        if (year === 'all' || project.dataset.year === year) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Populate Projects
function populateProjects() {
    const workGrid = document.querySelector('.work-grid');
    workGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-year="${project.year}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="role">${project.role}</p>
                <p>${project.summary}</p>
                <p class="metrics">${project.metrics}</p>
                <a href="${project.link}" class="project-link">Learn More →</a>
            </div>
        </div>
    `).join('');
}

// Populate Skills
function populateSkills() {
    const categories = ['product', 'technical', 'soft'];
    categories.forEach(category => {
        const grid = document.querySelector(`#${category}-skills`);
        if (grid) {
            grid.innerHTML = skills[category].map(skill => `
                <div class="skill-item">
                    <span>${skill}</span>
                </div>
            `).join('');
        }
    });
}

// Populate Blog Posts
function populateBlog() {
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.innerHTML = blogPosts.map(post => `
        <div class="blog-card">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <span class="date">${post.date}</span>
            <a href="${post.link}" class="read-more">Read More →</a>
        </div>
    `).join('');
}

// Form Validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    alert('Thanks for your message! I\'ll get back to you soon.');
    contactForm.reset();
}

// Email Validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .about-content, .work-grid, .skills-container, .blog-grid, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    populateProjects();
    populateSkills();
    populateBlog();
    initScrollAnimation();
});

window.addEventListener('scroll', handleScroll);
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', validateForm);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterProjects(button.dataset.filter);
    });
});
