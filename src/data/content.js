// Services, catalogue and case studies. Facts come from the HS Print specification and the Ageno categories.
// Anything marked [..] is a placeholder the client must confirm.
const L = (fr, en, ar) => ({ fr, en, ar });

export const SERVICES = [
  {
    slug: 'impression-grand-format', icon: 'print', c1: '#00A857', c2: '#064A2C',
    name: L('Impression grand format', 'Large-format printing', 'الطباعة الكبيرة الحجم'),
    tag: L('bâche · vinyle · forex', 'tarp · vinyl · forex', 'غطاء · فينيل · فوركس'),
    short: L('Bâches, vinyle, forex, totems, podiums, paravents, habillage de murs et de comptoirs.', 'Tarps, vinyl, forex, totems, podiums, partition screens, wall and counter wraps.', 'أغطية، فينيل، فوركس، تيتم، منصات، فواصل، وتغليف الجدران والكونطوارات.'),
    intro: L('Des supports imprimés en grand format, découpés, façonnés et prêts à poser : bâches avec œillets, vinyle adhésif découpé, panneaux forex, totems et habillage de murs.', 'Large-format prints, cut, finished and ready to install: eyelet tarps, cut adhesive vinyl, forex panels, totems and wall wraps.', 'مطبوعات كبيرة الحجم مقصوصة ومشطّبة وجاهزة للتركيب: أغطية بحلقات، فينيل لاصق مقصوص، ألواح فوركس، تيتم وتغليف جدران.'),
    uses: [L('Façades et enseignes provisoires', 'Facades and temporary signs', 'واجهات ولافتات مؤقتة'), L('Stands de salon', 'Trade-show stands', 'أجنحة المعارض'), L('Habillage de bureaux et showrooms', 'Office and showroom wraps', 'تغليف المكاتب وقاعات العرض')],
    faq: [
      [L('Quels fichiers dois-je envoyer ?', 'Which files should I send?', 'ما الملفات التي يجب إرسالها؟'), L('PDF, AI, PNG ou JPG, jusqu’à 50 Mo. Si vous n’avez pas de fichier, nous pouvons le préparer.', 'PDF, AI, PNG or JPG, up to 50 MB. If you have no file, we can prepare it.', 'PDF أو AI أو PNG أو JPG حتى 50 ميغابايت. إن لم يكن لديك ملف يمكننا إعداده.')],
      [L('Posez-vous sur site ?', 'Do you install on site?', 'هل تركّبون في الموقع؟'), L('Oui, livraison et pose sont incluses dans l’offre si vous les demandez.', 'Yes, delivery and installation are part of the offer when you ask for them.', 'نعم، التوصيل والتركيب ضمن العرض عند طلبهما.')],
      [L('Puis-je valider avant impression ?', 'Can I approve before printing?', 'هل يمكنني الموافقة قبل الطباعة؟'), L('Toujours : un bon à tirer vous est envoyé avant la production.', 'Always: a proof is sent to you before production.', 'دائماً: نرسل لك نموذجاً للموافقة قبل الإنتاج.')],
    ],
  },
  {
    slug: 'evenementiel', icon: 'event', c1: '#06110B', c2: '#00A857',
    name: L('Événementiel', 'Events', 'الفعاليات'),
    tag: L('stands · photocalls · arches', 'stands · photocalls · arches', 'أجنحة · فوتوكول · أقواس'),
    short: L('Stands, photocalls, arches, scénographie et installation pour salons, lancements et cérémonies.', 'Stands, photocalls, arches, staging and installation for fairs, launches and ceremonies.', 'أجنحة وخلفيات تصوير وأقواس وسينوغرافيا وتركيب للمعارض والإطلاقات والحفلات.'),
    intro: L('Conception, impression et montage de votre espace événementiel, du photocall à l’arche d’entrée, avec une équipe de pose sur place.', 'Design, printing and assembly of your event space, from the photocall to the entrance arch, with an on-site installation crew.', 'تصميم وطباعة وتركيب فضاء فعاليتك، من خلفية التصوير إلى قوس المدخل، مع فريق تركيب في عين المكان.'),
    uses: [L('Salons et expositions', 'Fairs and exhibitions', 'المعارض والصالونات'), L('Lancements de produit', 'Product launches', 'إطلاق المنتجات'), L('Cérémonies et fêtes nationales', 'Ceremonies and national celebrations', 'الحفلات والأعياد الوطنية')],
    faq: [
      [L('Quel délai prévoir ?', 'What lead time should I plan?', 'ما الأجل الذي يجب توقعه؟'), L('Il dépend de la taille du projet. Indiquez votre date dans la demande et nous confirmons la faisabilité. [Délais types à confirmer.]', 'It depends on project size. Give your date in the request and we confirm feasibility. [Typical lead times to confirm.]', 'يتوقف على حجم المشروع. اذكر تاريخك في الطلب ونؤكد الجدوى. [الآجال النموذجية قيد التأكيد.]')],
      [L('Intervenez-vous hors Mohammedia ?', 'Do you work outside Mohammedia?', 'هل تعملون خارج المحمدية؟'), L('Oui, partout au Maroc.', 'Yes, anywhere in Morocco.', 'نعم، في كل أنحاء المغرب.')],
      [L('Gérez-vous le démontage ?', 'Do you handle dismantling?', 'هل تتكفلون بالتفكيك؟'), L('Oui, sur demande, à la fin de l’événement.', 'Yes, on request, at the end of the event.', 'نعم، عند الطلب، في نهاية الفعالية.')],
    ],
  },
  {
    slug: 'team-building', icon: 'team', c1: '#00A857', c2: '#CDF0DC',
    name: L('Team building', 'Team building', 'فعاليات الفرق'),
    tag: L('intégration · tournois · fêtes', 'integration · tournaments · parties', 'اندماج · بطولات · حفلات'),
    short: L('Journées d’intégration, tournois de football, fêtes nationales et soirées d’entreprise clés en main.', 'Integration days, football tournaments, national celebrations and corporate evenings, turnkey.', 'أيام اندماج وبطولات كرة القدم وأعياد وطنية وسهرات شركات جاهزة بالكامل.'),
    intro: L('Nous organisons et habillons vos événements internes : logistique, supports imprimés, trophées et animation, avec un seul interlocuteur.', 'We organise and brand your internal events: logistics, printed materials, trophies and activities, with a single contact.', 'ننظم ونُلبس فعالياتك الداخلية: اللوجستيك والمطبوعات والكؤوس والتنشيط، مع مخاطب واحد.'),
    uses: [L('Journées d’intégration', 'Integration days', 'أيام الاندماج'), L('Tournois de football', 'Football tournaments', 'بطولات كرة القدم'), L('Soirées d’entreprise', 'Corporate evenings', 'سهرات الشركات')],
    faq: [
      [L('Combien de personnes pouvez-vous accueillir ?', 'How many people can you host?', 'كم شخصاً يمكنكم استقباله؟'), L('Cela dépend du format choisi. [Capacités à confirmer.]', 'It depends on the chosen format. [Capacities to confirm.]', 'يتوقف على الصيغة المختارة. [الطاقات الاستيعابية قيد التأكيد.]')],
      [L('Fournissez-vous les trophées ?', 'Do you supply trophies?', 'هل توفرون الكؤوس؟'), L('Oui, trophées d’excellence et médailles personnalisés.', 'Yes, custom excellence trophies and medals.', 'نعم، كؤوس تميّز وميداليات مخصصة.')],
      [L('Pouvez-vous gérer la restauration ?', 'Can you handle catering?', 'هل يمكنكم تدبير الإطعام؟'), L('À préciser dans votre demande. [À confirmer.]', 'Specify it in your request. [To confirm.]', 'يُحدد في طلبك. [قيد التأكيد.]')],
    ],
  },
  {
    slug: 'tableaux-decoratifs', icon: 'frame', c1: '#064A2C', c2: '#12BE6A',
    name: L('Tableaux décoratifs', 'Decorative panels', 'اللوحات الديكورية'),
    tag: L('forex · plexiglas · canvas', 'forex · plexiglass · canvas', 'فوركس · بليكسيغلاس · كانفا'),
    short: L('Forex et plexiglas en impression UV ou vinyle, toiles canvas pour bureaux, halls et showrooms.', 'Forex and plexiglass with UV or vinyl print, canvas prints for offices, lobbies and showrooms.', 'فوركس وبليكسيغلاس بطباعة UV أو فينيل، ولوحات كانفا للمكاتب والقاعات وقاعات العرض.'),
    intro: L('Des tableaux sur mesure pour valoriser vos espaces : photographies, visuels de marque ou œuvres, montés et prêts à accrocher.', 'Custom panels to enhance your spaces: photographs, brand visuals or artwork, mounted and ready to hang.', 'لوحات حسب الطلب لتزيين فضاءاتك: صور ومرئيات العلامة أو أعمال فنية، مركّبة وجاهزة للتعليق.'),
    uses: [L('Bureaux et salles de réunion', 'Offices and meeting rooms', 'المكاتب وقاعات الاجتماعات'), L('Halls d’accueil', 'Reception lobbies', 'قاعات الاستقبال'), L('Showrooms', 'Showrooms', 'قاعات العرض')],
    faq: [
      [L('Quels formats proposez-vous ?', 'What sizes do you offer?', 'ما الأحجام المتوفرة؟'), L('Sur mesure. Indiquez largeur et hauteur dans la demande.', 'Custom. Give width and height in the request.', 'حسب الطلب. حدد العرض والارتفاع في الطلب.')],
      [L('Quelle différence entre forex et plexiglas ?', 'What is the difference between forex and plexiglass?', 'ما الفرق بين الفوركس والبليكسيغلاس؟'), L('Le forex est léger et mat ; le plexiglas offre une finition brillante avec plus de profondeur.', 'Forex is light and matte; plexiglass gives a glossy finish with more depth.', 'الفوركس خفيف ومطفأ، أما البليكسيغلاس فيعطي لمعاناً وعمقاً أكبر.')],
      [L('Posez-vous les tableaux ?', 'Do you hang the panels?', 'هل تعلّقون اللوحات؟'), L('Oui, la pose est possible sur site.', 'Yes, on-site hanging is available.', 'نعم، التعليق ممكن في الموقع.')],
    ],
  },
  {
    slug: 'goodies-trophees', icon: 'trophy', c1: '#00A857', c2: '#06110B',
    name: L('Goodies & trophées', 'Promo items & trophies', 'هدايا إعلانية وكؤوس'),
    tag: L('objets pub · catalogues', 'promo items · catalogues', 'هدايا إعلانية · كتالوجات'),
    short: L('Objets publicitaires personnalisés, catalogues imprimés et trophées d’excellence.', 'Custom promotional items, printed catalogues and excellence trophies.', 'هدايا إعلانية مخصصة وكتالوجات مطبوعة وكؤوس تميّز.'),
    intro: L('Goodies à votre image, catalogues imprimés et trophées pour remercier vos équipes, clients et partenaires.', 'Branded goodies, printed catalogues and trophies to thank your teams, clients and partners.', 'هدايا بصورة علامتك وكتالوجات مطبوعة وكؤوس لشكر فرقك وزبنائك وشركائك.'),
    uses: [L('Cadeaux clients', 'Client gifts', 'هدايا الزبناء'), L('Remises de prix', 'Award ceremonies', 'حفلات التتويج'), L('Catalogues commerciaux', 'Sales catalogues', 'كتالوجات تجارية')],
    faq: [
      [L('Quelle quantité minimale ?', 'What is the minimum quantity?', 'ما الحد الأدنى للكمية؟'), L('Elle varie selon l’objet. [Minimums à confirmer.]', 'It varies by item. [Minimums to confirm.]', 'يختلف حسب المنتج. [الحدود الدنيا قيد التأكيد.]')],
      [L('Puis-je voir un échantillon ?', 'Can I see a sample?', 'هل يمكنني رؤية عيّنة؟'), L('Oui, sur demande avant commande.', 'Yes, on request before ordering.', 'نعم، عند الطلب قبل الشراء.')],
      [L('Gravez-vous les trophées ?', 'Do you engrave trophies?', 'هل تنقشون الكؤوس؟'), L('Oui, texte et logo personnalisés.', 'Yes, custom text and logo.', 'نعم، نص وشعار مخصصان.')],
    ],
  },
  {
    slug: 'fournitures-informatique', icon: 'monitor', c1: '#12BE6A', c2: '#064A2C',
    name: L('Fournitures & informatique', 'Supplies & IT', 'لوازم ومعلوميات'),
    tag: L('bureau · consommables · IT', 'office · consumables · IT', 'مكتب · مستهلكات · معلوميات'),
    short: L('Fournitures de bureau, consommables, matériel et services informatiques, livrés à vos équipes.', 'Office supplies, consumables, IT equipment and services, delivered to your teams.', 'لوازم مكتبية ومستهلكات ومعدات وخدمات معلوماتية، تُسلَّم لفرقك.'),
    intro: L('Un seul fournisseur pour vos besoins courants : papeterie, consommables d’impression, matériel informatique et prestations associées.', 'One supplier for your everyday needs: stationery, print consumables, IT equipment and related services.', 'مورّد واحد لاحتياجاتك اليومية: قرطاسية ومستهلكات الطباعة ومعدات معلوماتية وخدمات مرتبطة.'),
    uses: [L('Approvisionnement de bureau', 'Office supply', 'تموين المكاتب'), L('Consommables d’impression', 'Print consumables', 'مستهلكات الطباعة'), L('Équipement informatique', 'IT equipment', 'التجهيز المعلوماتي')],
    faq: [
      [L('Livrez-vous à vos équipes ?', 'Do you deliver to your teams?', 'هل توصلون إلى فرقكم؟'), L('Oui, livraison sur vos sites.', 'Yes, delivery to your sites.', 'نعم، التوصيل إلى مواقعكم.')],
      [L('Facturez-vous avec ICE ?', 'Do you invoice with ICE?', 'هل تفوترون مع ICE؟'), L('Oui, facture conforme pour entreprises et marchés publics.', 'Yes, compliant invoice for companies and public contracts.', 'نعم، فاتورة مطابقة للشركات والصفقات العمومية.')],
      [L('Proposez-vous des contrats récurrents ?', 'Do you offer recurring contracts?', 'هل تقدمون عقوداً دورية؟'), L('Sur demande. [À confirmer.]', 'On request. [To confirm.]', 'عند الطلب. [قيد التأكيد.]')],
    ],
  },
];

// Catalogue items. No public prices. Sizes and lead times stay generic until the client supplies real data.
export const PRODUCTS = [
  { slug: 'bache-oeillets', service: 'impression-grand-format', c1: '#00A857', c2: '#06110B', name: L('Bâche imprimée avec œillets', 'Printed tarp with eyelets', 'غطاء مطبوع بحلقات'), material: L('Bâche PVC', 'PVC tarp', 'غطاء PVC'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Œillets, ourlet renforcé', 'Eyelets, reinforced hem', 'حلقات وطيّ مقوّى'), desc: L('Bâche grand format pour façades, arches et stands, livrée avec œillets.', 'Large-format tarp for facades, arches and stands, delivered with eyelets.', 'غطاء كبير الحجم للواجهات والأقواس والأجنحة، يُسلَّم بحلقات.') },
  { slug: 'vinyle-adhesif-decoupe', service: 'impression-grand-format', c1: '#06110B', c2: '#12BE6A', name: L('Vinyle adhésif découpé', 'Cut adhesive vinyl', 'فينيل لاصق مقصوص'), material: L('Vinyle adhésif', 'Adhesive vinyl', 'فينيل لاصق'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Découpe à la forme, pose possible', 'Shape cut, installation available', 'قص حسب الشكل، التركيب ممكن'), desc: L('Logos et visuels découpés pour vitrines, murs et véhicules.', 'Cut logos and visuals for windows, walls and vehicles.', 'شعارات ومرئيات مقصوصة للواجهات الزجاجية والجدران والمركبات.') },
  { slug: 'panneau-forex', service: 'impression-grand-format', c1: '#064A2C', c2: '#00A857', name: L('Panneau forex imprimé', 'Printed forex panel', 'لوح فوركس مطبوع'), material: L('Forex', 'Forex', 'فوركس'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Impression directe ou vinyle contrecollé', 'Direct print or mounted vinyl', 'طباعة مباشرة أو فينيل ملصوق'), desc: L('Panneaux rigides et légers pour signalétique et stands.', 'Rigid, lightweight panels for signage and stands.', 'ألواح صلبة وخفيفة للافتات والأجنحة.') },
  { slug: 'totem-kakemono', service: 'impression-grand-format', c1: '#00A857', c2: '#064A2C', name: L('Totem et kakémono', 'Totem and roll-up banner', 'تيتم وكاكيمونو'), material: L('Bâche ou vinyle sur structure', 'Tarp or vinyl on frame', 'غطاء أو فينيل على هيكل'), sizes: L('Formats standards et sur mesure', 'Standard and custom formats', 'أحجام قياسية وحسب الطلب'), finish: L('Structure et housse de transport', 'Frame and carry bag', 'هيكل وحقيبة نقل'), desc: L('Supports verticaux faciles à déplacer pour accueil et salons.', 'Easy-to-move vertical displays for reception areas and fairs.', 'حوامل عمودية سهلة النقل للاستقبال والمعارض.') },
  { slug: 'photocall-oeillets', service: 'evenementiel', c1: '#06110B', c2: '#00A857', name: L('Photocall à œillets', 'Eyelet photocall', 'خلفية تصوير بحلقات'), material: L('Bâche PVC', 'PVC tarp', 'غطاء PVC'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Œillets, structure possible', 'Eyelets, frame available', 'حلقات، هيكل اختياري'), desc: L('Fond de photos aux couleurs de votre marque pour lancements et cérémonies.', 'Photo backdrop in your brand colors for launches and ceremonies.', 'خلفية صور بألوان علامتك للإطلاقات والحفلات.') },
  { slug: 'arche-bache-scratch', service: 'evenementiel', c1: '#00A857', c2: '#12BE6A', name: L('Arche en bâche avec scratch', 'Tarp arch with Velcro', 'قوس من الغطاء بلاصق'), material: L('Bâche PVC', 'PVC tarp', 'غطاء PVC'), sizes: L('Selon l’arche', 'Fits the arch', 'حسب القوس'), finish: L('Fixation scratch', 'Velcro fixing', 'تثبيت بلاصق'), desc: L('Habillage d’arche d’entrée ou d’arrivée, changeable d’un événement à l’autre.', 'Entrance or finish arch cover, replaceable from one event to the next.', 'تغليف قوس الدخول أو الوصول، قابل للتبديل من فعالية إلى أخرى.') },
  { slug: 'podium-comptoir-habille', service: 'evenementiel', c1: '#064A2C', c2: '#06110B', name: L('Podium et comptoir habillé', 'Wrapped podium and counter', 'منصة وكونطوار مُغلَّفان'), material: L('Structure et vinyle', 'Structure and vinyl', 'هيكل وفينيل'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Habillage de marque', 'Brand wrap', 'تغليف بالعلامة'), desc: L('Podiums et comptoirs d’accueil aux couleurs de votre marque.', 'Podiums and reception counters in your brand colors.', 'منصات وكونطوارات استقبال بألوان علامتك.') },
  { slug: 'tableau-forex-uv', service: 'tableaux-decoratifs', c1: '#12BE6A', c2: '#064A2C', name: L('Tableau forex UV', 'UV forex panel', 'لوحة فوركس UV'), material: L('Forex, impression UV', 'Forex, UV print', 'فوركس بطباعة UV'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Prêt à accrocher', 'Ready to hang', 'جاهزة للتعليق'), desc: L('Impression UV nette sur support léger.', 'Sharp UV print on a lightweight base.', 'طباعة UV واضحة على دعامة خفيفة.') },
  { slug: 'plexiglas-imprime', service: 'tableaux-decoratifs', c1: '#00A857', c2: '#CDF0DC', name: L('Plexiglas imprimé', 'Printed plexiglass', 'بليكسيغلاس مطبوع'), material: L('Plexiglas', 'Plexiglass', 'بليكسيغلاس'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Finition brillante, fixations', 'Glossy finish, fixings', 'لمعان وتثبيتات'), desc: L('Tableaux brillants avec profondeur de couleur.', 'Glossy panels with deep colors.', 'لوحات لامعة بعمق لوني.') },
  { slug: 'toile-canvas', service: 'tableaux-decoratifs', c1: '#06110B', c2: '#12BE6A', name: L('Toile canvas', 'Canvas print', 'لوحة كانفا'), material: L('Toile sur châssis', 'Canvas on frame', 'قماش على إطار'), sizes: L('Sur mesure', 'Custom', 'حسب الطلب'), finish: L('Châssis bois', 'Wooden frame', 'إطار خشبي'), desc: L('Impression sur toile pour bureaux et halls.', 'Canvas prints for offices and lobbies.', 'طباعة على القماش للمكاتب والقاعات.') },
  { slug: 'trophee-excellence', service: 'goodies-trophees', c1: '#00A857', c2: '#06110B', name: L('Trophée d’excellence', 'Excellence trophy', 'كأس التميّز'), material: L('Selon modèle', 'Depends on model', 'حسب النموذج'), sizes: L('Modèles standards', 'Standard models', 'نماذج قياسية'), finish: L('Gravure texte et logo', 'Text and logo engraving', 'نقش النص والشعار'), desc: L('Trophées personnalisés pour remises de prix internes.', 'Custom trophies for internal award ceremonies.', 'كؤوس مخصصة لحفلات التتويج الداخلية.') },
  { slug: 'goodies-personnalises', service: 'goodies-trophees', c1: '#064A2C', c2: '#00A857', name: L('Goodies personnalisés', 'Custom goodies', 'هدايا إعلانية مخصصة'), material: L('Selon objet', 'Depends on item', 'حسب المنتج'), sizes: L('Selon objet', 'Depends on item', 'حسب المنتج'), finish: L('Marquage logo', 'Logo marking', 'وسم الشعار'), desc: L('Objets publicitaires pour clients et équipes.', 'Promotional items for clients and teams.', 'هدايا إعلانية للزبناء والفرق.') },
];

export const CASES = [
  { slug: 'stand-salon-vinyle-forex', service: 'evenementiel', c1: '#00A857', c2: '#06110B',
    name: L('Habillage vinyle et forex d’un stand de salon', 'Vinyl and forex wrap for a trade-show stand', 'تغليف جناح معرض بالفينيل والفوركس'),
    sector: L('[Secteur]', '[Industry]', '[القطاع]'),
    brief: L('Le client avait besoin d’un stand reconnaissable en quelques jours. [Détails à compléter.]', 'The client needed a recognisable stand within days. [Details to complete.]', 'احتاج الزبون إلى جناح يسهل تمييزه خلال أيام. [التفاصيل تُستكمل.]'),
    delivered: [L('Habillage vinyle des parois', 'Vinyl wall wrap', 'تغليف الجدران بالفينيل'), L('Comptoir en forex imprimé', 'Printed forex counter', 'كونطوار فوركس مطبوع'), L('Pose sur site', 'On-site installation', 'تركيب في الموقع')] },
  { slug: 'arche-photocall-oeillets', service: 'impression-grand-format', c1: '#064A2C', c2: '#12BE6A',
    name: L('Bâches d’arche avec scratch et photocall à œillets', 'Arch tarps with Velcro and eyelet photocall', 'أغطية قوس بلاصق وخلفية تصوير بحلقات'),
    sector: L('[Secteur]', '[Industry]', '[القطاع]'),
    brief: L('Habillage d’une arche d’entrée et d’un photocall pour un événement. [Détails à compléter.]', 'Covering an entrance arch and a photocall for an event. [Details to complete.]', 'تغليف قوس دخول وخلفية تصوير لفعالية. [التفاصيل تُستكمل.]'),
    delivered: [L('Bâches d’arche à scratch', 'Velcro arch tarps', 'أغطية قوس بلاصق'), L('Photocall à œillets', 'Eyelet photocall', 'خلفية تصوير بحلقات'), L('Installation', 'Installation', 'التركيب')] },
  { slug: 'journee-integration-football', service: 'team-building', c1: '#12BE6A', c2: '#CDF0DC',
    name: L('Journée d’intégration autour du football', 'Integration day built around football', 'يوم اندماج حول كرة القدم'),
    sector: L('[Secteur]', '[Industry]', '[القطاع]'),
    brief: L('Journée d’intégration pour les équipes d’une entreprise. [Détails à compléter.]', 'Integration day for a company’s teams. [Details to complete.]', 'يوم اندماج لفرق شركة. [التفاصيل تُستكمل.]'),
    delivered: [L('Organisation du tournoi', 'Tournament organisation', 'تنظيم البطولة'), L('Supports imprimés', 'Printed materials', 'المطبوعات'), L('Trophées', 'Trophies', 'الكؤوس')] },
];

export const SECTOR_COUNT = 16;
export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
