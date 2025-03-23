 // Theme Toggle
 const themeToggle = document.getElementById('theme-toggle');
 const themeIcon = themeToggle.querySelector('i');
 
 // Check for saved theme preference or default to light
 const currentTheme = localStorage.getItem('theme') || 'light';
 
 // Apply saved theme on page load
 if (currentTheme === 'dark') {
     document.documentElement.setAttribute('data-theme', 'dark');
     themeIcon.textContent = 'light_mode';
 }
 
 // Toggle theme function
 themeToggle.addEventListener('click', () => {
     const currentTheme = document.documentElement.getAttribute('data-theme');
     
     if (currentTheme === 'dark') {
         document.documentElement.setAttribute('data-theme', 'light');
         localStorage.setItem('theme', 'light');
         themeIcon.textContent = 'dark_mode';
     } else {
         document.documentElement.setAttribute('data-theme', 'dark');
         localStorage.setItem('theme', 'dark');
         themeIcon.textContent = 'light_mode';
     }
 });
 
 // Mobile Menu Toggle
 const menuToggle = document.getElementById('menu-toggle');
 const navLinks = document.querySelector('.nav-links');
 
 menuToggle.addEventListener('click', () => {
     navLinks.classList.toggle('active');
     menuToggle.querySelector('i').textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
 });
 
 // Close menu when clicking a link
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
         menuToggle.querySelector('i').textContent = 'menu';
     });
 });
 // pdf download function
 function downloadPDF() {
let link = document.createElement("a");
link.href = "assets/Big-Fish-Menu-compressed.pdf"; // Ensure this file is inside your project directory
link.download = "Big-Fish-Menu.pdf"; // Suggested file name for the user
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

 // Testimonials Slider
 const testimonialItems = document.querySelector('.testimonial-items');
 const testimonialDots = document.querySelectorAll('.testimonial-dot');
 let currentSlide = 0;
 
 function showSlide(index) {
     testimonialItems.style.transform = `translateX(-${index * 100}%)`;
     
     // Update active dot
     testimonialDots.forEach(dot => dot.classList.remove('active'));
     testimonialDots[index].classList.add('active');
     
     currentSlide = index;
 }
 
 // Add click event to dots
 testimonialDots.forEach(dot => {
     dot.addEventListener('click', () => {
         const slideIndex = parseInt(dot.getAttribute('data-index'));
         showSlide(slideIndex);
     });
 });
 
 // Auto slide
 setInterval(() => {
     currentSlide = (currentSlide + 1) % testimonialDots.length;
     showSlide(currentSlide);
 }, 5000);
 
 // Menu Category Filter
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

// Function to filter menu items
function filterItems(selectedCategory) {
menuItems.forEach(item => {
 if (item.getAttribute('data-category') === selectedCategory) {
     item.style.display = 'flex';
 } else {
     item.style.display = 'none';
 }
});
}

// Add click event listeners to each category
menuCategories.forEach(category => {
category.addEventListener('click', () => {
 // Remove active class from all categories
 menuCategories.forEach(cat => cat.classList.remove('active'));
 
 // Add active class to clicked category
 category.classList.add('active');
 
 const selectedCategory = category.getAttribute('data-category');
 filterItems(selectedCategory);
});
});


// Sticky Header
window.addEventListener('scroll', () => {
 const header = document.querySelector('header');
 if (window.scrollY > 100) {
     header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
 } else {
     header.style.boxShadow = 'none';
 }
});



// Set default category (breakfast) when page loads
if (menuCategories.length > 0) {
// Select the first category by default (assuming it's breakfast)
const defaultCategory = menuCategories[0];
defaultCategory.classList.add('active');
filterItems(defaultCategory.getAttribute('data-category'));
}
 
 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         if (targetId === '#') return;
         
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             const navHeight = document.querySelector('.navbar').offsetHeight;
             const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
             
             window.scrollTo({
                 top: targetPosition,
                 behavior: 'smooth'
             });
         }
     });
 });