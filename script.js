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
        title: { fr: 'Ensemble Indigo Côtier', en: 'Coastal Indigo Ensemble' },
        description: { fr: 'Tenue ample en lin teinté à l\'indigo, ornée de motifs tie-dye traditionnels.', en: 'Loose-fitting linen outfit dyed in indigo, with traditional tie-dye patterns.' },
        price: 22000,
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

// ===== DONNÉES DE LA GALERIE (créations réelles, sans prix ni panier) =====
const galerieItems = [
    // ----- TEXTILE -----
    {
        id: 'g1',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Ensemble Indigo Côtier', en: 'Coastal Indigo Ensemble' },
        description: {
            fr: 'Laissez-vous porter par la douceur du lin et la profondeur de l\'indigo. Cette tenue ample et fluide, ornée de motifs tie-dye traditionnels, incarne l\'élégance décontractée de la femme africaine moderne.',
            en: 'Let yourself be carried by the softness of linen and the depth of indigo. This flowing, loose-fitting outfit with traditional tie-dye patterns embodies relaxed elegance.'
        },
        image: 'images/galerie/textile-1-ensemble-indigo-cotier.jpeg',
    },
    {
        id: 'g2',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Bomber Wax Soleil Rouge', en: 'Red Sun Wax Bomber' },
        description: {
            fr: 'Affirmez votre style avec ce bomber en wax aux cercles solaires rouge et jaune. Une pièce forte, taillée pour ceux qui portent leur culture avec fierté.',
            en: 'Make a statement with this wax bomber featuring red and yellow sun-circle patterns. A bold piece for those who wear their culture with pride.'
        },
        image: 'images/galerie/textile-2-bomber-wax-soleil-rouge.jpeg',
    },
    {
        id: 'g3',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Pareo & Haut Shibori Océan', en: 'Ocean Shibori Top & Wrap' },
        description: {
            fr: 'Un duo plage irrésistible — haut et pareo en tissu shibori indigo aux motifs floraux délavés à la main. Chaque pièce est unique, comme vous.',
            en: 'An irresistible beach duo — top and wrap in indigo shibori fabric with hand-faded floral patterns. Each piece is unique.'
        },
        image: 'images/galerie/textile-3-pareo-haut-shibori.jpeg',
    },
    {
        id: 'g4',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Bomber Patchwork — Édition Porto-Novo', en: 'Patchwork Bomber — Porto-Novo Edition' },
        description: {
            fr: 'Une œuvre d\'art à porter. Ce bomber assemble des fragments de wax du monde entier en un seul vêtement collector, cousu à la main dans notre atelier de Porto-Novo.',
            en: 'A wearable work of art. This bomber assembles wax fragments from around the world into a single collector\'s garment, hand-sewn in our Porto-Novo workshop.'
        },
        image: 'images/galerie/textile-4-bomber-patchwork.jpeg',
    },
    {
        id: 'g5',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Robe Indigo Rayée', en: 'Striped Indigo Dress' },
        description: {
            fr: 'Simplicité et caractère. Cette robe courte en tissu indigo à rayures blanches associe confort et identité culturelle.',
            en: 'Simplicity and character. This short indigo dress with white stripes combines comfort with cultural identity.'
        },
        image: 'images/galerie/textile-5-robe-indigo-rayee.jpeg',
    },
    {
        id: 'g6',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Duo Wax Orange & Bleu Marine', en: 'Orange & Navy Wax Duo' },
        description: {
            fr: 'Pour elle, une robe bustier asymétrique aux motifs explosifs. Pour lui, un ensemble short et t-shirt coordonné. Le wax comme langage d\'amour.',
            en: 'For her, an asymmetric bustier dress with vibrant patterns. For him, a coordinated shorts and t-shirt set. Wax as a love language.'
        },
        image: 'images/galerie/textile-6-duo-wax-orange-bleu.jpeg',
    },
    {
        id: 'g7',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Collection Indigo Coucher de Soleil', en: 'Sunset Indigo Collection' },
        description: {
            fr: 'Lui en ensemble boubou à carreaux indigo, elle en robe shibori aux grands cercles blancs. Deux silhouettes, une même âme.',
            en: 'Him in an indigo plaid boubou set, her in a shibori dress with large white circles. Two silhouettes, one shared soul.'
        },
        image: 'images/galerie/textile-7-collection-indigo-coucher-soleil.jpeg',
    },

    // ----- TRESSAGE -----
    {
        id: 'g8',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Chapeau Bohème Shibori & Dentelle', en: 'Bohemian Shibori & Lace Hat' },
        description: {
            fr: 'L\'alliance du tressage artisanal et du tissu shibori indigo, sublimée par une touche de dentelle ivoire. Pour la femme qui ose.',
            en: 'The union of artisanal weaving and indigo shibori fabric, enhanced with a touch of ivory lace. For the woman who dares.'
        },
        image: 'images/galerie/tressage-1-chapeau-boheme-shibori-dentelle.jpeg',
    },
    {
        id: 'g9',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Set Chapeau & Sac Rayures Marines', en: 'Striped Hat & Bag Set' },
        description: {
            fr: 'L\'harmonie parfaite entre le naturel et le marin. Ce duo chapeau-sac tressé en fibres naturelles aux rayures bleu, beige et blanc crème s\'invite aussi bien en ville qu\'à la plage.',
            en: 'A perfect harmony between natural and nautical. This woven hat-and-bag duo in blue, beige and cream stripes fits both city and beach.'
        },
        image: 'images/galerie/tressage-2-set-chapeau-sac-rayures.jpeg',
    },
    {
        id: 'g10',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Chapeau Canotier Shibori Bleu Roi', en: 'Royal Blue Shibori Boater Hat' },
        description: {
            fr: 'Élégance revisitée à l\'africaine. Ce canotier en paille naturelle est ceint d\'un ruban shibori bleu roi noué en nœud papillon.',
            en: 'Elegance reimagined the African way. This natural straw boater is wrapped in a royal blue shibori ribbon tied in a bow.'
        },
        image: 'images/galerie/tressage-3-chapeau-canotier-shibori-bleu.jpeg',
    },
    {
        id: 'g11',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Set Raphia & Indigo — Lumière Dorée', en: 'Raffia & Indigo Set — Golden Light' },
        description: {
            fr: 'Ce duo chapeau-sac en raphia tressé naturel avec nœud indigo incarne l\'artisanat béninois dans ce qu\'il a de plus pur. Un cadeau idéal.',
            en: 'This natural woven raffia hat-and-bag duo with an indigo bow embodies Beninese craftsmanship at its purest. An ideal gift.'
        },
        image: 'images/galerie/tressage-4-set-raphia-indigo-lumiere-doree.jpeg',
    },

    // ----- ACCESSOIRES -----
    {
        id: 'g12',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Tote Bag Bogolan Nuit', en: 'Night Bogolan Tote Bag' },
        description: {
            fr: 'Fond noir profond, motifs shibori et bogolan en blanc cassé — ce tote bag raconte une histoire. Spacieux, robuste, et résolument africain.',
            en: 'Deep black background with shibori and bogolan patterns in off-white — this tote bag tells a story. Spacious, sturdy, and distinctly African.'
        },
        image: 'images/galerie/accessoires-1-tote-bag-bogolan-nuit.jpeg',
    },
    {
        id: 'g13',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Kente Or & Bleu', en: 'Gold & Blue Kente Set' },
        description: {
            fr: 'La richesse du tissu kente dans un ensemble coordonné trois pièces : besace triangulaire, éventail circulaire et trousse zippée.',
            en: 'The richness of kente fabric in a coordinated three-piece set: triangular bag, round fan and zipped pouch.'
        },
        image: 'images/galerie/accessoires-2-set-kente-or-bleu.jpeg',
    },
    {
        id: 'g14',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Tote Bag Indigo Shibori + Éventail', en: 'Indigo Shibori Tote Bag + Fan' },
        description: {
            fr: 'Le bleu profond du shibori rencontre la précision du bogolan dans ce tote bag structuré, accompagné de son éventail circulaire assorti.',
            en: 'Deep shibori blue meets bogolan precision in this structured tote bag, paired with a matching circular fan.'
        },
        image: 'images/galerie/accessoires-3-tote-bag-indigo-eventail.jpeg',
    },
    {
        id: 'g15',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Sac & Sandales Shibori Indigo', en: 'Indigo Shibori Bag & Sandals Set' },
        description: {
            fr: 'Un duo coucher de soleil. Sac à main rigide en tissu raphia indigo avec fermoir doré, associé aux sandales frangées aux motifs tie-dye circulaires.',
            en: 'A sunset duo. A structured indigo raffia handbag with a gold clasp, paired with fringed sandals featuring circular tie-dye patterns.'
        },
        image: 'images/galerie/accessoires-4-set-sac-sandales-shibori.jpeg',
    },
    {
        id: 'g16',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Sac Bandoulière Indigo', en: 'Indigo Shoulder Bag' },
        description: {
            fr: 'Taillé dans un tissu raphia indigo shibori, ce sac bandoulière à rabat avec fermoir twist argenté allie élégance structurée et âme artisanale.',
            en: 'Crafted from indigo shibori raffia fabric, this flap shoulder bag with a silver twist clasp blends structured elegance with artisanal soul.'
        },
        image: 'images/galerie/accessoires-5-sac-bandouliere-indigo.jpeg',
    },
    {
        id: 'g17',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Kente Soleil', en: 'Sunshine Kente Set' },
        description: {
            fr: 'Tonalités chaudes de jaune moutarde, blanc et bleu — ce set trois pièces en tissu kente rayé illumine votre quotidien.',
            en: 'Warm tones of mustard yellow, white and blue — this three-piece striped kente set brightens your everyday look.'
        },
        image: 'images/galerie/accessoires-6-set-kente-soleil.jpeg',
    },
    {
        id: 'g18',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Tote Bag & Sandales Indigo Frangées', en: 'Indigo Tote & Fringed Sandals' },
        description: {
            fr: 'L\'indigo structuré du tote bag en raphia rencontre les sandales à double bride frangée aux motifs shibori. Sobriété et caractère réunis.',
            en: 'Structured indigo raffia tote meets double-strap fringed sandals with shibori patterns. Sobriety and character combined.'
        },
        image: 'images/galerie/accessoires-7-tote-sandales-indigo-frangees.jpeg',
    },

    // ----- TAPISSERIE -----
    {
        id: 'g19',
        category: 'tapisserie',
        categoryKey: 'categories.tapisserie',
        title: { fr: 'Éventails Circulaires Wax', en: 'Circular Wax Fans' },
        description: {
            fr: 'Deux éventails d\'exception : l\'un en wax rouge et blanc aux motifs abstraits, l\'autre en kente multicolore aux géométries vives. Objets d\'art autant qu\'accessoires.',
            en: 'Two exceptional fans: one in red and white wax with abstract patterns, the other in multicolored kente with vivid geometry. As much art as accessory.'
        },
        image: 'images/galerie/tapisserie-1-eventails-circulaires-wax.jpeg',
    },

    // ----- PARURES -----
    {
        id: 'g20',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure Blanche & Indigo — Grâce du Bord de Mer', en: 'White & Indigo Set — Seaside Grace' },
        description: {
            fr: 'Turban blanc, collier de perles bicolores, bracelets ivoire, sandales shibori et sac indigo structuré — chaque détail est une pièce de la parure complète.',
            en: 'White turban, two-tone beaded necklace, ivory bracelets, shibori sandals and a structured indigo bag — every detail forms part of the complete set.'
        },
        image: 'images/galerie/parures-1-parure-blanche-indigo.jpeg',
    },

    // ----- TEXTILE (suite) -----
    {
        id: 'g21',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Bomber Wax Tribal Rouge & Or', en: 'Red & Gold Tribal Wax Bomber' },
        description: {
            fr: 'Un duo de motifs saisissant : cercles XO entrelacés dorés sur fond noir d\'un côté, rayures verticales rouge et jaune zébrées de l\'autre. Ce bomber bicolore affirme une identité graphique forte.',
            en: 'A striking pair of patterns: interlocking gold XO circles on black on one side, zebra-streaked red and yellow stripes on the other. A bold two-tone bomber with a strong graphic identity.'
        },
        image: 'images/galerie/textile-8-bomber-wax-tribal-rouge-or.jpeg',
    },
    {
        id: 'g22',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Maillot Shibori Indigo', en: 'Indigo Shibori Swimsuit' },
        description: {
            fr: 'Maillot de bain une pièce en tissu shibori indigo, mêlant pois délicats et cercles tie-dye. Élégant et couvrant, il s\'accorde naturellement avec le chapeau et le sac tressé pour un look plage complet.',
            en: 'One-piece swimsuit in indigo shibori fabric, blending delicate dots with tie-dye circles. Elegant and flattering, it pairs naturally with the woven hat and bag for a complete beach look.'
        },
        image: 'images/galerie/textile-9-maillot-shibori-indigo.jpeg',
    },

    // ----- TRESSAGE (suite) -----
    {
        id: 'g23',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Robe Marinière & Set Tressé Indigo', en: 'Striped Dress & Indigo Woven Set' },
        description: {
            fr: 'Robe rayée bleu marine et blanc, portée avec un chapeau à ruban shibori noué et un sac tressé assorti. Un look complet qui marie la rigueur de la marinière à la douceur artisanale du tressage béninois.',
            en: 'Navy and white striped dress paired with a shibori-ribboned hat and a matching woven bag. A complete look blending nautical stripes with the softness of Beninese artisanal weaving.'
        },
        image: 'images/galerie/tressage-5-robe-mariniere-set-tresse-indigo.jpeg',
    },

    // ----- ACCESSOIRES (suite) -----
    {
        id: 'g24',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Complet Kente Soleil — Sac, Pochette, Trousse & Bandoulière', en: 'Complete Sunshine Kente Set — Bag, Pouch, Case & Strap' },
        description: {
            fr: 'L\'ensemble ultime en tissu kente jaune moutarde et bleu : sac à main à poignée, pochette zippée, trousse et bandoulière détachable — tous coordonnés, tous indispensables.',
            en: 'The ultimate set in mustard yellow and blue kente fabric: handle bag, zipped pouch, case and detachable strap — all coordinated, all essential.'
        },
        image: 'images/galerie/accessoires-8-set-complet-kente-soleil.jpeg',
    },
    {
        id: 'g25',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Tote Bag Lin Indigo & Coins Shibori', en: 'Indigo Linen Tote with Shibori Corners' },
        description: {
            fr: 'Sobriété et raffinement : ce tote bag en lin indigo tissé serré est rehaussé de coins en tissu shibori délavé à la main. Une pièce intemporelle.',
            en: 'Understated and refined: this tightly woven indigo linen tote is enhanced with hand-faded shibori fabric corners. A timeless piece.'
        },
        image: 'images/galerie/accessoires-9-tote-bag-lin-indigo-coins-shibori.jpeg',
    },
    {
        id: 'g26',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Chapeau & Sac Paille Dorée — Ruban Shibori & Dentelle', en: 'Golden Straw Hat & Bag Set — Shibori Ribbon & Lace' },
        description: {
            fr: 'La paille dorée rencontre le raffinement : ce duo chapeau-sac est ceint d\'un ruban shibori indigo agrémenté de dentelle ivoire. Une pièce romantique pour sublimer chaque sortie d\'été.',
            en: 'Golden straw meets refinement: this hat-and-bag duo is wrapped in an indigo shibori ribbon accented with ivory lace. A romantic piece for every summer outing.'
        },
        image: 'images/galerie/accessoires-10-set-chapeau-sac-paille-doree.jpeg',
    },
    {
        id: 'g27',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Sac & Chapeau Rayures Marines — Lumière du Soir', en: 'Navy Striped Bag & Hat Set — Evening Light' },
        description: {
            fr: 'Capturé au coucher du soleil, ce duo tressé aux rayures bleu marine, beige et crème, agrémenté d\'un nœud shibori, incarne l\'élégance décontractée du bord de mer.',
            en: 'Captured at sunset, this woven duo in navy, beige and cream stripes, finished with a shibori bow, embodies relaxed seaside elegance.'
        },
        image: 'images/galerie/accessoires-11-set-sac-chapeau-rayures-marines.jpeg',
    },

    // ----- PARURES (suite) -----
    {
        id: 'g28',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Duo Touareg Indigo & Argent', en: 'Indigo & Silver Touareg Duo' },
        description: {
            fr: 'Un couple en tenue traditionnelle indigo à motifs tartan, sublimé par une parure d\'argent saisissante : chapeaux canotiers à ruban brodé, colliers superposés, bracelets manchettes massifs et canne à pommeau d\'argent. Chaque bijou raconte l\'héritage de l\'orfèvrerie sahélienne.',
            en: 'A couple in traditional indigo tartan dress, elevated by striking silver jewelry: embroidered-band boater hats, layered necklaces, bold cuff bracelets and a silver-topped cane. Each piece tells the story of Sahelian silversmithing heritage.'
        },
        image: 'images/galerie/parures-2-duo-touareg-indigo-argent.jpeg',
    },
    {
        id: 'g29',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Fratrie en Wax & Shibori — Cérémonie Royale', en: 'Siblings in Wax & Shibori — Royal Ceremony' },
        description: {
            fr: 'Quatre enfants en tenue cérémonielle : pagnes shibori indigo aux motifs circulaires, hauts wax rayés rouge, jaune et noir, couronnes brodées et cannes royales. Colliers de perles blanches, oranges et ambrées superposés sur chaque enfant. Une parure complète qui célèbre les rites de passage et l\'héritage royal béninois dès le plus jeune âge.',
            en: 'Four children in ceremonial dress: indigo shibori wraps with circular patterns, red, yellow and black striped wax tops, embroidered crowns and royal canes. Layered white, orange and amber bead necklaces on each child. A complete set celebrating Beninese royal heritage and rites of passage from a young age.'
        },
        image: 'images/galerie/parures-3-fratrie-wax-shibori-ceremonie.jpeg',
    },
    {
        id: 'g30',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure Royale Akwamu — Argent & Wax', en: 'Akwamu Royal Set — Silver & Wax' },
        description: {
            fr: 'Coiffe enroulée aux couleurs vives ornée de pampons fluo, multiples colliers en chaînes argentées à pampilles et perles, larges bracelets manchettes en argent et sceptre cérémoniel. Portée sur un pagne wax aux armoiries royales, cette parure incarne le prestige et l\'autorité traditionnelle.',
            en: 'A vividly wrapped headpiece with neon tassels, layered silver chain necklaces with charms and beads, wide silver cuff bracelets and a ceremonial scepter. Worn over a wax wrap with royal emblems, this set embodies traditional prestige and authority.'
        },
        image: 'images/galerie/parures-4-parure-royale-akwamu-argent.jpeg',
    },
    {
        id: 'g31',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure Corail & Argent', en: 'Coral & Silver Set' },
        description: {
            fr: 'Couronne royale brodée, longs colliers de perles de corail rouge et blanches superposées, bracelets manchettes en argent massif et canne cérémonielle. Portée sur une robe bandeau à motifs géométriques gris et jaune, cette parure marie sobriété vestimentaire et richesse ornementale.',
            en: 'An embroidered royal crown, long layered red coral and white bead necklaces, solid silver cuff bracelets and a ceremonial cane. Worn over a grey and yellow geometric bandeau dress, this set blends understated clothing with ornamental richness.'
        },
        image: 'images/galerie/parures-5-parure-corail-argent.jpeg',
    },
    {
        id: 'g32',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure Kente Corail', en: 'Coral Kente Set' },
        description: {
            fr: 'Turban kente assorti à perles dorées, longs sautoirs de perles de corail et blanches en plusieurs rangs, bracelets coordonnés. L\'ensemble accompagne une tenue kente vive aux motifs triangulaires multicolores, pour une allure de princesse africaine intemporelle.',
            en: 'A matching kente turban with gold beads, long multi-strand coral and white bead necklaces, coordinated bracelets. The set pairs with a vivid kente outfit in multicolored triangular patterns, for a timeless African princess look.'
        },
        image: 'images/galerie/parures-6-parure-kente-corail.jpeg',
    },

    // ----- ACCESSOIRES (suite) -----
    {
        id: 'g33',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Chapeau & Sandales Mosaïque', en: 'Mosaic Hat & Sandals Set' },
        description: {
            fr: 'Chapeau en paille tressée à large bord, ceint d\'un ruban indigo, assorti à des sandales tressées au motif mosaïque coloré (turquoise, corail, lilas). Un duo estival qui marie le naturel de la paille à l\'éclat du tissu imprimé.',
            en: 'A wide-brimmed woven straw hat with an indigo band, matched with woven sandals featuring a colorful mosaic pattern (turquoise, coral, lilac). A summer duo blending natural straw with vibrant printed fabric.'
        },
        image: 'images/galerie/accessoires-12-set-chapeau-sandales-mosaique.jpeg',
    },
    {
        id: 'g34',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Sandales Bois & Wax Bogolan', en: 'Wooden Sandals with Bogolan Wax' },
        description: {
            fr: 'Sandales à semelle en bois naturel et brides en tissu wax bogolan noir, orange et blanc, fermées par une boucle métallique dorée. Une pièce artisanale robuste qui marie le confort du bois à l\'éclat du wax.',
            en: 'Sandals with a natural wood sole and black, orange and white bogolan wax straps, closed with a gold metal buckle. A sturdy artisanal piece blending the comfort of wood with the brightness of wax fabric.'
        },
        image: 'images/galerie/accessoires-13-sandales-bois-bogolan-orange.jpeg',
    },
    {
        id: 'g35',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Sandales Plates Wax Tricolore', en: 'Flat Tricolor Wax Sandals' },
        description: {
            fr: 'Sandales plates noires à brides en tissu wax tissé aux couleurs panafricaines — rouge, jaune et vert. Confortables et colorées, elles s\'imposent comme l\'accessoire idéal pour twister une tenue du quotidien.',
            en: 'Flat black sandals with woven wax straps in Pan-African colors — red, yellow and green. Comfortable and colorful, the ideal accessory to twist up an everyday outfit.'
        },
        image: 'images/galerie/accessoires-14-sandales-plates-tricolores.jpeg',
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

// Carte Galerie : présente la création (sans prix ni panier)
function createGalerieCard(item) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'galerie-card';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
        <div class="card-image">
            ${item.image
                ? `<img src="${item.image}" alt="${escapeHTML(item.title[lang])}" loading="lazy">`
                : `<div class="card-placeholder"><i class="fas fa-image"></i></div>`
            }
            <div class="card-overlay">
                <a href="#" class="overlay-btn">${t('card.details')}</a>
            </div>
        </div>
        <div class="card-content">
            <span class="card-category">${t(item.categoryKey)}</span>
            <h3>${escapeHTML(item.title[lang])}</h3>
            <p>${escapeHTML(item.description[lang])}</p>
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
    const filteredItems = state.activeFilter === 'all' 
        ? galerieItems 
        : galerieItems.filter(p => p.category === state.activeFilter);
    
    if (filteredItems.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#8A7B6A; padding:40px;">Aucune création dans cette catégorie pour le moment.</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        grid.appendChild(createGalerieCard(item));
    });
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
// ============================================
// KKIAPAY - CONFIGURATION ET PAIEMENT
// ============================================

// ═══════════════════════════════════════════════════════
// 1️⃣ CONFIGURATION (À modifier selon vos besoins)
// ═══════════════════════════════════════════════════════

const KKIAY_CONFIG = {
    // 🔑 MODE : 'sandbox' pour tester, 'production' pour les vrais paiements
    mode: 'sandbox',  // ← Changez en 'production' quand vous êtes prêt
    
    // 🔑 Vos clés API (à récupérer sur dashboard KkiaPay)
    keys: {
        sandbox: 'c9aca120697511f1b660498c06465ad7',   // Clé publique sandbox Cabane des Arts
        production: 'live_pk_votre_cle_reelle'          // ← À remplacer par votre clé production
    },
    
    // 💰 Commission appliquée
    commission: 2.9, // 2.9%
    
    // 📱 Numéros de test (sandbox) - numéros officiels KkiaPay
    testPhones: {
        mtn: '61000000',      // MTN Bénin - succès immédiat
        moov: '68000000',     // Moov Bénin - succès immédiat
        celtiis: '61000000',  // Celtiis non listé par KkiaPay, on retombe sur MTN succès immédiat
        pin: '0000'
    },
    
    // 🏪 Informations boutique
    shop: {
        name: 'La Cabane des Arts',
        description: 'Artisanat traditionnel du Bénin'
    }
};

// ═══════════════════════════════════════════════════════
// 2️⃣ FONCTION DE PAIEMENT PRINCIPALE
// ═══════════════════════════════════════════════════════

/**
 * Ouvre la fenêtre de paiement KkiaPay
 * @param {number} amount - Montant à payer en FCFA
 * @param {string} phone - Numéro de téléphone du client
 * @param {string} email - Email du client
 * @param {string} name - Nom du client
 * @param {string} description - Description de la commande
 * @returns {Promise} - Promesse résolue avec la réponse de KkiaPay
 */
function openKkiapayPayment(amount, phone, email, name, description = '') {
    return new Promise((resolve, reject) => {
        // Vérifier que le SDK est chargé
        if (typeof openKkiapayWidget === 'undefined') {
            showToast('❌ Le service de paiement est temporairement indisponible.', 'error');
            reject(new Error('KkiaPay SDK non chargé'));
            return;
        }
        
        // Vérifier que le montant est valide
        if (amount <= 0) {
            showToast('❌ Le montant doit être supérieur à 0 FCFA.', 'error');
            reject(new Error('Montant invalide'));
            return;
        }
        
        // Récupérer la clé API selon le mode
        const apiKey = KKIAY_CONFIG.mode === 'production' 
            ? KKIAY_CONFIG.keys.production 
            : KKIAY_CONFIG.keys.sandbox;
        
        // Vérifier que la clé est configurée
        if (!apiKey || apiKey.includes('votre_cle')) {
            showToast('⚠️ Configuration de paiement en cours. Veuillez réessayer plus tard.', 'error');
            reject(new Error('Clé API non configurée'));
            return;
        }
        
        const isSandbox = KKIAY_CONFIG.mode === 'sandbox';
        
        console.log(`💳 Paiement KkiaPay - Mode: ${KKIAY_CONFIG.mode}`);
        console.log(`💳 Montant: ${amount} FCFA`);
        console.log(`📱 Téléphone: ${phone}`);

        // Écouter le succès du paiement
        function onSuccess(response) {
            console.log('✅ Réponse KkiaPay:', response);
            removeKkiapayListeners();
            showToast('✅ Paiement réussi ! Merci pour votre commande.', 'success');
            resolve(response);
        }

        // Écouter l'échec du paiement
        function onFailed(error) {
            console.log('❌ Échec KkiaPay:', error);
            removeKkiapayListeners();
            showToast('❌ Le paiement a échoué. Veuillez réessayer.', 'error');
            reject(new Error('Paiement échoué'));
        }

        // Supprimer les écouteurs après usage
        function removeKkiapayListeners() {
            removeKkiapayListener('failed', onFailed);
            removeKkiapayListener('success', onSuccess);
        }

        // Ajouter les écouteurs d'événements KkiaPay
        addKkiapayListener('success', onSuccess);
        addKkiapayListener('failed', onFailed);
        
        try {
            // Ouvrir le widget KkiaPay (nouvelle API)
            openKkiapayWidget({
                amount: amount,
                key: apiKey,
                sandbox: isSandbox,
                phone: phone,
                email: email,
                name: name,
                data: description || `Commande ${name}`
            });
        } catch (error) {
            console.error('❌ Erreur KkiaPay:', error);
            removeKkiapayListeners();
            showToast('❌ Une erreur est survenue lors du paiement.', 'error');
            reject(error);
        }
    });
}

// ═══════════════════════════════════════════════════════
// 3️⃣ INTÉGRATION AVEC LE PANIER
// ═══════════════════════════════════════════════════════

/**
 * Traite le paiement du panier via KkiaPay
 * @param {Object} orderData - Données de la commande
 */
async function processCartPayment(orderData) {
    try {
        // Calculer le total du panier
        const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (total <= 0) {
            showToast('❌ Votre panier est vide.', 'error');
            return false;
        }
        
        // Vérifier que les coordonnées sont valides
        if (!orderData.telephone || orderData.telephone.length < 8) {
            showToast('❌ Veuillez entrer un numéro de téléphone valide.', 'error');
            return false;
        }
        
        // Vérifier que l'email est valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(orderData.email)) {
            showToast('❌ Veuillez entrer une adresse email valide.', 'error');
            return false;
        }
        
        // Créer la description de la commande
        const itemsDescription = state.cart
            .map(item => `${item.name} x${item.quantity}`)
            .join(', ');
        const description = `${orderData.nom} - ${itemsDescription}`;
        
        // Ouvrir le paiement KkiaPay
        const response = await openKkiapayPayment(
            total,
            orderData.telephone,
            orderData.email,
            orderData.nom,
            description
        );
        
        if (response && response.transactionId) {
            // Paiement réussi - finaliser la commande
            await finalizeOrderWithPayment(orderData, response);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ Erreur paiement:', error);
        // L'erreur est déjà affichée par openKkiapayPayment
        return false;
    }
}

/**
 * Finalise la commande après un paiement réussi
 */
async function finalizeOrderWithPayment(orderData, paymentResponse) {
    try {
        const articles = state.cart.map(item => ({
            id: item.id,
            titre: item.name,
            prix: item.price,
            quantite: item.quantity
        }));
        
        const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderPayload = {
            nom: orderData.nom,
            email: orderData.email,
            telephone: orderData.telephone,
            adresse: orderData.adresse || '',
            livraison: orderData.livraison || 'pickup',
            paiement: 'kkiapay',
            articles: articles,
            total: total,
            transactionId: paymentResponse.transactionId,
            statut_paiement: 'payé'
        };
        
        console.log('📦 Envoi de la commande:', orderPayload);
        
        const res = await fetch(`${API_URL}/commandes/paiement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });
        
        const data = await res.json();
        
        if (res.ok) {
            showToast('✅ Commande confirmée ! Vous recevrez un email de confirmation.', 'success');
            
            // Vider le panier
            state.cart = [];
            saveCart();
            renderCart();
            
            // Fermer le modal de checkout
            closeCheckoutModal();
            
            // Rediriger vers la page de confirmation ou d'accueil
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            
        } else {
            showToast('⚠️ Paiement réussi mais erreur lors de la finalisation. Contactez-nous.', 'error');
            console.error('Erreur finalisation:', data);
        }
        
    } catch (error) {
        console.error('❌ Erreur finalisation:', error);
        showToast('⚠️ Paiement réussi mais erreur de sauvegarde. Contactez-nous.', 'error');
    }
}

// ═══════════════════════════════════════════════════════
// 4️⃣ BOUTON DE TEST (mode sandbox uniquement)
// ═══════════════════════════════════════════════════════

/**
 * Ajoute un bouton de test en mode sandbox
 */
function addKkiapayTestButton() {
    if (KKIAY_CONFIG.mode !== 'sandbox') return;
    
    const testBtn = document.createElement('div');
    testBtn.id = 'kkiapay-test-btn';
    testBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        z-index: 9999;
        background: linear-gradient(135deg, #B5561A, #C8922A);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 12px 18px;
        cursor: pointer;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(181,86,26,0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    testBtn.innerHTML = `
        <span>🧪</span>
        <span>Test KkiaPay (Sandbox)</span>
    `;
    testBtn.title = 'Cliquez pour tester le paiement KkiaPay en mode sandbox';
    
    testBtn.onmouseover = () => {
        testBtn.style.transform = 'scale(1.05)';
        testBtn.style.boxShadow = '0 6px 28px rgba(181,86,26,0.5)';
    };
    testBtn.onmouseout = () => {
        testBtn.style.transform = 'scale(1)';
        testBtn.style.boxShadow = '0 4px 20px rgba(181,86,26,0.4)';
    };
    
    testBtn.onclick = async () => {
        const testAmount = 5000;
        const testPhone = KKIAY_CONFIG.testPhones.mtn;
        const testEmail = 'test@cabanedesarts.bj';
        const testName = 'Client Test';
        
        const confirmTest = confirm(
            `🧪 TEST KKIAPAY - MODE SANDBOX 🧪\n\n` +
            `💰 Montant : ${formatPrice(testAmount)}\n` +
            `📱 Téléphone : ${testPhone}\n` +
            `🔑 Code PIN : 0000\n\n` +
            `⚠️ Aucun argent réel ne sera débité.\n` +
            `✅ Ce test est 100% gratuit.\n\n` +
            `Voulez-vous continuer ?`
        );
        
        if (!confirmTest) return;
        
        try {
            const response = await openKkiapayPayment(
                testAmount,
                testPhone,
                testEmail,
                testName,
                'Test de paiement Cabane des Arts'
            );
            
            if (response && response.transactionId) {
                alert(
                    `✅ TEST RÉUSSI ! ✅\n\n` +
                    `Transaction ID : ${response.transactionId}\n` +
                    `Montant : ${formatPrice(testAmount)}\n` +
                    `Mode : Sandbox\n\n` +
                    `💡 Vous pouvez maintenant passer en production !`
                );
            }
        } catch (error) {
            if (error.message === 'Paiement annulé') {
                console.log('Test annulé par l\'utilisateur');
            } else {
                alert(`❌ Erreur lors du test : ${error.message}`);
            }
        }
    };
    
    document.body.appendChild(testBtn);
    
    // Ajouter un indicateur de mode
    const indicator = document.createElement('div');
    indicator.id = 'kkiapay-sandbox-indicator';
    indicator.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 20px;
        z-index: 9998;
        background: rgba(0,0,0,0.7);
        color: #F9E79F;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 10px;
        font-family: 'DM Sans', sans-serif;
        font-weight: 600;
        letter-spacing: 1px;
    `;
    indicator.textContent = '🧪 SANDBOX';
    document.body.appendChild(indicator);
}

// ═══════════════════════════════════════════════════════
// 5️⃣ MODIFICATION DU CHECKOUT (intégration avec le formulaire)
// ═══════════════════════════════════════════════════════

/**
 * Gère la soumission du formulaire de checkout avec KkiaPay
 */
async function handleCheckoutWithKkiaPay(event) {
    if (event) event.preventDefault();
    
    if (state.cart.length === 0) {
        showToast('❌ Votre panier est vide.', 'error');
        return;
    }
    
    // Récupérer les données du formulaire
    const nom = document.getElementById('checkoutName')?.value.trim();
    const email = document.getElementById('checkoutEmail')?.value.trim();
    const telephone = document.getElementById('checkoutPhone')?.value.trim();
    const adresse = document.getElementById('checkoutAddress')?.value.trim();
    const livraison = document.getElementById('checkoutDelivery')?.value;
    
    // Validation des champs
    if (!nom || !email || !telephone) {
        showToast('❌ Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('❌ Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Afficher un message de chargement
    const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
    const originalText = submitBtn?.innerHTML || 'Payer';
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
        submitBtn.disabled = true;
    }
    
    try {
        const orderData = {
            nom,
            email,
            telephone,
            adresse: adresse || '',
            livraison: livraison || 'pickup'
        };
        
        const result = await processCartPayment(orderData);
        
        if (result) {
            // Succès - le panier est vidé et le modal fermé par processCartPayment
        }
        
    } catch (error) {
        console.error('❌ Erreur checkout:', error);
        showToast('❌ Une erreur est survenue. Veuillez réessayer.', 'error');
    } finally {
        // Réactiver le bouton
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
}

// ═══════════════════════════════════════════════════════
// 6️⃣ INITIALISATION
// ═══════════════════════════════════════════════════════

function initKkiapay() {
    console.log('💳 KkiaPay initialisé - Mode:', KKIAY_CONFIG.mode);
    
    if (KKIAY_CONFIG.mode === 'sandbox') {
        console.log('🧪 Mode SANDBOX actif');
        console.log('📞 Numéros de test:', KKIAY_CONFIG.testPhones);
        console.log('🔑 PIN de test: 0000');
        console.log('💡 Utilisez le bouton de test en bas à droite');
        
        // Ajouter le bouton de test en mode sandbox
        setTimeout(addKkiapayTestButton, 2000);
    } else {
        console.log('🔒 Mode PRODUCTION actif - Les paiements sont réels');
    }
    
    // Modifier le formulaire de checkout pour utiliser KkiaPay
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        // Remplacer l'ancien submit par notre gestionnaire
        const newForm = checkoutForm.cloneNode(true);
        checkoutForm.parentNode.replaceChild(newForm, checkoutForm);
        
        newForm.addEventListener('submit', handleCheckoutWithKkiaPay);
        console.log('✅ Formulaire checkout lié à KkiaPay');
    }
}

// Initialiser KkiaPay après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Le SDK KkiaPay actuel expose window.openKkiapayWidget (pas window.kkiapay)
    if (typeof openKkiapayWidget !== 'undefined') {
        initKkiapay();
    } else {
        // Attendre le chargement du SDK
        const checkKkiapay = setInterval(() => {
            if (typeof openKkiapayWidget !== 'undefined') {
                clearInterval(checkKkiapay);
                initKkiapay();
            }
        }, 500);
        
        // Timeout après 10 secondes
        setTimeout(() => {
            clearInterval(checkKkiapay);
            if (typeof openKkiapayWidget === 'undefined') {
                console.warn('⚠️ KkiaPay SDK non chargé après 10s');
            }
        }, 10000);
    }
});