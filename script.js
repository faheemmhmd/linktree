// Horizontal carousel controller
class HorizontalCarousel {
    constructor(selector) {
        this.wheel = document.querySelector(selector);
        this.items = Array.from(this.wheel.querySelectorAll('.wheel-item, .card'));
        this.itemCount = this.items.length;
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.velocity = 0;
        this.friction = 0.92;
        this.inertia = false;

        this.init();
    }

    init() {
        this.renderCarousel();
        this.attachEvents();
    }

    attachEvents() {
        // Mouse wheel
        this.wheel.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Touch
        this.wheel.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.wheel.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.wheel.addEventListener('touchend', () => this.handleTouchEnd());

        // Mouse drag
        this.wheel.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUp());

        // Inertia animation
        this.animateInertia();
    }

    handleWheel(e) {
        e.preventDefault();
        if (e.deltaY > 0 || e.deltaX > 0) {
            this.nextItem();
        } else {
            this.prevItem();
        }
    }

    handleTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.velocity = 0;
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const diff = this.startX - currentX;
        if (Math.abs(diff) > 5) {
            this.velocity = diff > 0 ? 1 : -1;
        }
        this.startX = currentX;
    }

    handleTouchEnd() {
        this.isDragging = false;
        if (this.velocity !== 0) {
            this.inertia = true;
        }
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.velocity = 0;
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        const currentX = e.clientX;
        const diff = this.startX - currentX;
        if (Math.abs(diff) > 5) {
            this.velocity = diff > 0 ? 1 : -1;
        }
        this.startX = currentX;
    }

    handleMouseUp() {
        this.isDragging = false;
        if (this.velocity !== 0) {
            this.inertia = true;
        }
    }

    animateInertia() {
        if (this.inertia && Math.abs(this.velocity) > 0.1) {
            this.velocity *= this.friction;
            if (this.velocity > 0.5) {
                this.nextItem();
            } else if (this.velocity < -0.5) {
                this.prevItem();
            }
        } else {
            this.inertia = false;
        }
        requestAnimationFrame(() => this.animateInertia());
    }

    nextItem() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.renderCarousel();
        this.triggerCategoryChange();
    }

    prevItem() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.renderCarousel();
        this.triggerCategoryChange();
    }

    renderCarousel() {
        this.items.forEach((item, originalIndex) => {
            const positionOffset = (originalIndex - this.currentIndex + this.itemCount) % this.itemCount;
            this.updateItemPosition(item, positionOffset);
        });
    }

    updateItemPosition(item, offset) {
        let scale, translateX, opacity, zIndex, backdrop, bgOpacity;

        switch (offset) {
            case 0: // Center - current item (opaque)
                scale = 1;
                translateX = 0;
                opacity = 1;
                zIndex = 10;
                backdrop = 'blur(5px)';
                bgOpacity = 0.75;
                item.removeAttribute('data-position');
                break;
            case 1: // Right - next item (glass)
                scale = 0.65;
                translateX = 280;
                opacity = 0.9;
                zIndex = 5;
                backdrop = 'blur(25px)';
                bgOpacity = 0.35;
                item.setAttribute('data-position', 'right');
                break;
            case this.itemCount - 1: // Left - previous item (glass)
                scale = 0.65;
                translateX = -280;
                opacity = 0.9;
                zIndex = 5;
                backdrop = 'blur(25px)';
                bgOpacity = 0.35;
                item.setAttribute('data-position', 'left');
                break;
            default: // All others hidden
                scale = 0;
                translateX = 0;
                opacity = 0;
                zIndex = 0;
                backdrop = 'blur(5px)';
                bgOpacity = 0.6;
                item.removeAttribute('data-position');
        }

        item.style.transform = `translateX(calc(-50% + ${translateX}px)) translateY(-50%) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;
        item.style.backdropFilter = offset === 0 || offset >= this.itemCount - 1 || offset === 1 ? backdrop : 'blur(5px)';
        
        // Update background based on position
        if (offset === 0) {
            item.style.background = `rgba(26, 47, 77, ${bgOpacity})`;
            item.style.borderColor = 'rgba(6, 182, 212, 0.25)';
        } else if (offset === 1 || offset === this.itemCount - 1) {
            item.style.background = `rgba(26, 47, 77, ${bgOpacity})`;
            item.style.borderColor = 'rgba(6, 182, 212, 0.15)';
        } else {
            item.style.background = 'rgba(26, 47, 77, 0.6)';
            item.style.borderColor = 'rgba(6, 182, 212, 0.25)';
        }
    }

    triggerCategoryChange() {
        if (this.wheel.classList.contains('categories-wheel')) {
            const activeItem = this.items[this.currentIndex];
            if (activeItem && activeItem.dataset.category) {
                setActiveCategory(activeItem.dataset.category);
            }
        }
    }
}

// Initialize carousels
let cardsCarousels = {};
let categoryIndex = 0;
const categories = ['social', 'coding', 'games', 'portfolio'];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize card carousels for each category
    const cardWheels = document.querySelectorAll('.cards-wheel');
    cardWheels.forEach((wheel) => {
        const category = wheel.dataset.category;
        cardsCarousels[category] = new HorizontalCarousel(`.cards-wheel[data-category="${category}"]`);
    });

    // Set initial active category
    setActiveCategory('social');

    // Category toggle button handlers
    document.querySelectorAll('.toggle-btn').forEach((btn) => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const targetIndex = categories.indexOf(category);
            categoryIndex = targetIndex;
            updateCategoryCarousel();
            setActiveCategory(category);
        });
    });

    // Category carousel scroll/wheel handler
    const categoryToggle = document.querySelector('.categories-toggle');
    categoryToggle.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0 || e.deltaX > 0) {
            rotateCategoryRight();
        } else {
            rotateCategoryLeft();
        }
    }, { passive: false });

    // Initial category carousel setup
    updateCategoryCarousel();
});

function updateCategoryCarousel() {
    document.querySelectorAll('.toggle-btn').forEach((btn, index) => {
        btn.removeAttribute('data-position');
        
        const offset = (index - categoryIndex + categories.length) % categories.length;
        
        if (offset === 0) {
            btn.classList.add('active');
            btn.removeAttribute('data-position');
        } else if (offset === 1) {
            btn.classList.remove('active');
            btn.setAttribute('data-position', 'right');
        } else if (offset === categories.length - 1) {
            btn.classList.remove('active');
            btn.setAttribute('data-position', 'left');
        } else {
            btn.classList.remove('active');
            btn.removeAttribute('data-position');
        }
    });
}

function rotateCategoryLeft() {
    categoryIndex = (categoryIndex - 1 + categories.length) % categories.length;
    updateCategoryCarousel();
    setActiveCategory(categories[categoryIndex]);
}

function rotateCategoryRight() {
    categoryIndex = (categoryIndex + 1) % categories.length;
    updateCategoryCarousel();
    setActiveCategory(categories[categoryIndex]);
}

function setActiveCategory(category) {
    // Hide all card carousels and show selected
    document.querySelectorAll('.cards-wheel').forEach((wheel) => {
        if (wheel.dataset.category === category) {
            wheel.classList.add('active');
        } else {
            wheel.classList.remove('active');
        }
    });
}
