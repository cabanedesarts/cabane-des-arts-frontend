/* ============================================
   LA CABANE DES ARTS - JAVASCRIPT PRINCIPAL
   VERSION PROFESSIONNELLE - AVEC DÉCOUVERTE
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

// ===== DONNÉES DES MATIÈRES PREMIÈRES (PAGE DÉCOUVERTE) =====
const matieresData = [
    {
        id: 'indigo',
        nom: { fr: 'Indigo', en: 'Indigo' },
        origine: { fr: 'Bénin - Région de Ouidah', en: 'Benin - Ouidah region' },
        description: {
            fr: "L'indigo est une teinture naturelle ancestrale, obtenue à partir des feuilles de l'indigotier. Au Bénin, sa fabrication est un savoir-faire transmis de génération en génération. Les feuilles sont fermentées puis oxydées pour révéler leur bleu profond, unique et intemporel. Cette teinture naturelle donne aux tissus une couleur qui s'intensifie avec le temps, comme un vin qui se bonifie.",
            en: "Indigo is an ancestral natural dye, obtained from the leaves of the indigo plant. In Benin, its production is a know-how passed down through generations. The leaves are fermented then oxidized to reveal their deep, unique and timeless blue. This natural dye gives fabrics a color that intensifies over time, like a wine that improves with age."
        },
        utilisations: ['Textile', 'Teinture', 'Création artisanale'],
        image: 'images/matieres/indigo.jpg',
        badge: { fr: 'Naturel', en: 'Natural' }
    },
    {
        id: 'raphia',
        nom: { fr: 'Raphia', en: 'Raffia' },
        origine: { fr: 'Bénin - Communautés lacustres', en: 'Benin - Lakeside communities' },
        description: {
            fr: "Le raphia est une fibre végétale issue du palmier à raphia. Dans les communautés lacustres du Bénin, comme les Aguégués, son tressage est un art millénaire. Les feuilles sont cueillies, séchées puis patiemment tressées à la main. Chaque panier, chaque chapeau raconte une histoire de patience et de transmission. Léger, résistant et biodégradable, le raphia est une matière noble et durable.",
            en: "Raffia is a plant fiber from the raffia palm. In the lakeside communities of Benin, such as the Aguégués, its weaving is a thousand-year-old art. The leaves are harvested, dried and patiently woven by hand. Each basket, each hat tells a story of patience and transmission. Light, resistant and biodegradable, raffia is a noble and sustainable material."
        },
        utilisations: ['Vannerie', 'Accessoires', 'Chapeaux'],
        image: 'images/matieres/raphia.jpg',
        badge: { fr: 'Biodegradable', en: 'Biodegradable' }
    },
    {
        id: 'wax',
        nom: { fr: 'Wax', en: 'Wax Fabric' },
        origine: { fr: 'Afrique de l\'Ouest - Bénin', en: 'West Africa - Benin' },
        description: {
            fr: "Le wax est bien plus qu'un simple tissu imprimé. C'est un véritable langage visuel, un moyen d'expression culturelle. Au Bénin, les motifs wax racontent des histoires, transmettent des proverbes, célèbrent des événements. Chaque motif a une signification profonde. Nos artisans sélectionnent avec soin des wax authentiques pour créer des pièces uniques qui portent en elles la mémoire et la fierté de tout un peuple.",
            en: "Wax is much more than just a printed fabric. It is a true visual language, a means of cultural expression. In Benin, wax patterns tell stories, convey proverbs, celebrate events. Each pattern has a deep meaning. Our artisans carefully select authentic wax to create unique pieces that carry the memory and pride of an entire people."
        },
        utilisations: ['Textile', 'Mode', 'Accessoires'],
        image: 'images/matieres/wax.jpg',
        badge: { fr: 'Culturel', en: 'Cultural' }
    },
    {
        id: 'perles',
        nom: { fr: 'Perles de verre', en: 'Glass Beads' },
        origine: { fr: 'Bénin - Parures traditionnelles', en: 'Benin - Traditional adornments' },
        description: {
            fr: "Les perles de verre sont des joyaux de l'artisanat béninois. Elles ont longtemps servi de monnaie d'échange avant de devenir des parures précieuses. Transmises de mère en fille, elles symbolisent la fertilité, la protection et le rang social. Nos artisans perpétuent cet art millénaire en créant des bijoux et des accessoires qui allient tradition et modernité. Chaque perle est unique, comme chaque histoire qu'elle porte.",
            en: "Glass beads are jewels of Beninese craftsmanship. They long served as a means of exchange before becoming precious ornaments. Passed from mother to daughter, they symbolize fertility, protection and social status. Our artisans perpetuate this thousand-year-old art by creating jewelry and accessories that combine tradition and modernity. Each bead is unique, like each story it carries."
        },
        utilisations: ['Bijoux', 'Parures', 'Accessoires'],
        image: 'images/matieres/perles.jpg',
        badge: { fr: 'Artisanal', en: 'Artisanal' }
    },
    {
        id: 'bogolan',
        nom: { fr: 'Bogolan', en: 'Bogolan' },
        origine: { fr: 'Afrique de l\'Ouest - Mali/Bénin', en: 'West Africa - Mali/Benin' },
        description: {
            fr: "Le bogolan est un tissu traditionnel ouest-africain teint à la boue. Ses motifs géométriques noirs et blancs racontent des histoires de sagesse, de courage et de spiritualité. Au Bénin, cette technique ancestrale est revisitée par nos artisans pour créer des pièces contemporaines. Le bogolan est un tissu vivant, qui s'assouplit et se patine avec le temps, comme un livre qui s'ouvre au fil des pages.",
            en: "Bogolan is a traditional West African fabric dyed with mud. Its black and white geometric patterns tell stories of wisdom, courage and spirituality. In Benin, this ancestral technique is revisited by our artisans to create contemporary pieces. Bogolan is a living fabric that softens and develops a patina over time, like a book that opens page by page."
        },
        utilisations: ['Textile', 'Accessoires', 'Décoration'],
        image: 'images/matieres/bogolan.jpg',
        badge: { fr: 'Traditionnel', en: 'Traditional' }
    },
    {
        id: 'cauris',
        nom: { fr: 'Cauris', en: 'Cowrie Shells' },
        origine: { fr: 'Afrique - Symbole ancestral', en: 'Africa - Ancestral symbol' },
        description: {
            fr: "Les cauris sont de petits coquillages qui ont traversé les siècles comme monnaie d'échange, symboles de fertilité et de protection. Au Bénin, ils ornent les parures royales et les tenues de cérémonie. Nos artisans intègrent ces trésors de la mer dans des bijoux et accessoires contemporains, pour que chaque pièce porte en elle un morceau d'histoire et de spiritualité.",
            en: "Cowrie shells are small shells that have crossed the centuries as currency, symbols of fertility and protection. In Benin, they adorn royal regalia and ceremonial outfits. Our artisans incorporate these treasures of the sea into contemporary jewelry and accessories, so that each piece carries a piece of history and spirituality."
        },
        utilisations: ['Bijoux', 'Parures', 'Accessoires'],
        image: 'images/matieres/cauris.jpg',
        badge: { fr: 'Symbolique', en: 'Symbolic' }
    }
];

// ===== DONNÉES DES PRODUITS =====
const disciplineStories = {
    textile: {
        title: { fr: "L'art de l'indigo", en: 'The art of indigo' },
        text: {
            fr: "Le bleu profond de l'indigo raconte une histoire vieille de plusieurs siècles en Afrique de l'Ouest. Au Bénin, cette teinture est intimement liée à la région de Ouidah, où des familles de teinturiers perpétuent un savoir ancestral : les feuilles d'indigotier sont fermentées puis appliquées sur le tissu selon des techniques de réserve transmises de génération en génération. Porter de l'indigo, c'est porter un peu de cette fierté culturelle béninoise, longtemps réservée aux étoffes de prestige.",
            en: "The deep blue of indigo carries a story centuries old in West Africa. In Benin, this dye is closely tied to the Ouidah region, where families of dyers keep an ancestral knowledge alive: indigo leaves are fermented and then applied to fabric using resist techniques passed down through generations. Wearing indigo means carrying a piece of this Beninese cultural pride, long reserved for prestige cloth.",
        },
        personalNote: { fr: '', en: '' },
    },
    tressage: {
        title: { fr: 'La mémoire du tressage', en: 'The memory of weaving' },
        text: {
            fr: "Au Bénin, tresser le raphia est un geste hérité des communautés lacustres comme les Aguégués, où ce savoir-faire se transmet de génération en génération. Chaque brin est choisi, séché, puis patiemment entrelacé à la main : un geste lent qui demande des années de pratique pour devenir un art. Au-delà de l'objet, c'est toute une économie locale qui se tisse — la vannerie reste aujourd'hui un véritable moteur d'autonomisation pour de nombreux artisans béninois.",
            en: "In Benin, weaving raffia is a gesture inherited from lakeside communities such as the Aguégués, where this know-how is passed down through generations. Each strand is chosen, dried, then patiently woven by hand — a slow gesture that takes years of practice to master. Beyond the object itself, an entire local economy is woven too: basketry remains a genuine engine of empowerment for many Beninese artisans.",
        },
        personalNote: { fr: '', en: '' },
    },
    accessoires: {
        title: { fr: 'Perles, mémoire et matière', en: 'Beads, memory and material' },
        text: {
            fr: "Perles, cuir, fibres naturelles : nos accessoires puisent dans des matériaux que les artisans d'Afrique de l'Ouest travaillent depuis des siècles. Le long des côtes du golfe du Bénin, les perles ont longtemps servi de monnaie d'échange avant de devenir des parures précieuses, transmises de mère en fille. Chaque accessoire que nous proposons s'inspire de ce geste patient, pensé pour durer et pour raconter une histoire à chaque fois qu'on le porte.",
            en: "Beads, leather, natural fibers: our accessories draw on materials that West African artisans have worked with for centuries. Along the coasts of the Bight of Benin, beads long served as a means of exchange before becoming treasured ornaments, passed from mother to daughter. Every accessory we offer is inspired by this patient gesture, made to last and to tell a story each time it's worn.",
        },
        personalNote: { fr: '', en: '' },
    },
    tapisserie: {
        title: { fr: "L'héritage des tentures d'Abomey", en: 'The legacy of Abomey tapestries' },
        text: {
            fr: "Cette technique trouve ses racines dans les tentures royales d'Abomey, berceau de l'ancien royaume du Danxomè. Depuis le XVIIIe siècle, les artisans de cette cité historique cousent des motifs colorés sur la toile pour raconter une histoire : un roi, un exploit, un symbole de pouvoir. Chaque association de couleurs et de formes a un sens précis en langue Fon — rien n'est laissé au hasard. En faisant vivre cet art dans nos créations, nous gardons vivante une mémoire visuelle aujourd'hui reconnue comme un trésor du patrimoine béninois.",
            en: "This technique is rooted in the royal tapestries of Abomey, cradle of the former kingdom of Danxomè. Since the 18th century, artisans of this historic city have stitched colorful motifs onto cloth to tell a story: a king, a feat, a symbol of power. Every combination of colors and shapes carries a precise meaning in the Fon language — nothing is left to chance. By keeping this art alive in our creations, we preserve a visual memory now recognized as a treasure of Beninese heritage.",
        },
        personalNote: { fr: '', en: '' },
    },
    parures: {
        title: { fr: 'Le langage des parures royales', en: 'The language of royal regalia' },
        text: {
            fr: "Au Bénin, perles et cauris ne sont jamais de simples ornements. Dans les cérémonies traditionnelles, chaque élément porté — couleur du pagne, disposition des perles, présence de cauris — traduit un rang, une histoire, une protection. Le cauri lui-même a longtemps servi de monnaie avant de devenir un symbole de richesse, de fécondité et de lien avec les ancêtres. Porter une parure inspirée de ces traditions, c'est porter un fragment de cette mémoire symbolique transmise depuis les cours royales.",
            en: "In Benin, beads and cowrie shells are never mere ornaments. In traditional ceremonies, every element worn — the color of a wrap, the arrangement of beads, the presence of cowries — conveys rank, history, protection. The cowrie shell itself long served as currency before becoming a symbol of wealth, fertility, and connection to the ancestors. Wearing regalia inspired by these traditions means carrying a fragment of this symbolic memory, handed down from the royal courts.",
        },
        personalNote: { fr: '', en: '' },
    },
};

// ===== HISTOIRES DES UTILISATIONS (tags cliquables sous les matières) =====
const usageStories = {
    textile: {
        title: { fr: "Le textile, mémoire tissée du Bénin", en: 'Textile, the woven memory of Benin' },
        text: {
            fr: "Bien avant l'industrialisation, le tissu était déjà un langage en Afrique de l'Ouest : bandes de coton tissées à la main, teintes à l'indigo ou décorées de motifs symboliques, il servait à marquer les statuts, les alliances, les rites de passage. Au Bénin, cette tradition textile s'est enrichie au contact du wax et des teintures naturelles, donnant naissance à des étoffes qui racontent des histoires à travers leurs couleurs et leurs formes. Aujourd'hui encore, choisir un tissu, c'est choisir de porter un fragment de récit collectif. Le textile reste ainsi un pilier de l'identité artisanale béninoise, entre héritage ancestral et création contemporaine.",
            en: "Long before industrialization, cloth was already a language in West Africa: hand-woven cotton strips, dyed with indigo or decorated with symbolic patterns, used to mark status, alliances, and rites of passage. In Benin, this textile tradition grew richer through contact with wax fabric and natural dyes, giving rise to cloths that tell stories through their colors and shapes. Even today, choosing a fabric means choosing to wear a fragment of collective history. Textile remains a pillar of Beninese craftsmanship, between ancestral heritage and contemporary creation."
        }
    },
    teinture: {
        title: { fr: "La teinture, un art de patience", en: 'Dyeing, an art of patience' },
        text: {
            fr: "Teindre un tissu à la main est un geste ancestral qui demande des jours, parfois des semaines : récolte des feuilles d'indigotier, fermentation, plongées successives dans la cuve, séchage au soleil. Chaque nuance de bleu ou d'ocre est le fruit d'un savoir-faire précis transmis oralement, souvent au sein des familles de teinturiers. Au Bénin, la région de Ouidah reste un foyer vivant de cette pratique. Dans un monde saturé de teintures chimiques et industrielles, la teinture naturelle béninoise incarne un artisanat lent, écologique et profondément identitaire, que nos artisans perpétuent avec fierté.",
            en: "Hand-dyeing fabric is an ancestral gesture that takes days, sometimes weeks: harvesting indigo leaves, fermenting them, repeated dips in the vat, drying in the sun. Every shade of blue or ochre is the result of precise know-how passed down orally, often within families of dyers. In Benin, the Ouidah region remains a living hub of this practice. In a world saturated with chemical, industrial dyes, Beninese natural dyeing embodies a slow, ecological craft deeply tied to identity, one our artisans carry forward with pride."
        }
    },
    creation_artisanale: {
        title: { fr: "La création artisanale, un moteur de vie", en: 'Artisanal creation, an engine of life' },
        text: {
            fr: "Au Bénin, l'artisanat n'est pas un simple secteur économique : c'est une manière de transmettre un savoir et de faire vivre une communauté. Chaque pièce façonnée à la main mobilise un réseau entier — cultivateurs, teinturiers, tresseuses, couturiers — et fait vivre des familles depuis des générations. Choisir une création artisanale, c'est soutenir directement cette chaîne humaine plutôt qu'une production de masse anonyme. C'est aussi préserver des gestes et des techniques qui, sans la demande, risqueraient de disparaître. La Cabane des Arts s'inscrit dans cette continuité, en valorisant des matières et des mains béninoises dans chacune de ses créations.",
            en: "In Benin, craftsmanship is not just an economic sector: it's a way of passing on knowledge and sustaining a community. Every handmade piece involves an entire network — growers, dyers, weavers, tailors — supporting families for generations. Choosing an artisanal creation means directly supporting this human chain rather than anonymous mass production. It also means preserving gestures and techniques that, without demand, could disappear. La Cabane des Arts is part of this continuity, showcasing Beninese materials and hands in every creation."
        }
    },
    vannerie: {
        title: { fr: "La vannerie, un geste hérité du lac", en: 'Basketry, a gesture inherited from the lake' },
        text: {
            fr: "Dans les communautés lacustres du Bénin, comme les Aguégués, tresser le raphia est un art millénaire transmis de mère en fille et de père en fils. Les feuilles sont cueillies, séchées au soleil, puis patiemment entrelacées à la main, sans machine, selon des motifs appris dès l'enfance. Chaque panier, chaque natte raconte des heures de travail minutieux. Aujourd'hui, la vannerie reste un véritable moteur d'autonomisation économique pour de nombreuses femmes artisanes béninoises, tout en incarnant un savoir-faire durable et biodégradable, en parfaite harmonie avec les enjeux écologiques actuels.",
            en: "In Benin's lakeside communities, such as the Aguégués, weaving raffia is a thousand-year-old art passed from mother to daughter and father to son. Leaves are harvested, sun-dried, then patiently woven by hand — no machines, using patterns learned since childhood. Every basket, every mat represents hours of meticulous work. Today, basketry remains a genuine engine of economic empowerment for many Beninese women artisans, while embodying sustainable, biodegradable know-how perfectly aligned with today's ecological concerns."
        }
    },
    accessoires: {
        title: { fr: "Les accessoires, des objets qui racontent", en: 'Accessories, objects that tell a story' },
        text: {
            fr: "Perles, cuir, fibres naturelles, cauris : les accessoires béninois puisent dans des matériaux que les artisans d'Afrique de l'Ouest travaillent depuis des siècles. Longtemps, ces éléments ont servi de monnaie d'échange avant de devenir des parures précieuses, transmises de génération en génération. Un bracelet, un sac ou une paire de boucles d'oreilles n'est jamais un simple objet fonctionnel : il porte une intention, une origine, parfois une signification symbolique liée à la protection ou à la fécondité. Nos accessoires s'inspirent de ce geste patient, pensés pour durer et pour raconter une histoire à chaque fois qu'on les porte.",
            en: "Beads, leather, natural fibers, cowrie shells: Beninese accessories draw on materials West African artisans have worked with for centuries. For a long time, these elements served as currency before becoming treasured ornaments, passed down through generations. A bracelet, a bag, or a pair of earrings is never just a functional object: it carries an intention, an origin, sometimes a symbolic meaning tied to protection or fertility. Our accessories are inspired by this patient gesture, made to last and to tell a story each time they are worn."
        }
    },
    chapeaux: {
        title: { fr: "Le chapeau de raphia, symbole de statut", en: 'The raffia hat, a symbol of status' },
        text: {
            fr: "Dans de nombreuses régions d'Afrique de l'Ouest, le chapeau tressé n'est pas qu'une protection contre le soleil : il indique souvent un rôle social, une appartenance à une communauté, parfois même un rang honorifique lors des cérémonies traditionnelles. Fabriqué en fibres de raphia tressées à la main, chaque chapeau demande plusieurs jours de travail minutieux. Au Bénin, cet artisanat perdure grâce aux tresseuses des communautés lacustres, qui perpétuent des motifs et des techniques ancestrales. Porter un chapeau en raphia aujourd'hui, c'est renouer avec cette élégance fonctionnelle et symbolique héritée du passé.",
            en: "In many parts of West Africa, the woven hat is more than sun protection: it often signals a social role, belonging to a community, sometimes even an honorary rank during traditional ceremonies. Made from hand-woven raffia fiber, each hat takes several days of meticulous work. In Benin, this craft endures thanks to the weavers of lakeside communities, who keep ancestral patterns and techniques alive. Wearing a raffia hat today means reconnecting with this functional and symbolic elegance inherited from the past."
        }
    },
    mode: {
        title: { fr: "Le wax, du tissu à l'affirmation de mode", en: 'Wax fabric, from cloth to fashion statement' },
        text: {
            fr: "Le wax a conquis les podiums et les rues bien au-delà de l'Afrique de l'Ouest, devenant un symbole de fierté et d'identité pour toute une diaspora. Au Bénin, ses motifs racontent des proverbes, célèbrent des événements de vie, ou rendent hommage à des figures respectées. Porter du wax aujourd'hui, dans une coupe moderne ou traditionnelle, c'est afficher un lien assumé avec cette culture visuelle riche et vivante. Nos artisans sélectionnent des wax authentiques pour créer des pièces qui allient fidélité aux traditions et sensibilité contemporaine, faisant du vêtement un véritable manifeste culturel.",
            en: "Wax fabric has conquered runways and streets far beyond West Africa, becoming a symbol of pride and identity for an entire diaspora. In Benin, its patterns tell proverbs, celebrate life events, or pay tribute to respected figures. Wearing wax today, whether in a modern or traditional cut, means openly embracing a connection to this rich, living visual culture. Our artisans select authentic wax to create pieces that blend fidelity to tradition with contemporary sensibility, turning clothing into a true cultural statement."
        }
    },
    bijoux: {
        title: { fr: "Le bijou, mémoire portée sur la peau", en: 'Jewelry, memory worn on the skin' },
        text: {
            fr: "Perles de verre et cauris ont longtemps servi de monnaie d'échange le long des côtes du golfe du Bénin, avant de devenir des bijoux précieux transmis de mère en fille. Porter un collier ou un bracelet traditionnel, c'était autrefois afficher son rang, sa richesse ou sa fertilité aux yeux de la communauté. Aujourd'hui, ces mêmes matières continuent d'être façonnées à la main par nos artisans, qui réinventent ces codes ancestraux dans des créations contemporaines. Chaque bijou reste ainsi un fragment tangible d'une mémoire culturelle transmise depuis des siècles.",
            en: "Glass beads and cowrie shells long served as currency along the coasts of the Bight of Benin, before becoming precious jewelry passed from mother to daughter. Wearing a traditional necklace or bracelet once signaled rank, wealth, or fertility to the community. Today, these same materials continue to be hand-shaped by our artisans, who reinvent these ancestral codes in contemporary creations. Every piece of jewelry remains a tangible fragment of a cultural memory carried through centuries."
        }
    },
    parures: {
        title: { fr: "Les parures, le langage des cours royales", en: 'Regalia, the language of the royal courts' },
        text: {
            fr: "Au Bénin, perles et cauris ne sont jamais de simples ornements. Dans les cérémonies traditionnelles, chaque élément porté — couleur du pagne, disposition des perles, présence de cauris — traduit un rang, une histoire, une protection. Héritées des cours royales d'Abomey, ces parures cérémonielles codifiaient autrefois le pouvoir et le statut social avec une précision quasi héraldique. Le cauri lui-même a longtemps servi de monnaie avant de devenir un symbole de richesse, de fécondité et de lien avec les ancêtres. Porter une parure inspirée de ces traditions, c'est porter un fragment de cette mémoire symbolique transmise depuis des générations.",
            en: "In Benin, beads and cowrie shells are never mere ornaments. In traditional ceremonies, every element worn — the color of a wrap, the arrangement of beads, the presence of cowries — conveys rank, history, protection. Inherited from the royal courts of Abomey, these ceremonial regalia once codified power and social status with near-heraldic precision. The cowrie shell itself long served as currency before becoming a symbol of wealth, fertility, and connection to the ancestors. Wearing regalia inspired by these traditions means carrying a fragment of this symbolic memory passed down through generations."
        }
    },
    decoration: {
        title: { fr: "La décoration, l'art de raconter les murs", en: 'Decoration, the art of storytelling on walls' },
        text: {
            fr: "Bogolan, tentures brodées, motifs symboliques : au Bénin, décorer un intérieur ne se limite jamais à l'esthétique. Chaque tenture murale ou tissu décoratif raconte une histoire, un proverbe, un événement marquant ou un hommage aux ancêtres, comme le faisaient déjà les tentures royales d'Abomey depuis le XVIIIe siècle. Cet art visuel codifié transformait les murs en véritables pages d'histoire lisibles par toute une communauté. Aujourd'hui, intégrer ces pièces décoratives chez soi, c'est faire vivre cette mémoire visuelle dans un cadre contemporain, et transformer son intérieur en un espace porteur de sens et d'héritage culturel.",
            en: "Bogolan, embroidered tapestries, symbolic patterns: in Benin, decorating a home is never purely aesthetic. Every wall hanging or decorative cloth tells a story, a proverb, a significant event, or a tribute to the ancestors — much like the royal tapestries of Abomey have done since the 18th century. This codified visual art turned walls into pages of history, readable by an entire community. Bringing these decorative pieces into a home today means keeping this visual memory alive in a contemporary setting, turning one's interior into a space carrying meaning and cultural heritage."
        }
    }
};

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

// ===== DONNÉES DE LA GALERIE =====
const galerieItems = [
    {
        id: 'g1',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Ensemble Indigo Côtier', en: 'Coastal Indigo Ensemble' },
        description: {
            fr: 'Laissez-vous porter par la douceur du lin et la profondeur de l\'indigo. Cette tenue ample et fluide, ornée de motifs tie-dye traditionnels, incarne l\'élégance décontractée de la femme africaine moderne.',
            en: 'Let yourself be carried by the softness of linen and the depth of indigo. This flowing, loose-fitting outfit with traditional tie-dye patterns embodies relaxed elegance.'
        },
        price: 22000,
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
        price: 35000,
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
        price: 18000,
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
        price: 45000,
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
        price: 15000,
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
        price: 28000,
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
        price: 32000,
        image: 'images/galerie/textile-7-collection-indigo-coucher-soleil.jpeg',
    },
    {
        id: 'g8',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Chapeau Bohème Shibori & Dentelle', en: 'Bohemian Shibori & Lace Hat' },
        description: {
            fr: 'L\'alliance du tressage artisanal et du tissu shibori indigo, sublimée par une touche de dentelle ivoire. Pour la femme qui ose.',
            en: 'The union of artisanal weaving and indigo shibori fabric, enhanced with a touch of ivory lace. For the woman who dares.'
        },
        price: 12000,
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
        price: 22000,
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
        price: 10000,
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
        price: 25000,
        image: 'images/galerie/tressage-4-set-raphia-indigo-lumiere-doree.jpeg',
    },
    {
        id: 'g12',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Tote Bag Bogolan Nuit', en: 'Night Bogolan Tote Bag' },
        description: {
            fr: 'Fond noir profond, motifs shibori et bogolan en blanc cassé — ce tote bag raconte une histoire. Spacieux, robuste, et résolument africain.',
            en: 'Deep black background with shibori and bogolan patterns in off-white — this tote bag tells a story. Spacious, sturdy, and distinctly African.'
        },
        price: 8500,
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
        price: 15000,
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
        price: 10000,
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
        price: 28000,
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
        price: 18000,
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
        price: 12000,
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
        price: 20000,
        image: 'images/galerie/accessoires-7-tote-sandales-indigo-frangees.jpeg',
    },
    {
        id: 'g19',
        category: 'tapisserie',
        categoryKey: 'categories.tapisserie',
        title: { fr: 'Éventails Circulaires Wax', en: 'Circular Wax Fans' },
        description: {
            fr: 'Deux éventails d\'exception : l\'un en wax rouge et blanc aux motifs abstraits, l\'autre en kente multicolore aux géométries vives. Objets d\'art autant qu\'accessoires.',
            en: 'Two exceptional fans: one in red and white wax with abstract patterns, the other in multicolored kente with vivid geometry. As much art as accessory.'
        },
        price: 8000,
        image: 'images/galerie/tapisserie-1-eventails-circulaires-wax.jpeg',
    },
    {
        id: 'g20',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Parure Blanche & Indigo — Grâce du Bord de Mer', en: 'White & Indigo Set — Seaside Grace' },
        description: {
            fr: 'Turban blanc, collier de perles bicolores, bracelets ivoire, sandales shibori et sac indigo structuré — chaque détail est une pièce de la parure complète.',
            en: 'White turban, two-tone beaded necklace, ivory bracelets, shibori sandals and a structured indigo bag — every detail forms part of the complete set.'
        },
        price: 32000,
        image: 'images/galerie/parures-1-parure-blanche-indigo.jpeg',
    },
    {
        id: 'g21',
        category: 'textile',
        categoryKey: 'categories.textile',
        title: { fr: 'Bomber Wax Tribal Rouge & Or', en: 'Red & Gold Tribal Wax Bomber' },
        description: {
            fr: 'Un duo de motifs saisissant : cercles XO entrelacés dorés sur fond noir d\'un côté, rayures verticales rouge et jaune zébrées de l\'autre. Ce bomber bicolore affirme une identité graphique forte.',
            en: 'A striking pair of patterns: interlocking gold XO circles on black on one side, zebra-streaked red and yellow stripes on the other. A bold two-tone bomber with a strong graphic identity.'
        },
        price: 38000,
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
        price: 16000,
        image: 'images/galerie/textile-9-maillot-shibori-indigo.jpeg',
    },
    {
        id: 'g23',
        category: 'tressage',
        categoryKey: 'categories.tressage',
        title: { fr: 'Robe Marinière & Set Tressé Indigo', en: 'Striped Dress & Indigo Woven Set' },
        description: {
            fr: 'Robe rayée bleu marine et blanc, portée avec un chapeau à ruban shibori noué et un sac tressé assorti. Un look complet qui marie la rigueur de la marinière à la douceur artisanale du tressage béninois.',
            en: 'Navy and white striped dress paired with a shibori-ribboned hat and a matching woven bag. A complete look blending nautical stripes with the softness of Beninese artisanal weaving.'
        },
        price: 26000,
        image: 'images/galerie/tressage-5-robe-mariniere-set-tresse-indigo.jpeg',
    },
    {
        id: 'g24',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Complet Kente Soleil — Sac, Pochette, Trousse & Bandoulière', en: 'Complete Sunshine Kente Set — Bag, Pouch, Case & Strap' },
        description: {
            fr: 'L\'ensemble ultime en tissu kente jaune moutarde et bleu : sac à main à poignée, pochette zippée, trousse et bandoulière détachable — tous coordonnés, tous indispensables.',
            en: 'The ultimate set in mustard yellow and blue kente fabric: handle bag, zipped pouch, case and detachable strap — all coordinated, all essential.'
        },
        price: 18000,
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
        price: 9500,
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
        price: 14000,
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
        price: 24000,
        image: 'images/galerie/accessoires-11-set-sac-chapeau-rayures-marines.jpeg',
    },
    {
        id: 'g28',
        category: 'parures',
        categoryKey: 'categories.parures',
        title: { fr: 'Duo Touareg Indigo & Argent', en: 'Indigo & Silver Touareg Duo' },
        description: {
            fr: 'Un couple en tenue traditionnelle indigo à motifs tartan, sublimé par une parure d\'argent saisissante : chapeaux canotiers à ruban brodé, colliers superposés, bracelets manchettes massifs et canne à pommeau d\'argent. Chaque bijou raconte l\'héritage de l\'orfèvrerie sahélienne.',
            en: 'A couple in traditional indigo tartan dress, elevated by striking silver jewelry: embroidered-band boater hats, layered necklaces, bold cuff bracelets and a silver-topped cane. Each piece tells the story of Sahelian silversmithing heritage.'
        },
        price: 55000,
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
        price: 42000,
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
        price: 48000,
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
        price: 38000,
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
        price: 30000,
        image: 'images/galerie/parures-6-parure-kente-corail.jpeg',
    },
    {
        id: 'g33',
        category: 'accessoires',
        categoryKey: 'categories.accessoires',
        title: { fr: 'Set Chapeau & Sandales Mosaïque', en: 'Mosaic Hat & Sandals Set' },
        description: {
            fr: 'Chapeau en paille tressée à large bord, ceint d\'un ruban indigo, assorti à des sandales tressées au motif mosaïque coloré (turquoise, corail, lilas). Un duo estival qui marie le naturel de la paille à l\'éclat du tissu imprimé.',
            en: 'A wide-brimmed woven straw hat with an indigo band, matched with woven sandals featuring a colorful mosaic pattern (turquoise, coral, lilac). A summer duo blending natural straw with vibrant printed fabric.'
        },
        price: 16000,
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
        price: 7500,
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
        price: 6000,
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
        'nav.discovery': 'Découverte',
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
        'cart.checkout': 'Commander via WhatsApp',
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
        'modal.continue_shopping': 'Continuer mes achats',
        'modal.order_now': 'Commander maintenant',
        'modal.added_to_cart': 'Ajouté au panier',
        'modal.close': 'Fermer',
        'decouverte.badge': 'À la découverte de nos matières',
        'decouverte.title1': "L'âme de nos",
        'decouverte.title2': 'créations',
        'decouverte.hero_desc': 'Plongez au cœur de l\'artisanat béninois. Découvrez les matières premières qui donnent vie à nos créations, leurs origines, leurs histoires et les savoir-faire qui les transforment en œuvres uniques.',
        'decouverte.intro_title': 'Des matières, des histoires, des valeurs',
        'decouverte.intro_desc': 'Chaque matière que nous utilisons raconte une histoire. Elle vient d\'une terre, d\'une tradition, d\'un geste ancestral. À La Cabane des Arts, nous sélectionnons avec soin des matériaux locaux et durables pour créer des pièces authentiques qui portent en elles l\'âme du Bénin.',
        'decouverte.matieres_subtitle': 'Nos matières premières',
        'decouverte.matieres_title': 'Au cœur de la création',
        'decouverte.matieres_desc': 'Découvrez les matériaux nobles que nos artisans transforment avec passion',
        'decouverte.engagement_subtitle': 'Nos engagements',
        'decouverte.engagement_title': 'Un artisanat responsable',
        'decouverte.engagement1_title': 'Commerce équitable',
        'decouverte.engagement1_desc': 'Nous travaillons directement avec les artisans, en leur garantissant une rémunération juste et des conditions de travail dignes.',
        'decouverte.engagement2_title': 'Durabilité',
        'decouverte.engagement2_desc': 'Nous privilégions des matières naturelles, renouvelables et locales, pour minimiser notre impact sur l\'environnement.',
        'decouverte.engagement3_title': 'Savoir-faire ancestral',
        'decouverte.engagement3_desc': 'Nous perpétuons et valorisons des techniques artisanales transmises de génération en génération.',
        'decouverte.engagement4_title': 'Impact social',
        'decouverte.engagement4_desc': 'Chaque achat contribue à la formation de nouveaux artisans et au développement économique local.',
    },
    en: {
        'nav.home': 'Home',
        'nav.story': 'Our Story',
        'nav.discovery': 'Discovery',
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
        'cart.checkout': 'Order via WhatsApp',
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
        'modal.continue_shopping': 'Continue shopping',
        'modal.order_now': 'Order now',
        'modal.added_to_cart': 'Added to cart',
        'modal.close': 'Close',
        'decouverte.badge': 'Discovering our materials',
        'decouverte.title1': 'The soul of our',
        'decouverte.title2': 'creations',
        'decouverte.hero_desc': 'Dive into the heart of Beninese craftsmanship. Discover the raw materials that bring our creations to life, their origins, their stories and the know-how that transforms them into unique works.',
        'decouverte.intro_title': 'Materials, stories, values',
        'decouverte.intro_desc': 'Every material we use tells a story. It comes from a land, a tradition, an ancestral gesture. At La Cabane des Arts, we carefully select local and sustainable materials to create authentic pieces that carry the soul of Benin.',
        'decouverte.matieres_subtitle': 'Our raw materials',
        'decouverte.matieres_title': 'At the heart of creation',
        'decouverte.matieres_desc': 'Discover the noble materials that our artisans transform with passion',
        'decouverte.engagement_subtitle': 'Our commitments',
        'decouverte.engagement_title': 'Responsible craftsmanship',
        'decouverte.engagement1_title': 'Fair trade',
        'decouverte.engagement1_desc': 'We work directly with artisans, guaranteeing them fair remuneration and decent working conditions.',
        'decouverte.engagement2_title': 'Sustainability',
        'decouverte.engagement2_desc': 'We prioritize natural, renewable and local materials, to minimize our environmental impact.',
        'decouverte.engagement3_title': 'Ancestral know-how',
        'decouverte.engagement3_desc': 'We preserve and enhance artisanal techniques passed down from generation to generation.',
        'decouverte.engagement4_title': 'Social impact',
        'decouverte.engagement4_desc': 'Every purchase contributes to the training of new artisans and local economic development.',
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

// ===== FONCTION POUR RENDRE LES MATIÈRES (PAGE DÉCOUVERTE) =====
function renderMatieres() {
    const grid = document.getElementById('matieresGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const lang = state.currentLanguage;
    
    matieresData.forEach(matiere => {
        const card = document.createElement('div');
        card.className = 'matiere-card';
        
        card.innerHTML = `
            <div class="matiere-image">
                ${matiere.image
                    ? `<img src="${matiere.image}" alt="${matiere.nom[lang]}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
                    : ''
                }
                <div class="placeholder-icon" style="${matiere.image ? 'display:none;' : 'display:flex;'}">
                    <i class="fas fa-leaf"></i>
                </div>
                <span class="matiere-badge">${matiere.badge[lang]}</span>
            </div>
            <div class="matiere-content">
                <h3>${escapeHTML(matiere.nom[lang])}</h3>
                <div class="matiere-origine">
                    <i class="fas fa-map-pin"></i> ${escapeHTML(matiere.origine[lang])}
                </div>
                <p>${escapeHTML(matiere.description[lang])}</p>
                <div class="matiere-utilisations">
                    ${matiere.utilisations.map(u => `<span class="usage-tag" onclick="openUsageStory('${slugifyUsage(u)}')" title="En savoir plus">${escapeHTML(u)}</span>`).join('')}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ===== HISTOIRE D'UN USAGE (modal au clic sur un tag) =====
function slugifyUsage(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_');
}

function openUsageStory(key) {
    const story = usageStories[key];
    const modal = document.getElementById('usageStoryModal');
    if (!story || !modal) return;

    const lang = state.currentLanguage;
    const titleEl = document.getElementById('usageStoryTitle');
    const textEl = document.getElementById('usageStoryText');
    if (titleEl) titleEl.textContent = story.title[lang];
    if (textEl) textEl.textContent = story.text[lang];

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUsageStory() {
    const modal = document.getElementById('usageStoryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== MODALE PROFESSIONNELLE =====
function showProfessionalModal(productTitle) {
    const lang = state.currentLanguage;
    
    // Créer la modale
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay active';
    modalOverlay.id = 'choiceModal';
    modalOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    modalOverlay.innerHTML = `
        <div class="modal" style="
            background: var(--bg-color, #FFFFFF);
            border-radius: 20px;
            max-width: 420px;
            width: 100%;
            padding: 32px 28px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
            text-align: center;
            position: relative;
        ">
            <div style="
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, #8B6B3D, #6B4F2E);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 16px;
                font-size: 28px;
                color: #FFFFFF;
            ">
                <i class="fas fa-shopping-bag"></i>
            </div>
            
            <h3 style="
                font-family: 'Playfair Display', serif;
                font-size: 20px;
                color: var(--text-color, #1A1A1A);
                margin-bottom: 8px;
            ">
                ${escapeHTML(productTitle)}
            </h3>
            
            <p style="
                color: var(--text-secondary, #4A4A4A);
                font-size: 14px;
                margin-bottom: 24px;
                line-height: 1.6;
            ">
                ${lang === 'fr' 
                    ? '✓ Ajouté à votre panier avec succès' 
                    : '✓ Successfully added to your cart'}
            </p>
            
            <div style="display: flex; gap: 12px; flex-direction: column;">
                <button onclick="window.closeChoiceModal(); window.openCheckoutModal();" style="
                    background: linear-gradient(135deg, #1B3A6B, #0F284A);
                    color: #FFFFFF;
                    border: none;
                    padding: 14px 24px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                    transition: transform 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fab fa-whatsapp"></i>
                    ${lang === 'fr' ? 'Commander maintenant' : 'Order now'}
                </button>
                
                <button onclick="window.closeChoiceModal(); window.openCart();" style="
                    background: transparent;
                    color: var(--text-color, #1A1A1A);
                    border: 2px solid var(--border-color, #E5DCC8);
                    padding: 14px 24px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    width: 100%;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='var(--color-ocre-pale, #F5E6C8)'" onmouseout="this.style.background='transparent'">
                    <i class="fas fa-shopping-bag"></i>
                    ${lang === 'fr' ? 'Continuer mes achats' : 'Continue shopping'}
                </button>
                
                <button onclick="window.closeChoiceModal();" style="
                    background: none;
                    border: none;
                    color: var(--text-light, #767676);
                    font-size: 13px;
                    cursor: pointer;
                    padding: 8px;
                    margin-top: 4px;
                ">
                    <i class="fas fa-times"></i>
                    ${lang === 'fr' ? 'Fermer' : 'Close'}
                </button>
            </div>
        </div>
    `;
    
    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Exposer les fonctions globalement
    window.closeChoiceModal = function() {
        const modal = document.getElementById('choiceModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };
    
    window.envoyerMessageWhatsAppPanier = envoyerMessageWhatsAppPanier;
    window.openCart = openCart;
    window.openCheckoutModal = openCheckoutModal;
}

// ===== FONCTIONS DOM =====
function createProductCard(product) {
    const lang = state.currentLanguage;
    const card = document.createElement('div');
    card.className = 'galerie-card boutique-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);

    card.innerHTML = `
        <div class="card-image">
            ${product.image
                ? `<img src="${product.image}" alt="${escapeHTML(product.title[lang])}" loading="lazy">`
                : `<div class="card-placeholder"><i class="fas fa-image"></i></div>`
            }
        </div>
        <div class="card-content">
            <span class="card-category">${t(product.categoryKey)}</span>
            <h3>${escapeHTML(product.title[lang])}</h3>
            <div class="card-footer">
                <span class="card-price">${product.price ? formatPrice(product.price) : 'Prix sur demande'}</span>
            </div>
        </div>
        <div class="boutique-card-actions">
            <button class="boutique-action-btn boutique-commander add-to-cart" data-id="${product.id}">
                <i class="fas fa-shopping-bag"></i> Commander
            </button>
            <button class="boutique-action-btn boutique-offrir offrir-btn" data-id="${product.id}">
                <i class="fas fa-gift"></i> Offrir
            </button>
        </div>
    `;

    return card;
}

// Carte Galerie (avec description complète)
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
    filteredItems.forEach(item => grid.appendChild(createGalerieCard(item)));
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
    const filteredItems = state.activeFilter === 'all'
        ? galerieItems
        : galerieItems.filter(p => p.category === state.activeFilter);
    filteredItems.forEach(product => grid.appendChild(createProductCard(product)));
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

// ===== GESTION DU PANIER =====
function addToCart(id, isGift = false) {
    let product = galerieItems.find(p => p.id === id);
    if (!product) {
        product = products.find(p => p.id === id);
    }
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
        if (isGift) existingItem.isGift = true;
    } else {
        state.cart.push({
            id: product.id,
            name: product.title[state.currentLanguage],
            price: product.price || 0,
            quantity: 1,
            isGift: isGift
        });
    }
    
    saveCart();
    renderCart();
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

// ===== ENVOYER LE PANIER COMPLET VERS WHATSAPP =====
function envoyerMessageWhatsAppPanier() {
    const lang = state.currentLanguage;
    
    if (state.cart.length === 0) {
        showToast(lang === 'fr' ? 'Votre panier est vide.' : 'Your cart is empty.', 'error');
        return;
    }
    
    let articlesList = '';
    let total = 0;
    
    state.cart.forEach((item, index) => {
        const product = galerieItems.find(p => p.id === item.id) || products.find(p => p.id === item.id);
        const titre = product ? product.title[lang] : item.name;
        const prix = product && product.price ? product.price : item.price || 0;
        const sousTotal = prix * item.quantity;
        total += sousTotal;
        
        const isGift = item.isGift ? ' 🎁 (Cadeau)' : '';
        articlesList += `${index + 1}. ${titre} × ${item.quantity} = ${sousTotal.toLocaleString('fr-FR')} FCFA${isGift}\n`;
    });
    
    const msg = lang === 'fr'
        ? `🛍️ **NOUVELLE COMMANDE - Cabane des Arts**\n\n`
        + `📋 **Articles commandés :**\n${articlesList}\n`
        + `💰 **Total :** ${total.toLocaleString('fr-FR')} FCFA\n\n`
        + `📝 Merci de confirmer la disponibilité et les modalités de paiement.\n`
        + `📍 Retrait à Porto-Novo ou livraison à convenir.`
        : `🛍️ **NEW ORDER - Cabane des Arts**\n\n`
        + `📋 **Ordered items :**\n${articlesList}\n`
        + `💰 **Total :** ${total.toLocaleString('fr-FR')} FCFA\n\n`
        + `📝 Please confirm availability and payment details.\n`
        + `📍 Pickup in Porto-Novo or delivery to be arranged.`;
    
    closeCart();
    window.open(`https://wa.me/22961750141?text=${encodeURIComponent(msg)}`, '_blank');
    showToast(lang === 'fr' ? '📲 Envoi de la commande vers WhatsApp...' : '📲 Sending order to WhatsApp...', 'success');
    
    state.cart = [];
    saveCart();
    renderCart();
}

// ===== FONCTIONS PANIER =====
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
        if (cartFooter) {
            cartFooter.style.display = 'block';
            cartFooter.innerHTML = `
                <div class="cart-total">
                    <span>${t('cart.total')}</span>
                    <span id="cartTotal">${formatPrice(totalPrice)}</span>
                </div>
                <button class="btn btn-primary btn-full" id="whatsappOrderBtn">
                    <i class="fab fa-whatsapp"></i> ${t('cart.checkout')}
                </button>
                <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                    <span style="font-size: 11px; color: var(--text-light);">Paiement à la livraison</span>
                    <span style="font-size: 11px; color: var(--text-light);">•</span>
                    <span style="font-size: 11px; color: var(--text-light);">Livraison disponible</span>
                </div>
            `;
            
            const whatsappBtn = document.getElementById('whatsappOrderBtn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', openCheckoutModal);
            }
        }
        
        if (cartItems) {
            cartItems.innerHTML = state.cart.map(item => {
                const product = galerieItems.find(p => p.id === item.id) || products.find(p => p.id === item.id);
                const title = product ? product.title[state.currentLanguage] : item.name;
                const isGift = item.isGift ? ' 🎁' : '';
                return `
                    <div class="cart-item">
                        <div class="cart-item-image card-placeholder">
                            <i class="fas fa-image" style="font-size: 20px;"></i>
                        </div>
                        <div class="cart-item-info">
                            <h4>${escapeHTML(title)}${isGift}</h4>
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

function attachCartEvents() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = newBtn.getAttribute('data-id');
            const product = galerieItems.find(p => p.id === id || p.id === parseInt(id));
            if (!product) return;

            addToCart(product.id);
            showProfessionalModal(product.title[state.currentLanguage]);
        });
    });

    document.querySelectorAll('.offrir-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = newBtn.getAttribute('data-id');
            const product = galerieItems.find(p => p.id === id || p.id === parseInt(id));
            if (!product) return;
            
            addToCart(product.id, true);
            
            const lang = state.currentLanguage;
            openCart();
            showToast(lang === 'fr' ? `🎁 "${product.title[lang]}" ajouté comme cadeau` : `🎁 "${product.title[lang]}" added as gift`, 'success');
        });
    });
}

function attachCartItemEvents() {
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = newBtn.getAttribute('data-id');
            updateQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = newBtn.getAttribute('data-id');
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            const id = newBtn.getAttribute('data-id');
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

// ===== DISTRIBUTEURS =====
const distributeurs = [
    {
        id: 'd1',
        nom: 'Cabane des Arts',
        ville: 'Porto-Novo',
        commune: 'Porto-Novo',
        categorie: 'Artisanat',
        phone: '22961750141',
        emoji: '🎨',
        logo: 'logo.jpg',
        description: 'Adjina, Rue de l\'Inspection — Porto-Novo, Bénin',
        badge: 'Siège principal',
    },
    {
        id: 'd2',
        nom: 'Dimitri\'s Art Premium',
        ville: 'Porto-Novo',
        commune: 'Porto-Novo',
        categorie: 'Mode & Couture',
        phone: '22901545406',
        emoji: '✂️',
        logo: 'images/distributeurs/dimitri.jpg',
        description: 'Porto-Novo · dimitris1art@gmail.com',
        badge: 'Partenaire officiel',
    },
    {
        id: 'd3',
        nom: 'Gbênanmon',
        ville: 'Ouidah',
        commune: 'Ouidah',
        categorie: 'Patrimoine & Tourisme',
        phone: '22901479560',
        emoji: '🏛️',
        logo: 'images/distributeurs/gbenanmon.jpg',
        description: 'Ouidah · Patrimoine & Tourisme',
        badge: 'Partenaire Ouidah',
    },
    {
        id: 'd4',
        nom: 'Opportunité Mode Couture',
        ville: 'Porto-Novo',
        commune: 'Porto-Novo',
        categorie: 'Mode & Couture',
        phone: '2290197691425',
        emoji: '✂️',
        logo: 'images/distributeurs/opportunite.jpg',
        description: 'Porto-Novo · Mode & Couture',
        badge: 'Partenaire officiel',
    },
    {
        id: 'd5',
        nom: 'Espace Artisanal Kpakli-Yaou',
        ville: 'Ouidah',
        commune: 'Ouidah',
        categorie: 'Artisanat',
        phone: '2290193818583',
        emoji: '🎨',
        logo: 'images/distributeurs/kpakli-yaou.jpg',
        description: 'Ouidah · Artisanat',
        badge: 'Partenaire Ouidah',
    },
];

function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast(t('cart.empty'), 'error');
        return;
    }
    window.location.href = 'commande.html';
}

// ===== PAGE COMMANDE (commande.html) =====
function initCommandePage() {
    const container = document.getElementById('partnerCards');
    if (!container) return; // On n'est pas sur commande.html

    const lang = state.currentLanguage;
    const emptyCartState = document.getElementById('commandeEmptyCart');
    const commandeContent = document.getElementById('commandeContent');

    if (state.cart.length === 0) {
        if (emptyCartState) emptyCartState.style.display = '';
        if (commandeContent) commandeContent.style.display = 'none';
        return;
    }
    if (emptyCartState) emptyCartState.style.display = 'none';
    if (commandeContent) commandeContent.style.display = '';

    // Résumé panier
    const summary = document.getElementById('partnerCartSummary');
    if (summary) {
        const lignes = state.cart.map(item => {
            const product = galerieItems.find(p => p.id === item.id);
            const titre = product ? product.title[lang] : item.name;
            return `<div class="partner-cart-item"><i class="fas fa-check-circle"></i> <span>${escapeHTML(titre)}</span> <span class="qty">×${item.quantity}</span></div>`;
        });
        summary.innerHTML = `<div class="partner-cart-list">${lignes.join('')}</div>`;
    }

    // Peupler les filtres
    const cityFilter = document.getElementById('partnerCityFilter');
    const catFilter  = document.getElementById('partnerCategoryFilter');
    if (cityFilter && cityFilter.options.length <= 1) {
        const villes = [...new Set(distributeurs.map(d => d.commune))];
        villes.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v; opt.textContent = v;
            cityFilter.appendChild(opt);
        });
    }
    if (catFilter && catFilter.options.length <= 1) {
        const cats = [...new Set(distributeurs.map(d => d.categorie))];
        cats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            catFilter.appendChild(opt);
        });
    }

    // Rendu initial
    renderDistributeurs('', '', '');

    // Filtres
    const search  = document.getElementById('partnerSearch');
    if (search) {
        search.addEventListener('input', () => renderDistributeurs(
            search.value,
            document.getElementById('partnerCityFilter')?.value || '',
            document.getElementById('partnerCategoryFilter')?.value || ''
        ));
    }
    if (cityFilter) {
        cityFilter.addEventListener('change', () => renderDistributeurs(
            document.getElementById('partnerSearch')?.value || '',
            cityFilter.value,
            document.getElementById('partnerCategoryFilter')?.value || ''
        ));
    }
    if (catFilter) {
        catFilter.addEventListener('change', () => renderDistributeurs(
            document.getElementById('partnerSearch')?.value || '',
            document.getElementById('partnerCityFilter')?.value || '',
            catFilter.value
        ));
    }
}

function renderDistributeurs(search, ville, categorie) {
    const container = document.getElementById('partnerCards');
    const emptyMsg  = document.getElementById('partnerEmpty');
    if (!container) return;

    const filtered = distributeurs.filter(d => {
        const matchSearch = !search || d.nom.toLowerCase().includes(search.toLowerCase()) || d.ville.toLowerCase().includes(search.toLowerCase());
        const matchVille  = !ville || d.commune === ville;
        const matchCat    = !categorie || d.categorie === categorie;
        return matchSearch && matchVille && matchCat;
    });

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = '';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';

    container.innerHTML = filtered.map(d => `
        <button class="partner-card" data-phone="${d.phone}" data-name="${escapeHTML(d.nom)}">
            <div class="partner-card-logo">${
                d.logo
                    ? `<img src="${d.logo}" alt="${escapeHTML(d.nom)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${d.emoji}'}))">`
                    : d.emoji
            }</div>
            <div class="partner-card-info">
                <strong>${escapeHTML(d.nom)}</strong>
                <span>${escapeHTML(d.description)}</span>
                <span class="partner-badge">${escapeHTML(d.badge)}</span>
            </div>
            <i class="fab fa-whatsapp partner-wa-icon"></i>
        </button>
    `).join('');

    container.querySelectorAll('.partner-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const phone = btn.getAttribute('data-phone');
            const name  = btn.getAttribute('data-name');
            envoyerCommandeVersDistributeur(phone, name);
        });
    });
}

function envoyerCommandeVersDistributeur(phone, nom) {
    const lang = state.currentLanguage;
    const lignes = state.cart.map((item, i) => {
        const product = galerieItems.find(p => p.id === item.id);
        const titre = product ? product.title[lang] : item.name;
        return `${i + 1}. ${titre} × ${item.quantity}`;
    });
    const msg = lang === 'fr'
        ? `NOUVELLE COMMANDE - Cabane des Arts\n\nBonjour ${nom}\n\nArticles commandes :\n${lignes.join('\n')}\n\nMerci de confirmer la disponibilite et les modalites de paiement.\nRetrait ou livraison a convenir.`
        : `NEW ORDER - Cabane des Arts\n\nHello ${nom}\n\nOrdered items:\n${lignes.join('\n')}\n\nPlease confirm availability and payment details.\nPickup or delivery to be arranged.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast(lang === 'fr' ? `📲 Commande envoyée vers ${nom}...` : `📲 Order sent to ${nom}...`, 'success');
    state.cart = [];
    saveCart();
    renderCart();

    // Sur la page commande.html : afficher l'état "envoyé" au lieu de rester sur une liste vide
    const commandeContent = document.getElementById('commandeContent');
    const commandeSent = document.getElementById('commandeSent');
    if (commandeContent && commandeSent) {
        commandeContent.style.display = 'none';
        commandeSent.style.display = '';
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
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
    renderMatieres();
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

// ===== FORMULAIRES =====
function setupForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const telephone = document.getElementById('contactPhone').value.trim();
            const sujet = document.getElementById('contactSubject').value;
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

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom = document.getElementById('resName').value.trim();
            const email = document.getElementById('resEmail').value.trim();
            const telephone = document.getElementById('resPhone').value.trim();
            const atelier = document.getElementById('resAtelier').value;
            const prix = parseInt(document.getElementById('resPrice').value);
            const date_souhaitee = document.getElementById('resDate').value;
            const paiement = document.getElementById('resPayment').value;

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

    const usageStoryClose = document.getElementById('usageStoryModalClose');
    const usageStoryOverlay = document.getElementById('usageStoryModal');
    if (usageStoryClose) usageStoryClose.addEventListener('click', closeUsageStory);
    if (usageStoryOverlay) {
        usageStoryOverlay.addEventListener('click', (e) => {
            if (e.target === usageStoryOverlay) closeUsageStory();
        });
    }

    const checkoutClose = document.getElementById('checkoutModalClose');
    const checkoutOverlay = document.getElementById('checkoutModal');
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckoutModal);
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', (e) => {
            if (e.target === checkoutOverlay) closeCheckoutModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeReservationModal();
            closeUsageStory();
            closeCheckoutModal();
            closeCart();
            const choiceModal = document.getElementById('choiceModal');
            if (choiceModal) choiceModal.remove();
        }
    });
}

// ===== MODE SOMBRE / CLAIR =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;

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
    
    if (!resetBtn) return;

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
    
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' || consent === 'declined') {
        banner.style.display = 'none';
        return;
    }
    
    setTimeout(() => {
        banner.classList.add('visible');
    }, 1000);
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 400);
        });
    }
    
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
    renderMatieres();
    initCommandePage();
    
    setupFilters();
    setupNavigation();
    setupBackToTop();
    setupForms();
    setupModals();
    setupThemeToggle();
    setupResetPreferences();
    setupCookieConsent();
    
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