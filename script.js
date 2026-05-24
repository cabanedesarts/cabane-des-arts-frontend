/* ============================================
   LA CABANE DES ARTS - JAVASCRIPT PRINCIPAL
   VERSION SÉCURISÉE (ÉCHAPPEMENT HTML + VALIDATION)
   ============================================ */


// ===== URL DE L'API =====
const API_URL = 'https://cabane-des-arts-backend.onrender.com/api';

// ===== ÉTAT DE L'APPLICATION =====
const state = {
    cart: JSON.parse(localStorage.getItem('cabaneCart')) || [],
    currentLanguage: localStorage.getItem('cabaneLang') || 'fr',
    activeFilter: 'all',
};

// ===== SÉCURITÉ : Échappement des caractères HTML =====
function escapeHTML(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, function(s) {
        return map[s];
    });
}

// ===== DONNÉES DES PRODUITS =====
const products = [
    {
        id: 1,
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Tissu Bogolan Traditionnel', en: 'Traditional Bogolan Fabric' },
        description: { fr: 'Tissu artisanal teint à l\'indigo avec motifs traditionnels', en: 'Handcrafted indigo-dyed fabric with traditional patterns' },
        price: 15000,
        image: null,
    },
    {
        id: 2,
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Panier en Raphia Tressé', en: 'Woven Raffia Basket' },
        description: { fr: 'Panier traditionnel en fibres de raphia naturelles', en: 'Traditional basket in natural raffia fibers' },
        price: 8500,
        image: null,
    },
    {
        id: 3,
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Collier en Perles d\'Agate', en: 'Agate Bead Necklace' },
        description: { fr: 'Collier artisanal en perles d\'agate et cuir', en: 'Handcrafted necklace with agate beads and leather' },
        price: 12000,
        image: null,
    },
    {
        id: 4,
        category: 'tapisserie',
        categoryKey: 'categories.tapisserie',
        title: { fr: 'Tapisserie Murale "Danse du Bénin"', en: 'Wall Tapestry "Dance of Benin"' },
        description: { fr: 'Tapisserie artisanale représentant les danses traditionnelles', en: 'Handcrafted tapestry depicting traditional dances' },
        price: 25000,
        image: null,
    },
    {
        id: 5,
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure de Cérémonie Royale', en: 'Royal Ceremony Set' },
        description: { fr: 'Ensemble de parure inspiré des royautés du Bénin', en: 'Ceremonial set inspired by Benin royalty' },
        price: 35000,
        image: null,
    },
    {
        id: 6,
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Étole en Coton Indigo', en: 'Indigo Cotton Stole' },
        description: { fr: 'Étole artisanale teinte à l\'indigo naturel', en: 'Handcrafted stole dyed with natural indigo' },
        price: 10000,
        image: null,
    },
    {
        id: 7,
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Nappe en Fibres Tressées', en: 'Woven Fiber Tablecloth' },
        description: { fr: 'Nappe artisanale en fibres végétales tressées à la main', en: 'Handwoven tablecloth in natural plant fibers' },
        price: 18000,
        image: null,
    },
    {
        id: 8,
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Bracelet en Perles de Cauris', en: 'Cowrie Shell Bracelet' },
        description: { fr: 'Bracelet traditionnel en perles et cauris véritables', en: 'Traditional bracelet with genuine cowrie shells' },
        price: 6500,
        image: null,
    },
    {
        id: 9,
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Boucles d\'Oreilles Traditionnelles', en: 'Traditional Earrings' },
        description: { fr: 'Boucles d\'oreilles inspirées des ornements royaux', en: 'Earrings inspired by royal ornaments' },
        price: 9000,
        image: null,
    },
];

const ateliers = [
    {
        id: 1,
        title: { fr: 'Initiation à la Teinture Indigo', en: 'Introduction to Indigo Dyeing' },
        description: { fr: 'Découvrez les secrets de la teinture à l\'indigo, technique ancestrale béninoise', en: 'Discover the secrets of indigo dyeing, an ancestral Beninese technique' },
        duration: '4 séances de 3h / 4 sessions of 3h',
        public: { fr: 'Adulte', en: 'Adult' },
        schedule: { fr: 'Tous les samedis', en: 'Every Saturday' },
        price: 25000,
        popular: true,
        image: null,
    },
    {
        id: 2,
        title: { fr: 'Création de Bijoux en Perles', en: 'Bead Jewelry Making' },
        description: { fr: 'Apprenez à créer vos propres bijoux avec des perles locales et matériaux traditionnels', en: 'Learn to create your own jewelry with local beads and traditional materials' },
        duration: '6 séances de 2h / 6 sessions of 2h',
        public: { fr: 'Adulte / Enfant', en: 'Adult / Child' },
        schedule: { fr: 'Mercredi & Samedi', en: 'Wednesday & Saturday' },
        price: 18000,
        popular: false,
        image: null,
    },
    {
        id: 3,
        title: { fr: 'Tressage de Fibres Naturelles', en: 'Natural Fiber Weaving' },
        description: { fr: 'Maîtrisez l\'art du tressage du raphia et des fibres végétales locales', en: 'Master the art of weaving raffia and local plant fibers' },
        duration: '8 séances de 3h / 8 sessions of 3h',
        public: { fr: 'Adulte', en: 'Adult' },
        schedule: { fr: 'Tous les vendredis', en: 'Every Friday' },
        price: 30000,
        popular: false,
        image: null,
    },
];

const events = [
    {
        id: 1,
        title: { fr: 'Exposition "Artisanat en Fête"', en: 'Exhibition "Craftsmanship Celebration"' },
        description: { fr: 'Venez découvrir les dernières créations de nos artisans lors de cette exposition exceptionnelle', en: 'Come discover the latest creations of our artisans at this exceptional exhibition' },
        location: 'La Cabane des Arts, Porto-Novo',
        day: '25',
        month: { fr: 'Janvier', en: 'January' },
        year: '2026',
    },
    {
        id: 2,
        title: { fr: 'Atelier "Initiation au Bogolan"', en: 'Workshop "Introduction to Bogolan"' },
        description: { fr: 'Un atelier pratique pour découvrir la technique du Bogolan, tissu traditionnel revisité au Bénin', en: 'A practical workshop to discover the Bogolan technique, traditional fabric revisited in Benin' },
        location: 'La Cabane des Arts, Porto-Novo',
        day: '10',
        month: { fr: 'Février', en: 'February' },
        year: '2026',
    },
    {
        id: 3,
        title: { fr: 'Festival des Arts de Porto-Novo', en: 'Porto-Novo Arts Festival' },
        description: { fr: 'La Cabane des Arts participe au festival avec un stand de démonstration et de vente', en: 'La Cabane des Arts participates in the festival with a demonstration and sales stand' },
        location: 'Place de l\'Indépendance, Porto-Novo',
        day: '08',
        month: { fr: 'Mars', en: 'March' },
        year: '2026',
    },
];

const temoignages = [
    {
        stars: 5,
        text: {
            fr: 'Des créations magnifiques ! J\'ai acheté un collier en perles et il est d\'une qualité exceptionnelle. On sent le travail artisanal.',
            en: 'Magnificent creations! I bought a beaded necklace and it is of exceptional quality. You can feel the craftsmanship.',
        },
        author: 'Marie K.',
        role: { fr: 'Touriste, France', en: 'Tourist, France' },
    },
    {
        stars: 5,
        text: {
            fr: 'L\'atelier de teinture à l\'indigo était incroyable ! J\'ai appris tellement de choses. Les formateurs sont très patients.',
            en: 'The indigo dyeing workshop was incredible! I learned so much. The instructors are very patient.',
        },
        author: 'Jean A.',
        role: { fr: 'Étudiant, Cotonou', en: 'Student, Cotonou' },
    },
    {
        stars: 5,
        text: {
            fr: 'Je suis collectionneur d\'art africain et La Cabane des Arts est une véritable pépite. Des pièces uniques et authentiques.',
            en: 'I am an African art collector and La Cabane des Arts is a true gem. Unique and authentic pieces.',
        },
        author: 'Philippe D.',
        role: { fr: 'Collectionneur, Belgique', en: 'Collector, Belgium' },
    },
];

// ===== TRADUCTIONS =====
const translations = {
    fr: {
        'nav.home': 'Accueil',
        'nav.story': 'Notre Histoire',
        'nav.gallery': 'Galerie & Cours',
        'nav.shop': 'Boutique',
        'nav.events': 'Agenda',
        'nav.contact': 'Contact',
        'hero.badge': 'Artisanat Traditionnel Béninois',
        'hero.slogan': 'Créer pour Transformer, Vendre pour Élever',
        'hero.description': 'Espace de création, de formation et de transmission dédié à l\'artisanat et aux arts inspirés des cultures locales du Bénin',
        'hero.shop': 'Découvrir nos créations',
        'hero.ateliers': 'Voir les ateliers',
        'hero.contact': 'Nous contacter',
        'hero.feature1': 'Savoir-faire traditionnel',
        'hero.feature2': 'Commerce équitable',
        'hero.feature3': 'Livraison internationale',
        'histoire.subtitle': 'Notre Histoire',
        'histoire.title': 'Découvrez La Cabane des Arts',
        'histoire.heading1': 'Un espace de création et de transmission',
        'histoire.para1': 'La Cabane des Arts est un espace de création, de formation et de transmission dédié à l\'artisanat et aux arts inspirés des cultures locales du Bénin. Implantée à Porto-Novo, elle œuvre pour la valorisation des savoir-faire traditionnels tout en accompagnant l\'émergence de nouveaux talents.',
        'histoire.heading2': 'Formation aux métiers de l\'artisanat',
        'histoire.para2': 'La Cabane des Arts forme des jeunes, des femmes et des personnes en situation difficile aux métiers de l\'artisanat : bois, textile, raphia, perles, indigo et autres matières locales. Chaque objet créé est le fruit d\'un apprentissage patient, d\'un travail fait main et d\'un profond respect des matières et des traditions.',
        'histoire.heading3': 'Solidarité et autonomisation',
        'histoire.para3': 'Au-delà de la création artistique, la Cabane des Arts est un lieu de solidarité et d\'autonomisation. Les ventes d\'objets d\'art contribuent directement à la formation, à l\'autonomie économique des apprenants et au soutien de nouvelles bourses de formation.',
        'histoire.discover': 'Découvrir nos créations',
        'tags.textile': 'Création Textile',
        'tags.tressage': 'Tressage Artisanal',
        'tags.accessoires': 'Accessoires de Mode',
        'tags.tapisserie': 'Tapisserie Artisanale',
        'tags.parures': 'Parures Traditionnelles',
        'tags.ornements': 'Ornements',
        'mission.title1': 'Formation & Autonomisation',
        'mission.desc1': 'Nous formons des jeunes, des femmes et des personnes en situation difficile pour leur offrir des compétences professionnelles durables.',
        'mission.title2': 'Solidarité & Impact',
        'mission.desc2': 'Les ventes contribuent directement à la formation et à l\'autonomie économique des apprenants et au soutien de nouvelles bourses.',
        'mission.title3': 'Rayonnement Culturel',
        'mission.desc3': 'À travers les expositions, festivals et partenariats culturels, nous participons au rayonnement de Porto-Novo et du Bénin.',
        'galerie.subtitle': 'Galerie & Cours',
        'galerie.title': 'Nos Disciplines Artistiques',
        'galerie.description': 'Explorez nos différentes disciplines et découvrez les ateliers que nous proposons',
        'filter.all': 'Tous',
        'filter.textile': 'Textile',
        'filter.tressage': 'Tressage',
        'filter.accessoires': 'Accessoires',
        'filter.tapisserie': 'Tapisserie',
        'filter.parures': 'Parures',
        'categories.textile': 'Création Textile',
        'categories.tressage': 'Tressage Artisanal',
        'categories.accessoires': 'Accessoires de Mode',
        'categories.tapisserie': 'Tapisserie Artisanale',
        'categories.parures': 'Parures Traditionnelles',
        'card.details': 'Voir détails',
        'ateliers.subtitle': 'Apprenez avec nous',
        'ateliers.title': 'Nos Ateliers & Cours',
        'ateliers.description': 'La seule structure qui prépare aux accessoires orientés vers la culture béninoise',
        'atelier.popular': 'Populaire',
        'atelier.reserve': 'Réserver',
        'boutique.subtitle': 'Boutique',
        'boutique.title': 'Nos Œuvres à la Vente',
        'boutique.delivery': 'Livraison',
        'boutique.pickup': 'Retrait à la Cabane (Porto-Novo)',
        'boutique.local': 'Livraison locale (Porto-Novo)',
        'boutique.national': 'Livraison nationale (Bénin)',
        'boutique.international': 'Livraison internationale',
        'boutique.payment': 'Paiement',
        'boutique.cod': 'Paiement à la livraison',
        'agenda.subtitle': 'Événements',
        'agenda.title': 'Agenda & Actualités',
        'temoignages.subtitle': 'Témoignages',
        'temoignages.title': 'Ce que disent nos clients',
        'newsletter.title': 'Restez informé !',
        'newsletter.desc': 'Inscrivez-vous à notre newsletter pour recevoir nos actualités, nouveaux ateliers et offres exclusives.',
        'newsletter.subscribe': 'S\'abonner',
        'contact.subtitle': 'Contactez-nous',
        'contact.title': 'Contact & Localisation',
        'contact.address': 'Adresse',
        'contact.phone': 'Téléphone',
        'contact.email': 'Email',
        'contact.social': 'Réseaux sociaux',
        'contact.form.title': 'Envoyez-nous un message',
        'contact.form.name': 'Nom complet *',
        'contact.form.email': 'Email *',
        'contact.form.phone': 'Téléphone',
        'contact.form.subject': 'Sujet *',
        'contact.form.select': 'Sélectionnez un sujet',
        'contact.form.buy': 'Achat d\'œuvre',
        'contact.form.workshop': 'Inscription atelier',
        'contact.form.partnership': 'Partenariat',
        'contact.form.info': 'Demande d\'information',
        'contact.form.other': 'Autre',
        'contact.form.message': 'Message *',
        'contact.form.send': 'Envoyer le message',
        'footer.desc': 'Espace de création, de formation et de transmission dédié à l\'artisanat et aux arts inspirés des cultures locales du Bénin.',
        'footer.slogan': 'Créer pour Transformer, Vendre pour Élever',
        'footer.quicklinks': 'Liens rapides',
        'footer.disciplines': 'Disciplines',
        'footer.contact': 'Contact',
        'footer.rights': 'Tous droits réservés.',
        'cart.title': 'Mon Panier',
        'cart.empty': 'Votre panier est vide',
        'cart.total': 'Total',
        'cart.checkout': 'Commander',
        'modal.reservation': 'Réservation d\'atelier',
        'modal.deposit': 'Un acompte de 30% est requis pour confirmer votre réservation.',
        'modal.name': 'Nom complet *',
        'modal.email': 'Email *',
        'modal.phone': 'Téléphone *',
        'modal.date': 'Date souhaitée',
        'modal.payment': 'Mode de paiement',
        'modal.confirm': 'Confirmer la réservation',
        'checkout.title': 'Finaliser la commande',
        'checkout.total': 'Total :',
        'checkout.name': 'Nom complet *',
        'checkout.email': 'Email *',
        'checkout.phone': 'Téléphone *',
        'checkout.address': 'Adresse de livraison *',
        'checkout.delivery': 'Mode de livraison',
        'checkout.payment': 'Mode de paiement',
        'checkout.placeorder': 'Passer la commande',
        'months.january': 'Janvier',
        'months.february': 'Février',
        'months.march': 'Mars',
    },
    en: {
        'nav.home': 'Home',
        'nav.story': 'Our Story',
        'nav.gallery': 'Gallery & Courses',
        'nav.shop': 'Shop',
        'nav.events': 'Events',
        'nav.contact': 'Contact',
        'hero.badge': 'Traditional Beninese Craftsmanship',
        'hero.slogan': 'Create to Transform, Sell to Elevate',
        'hero.description': 'A space for creation, training and transmission dedicated to craftsmanship and arts inspired by local cultures of Benin',
        'hero.shop': 'Discover our creations',
        'hero.ateliers': 'See workshops',
        'hero.contact': 'Contact us',
        'hero.feature1': 'Traditional know-how',
        'hero.feature2': 'Fair trade',
        'hero.feature3': 'International delivery',
        'histoire.subtitle': 'Our Story',
        'histoire.title': 'Discover La Cabane des Arts',
        'histoire.heading1': 'A space for creation and transmission',
        'histoire.para1': 'La Cabane des Arts is a space for creation, training and transmission dedicated to craftsmanship and arts inspired by the local cultures of Benin. Located in Porto-Novo, it works to promote traditional know-how while supporting the emergence of new talents.',
        'histoire.heading2': 'Training in craft trades',
        'histoire.para2': 'La Cabane des Arts trains youth, women and people in difficult situations in craft trades: wood, textile, raffia, beads, indigo and other local materials. Each object created is the result of patient learning, handmade work and deep respect for materials and traditions.',
        'histoire.heading3': 'Solidarity and empowerment',
        'histoire.para3': 'Beyond artistic creation, La Cabane des Arts is a place of solidarity and empowerment. Sales of art objects directly contribute to training, economic autonomy of learners and support for new training scholarships.',
        'histoire.discover': 'Discover our creations',
        'tags.textile': 'Textile Creation',
        'tags.tressage': 'Artisanal Weaving',
        'tags.accessoires': 'Fashion Accessories',
        'tags.tapisserie': 'Artisanal Tapestry',
        'tags.parures': 'Traditional Adornments',
        'tags.ornements': 'Ornaments',
        'mission.title1': 'Training & Empowerment',
        'mission.desc1': 'We train youth, women and people in difficult situations to offer them sustainable professional skills.',
        'mission.title2': 'Solidarity & Impact',
        'mission.desc2': 'Sales directly contribute to training and economic autonomy of learners and support for new scholarships.',
        'mission.title3': 'Cultural Influence',
        'mission.desc3': 'Through exhibitions, festivals and cultural partnerships, we participate in the influence of Porto-Novo and Benin.',
        'galerie.subtitle': 'Gallery & Courses',
        'galerie.title': 'Our Artistic Disciplines',
        'galerie.description': 'Explore our different disciplines and discover the workshops we offer',
        'filter.all': 'All',
        'filter.textile': 'Textile',
        'filter.tressage': 'Weaving',
        'filter.accessoires': 'Accessories',
        'filter.tapisserie': 'Tapestry',
        'filter.parures': 'Adornments',
        'categories.textile': 'Textile Creation',
        'categories.tressage': 'Artisanal Weaving',
        'categories.accessoires': 'Fashion Accessories',
        'categories.tapisserie': 'Artisanal Tapestry',
        'categories.parures': 'Traditional Adornments',
        'card.details': 'View details',
        'ateliers.subtitle': 'Learn with us',
        'ateliers.title': 'Our Workshops & Courses',
        'ateliers.description': 'The only structure that prepares accessories oriented towards Beninese culture',
        'atelier.popular': 'Popular',
        'atelier.reserve': 'Reserve',
        'boutique.subtitle': 'Shop',
        'boutique.title': 'Our Artworks for Sale',
        'boutique.delivery': 'Delivery',
        'boutique.pickup': 'Pickup at La Cabane (Porto-Novo)',
        'boutique.local': 'Local delivery (Porto-Novo)',
        'boutique.national': 'National delivery (Benin)',
        'boutique.international': 'International delivery',
        'boutique.payment': 'Payment',
        'boutique.cod': 'Cash on delivery',
        'agenda.subtitle': 'Events',
        'agenda.title': 'Agenda & News',
        'temoignages.subtitle': 'Testimonials',
        'temoignages.title': 'What our clients say',
        'newsletter.title': 'Stay informed!',
        'newsletter.desc': 'Subscribe to our newsletter to receive our news, new workshops and exclusive offers.',
        'newsletter.subscribe': 'Subscribe',
        'contact.subtitle': 'Contact us',
        'contact.title': 'Contact & Location',
        'contact.address': 'Address',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.social': 'Social Media',
        'contact.form.title': 'Send us a message',
        'contact.form.name': 'Full Name *',
        'contact.form.email': 'Email *',
        'contact.form.phone': 'Phone',
        'contact.form.subject': 'Subject *',
        'contact.form.select': 'Select a subject',
        'contact.form.buy': 'Artwork purchase',
        'contact.form.workshop': 'Workshop registration',
        'contact.form.partnership': 'Partnership',
        'contact.form.info': 'Information request',
        'contact.form.other': 'Other',
        'contact.form.message': 'Message *',
        'contact.form.send': 'Send message',
        'footer.desc': 'A space for creation, training and transmission dedicated to craftsmanship and arts inspired by local cultures of Benin.',
        'footer.slogan': 'Create to Transform, Sell to Elevate',
        'footer.quicklinks': 'Quick Links',
        'footer.disciplines': 'Disciplines',
        'footer.contact': 'Contact',
        'footer.rights': 'All rights reserved.',
        'cart.title': 'My Cart',
        'cart.empty': 'Your cart is empty',
        'cart.total': 'Total',
        'cart.checkout': 'Checkout',
        'modal.reservation': 'Workshop Reservation',
        'modal.deposit': 'A 30% deposit is required to confirm your reservation.',
        'modal.name': 'Full Name *',
        'modal.email': 'Email *',
        'modal.phone': 'Phone *',
        'modal.date': 'Desired date',
        'modal.payment': 'Payment method',
        'modal.confirm': 'Confirm reservation',
        'checkout.title': 'Complete Order',
        'checkout.total': 'Total:',
        'checkout.name': 'Full Name *',
        'checkout.email': 'Email *',
        'checkout.phone': 'Phone *',
        'checkout.address': 'Delivery address *',
        'checkout.delivery': 'Delivery method',
        'checkout.payment': 'Payment method',
        'checkout.placeorder': 'Place order',
        'months.january': 'January',
        'months.february': 'February',
        'months.march': 'March',
    },
};

// ===== UTILITAIRES =====
function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

function getTranslation(key) {
    const lang = state.currentLanguage;
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : (translations['fr'][key] || key);
}

function t(key) {
    return getTranslation(key);
}

function saveCart() {
    localStorage.setItem('cabaneCart', JSON.stringify(state.cart));
}

// ===== FONCTIONS DOM =====
function createProductCard(product) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'galerie-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);
    
    card.innerHTML = `
        <div class="card-image">
            ${product.image 
                ? `<img src="${product.image}" alt="${product.title[lang]}" loading="lazy">`
                : `<div class="card-placeholder"><i class="fas fa-image"></i></div>`
            }
            <div class="card-overlay">
                <a href="#" class="overlay-btn">${t('card.details')}</a>
            </div>
        </div>
        <div class="card-content">
            <span class="card-category">${t(product.categoryKey)}</span>
            <h3>${escapeHTML(product.title[lang])}</h3>
            <p>${escapeHTML(product.description[lang])}</p>
            <div class="card-footer">
                <span class="card-price">${formatPrice(product.price)}</span>
                <button class="btn-card add-to-cart" data-id="${product.id}" aria-label="${t('cart.title')}">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function createAtelierCard(atelier) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'atelier-card';
    
    card.innerHTML = `
        ${atelier.popular ? `<div class="atelier-badge">${t('atelier.popular')}</div>` : ''}
        <div class="atelier-image">
            ${atelier.image 
                ? `<img src="${atelier.image}" alt="${atelier.title[lang]}" loading="lazy">`
                : `<div class="card-placeholder"><i class="fas fa-chalkboard-teacher"></i></div>`
            }
        </div>
        <div class="atelier-content">
            <h3>${escapeHTML(atelier.title[lang])}</h3>
            <div class="atelier-info">
                <span class="info-item"><i class="fas fa-clock"></i> ${atelier.duration}</span>
                <span class="info-item"><i class="fas fa-users"></i> ${atelier.public[lang]}</span>
                <span class="info-item"><i class="fas fa-calendar"></i> ${atelier.schedule[lang]}</span>
            </div>
            <p>${escapeHTML(atelier.description[lang])}</p>
            <div class="atelier-footer">
                <span class="atelier-price">${formatPrice(atelier.price)}</span>
                <button class="btn btn-primary reserve-btn" data-atelier-id="${atelier.id}">
                    <i class="fas fa-bookmark"></i>
                    ${t('atelier.reserve')}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function createEventCard(event) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'agenda-card';
    
    card.innerHTML = `
        <div class="agenda-date">
            <span class="date-day">${event.day}</span>
            <span class="date-month">${event.month[lang]}</span>
            <span class="date-year">${event.year}</span>
        </div>
        <div class="agenda-content">
            <h3>${escapeHTML(event.title[lang])}</h3>
            <p class="agenda-location">
                <i class="fas fa-map-marker-alt"></i> ${event.location}
            </p>
            <p>${escapeHTML(event.description[lang])}</p>
            <a href="#" class="btn-link">
                ${lang === 'fr' ? 'En savoir plus' : 'Learn more'}
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

function createTemoignageCard(temoignage) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'temoignage-card';
    
    card.innerHTML = `
        <div class="temoignage-stars">${'★'.repeat(temoignage.stars)}</div>
        <p class="temoignage-text">${escapeHTML(temoignage.text[lang])}</p>
        <div class="temoignage-author">
            <strong>${escapeHTML(temoignage.author)}</strong>
            <span>${temoignage.role[lang]}</span>
        </div>
    `;
    
    return card;
}

// ===== RENDU DES SECTIONS =====
function renderGalerie() {
    const grid = document.getElementById('galerieGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const filteredProducts = state.activeFilter === 'all' 
        ? products 
        : products.filter(p => p.category === state.activeFilter);
    
    filteredProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
    
    attachCartEvents();
}

function renderAteliers() {
    const grid = document.getElementById('ateliersGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    ateliers.forEach(atelier => {
        grid.appendChild(createAtelierCard(atelier));
    });
    
    attachReservationEvents();
}

function renderBoutique() {
    const grid = document.getElementById('boutiqueGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
    
    attachCartEvents();
}

function renderAgenda() {
    const grid = document.getElementById('agendaGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    events.forEach(event => {
        grid.appendChild(createEventCard(event));
    });
}

function renderTemoignages() {
    const grid = document.getElementById('temoignagesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    temoignages.forEach(temoignage => {
        grid.appendChild(createTemoignageCard(temoignage));
    });
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (state.cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItems) cartItems.innerHTML = '';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';
        
        if (cartItems) {
            cartItems.innerHTML = state.cart.map(item => {
                const product = products.find(p => p.id === item.id);
                const title = product ? product.title[state.currentLanguage] : item.name;
                return `
                    <div class="cart-item">
                        <div class="cart-item-image card-placeholder">
                            <i class="fas fa-image" style="font-size: 20px;"></i>
                        </div>
                        <div class="cart-item-info">
                            <h4>${escapeHTML(title)}</h4>
                            <p>${formatPrice(item.price)}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn cart-qty-minus" data-id="${item.id}">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
                        </div>
                        <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                        <button class="cart-item-remove" data-id="${item.id}" aria-label="Supprimer">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');
        }
        
        if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);
    }
    
    attachCartItemEvents();
}

// ===== GESTION DU PANIER =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            id: product.id,
            name: product.title[state.currentLanguage],
            price: product.price,
            quantity: 1,
        });
    }
    
    saveCart();
    renderCart();
    showToast(`${product.title[state.currentLanguage]} ajouté au panier !`, 'success');
}

function removeFromCart(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function updateQuantity(id, delta) {
    const item = state.cart.find(item => item.id === id);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    saveCart();
    renderCart();
}

function attachCartEvents() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(newBtn.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

function attachCartItemEvents() {
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = parseInt(newBtn.getAttribute('data-id'));
            updateQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = parseInt(newBtn.getAttribute('data-id'));
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = parseInt(newBtn.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function attachReservationEvents() {
    document.querySelectorAll('.reserve-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const atelierId = parseInt(newBtn.getAttribute('data-atelier-id'));
            const atelier = ateliers.find(a => a.id === atelierId);
            if (atelier) {
                openReservationModal(atelier);
            }
        });
    });
}

// ===== MODALS =====
function openReservationModal(atelier) {
    const modal = document.getElementById('reservationModal');
    const info = document.getElementById('modalAtelierInfo');
    const price = document.getElementById('modalAtelierPrice');
    const inputAtelier = document.getElementById('resAtelier');
    const inputPrice = document.getElementById('resPrice');
    
    if (!modal) return;
    
    if (info) info.textContent = atelier.title[state.currentLanguage];
    if (price) price.textContent = `Prix : ${formatPrice(atelier.price)}`;
    if (inputAtelier) inputAtelier.value = atelier.title[state.currentLanguage];
    if (inputPrice) inputPrice.value = atelier.price;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast(t('cart.empty'), 'error');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const summary = document.getElementById('checkoutSummary');
    const totalPrice = document.getElementById('checkoutTotalPrice');
    
    if (!modal) return;
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (summary) {
        summary.innerHTML = state.cart.map(item => {
            const product = products.find(p => p.id === item.id);
            const title = product ? product.title[state.currentLanguage] : item.name;
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${escapeHTML(title)} x${item.quantity}</h4>
                    </div>
                    <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                </div>
            `;
        }).join('');
    }
    
    if (totalPrice) totalPrice.textContent = formatPrice(total);
    
    modal.classList.add('active');
    closeCart();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
}

// ===== PANIER LATÉRAL =====
function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== TOAST =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="toast-message">${escapeHTML(message)}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== CHANGEMENT DE LANGUE =====
function switchLanguage(lang) {
    console.log('🔄 Changement de langue vers :', lang);
    
    state.currentLanguage = lang;
    localStorage.setItem('cabaneLang', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    renderGalerie();
    renderAteliers();
    renderBoutique();
    renderAgenda();
    renderTemoignages();
    renderCart();
    
    console.log('✅ Langue changée avec succès :', lang);
}

// ===== FILTRES =====
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeFilter = btn.getAttribute('data-filter');
            renderGalerie();
        });
    });
}

// ===== NAVIGATION =====
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// ===== BOUTON RETOUR EN HAUT =====
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== FORMULAIRES (AVEC VALIDATION SÉCURISÉE) =====
// ===== FORMULAIRES (CONNECTÉS AU BACKEND) =====
function setupForms() {

    // ── FORMULAIRE CONTACT ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom     = document.getElementById('contactName').value.trim();
            const email   = document.getElementById('contactEmail').value.trim();
            const telephone = document.getElementById('contactPhone').value.trim();
            const sujet   = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();

            if (!nom || !email || !sujet || !message) {
                showToast('Tous les champs obligatoires doivent être remplis.', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            try {
                const res = await fetch(`${API_URL}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nom, email, telephone, sujet, message })
                });
                const data = await res.json();
                if (res.ok) {
                    showToast('✅ Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
                    contactForm.reset();
                } else {
                    showToast(data.erreur || 'Erreur lors de l\'envoi.', 'error');
                }
            } catch (err) {
                showToast('❌ Impossible de joindre le serveur.', 'error');
                console.error(err);
            }
        });
    }

    // ── FORMULAIRE NEWSLETTER ──
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail')?.value.trim();

            if (!email) {
                showToast('Veuillez entrer une adresse email.', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            try {
                const res = await fetch(`${API_URL}/newsletter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await res.json();
                if (res.ok) {
                    showToast('✅ Inscription réussie ! Merci de votre intérêt.', 'success');
                    newsletterForm.reset();
                } else if (res.status === 409) {
                    showToast('Cet email est déjà inscrit à la newsletter.', 'error');
                } else {
                    showToast(data.erreur || 'Erreur lors de l\'inscription.', 'error');
                }
            } catch (err) {
                showToast('❌ Impossible de joindre le serveur.', 'error');
                console.error(err);
            }
        });
    }

    // ── FORMULAIRE RÉSERVATION ATELIER ──
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom          = document.getElementById('resName').value.trim();
            const email        = document.getElementById('resEmail').value.trim();
            const telephone    = document.getElementById('resPhone').value.trim();
            const atelier      = document.getElementById('resAtelier').value;
            const prix         = parseInt(document.getElementById('resPrice').value);
            const date_souhaitee = document.getElementById('resDate').value;
            const paiement     = document.getElementById('resPayment').value;

            if (!nom || !email || !telephone) {
                showToast('Tous les champs obligatoires doivent être remplis.', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            try {
                const res = await fetch(`${API_URL}/reservations`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nom, email, telephone, atelier, prix, date_souhaitee, paiement })
                });
                const data = await res.json();
                if (res.ok) {
                    showToast('✅ Réservation confirmée ! Vous recevrez un email avec les détails.', 'success');
                    reservationForm.reset();
                    closeReservationModal();
                } else {
                    showToast(data.erreur || 'Erreur lors de la réservation.', 'error');
                }
            } catch (err) {
                showToast('❌ Impossible de joindre le serveur.', 'error');
                console.error(err);
            }
        });
    }

    // ── FORMULAIRE COMMANDE ──
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom      = document.getElementById('checkoutName').value.trim();
            const email    = document.getElementById('checkoutEmail').value.trim();
            const telephone = document.getElementById('checkoutPhone').value.trim();
            const adresse  = document.getElementById('checkoutAddress').value.trim();
            const livraison = document.getElementById('checkoutDelivery').value;
            const paiement = document.getElementById('checkoutPayment').value;

            if (!nom || !email || !telephone || !adresse) {
                showToast('Tous les champs obligatoires doivent être remplis.', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            const articles = state.cart.map(item => ({
                id: item.id,
                titre: item.name,
                prix: item.price,
                quantite: item.quantity
            }));
            const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            try {
                const res = await fetch(`${API_URL}/commandes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nom, email, telephone, adresse, livraison, paiement, articles, total })
                });
                const data = await res.json();
                if (res.ok) {
                    showToast('✅ Commande confirmée ! Nous vous contacterons pour finaliser.', 'success');
                    checkoutForm.reset();
                    state.cart = [];
                    saveCart();
                    renderCart();
                    closeCheckoutModal();
                } else {
                    showToast(data.erreur || 'Erreur lors de la commande.', 'error');
                }
            } catch (err) {
                showToast('❌ Impossible de joindre le serveur.', 'error');
                console.error(err);
            }
        });
    }
}

// ===== MODALS SETUP =====
function setupModals() {
    const modalClose = document.getElementById('modalClose');
    const reservationOverlay = document.getElementById('reservationModal');
    
    if (modalClose) modalClose.addEventListener('click', closeReservationModal);
    if (reservationOverlay) {
        reservationOverlay.addEventListener('click', (e) => {
            if (e.target === reservationOverlay) closeReservationModal();
        });
    }
    
    const checkoutModalClose = document.getElementById('checkoutModalClose');
    const checkoutOverlay = document.getElementById('checkoutModal');
    
    if (checkoutModalClose) checkoutModalClose.addEventListener('click', closeCheckoutModal);
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', (e) => {
            if (e.target === checkoutOverlay) closeCheckoutModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeReservationModal();
            closeCheckoutModal();
            closeCart();
        }
    });
}

// ===== MODE SOMBRE / CLAIR =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.warn('Bouton theme-toggle introuvable');
        return;
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Mode Clair';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Mode Clair';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙 Mode Sombre';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== RÉINITIALISER LES PRÉFÉRENCES =====
function setupResetPreferences() {
    const resetBtn = document.getElementById('reset-preferences');
    
    if (!resetBtn) {
        console.warn('Bouton reset-preferences introuvable');
        return;
    }

    resetBtn.addEventListener('click', function() {
        const confirmReset = confirm(
            state.currentLanguage === 'fr' 
                ? 'Voulez-vous vraiment réinitialiser toutes vos préférences ?\n(Le mode sombre, la langue et le panier seront effacés.)'
                : 'Do you really want to reset all your preferences?\n(Dark mode, language and cart will be cleared.)'
        );
        
        if (!confirmReset) return;
        
        localStorage.removeItem('theme');
        localStorage.removeItem('cabaneLang');
        localStorage.removeItem('cabaneCart');
        
        state.cart = [];
        state.currentLanguage = 'fr';
        state.activeFilter = 'all';
        
        document.body.classList.remove('dark-mode');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = '🌙 Mode Sombre';
        }
        
        location.reload();
    });
}

// ===== CONSENTEMENT COOKIES =====
function setupCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (!banner) return;
    
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' || consent === 'declined') {
        banner.style.display = 'none';
        return;
    }
    
    // Afficher la bannière après un court délai
    setTimeout(() => {
        banner.classList.add('visible');
    }, 1000);
    
    // Accepter
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 400);
        });
    }
    
    // Refuser
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 400);
        });
    }
}

// ===== INITIALISATION =====
function init() {
    console.log('🎨 La Cabane des Arts - Initialisation');
    
    const savedLang = localStorage.getItem('cabaneLang');
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        state.currentLanguage = savedLang;
    }
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === state.currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[state.currentLanguage] && translations[state.currentLanguage][key]) {
            el.textContent = translations[state.currentLanguage][key];
        }
    });
    
    renderGalerie();
    renderAteliers();
    renderBoutique();
    renderAgenda();
    renderTemoignages();
    renderCart();
    
    setupFilters();
    setupNavigation();
    setupBackToTop();
    setupForms();
    setupModals();
    setupThemeToggle();
    setupResetPreferences();
    setupCookieConsent(); // <-- Ajout de la bannière cookies
    
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && (lang === 'fr' || lang === 'en')) {
                switchLanguage(lang);
            }
        });
    });
    
    console.log('✅ Site initialisé ! Langue :', state.currentLanguage);
    console.log('📦 Panier :', state.cart.length, 'article(s)');
}

// ===== DÉMARRAGE =====
document.addEventListener('DOMContentLoaded', init);