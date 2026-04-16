const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Class 12 Mega Bot is Running 24/7!\n');
});
server.listen(process.env.PORT || 3000);

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// ==========================================
// --- DETAILED DATABASE (ALL CHAPTERS) ---
// ==========================================
const botData = {
    // 📚 ENGLISH - FLAMINGO (Detailed)
    e_f1: "*The Last Lesson (Detailed):*\n• Background: Franco-Prussian War. Order from Berlin mandates only German in Alsace-Lorraine schools.\n• Franz: Scared of M. Hamel's test on participles, wants to bunk, but goes to school. Notices eerie Sunday-like silence instead of usual commotion.\n• The Class: Village elders (Hauser, former mayor) sitting on back benches. M. Hamel dressed in his special green coat.\n• M. Hamel's Speech: Calls French the most logical and beautiful language. Says, 'When a people are enslaved, their language is the key to their prison.'\n• Climax: Trumpets sound at noon. Hamel chokes with emotion, writes 'Vive La France!' (Long Live France) on the board.",
    
    e_f2: "*Lost Spring (Detailed):*\n• Part 1 (Saheb): A ragpicker from Dhaka living in Seemapuri. Searches for 'gold' in garbage. Doesn't wear shoes. Later, gets a job at a tea stall earning ₹800. He loses his carefree look because the steel canister belongs to the master; he is no longer his own master.\n• Part 2 (Mukesh): Belongs to a bangle-making family in Firozabad. Works in hazardous glass furnaces (high temp, no light, loses eyesight early). Tradition and the 'sahukar-police-politician' web keep them trapped. But Mukesh dares to dream differently—he wants to be a motor mechanic.",
    
    e_f3: "*Deep Water (Detailed):*\n• Trauma: Douglas developed hydrophobia due to two incidents: knocked down by waves at California beach at age 3, and tossed into the deep end of the YMCA pool by a bully at age 10.\n• The Struggle: The fear ruined his fishing and canoeing trips. He finally hires a professional instructor.\n• Training: Instructor teaches him step-by-step (exhaling underwater, kicking legs, swimming back and forth) over 6 months.\n• Triumph: Douglas swims across Lake Wentworth to test himself. He realizes 'All we have to fear is fear itself' (Roosevelt's quote).",
    
    e_f4: "*The Rattrap (Detailed):*\n• The Peddler: Makes and sells wire rattraps. Believes the whole world is a giant rattrap offering 'baits' (joys, shelter, food).\n• The Theft: An old crofter gives him shelter and shows his 30 kronor. Peddler steals it and gets lost in a dense forest (caught in the trap).\n• Ironmaster: Mistakes the peddler for an old regimental comrade (Captain von Stahle) and invites him home. Edla (daughter) realizes he is afraid, not a captain.\n• Transformation: Even after the truth is out, Edla treats him like a real Captain on Christmas Eve. Her compassion changes him. He leaves the stolen money behind with a letter signed 'Captain von Stahle'.",
    
    e_fp: "*All Poems (Core Themes):*\n1. My Mother at 66: Kamala Das describes the pain of seeing her aging mother (pale as a late winter's moon) and the universal fear of losing parents.\n2. Keeping Quiet: Pablo Neruda asks humanity to count to 12 and stay completely still. Promotes introspection, mutual understanding, and stopping environmental destruction.\n3. A Thing of Beauty: John Keats states beautiful things leave a permanent mark, never pass into nothingness, and lift the 'pall of despondence' from our dark spirits.\n4. Aunt Jennifer's Tigers: Adrienne Rich highlights the patriarchal oppression of women. Aunt's fingers flutter under the 'massive weight of Uncle's wedding band', while her embroidered tigers prance proudly.",
// 📚 ENGLISH - VISTAS (Detailed)
    e_v1: "*The Third Level (Detailed):*\n• The Escape: Charley, a 31-year-old New Yorker, accidentally finds a 'Third Level' at Grand Central Station, taking him back to 1894 (Galesburg, Illinois).\n• Why? It's a psychological waking-dream wish fulfillment. Modern world is full of insecurity, fear, war, and worry.\n• The Proof: He finds old currency, people in vintage clothes, and a newspaper from 1894. His psychiatrist friend, Sam, calls it a hallucination but later goes missing. Charley finds a 'first-day cover' letter from Sam, written from Galesburg in 1894, proving the Third Level's existence.",
    
    e_v2: "*The Tiger King (Detailed):*\n• Prophecy: Chief Astrologer predicts the Maharaja of Pratibandapuram will be killed by the 100th tiger.\n• The Hunt: King bans tiger hunting by anyone else. He marries a princess just to get access to more tigers. Kills 99 tigers.\n• The 100th Tiger: Diwan secretly brings an old tiger from a zoo. The King shoots it, but misses. Hunters secretly kill it so the King doesn't know.\n• Irony/Climax: King buys a poorly carved wooden toy tiger for his son's birthday. A splinter pierces his hand, causes an infection, and kills him. The 100th tiger (wooden) takes its revenge.",

    // ⚡ PHYSICS (All Important Formulas & Points)
    p_1: "*Ch 1-2: Electrostatics & Potential*\n• Coulomb's Law: F = (1/4πε₀)(q₁q₂/r²)\n• Electric Field (E) = F/q\n• Dipole Moment (p) = q × 2a\n• Torque on Dipole: τ = pE sinθ\n• Gauss's Law: ∮E.dS = q_in / ε₀\n• Potential (V) = kq/r\n• Capacitance (C) = Q/V = ε₀A/d\n• Energy in Cap (U) = ½CV² = Q²/2C",
    
    p_2: "*Ch 3: Current Electricity*\n• Drift Velocity (Vd) = eEτ/m\n• Current (I) = neAVd\n• Ohm's Law: V = IR\n• Resitivity (ρ) = RA/l\n• Kirchhoff's Junction Law: ΣI = 0\n• Kirchhoff's Loop Law: ΣΔV = 0\n• Wheatstone Bridge: P/Q = R/S (Balanced)",
    
    p_3: "*Ch 4-5: Magnetism*\n• Biot-Savart Law: dB = (μ₀/4π)(Idl sinθ / r²)\n• Force on Moving Charge: F = q(v × B)\n• Lorentz Force: F = qE + q(v × B)\n• Ampere's Circuital Law: ∮B.dl = μ₀I_enclosed\n• Force b/w parallel wires: F/l = (μ₀I₁I₂)/(2πd)",
    
    p_4: "*Ch 6-7: EMI & AC*\n• Magnetic Flux (Φ) = B.A cosθ\n• Faraday's Law: e = -N(dΦ/dt)\n• Motional EMF: e = Bvl\n• AC Voltage: V = V₀ sin(ωt)\n• LCR Impedance: Z = √[R² + (Xl - Xc)²]\n• Resonance Condition: Xl = Xc ⇒ f = 1/(2π√LC)\n• Transformer Ratio: Vs/Vp = Ns/Np",
    
    p_5: "*Ch 8-10: Optics (Ray & Wave)*\n• Mirror Formula: 1/f = 1/v + 1/u\n• Lens Maker's: 1/f = (μ-1)(1/R₁ - 1/R₂)\n• Snell's Law: sin(i)/sin(r) = μ₂/μ₁\n• YDSE Fringe Width (β) = λD/d\n• Brewster's Law: μ = tan(ip)\n• Malus' Law: I = I₀ cos²θ",
    
    p_6: "*Ch 11-14: Modern Physics*\n• Einstein Photoelectric Eq: K_max = hν - Φ₀\n• De Broglie Wavelength: λ = h/p = h/√(2mK)\n• Bohr's Quantization: mvr = nh/2π\n• Mass Defect (Δm) = [Zm_p + (A-Z)m_n] - M\n• Energy Equivalence: E = Δmc²\n• Half-life: T½ = 0.693 / λ",

    // 🧪 CHEMISTRY (Detailed Points)
    c_1: "*Physical Chem (Solutions & Electrochem)*\n• Molarity (M) = Moles of solute / Vol of sol(L)\n• Molality (m) = Moles of solute / Mass of solvent(kg)\n• Raoult's Law: P_total = P°_A(X_A) + P°_B(X_B)\n• ΔTb = i*Kb*m (Elevation in BP)\n• ΔTf = i*Kf*m (Depression in FP)\n• Nernst Eq: E_cell = E°_cell - (0.0591/n) log(Product/Reactant)\n• Faraday's 1st Law: m = ZIt\n• Kohlrausch Law: Λ°m = ν+λ°+ + ν-λ°-",
    
    c_2: "*Physical Chem (Kinetics)*\n• Rate = k[A]ˣ[B]ʸ (Order = x+y)\n• Zero Order: k = ([A]₀ - [A]) / t\n• First Order: k = (2.303 / t) * log([A]₀ / [A])\n• Half-life (1st order): t½ = 0.693 / k\n• Arrhenius Eq: k = A * e^(-Ea/RT)",
    
    c_3: "*Inorganic (d/f Block & Coordination)*\n• Transition elements: Variable oxidation states, form colored ions (d-d transition).\n• Lanthanoid Contraction: Steady decrease in size due to poor shielding of 4f electrons.\n• Magnetic Moment: μ = √[n(n+2)] BM (n = unpaired e-)\n• Ligands: Strong field (pairing occurs), Weak field (no pairing).\n• Spectrochemical Series: I- < Br- < Cl- ... < CN- < CO",
c_4: "*Organic (Haloalkanes & Alcohols)*\n• SN1: 2-step, carbocation intermediate, 3°>2°>1°, racemization.\n• SN2: 1-step, transition state, 1°>2°>3°, complete inversion.\n• Markovnikov's Rule: Negative part goes to carbon with fewer Hydrogens.\n• Reimer-Tiemann: Phenol + CHCl3 + NaOH → Salicylaldehyde\n• Kolbe's: Phenol + CO2 + NaOH → Salicylic acid",
    
    c_5: "*Organic (Aldehydes, Ketones, Amines)*\n• Aldol Condensation: Requires α-Hydrogen. Forms β-hydroxy aldehyde.\n• Cannizzaro Rxn: No α-Hydrogen (e.g., HCHO). Self-ox/red to form alcohol & salt of acid.\n• Clemmensen Reduction: Carbonyl → Alkane (Zn-Hg / HCl)\n• Hoffmann Bromamide: Amide + Br2 + NaOH → Primary Amine (1 Carbon less)\n• Carbylamine Test: Only 1° amines give foul smell.",

    // 📐 MATHS (Full Formulas)
    m_1: "*Ch 1-2: Relations & ITF*\n• Reflexive: (a,a) ∈ R\n• Symmetric: (a,b) ∈ R ⇒ (b,a) ∈ R\n• Transitive: (a,b) ∈ R & (b,c) ∈ R ⇒ (a,c) ∈ R\n• sin⁻¹(sin x) = x (if x ∈ [-π/2, π/2])\n• tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]",
    
    m_2: "*Ch 3-4: Matrices & Determinants*\n• Matrix Multiplication is NOT commutative (AB ≠ BA generally).\n• Transpose: (AB)' = B'A'\n• Singular Matrix: |A| = 0\n• A(adj A) = (adj A)A = |A|I\n• Inverse: A⁻¹ = 1/|A| * (adj A)",
    
    m_3: "*Ch 5-6: Diff & Application of Derivatives*\n• Chain Rule: dy/dx = (dy/du) * (du/dx)\n• Product Rule: (uv)' = u'v + uv'\n• Quotient Rule: (u/v)' = (u'v - uv') / v²\n• Strictly Increasing: f'(x) > 0\n• Strictly Decreasing: f'(x) < 0\n• Local Maxima: f'(c) = 0 and f''(c) < 0\n• Local Minima: f'(c) = 0 and f''(c) > 0",
    
    m_4: "*Ch 7-9: Integrals & Diff Equations*\n• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n• ∫eˣ[f(x) + f'(x)]dx = eˣf(x) + C\n• Integration by Parts: ∫uv dx = u∫v dx - ∫(u'∫v dx)dx\n• Area under curve: ∫y dx (a to b)\n• Linear Diff Eq: dy/dx + Py = Q\n• Integrating Factor (IF) = e^(∫P dx)\n• Solution: y(IF) = ∫[Q * IF]dx + C",
    
    m_5: "*Ch 10-11: Vectors & 3D Geometry*\n• Dot Product: a.b = |ab|cosθ (Scalar)\n• Cross Product: a×b = |ab|sinθ n̂ (Vector)\n• Area of parallelogram = |a×b|\n• Direction Cosines: l² + m² + n² = 1\n• Equation of Line: r = a + λb\n• Shortest distance b/w skew lines: |(b₁ × b₂).(a₂ - a₁)| / |b₁ × b₂|",
    
    m_6: "*Ch 12-13: LPP & Probability*\n• LPP: Always find corner points of the feasible region and put in Objective Function Z=ax+by.\n• Conditional Prob: P(A|B) = P(A∩B) / P(B)\n• Independent Events: P(A∩B) = P(A) * P(B)\n• Theorem of Total Prob: P(A) = Σ P(E_i) * P(A|E_i)\n• Bayes' Theorem: P(E₁|A) = [P(E₁)P(A|E₁)] / [Σ P(E_i)P(A|E_i)]"
};

// ==========================================
// --- MENU SYSTEM ---
// ==========================================

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📐 Maths', callback_data: 'm_menu' }, { text: '⚡ Physics', callback_data: 'p_menu' }],
                [{ text: '🧪 Chemistry', callback_data: 'c_menu' }, { text: '📚 English', callback_data: 'e_menu' }]
            ]
        }
    };
    bot.sendMessage(chatId, "🔥 *Class 12 Mega Bot v3.0* 🔥\nSaare subjects aur detailed summaries. Subject chuno:", {parse_mode: "Markdown", ...options});
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // --- MAIN MENUS ---
    if (data === 'm_menu') {
        bot.sendMessage(chatId, "📐 *Maths Units:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Rel & ITF', callback_data: 'm_1' }, { text: 'Matrices/Det', callback_data: 'm_2' }],
            [{ text: 'Diff & AOD', callback_data: 'm_3' }, { text: 'Integrals & DE', callback_data: 'm_4' }],
            [{ text: 'Vectors & 3D', callback_data: 'm_5' }, { text: 'LPP & Prob', callback_data: 'm_6' }],
[{ text: '🔙 Main Menu', callback_data: 'back' }]
        ]}});
    }
    else if (data === 'p_menu') {
        bot.sendMessage(chatId, "⚡ *Physics Units:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Electrostatics', callback_data: 'p_1' }, { text: 'Current Elec', callback_data: 'p_2' }],
            [{ text: 'Magnetism', callback_data: 'p_3' }, { text: 'EMI & AC', callback_data: 'p_4' }],
            [{ text: 'Optics', callback_data: 'p_5' }, { text: 'Modern Phy', callback_data: 'p_6' }],
            [{ text: '🔙 Main Menu', callback_data: 'back' }]
        ]}});
    }
    else if (data === 'c_menu') {
        bot.sendMessage(chatId, "🧪 *Chemistry Units:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Physical (Sol/Elec)', callback_data: 'c_1' }, { text: 'Physical (Kin)', callback_data: 'c_2' }],
            [{ text: 'Inorganic', callback_data: 'c_3' }, { text: 'Org: Halo/Alc', callback_data: 'c_4' }],
            [{ text: 'Org: Ald/Amine', callback_data: 'c_5' }, { text: '🔙 Main Menu', callback_data: 'back' }]
        ]}});
    }
    else if (data === 'e_menu') {
        bot.sendMessage(chatId, "📚 *English Sections:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: '📖 Flamingo', callback_data: 'e_flam_menu' }, { text: '📘 Vistas', callback_data: 'e_vist_menu' }],
            [{ text: '🔙 Main Menu', callback_data: 'back' }]
        ]}});
    }

    // --- ENGLISH SUB-MENUS ---
    else if (data === 'e_flam_menu') {
        bot.sendMessage(chatId, "📖 *Flamingo Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Last Lesson', callback_data: 'e_f1' }, { text: 'Lost Spring', callback_data: 'e_f2' }],
            [{ text: 'Deep Water', callback_data: 'e_f3' }, { text: 'Rattrap', callback_data: 'e_f4' }],
            [{ text: '🌸 All Poems Summary', callback_data: 'e_fp' }],
            [{ text: '🔙 Back', callback_data: 'e_menu' }]
        ]}});
    }
    else if (data === 'e_vist_menu') {
        bot.sendMessage(chatId, "📘 *Vistas Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Third Level', callback_data: 'e_v1' }, { text: 'Tiger King', callback_data: 'e_v2' }],
            [{ text: '🔙 Back', callback_data: 'e_menu' }]
        ]}});
    }

    // --- GO BACK ---
    else if (data === 'back') {
        bot.sendMessage(chatId, "Wapas Main Menu par:", { reply_markup: { inline_keyboard: [
            [{ text: '📐 Maths', callback_data: 'm_menu' }, { text: '⚡ Physics', callback_data: 'p_menu' }],
            [{ text: '🧪 Chemistry', callback_data: 'c_menu' }, { text: '📚 English', callback_data: 'e_menu' }]
        ]}});
    }
    
    // --- SEND CONTENT ---
    else if (botData[data]) {
        bot.sendMessage(chatId, botData[data], {parse_mode: "Markdown"});
    }
});
