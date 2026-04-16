const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// --- 1. Anti-Sleep Server ---
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Class 12 Pro Folder Bot is Running 24/7!\n');
});
server.listen(process.env.PORT || 3000);

// --- 2. Bot Setup ---
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

// ==========================================
// --- 3. DATA DICTIONARY (Har Chapter Alag) ---
// ==========================================
const botData = {
    // 📐 MATHS CHAPTERS
    m_mat: "*Matrices & Determinants:*\n1. Transpose: (A')' = A\n2. A(adj A) = |A|I\n3. Inverse: A⁻¹ = (1/|A|) * (adj A)",
    m_cal: "*Calculus (Diff & Int):*\n1. d/dx(uv) = u.v' + v.u'\n2. ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n3. ∫eˣ dx = eˣ",
    m_vec: "*Vectors & 3D:*\n1. Dot: a.b = |ab|cosθ\n2. Cross: a×b = |ab|sinθ n̂\n3. Distance Formula in 3D.",

    // ⚡ PHYSICS CHAPTERS
    p_elec: "*Electrostatics:*\n1. Coulomb's Law: F = (1/4πε₀)(q₁q₂/r²)\n2. Gauss Law: Φ = q / ε₀\n3. Capacitance: C = ε₀A/d",
    p_mag: "*Magnetism & EMI:*\n1. Biot-Savart: dB = (μ₀/4π)(I dl sinθ/r²)\n2. Faraday's Law: e = -dΦ/dt",
    p_opt: "*Ray & Wave Optics:*\n1. Mirror/Lens: 1/f = 1/v ± 1/u\n2. YDSE Fringe Width: β = λD/d",
    p_mod: "*Modern Physics:*\n1. Photoelectric: K_max = hν - Φ\n2. De Broglie: λ = h/p\n3. Mass Defect: ΔE = Δmc²",

    // 🧪 CHEMISTRY - PHYSICAL
    c_p_sol: "*Solutions:*\n1. Raoult's Law: P = P⁰ * x\n2. Elevation in B.P: ΔTb = i*Kb*m\n3. Osmotic Pressure: π = CRT",
    c_p_elec: "*Electrochemistry:*\n1. Nernst: E = E⁰ - (0.059/n)logQ\n2. Faraday 1st Law: W = ZIt",
    c_p_kin: "*Chemical Kinetics:*\n1. 1st Order: k = (2.303/t)log([A]₀/[A])\n2. Half Life: t½ = 0.693/k",

    // 🧪 CHEMISTRY - ORGANIC
    c_o_halo: "*Haloalkanes:*\n1. SN1: 3° > 2° > 1° (Racemization)\n2. SN2: 1° > 2° > 3° (Inversion)",
    c_o_alc: "*Alcohols & Phenols:*\n1. Reimer-Tiemann: Phenol → Salicylaldehyde\n2. Kolbe's: Phenol → Salicylic Acid",
    c_o_bio: "*Biomolecules:*\n1. Glucose: Aldohexose\n2. Proteins: Peptide bonds (-CONH-)",

    // 📚 ENGLISH - FLAMINGO
    e_f_last: "*The Last Lesson:*\nSummary: M. Hamel's last French class. Shows the pain of losing mother tongue and linguistic chauvinism. Franz realizes the value of his language too late.",
    e_f_spring: "*Lost Spring:*\nSummary: Saheb (ragpicker looking for gold in garbage) and Mukesh (bangle maker in Firozabad). Highlights grinding poverty and child labor.",
    e_f_water: "*Deep Water:*\nSummary: Douglas overcomes his hydrophobia (fear of water) step-by-step with a professional instructor. Theme: Willpower conquers fear.",

    // 📚 ENGLISH - VISTAS
    e_v_third: "*The Third Level:*\nSummary: Charley hallucinates a 3rd level at Grand Central Station. It's a psychological escape from modern-day stress, war, and worries.",
    e_v_tiger: "*The Tiger King:*\nSummary: Maharaja of Pratibandapuram kills 99 tigers to avoid a prophecy, but dies because of a wooden toy tiger's splinter. Irony and satire on power.",
    
    // 📚 ENGLISH - WRITING
    e_w_notice: "*Notice Writing Format:*\n[Make a Box]\nNAME OF SCHOOL\nNOTICE\nDate\nHeading\nBody (What, When, Where)\nSign\nName"
};

// ==========================================
// --- 4. MENUS AND NAVIGATION ---
// ==========================================

// MAIN MENU
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📐 Maths', callback_data: 'menu_math' }, { text: '⚡ Physics', callback_data: 'menu_phy' }],
                [{ text: '🧪 Chemistry', callback_data: 'menu_chem' }, { text: '📚 English', callback_data: 'menu_eng' }]
            ]
        }
    };
    bot.sendMessage(chatId, "🔥 *Class 12 Ultimate Folder Bot* 🔥\nKaunsa subject padhna hai bhai?", {parse_mode: "Markdown", ...options});
});
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    // --- SUBJECT MENUS ---
    if (data === 'menu_math') {
        bot.sendMessage(chatId, "📐 *Maths Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Matrices & Det', callback_data: 'm_mat' }, { text: 'Calculus', callback_data: 'm_cal' }],
            [{ text: 'Vectors & 3D', callback_data: 'm_vec' }, { text: '🔙 Back to Main', callback_data: 'go_back' }]
        ]}});
    }
    else if (data === 'menu_phy') {
        bot.sendMessage(chatId, "⚡ *Physics Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Electrostatics', callback_data: 'p_elec' }, { text: 'Magnetism/EMI', callback_data: 'p_mag' }],
            [{ text: 'Optics', callback_data: 'p_opt' }, { text: 'Modern Physics', callback_data: 'p_mod' }],
            [{ text: '🔙 Back to Main', callback_data: 'go_back' }]
        ]}});
    }
    else if (data === 'menu_chem') {
        // Chemistry Section Divider
        bot.sendMessage(chatId, "🧪 *Chemistry Sections:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: '⚗️ Physical Chemistry', callback_data: 'chem_physical' }],
            [{ text: '🧬 Organic Chemistry', callback_data: 'chem_organic' }],
            [{ text: '🔙 Back to Main', callback_data: 'go_back' }]
        ]}});
    }
    else if (data === 'menu_eng') {
        // English Section Divider
        bot.sendMessage(chatId, "📚 *English Literature & Writing:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: '📖 Flamingo', callback_data: 'eng_flam' }, { text: '📘 Vistas', callback_data: 'eng_vist' }],
            [{ text: '✍️ Writing Section', callback_data: 'eng_write' }],
            [{ text: '🔙 Back to Main', callback_data: 'go_back' }]
        ]}});
    }

    // --- CHEMISTRY SUB-MENUS ---
    else if (data === 'chem_physical') {
        bot.sendMessage(chatId, "⚗️ *Physical Chemistry:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Solutions', callback_data: 'c_p_sol' }, { text: 'Electrochem', callback_data: 'c_p_elec' }],
            [{ text: 'Kinetics', callback_data: 'c_p_kin' }, { text: '🔙 Chemistry Menu', callback_data: 'menu_chem' }]
        ]}});
    }
    else if (data === 'chem_organic') {
        bot.sendMessage(chatId, "🧬 *Organic Chemistry:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Haloalkanes', callback_data: 'c_o_halo' }, { text: 'Alcohols/Phenols', callback_data: 'c_o_alc' }],
            [{ text: 'Biomolecules', callback_data: 'c_o_bio' }, { text: '🔙 Chemistry Menu', callback_data: 'menu_chem' }]
        ]}});
    }

    // --- ENGLISH SUB-MENUS ---
    else if (data === 'eng_flam') {
        bot.sendMessage(chatId, "📖 *Flamingo Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'The Last Lesson', callback_data: 'e_f_last' }, { text: 'Lost Spring', callback_data: 'e_f_spring' }],
            [{ text: 'Deep Water', callback_data: 'e_f_water' }, { text: '🔙 English Menu', callback_data: 'menu_eng' }]
        ]}});
    }
    else if (data === 'eng_vist') {
        bot.sendMessage(chatId, "📘 *Vistas Chapters:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'The Third Level', callback_data: 'e_v_third' }, { text: 'The Tiger King', callback_data: 'e_v_tiger' }],
            [{ text: '🔙 English Menu', callback_data: 'menu_eng' }]
        ]}});
    }
    else if (data === 'eng_write') {
        bot.sendMessage(chatId, "✍️ *Writing Section:*", { parse_mode: "Markdown", reply_markup: { inline_keyboard: [
            [{ text: 'Notice Format', callback_data: 'e_w_notice' }],
            [{ text: '🔙 English Menu', callback_data: 'menu_eng' }]
        ]}});
    }
// --- GO BACK TO MAIN MENU ---
    else if (data === 'go_back') {
        bot.sendMessage(chatId, "Kaunsa subject padhna hai bhai?", {
            reply_markup: { inline_keyboard: [
                [{ text: '📐 Maths', callback_data: 'menu_math' }, { text: '⚡ Physics', callback_data: 'menu_phy' }],
                [{ text: '🧪 Chemistry', callback_data: 'menu_chem' }, { text: '📚 English', callback_data: 'menu_eng' }]
            ] }
        });
    }

    // --- FINAL DATA SENDING (Formulas & Summaries) ---
    else if (botData[data]) {
        bot.sendMessage(chatId, botData[data], {parse_mode: "Markdown"});
    }
});
