export const LOCAL_ORIGIN = typeof process !== 'undefined' ? process.env.LOCAL_ORIGIN : undefined;
export const PORT = (typeof process !== 'undefined' ? process.env.PORT : undefined);

export const SERVER_DEFAULTS = {
    PORT: PORT,
    KEEP_ALIVE_INTERVAL: 1000000,
};

export * from './paths.js';

export const BASE_URL = `${LOCAL_ORIGIN}:${PORT}`;
export const TEST_LOCATION_URL = LOCAL_ORIGIN;

export const GOOGLE_MAPS_CHECK_INTERVAL = 100;
export const CAROUSEL_INTERVAL = 4000;
export const REDIRECT_DELAY = 1500;
export const PANEL_TOGGLE_DELAY = 2000;
export const COPYRIGHT_TEXT = 'Copyright &copy; 2026 by LocalBites, All Rights Reserved';
export const SUPPORT_EMAIL = 'support@example.com';

export const CLASSNAMES = {
    ACTIVE: 'right-panel-active',
};

export const PLACES_API_DEFAULTS = {
    LAT: 12.9716,
    LNG: 77.5946,
    RADIUS: 5000,
};

export const PHOTO_SIZE = {
    MAX_HEIGHT: 400,
    MAX_WIDTH: 400,
};

export const PRICE_LEVELS = {
    INEXPENSIVE: 150,
    MODERATE: 350,
    EXPENSIVE: 600,
    VERY_EXPENSIVE: 1000,
    DEFAULT: 300,
};

export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SERVICE_UNAVAILABLE: 503,
    INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
    PASSWORD_MISMATCH: 'Passwords do not match!',
    SIGNUP_SUCCESS: 'Sign up successful! Please sign in.',
    SIGNUP_ERROR: 'An error occurred during sign up.',
    SIGNIN_ERROR: 'An error occurred during sign in.',
    FIELDS_REQUIRED: 'All fields are required',
    USER_EXISTS: 'User already exists',
    USER_CREATED: 'User created successfully',
    INVALID_CREDENTIALS: 'Invalid credentials',
    SIGNIN_SUCCESS: 'Sign in successful',
    SIGNUP_UNAVAILABLE: 'Signup is temporarily unavailable (DB maintenance).',
    SIGNIN_UNAVAILABLE: 'Signin is temporarily unavailable (DB maintenance).',
};

export const SELECTORS = {
    CONTACT_LINKS: '#footer-contact-link, #faq-contact-link',
    COPYRIGHT: '#footer-copyright',
    HAMBURGER: '.hamburger',
    NAV_LINKS: '.nav-links',
};

export const EXPLORE_SELECTORS = {
    SEARCH_INPUT: 'restaurantSearch',
    FILTER_BTN: 'filterBtn',
    FILTER_MODAL: 'filterModal',
    APPLY_FILTERS_BTN: 'applyFiltersBtn',
    DETAIL_MODAL: 'detailModal',
    MODAL_BODY: 'modalBody',
    CUISINE_FILTERS: 'cuisineFilters',
    MEAL_TYPE_FILTERS: 'mealTypeFilters',
    RESTAURANT_CARD: '.restaurant-card',
    NO_RESULTS: '.no-results',
    CARD_PRICE: '.card-price',
    CARD_CUISINE: '.card-cuisine',
    CARD_TITLE: 'h3',
    PAGE_TITLE: 'h1',
};

export const EXPLORE_CLASSES = {
    ACTIVE: 'active',
};

export const EVENTS = {
    INPUT: 'input',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    ESCAPE: 'Escape',
};

export const EXPLORE_ATTRIBUTES = {
    DATA_CUISINE: 'data-cuisine',
    DATA_MEALTYPE: 'data-mealtype',
};

export const EXPLORE_TEXTS = {
    PAGE_HEADER: 'Popular Local Discoveries',
    CURRENCY: '₹',
    NO_EXISTENT: 'NonExistentPlaceXYZ123',
    SOUTH_INDIAN: 'South Indian',
    BREAKFAST: 'breakfast',
};

export const LIMIT = 6;
export const HERO_DATA = [
    {
        id: 'masala-dosa',
        t: 'The Iconic Breakfast',
        h: 'Masala Dosa',
        d: 'A crispy, golden fermented crepe filled with spiced potatoes.',
    },
    {
        id: 'bisi-bele-bath',
        t: 'The Spicy Comfort',
        h: 'Bisi Bele Bath',
        d: "A wholesome 'hot lentil rice' dish with vegetables and spices.",
    },
    {
        id: 'biryani',
        t: 'The Royal Feast',
        h: 'Biryani',
        d: 'Fragrant rice layered with spiced meat or vegetables.',
    },
    {
        id: 'ragi-mudde',
        t: 'The Rural Roots',
        h: 'Ragi Mudde',
        d: 'Nutritious finger millet balls paired with spicy curries.',
    },
    {
        id: 'idli-vada',
        t: 'The Perfect Duo',
        h: 'Idli Vada',
        d: 'Soft steamed rice cakes paired with crispy lentil vada.',
    },
    {
        id: 'filter-coffee',
        t: 'The Soul',
        h: 'Filter Coffee',
        d: 'Strong, aromatic coffee brewed in traditional filters.',
    },
];

export const CULTURE_IMAGES = [
    "https://images.unsplash.com/photo-1694849789325-914b71ab4075?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/1221366840/photo/bisibele-bath-hot-lentil-rice-dish.jpg?s=2048x2048&w=is&k=20&c=FxazAaOB-H_m5TltTM00njyObU99pP0BhrRcNBCIrZw=",
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
    "https://www.cookwithkushi.com/wp-content/uploads/2015/09/easy_ragi_mudde_recipe.jpg",
    "https://media.istockphoto.com/id/2223331687/photo/delicious-south-indian-breakfast-food-idli-and-vada.jpg?s=2048x2048&w=is&k=20&c=yzKvLYrr2AAoMsFJJ24IStRoxvGX6EsPw7D8BOq0Y20=",
    "https://www.saffrontrail.com/wp-content/uploads/2006/08/recipe-to-make-filter-kaapi-how-to.1024x1024.jpg"
];

export const POPULAR_THRESHOLDS = {
    MIN_RATING: 4.2,
    MIN_REVIEWS: 1000,
};

export const ANIMATION_TIMINGS = {
    HERO_TEXT_FADE_OUT: 500,
    HERO_TEXT_TRANSITION_BASE: 0.6,
    HERO_TEXT_TRANSITION_DELAY: 0.1,
    DISH_HIGHLIGHT_DURATION: 3000,
    DISH_SCROLL_DELAY: 150,
    HASH_SCROLL_DELAY: 100,
    HASH_SCROLL_RENDER_DELAY: 500,
    STAGGER_DELAY: 100,
    REVEAL_THRESHOLD: 0.1,
};

export const ABOUT_DATA = {
    MISSION:
        'Our mission is to bridge the gap between travelers and authentic local food experiences, celebrating the culture and stories behind every dish.',
    STORY:
        'LocalBites was born in the heart of Bengaluru, inspired by the bustling streets and hidden aromas of family-run eateries that have been serving generations. We realized that while mainstream maps show you where to eat, they often miss the places where the soul of the city truly resides.',
    VISION:
        'We envision a world where every meal is an opportunity for discovery and cultural connection. By putting local legends on the map, we strive to preserve culinary heritage and support the independent artisans who keep our food traditions alive.',
    TEAM: [
        {
            name: 'Rakshitha Banapur',
            role: 'Software developer engineer',
            bio: 'Deeply passionate about preserving cultural narratives through digital design. Dedicated to crafting immersive experiences that bring the soul of local cuisine to life.',
        },
        {
            name: 'Gnaneshwar P',
            role: 'Software developer engineer',
            bio: 'Driven by the power of technology to bridge communities. Focused on building seamless, accessible platforms that turn every search into a meaningful discovery.',
        },
    ],
    FEATURES: [
        {
            title: 'Authenticity',
            description: 'We focus on real local spots favored by residents.',
            icon: 'fas fa-check-circle',
        },
        {
            title: 'Culture',
            description:
                'Learn the history and traditions behind your favorite meals.',
            icon: 'fas fa-history',
        },
        {
            title: 'Explore',
            description: 'Join a growing network of food enthusiasts.',
            icon: 'fas fa-users',
        },
    ],
};

export const ABOUT_SELECTORS = {
    TEAM_CONTAINER: '#team-container',
    MISSION_TEXT: '#mission-text',
    STORY_TEXT: '#story-text',
    VISION_TEXT: '#vision-text',
    FEATURES_GRID: '#features-grid',
};

export const ABOUT_CONSTANTS = {
    ANIMATION_THRESHOLD: 0.1,
};
