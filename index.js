const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// --- 1. Anti-Sleep Server ---
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Class 12 MegaBot is Running 24/7!\n');
});
server.listen(process.env.PORT || 3000);

// --- 2. Bot Setup ---
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// ==========================================
// --- 3. MEGA DATA DICTIONARY (A to Z) ---
// ==========================================

const megaData = {
    // ⚡ PHYSICS (All 14 Chapters - Main Formulas)
    phy_1: "*Ch 1: Charges & Fields*\n• Quantization: q = ne\n• Coulomb's Law: F = (1/4πε₀)(q₁q₂/r²)\n• Dipole Moment: p = q × 2a\n• Gauss Law: Φ = q_enclosed / ε₀",
    phy_2: "*Ch 2: Potential & Capacitance*\n• Potential (point charge): V = kq/r\n• Capacitance: C = Q/V\n• Parallel Plate: C = ε₀A/d\n• Energy: U = 1/2 CV²",
    phy_3: "*Ch 3: Current Electricity*\n• Drift Velocity: Vd = (eE/m)τ\n• Ohm's Law: V = IR\n• Wheatstone Bridge: P/Q = R/S",
    phy_4: "*Ch 4: Moving Charges*\n• Biot-Savart: dB = (μ₀/4π)(I dl sinθ/r²)\n• Force on moving charge: F = q(v × B)\n• Radius of path: r = mv/qB",
    phy_5: "*Ch 5-7: Magnetism, EMI & AC*\n• Faraday's Law: e = -dΦ/dt\n• Motional EMF: e = Bvl\n• LCR Impedance: Z = √[R² + (Xl - Xc)²]\n• Resonant freq: f = 1/(2π√LC)",
    phy_8: "*Ch 8-10: EM Waves & Optics*\n• EM Wave speed: c = 1/√(μ₀ε₀)\n• Mirror/Lens: 1/f = 1/v ± 1/u\n• Prism: μ = sin((A+δm)/2) / sin(A/2)\n• YDSE Fringe Width: β = λD/d",
    phy_11: "*Ch 11-14: Modern Physics*\n• Einstein Photoelectric: K_max = hν - Φ\n• De Broglie: λ = h/p\n• Bohr Radius: r = 0.529 (n²/Z) Å\n• Mass Defect: ΔE = Δmc²",

    // 🧪 CHEMISTRY (New Syllabus 10 Chapters)
    chem_1: "*Ch 1: Solutions*\n• Molarity = Moles/Vol(L)\n• Raoult's Law: P = P⁰ * x\n• Elevation in B.P: ΔTb = i*Kb*m\n• Depression in F.P: ΔTf = i*Kf*m",
    chem_2: "*Ch 2: Electrochemistry*\n• Nernst: E = E⁰ - (0.059/n)logQ\n• ΔG⁰ = -nFE⁰\n• Faraday 1st Law: W = ZIt",
    chem_3: "*Ch 3: Chemical Kinetics*\n• Zero Order: [A] = [A]₀ - kt\n• 1st Order: k = (2.303/t)log([A]₀/[A])\n• Half Life (1st order): t½ = 0.693/k\n• Arrhenius: k = Ae^(-Ea/RT)",
    chem_4: "*Ch 4-5: d/f Block & Coordination*\n• Magnetic Moment: μ = √[n(n+2)] BM\n• Lanthanoid Contraction: Size decreases due to poor shielding of 4f.\n• CFT: Δo splitting energy.",
    chem_6: "*Ch 6: Haloalkanes/arenes*\n• SN1: 3° > 2° > 1° (Racemization)\n• SN2: 1° > 2° > 3° (Inversion)\n• Saytzeff Rule: Highly substituted alkene is major.",
    chem_7: "*Ch 7-9: Organic Conversions*\n• Reimer-Tiemann: Phenol → Salicylaldehyde\n• Aldol Condensation: α-H required.\n• Cannizzaro: No α-H (HCHO).\n• Hoffmann Bromamide: Amide → 1° Amine (1 C less).",
    chem_10: "*Ch 10: Biomolecules*\n• Glucose: Aldohexose (C6H12O6)\n• Peptide Bond: Connects amino acids (-CONH-).\n• DNA/RNA: ATGC vs AUGC base pairs.",

    // 📚 ENGLISH (Flamingo, Vistas & Writing Section)
    eng_flam: "*Flamingo (Prose & Poetry):*\n1. *Last Lesson:* Linguistic chauvinism, importance of mother tongue.\n2. *Lost Spring:* Child labor, Saheb (ragpicker) & Mukesh (bangle maker).\n3. *Deep Water:* Overcoming fear of water.\n4. *Rattrap:* Human loneliness, goodness can be awakened by love.\n5. *Indigo:* Champaran movement, self-reliance.\n*Poetry:* \n• *My Mother at 66:* Fear of loss, aging.\n• *Keeping Quiet:* Introspection, peace.\n• *Thing of Beauty:* Nature's permanent joy.",
    eng_vist: "*Vistas (Summaries):*\n1. *Third Level:* Escapism from modern stress (Charley's illusion).\n2. *Tiger King:* Satire on people in power, destiny is supreme.\n3. *Enemy:* Dr. Sadao's dilemma between patriotism and duty as a doctor.\n4. *On the Face of It:* Derry (burnt face) & Mr. Lamb (tin leg) - optimism vs pessimism.\n5. *Memories of Childhood:* Zitkala-Sa & Bama (marginalization & discrimination).",
eng_write: "*Writing Section & Grammar Formats:*\n📝 *Notice (50 words):*\n[Box Box Box]\nNAME OF INSTITUTION\nNOTICE\nDate\nHeading\nBody (Target audience, Date, Time, Venue, Agenda)\nSign\nName & Designation\n\n📝 *Formal Letter:*\nSender's Add\nDate\nReceiver's Add\nSubject:\nSalutation (Sir/Madam),\nBody (Para 1: Intro, Para 2: Detail, Para 3: Conclusion/Request)\nYours faithfully/truly,\nName\n\n📝 *Article/Report:*\nHeading\nBy [Name]\nBody (Intro, Causes/Effects, Conclusion/Suggestions). Always use passive voice for Reports."
};

// ==========================================
// --- 4. MENU SYSTEM (Main & Sub-menus) ---
// ==========================================

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '⚡ Physics (All Ch)', callback_data: 'menu_phy' }, { text: '🧪 Chemistry (All Ch)', callback_data: 'menu_chem' }],
                [{ text: '📚 English (Full)', callback_data: 'menu_eng' }]
            ]
        }
    };
    bot.sendMessage(chatId, "🔥 *Class 12 Ultimate Brahmastra Bot* 🔥\nSaara syllabus yahan hai. Subject choose karo:", {parse_mode: "Markdown", ...options});
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // --- SUB-MENUS ---
    if (data === 'menu_phy') {
        bot.sendMessage(chatId, "⚡ *Physics Units:*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [
                [{ text: 'Ch 1: Charges/Fields', callback_data: 'phy_1' }, { text: 'Ch 2: Potential/Cap', callback_data: 'phy_2' }],
                [{ text: 'Ch 3: Current Elec', callback_data: 'phy_3' }, { text: 'Ch 4: Moving Charges', callback_data: 'phy_4' }],
                [{ text: 'Ch 5-7: Mag, EMI, AC', callback_data: 'phy_5' }, { text: 'Ch 8-10: Optics/EM', callback_data: 'phy_8' }],
                [{ text: 'Ch 11-14: Modern Phy', callback_data: 'phy_11' }]
            ]}
        });
    }
    else if (data === 'menu_chem') {
        bot.sendMessage(chatId, "🧪 *Chemistry Units:*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [
                [{ text: 'Ch 1: Solutions', callback_data: 'chem_1' }, { text: 'Ch 2: Electrochemistry', callback_data: 'chem_2' }],
                [{ text: 'Ch 3: Kinetics', callback_data: 'chem_3' }, { text: 'Ch 4-5: In-Organic', callback_data: 'chem_4' }],
                [{ text: 'Ch 6: Haloalkanes', callback_data: 'chem_6' }, { text: 'Ch 7-9: Organic Main', callback_data: 'chem_7' }],
                [{ text: 'Ch 10: Biomolecules', callback_data: 'chem_10' }]
            ]}
        });
    }
    else if (data === 'menu_eng') {
        bot.sendMessage(chatId, "📚 *English (Core):*", {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [
                [{ text: '📖 Flamingo (All)', callback_data: 'eng_flam' }, { text: '📘 Vistas (All)', callback_data: 'eng_vist' }],
                [{ text: '✍️ Writing Section & Formats', callback_data: 'eng_write' }]
            ]}
        });
    }
    // --- SENDING ACTUAL CONTENT ---
    else if (megaData[data]) {
        bot.sendMessage(chatId, megaData[data], {parse_mode: "Markdown"});
    }
});
