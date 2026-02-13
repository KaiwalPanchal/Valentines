// Helper: create purple letter images from text
function L(text) {
    return text.split('').map(c => {
        if (c === ' ') return '<span class="letter-space"></span>';
        if (/[a-zA-Z]/.test(c)) return `<img src="purple-fonts/${c.toLowerCase()}.png" class="letter-img" alt="${c}">`;
        return `<span class="letter-punct">${c}</span>`;
    }).join('');
}

// All pages: index 0 = bottom of stack (last seen), last index = top (first seen)
const PAGES = [

    // ===== PAGE 0: Case Closed Part 2 (BOTTOM - last seen) =====
    `<div class="section-title" style="color:#4B0082">Will you be my girlfriend?</div>
<p class="body-sm"><strong>I promise to:</strong></p>
<ul class="body-sm compact-list">
<li>Always be your safe space, no matter what</li>
<li>Be your biggest cheerleader through every exam, moot, and life challenge</li>
<li>Handle your nakhras with patience (and only moderate complaining)</li>
<li>Never stop telling you how beautiful your eyes are</li>
<li>Accept my third-place ranking after Buttercupp and Sam's Pizza</li>
<li>Continue serving as your human alarm clock</li>
<li>Be your mandatory Chief Hype Officer for all artistic endeavors</li>
<li>Love you more every single day</li>
</ul>
<p class="body-sm" style="margin-top:8px"><em>Forever yours (pending your verdict),</em><br><strong>Kaiwal</strong> ❤️</p>
<p class="body-xs" style="margin-top:6px"><em>P.S. - Your rabbit teeth are still my favorite thing in the world.</em><br>
<em>P.P.S. - I'm still traumatized by that "Bhaiya" incident but I forgive you because you're cute.</em><br>
<em>P.P.P.S. - This took me way longer to write than any economics paper you've ever done. You've already won.</em></p>`,

    // ===== PAGE 1: Case Closed Part 1 =====
    `<div class="letter-title">${L('CASE CLOSED')}</div>
<p class="divider">━━━━━━━━━━━━━━━━━━━━━━━</p>
<p class="body-sm"><strong>Disha Joshi,</strong></p>
<p class="body-xs">This whole "legal brief" might be silly, but every word of evidence is true. From the moment you became my "safe space" to every time your eyes hypnotize me, from 5:30 AM pasta attempts to late-night Sam's Pizza runs, from supporting you through every moot court to being your personal hype squad for that art wall—every single moment has been building to this.</p>
<p class="body-xs">You're the girl who simultaneously intimidates me with her intelligence (45/50 in Econ? That 14-page Barbie Economics paper? Come on!) and melts my heart with her rabbit teeth smile. You're the one who can go from calling me an "idiot" to "I miss you".</p>
<p class="body-xs">You're impossibly beautiful in red, white, black, and every color in between. You're ridiculously smart, adorably feisty, dangerously curious about everything, and somehow you make me feel like the luckiest guy in the world.</p>
<p class="body-xs">Yes, you're a "full-out TASK" with all your nakhras. Yes, I'm competing with Sam's Pizza for your affection (and honestly, they're winning). And yes, I'm absolutely, completely, hopelessly in love with you.</p>
<p class="body-xs">So here's my official statement for the record: <strong>I love you.</strong></p>`,

    // ===== PAGE 2: Plea Form =====
    `<h2 class="section-title" style="color:#4B0082">PLEA ENTRY FORM</h2>
<p class="body-sm"><strong>To:</strong> Kaiwal Panchal, Plaintiff<br><strong>From:</strong> Disha Joshi, Defendant<br><strong>Re:</strong> Case No. 2026-FEB-FOREVER</p>
<p class="body-xs">Having reviewed all charges and evidence presented against me, including but not limited to: weaponized eye contact, strategic deployment of rabbit teeth, calculated "safe space" admissions, premeditated adorableness, malicious "Bhaiya" usage, the color theory paradox, academic intimidation, culinary manipulation, and the theft of your entire heart...</p>
<h3 class="section-sub">I hereby enter my official plea:</h3>
<div class="plea-options">
<div class="checkbox-group"><div class="box">&#x2003;</div><span><strong>GUILTY</strong> - I accept the sentence<br><em>(A lifetime as your girlfriend? Yes please!)</em></span></div>
<div class="checkbox-group"><div class="box">&#x2003;</div><span><strong>NOT GUILTY</strong> - I contest the charges<br><em>(Prepare for a very long appeal process...)</em></span></div>
</div>
<p class="body-sm" style="margin-top:10px"><strong>Signature:</strong> _______________________<br><strong>Date:</strong> _______________________</p>`,

    // ===== PAGE 3: Sentencing Part 2 =====
    `<h3 class="section-sub">With mandatory terms including:</h3>
<ul class="body-sm compact-list">
<li>Unlimited cuddles, hand-holding, and forehead kisses</li>
<li>Mandatory morning "good morning beautiful" texts</li>
<li>Endless support during moot courts, exams, and all future endeavors</li>
<li>Perpetual hype-man duties for art walls and achievements</li>
<li>Continued brookie privileges (with improved recipes)</li>
<li>Late-night food runs to Sam's Pizza (you and that pizza can stay married, I'll be the side piece)</li>
<li>Acceptance of "Bhaiya" violations with only moderate eye-rolling</li>
<li>Being my favorite person to annoy, laugh with, and adore</li>
<li>Handling your nakhras with patience (you're a full-out TASK but strictly worth it)</li>
</ul>`,

    // ===== PAGE 4: Sentencing Part 1 =====
    `<div class="letter-title">${L('SENTENCING')}</div>
<p class="body-sm">For the crimes of:</p>
<ul class="body-xs compact-list">
<li>Stealing my heart through systematic "safe space" infiltration</li>
<li>Monopolizing my thoughts to the point where boys' trips become texting marathons</li>
<li>Being impossibly adorable across the entire color spectrum</li>
<li>Possessing felonious beauty with hypnotic green eyes</li>
<li>Committing culinary extortion via hummus and 5:30 AM pasta</li>
<li>Conspiring to make me fall completely in love with you</li>
<li>Engaging in first-degree drama while simultaneously being my safe space</li>
<li>Academic intimidation through topping your batch while looking stunning</li>
<li>Malicious deployment of "Bhaiya" despite being the Baby</li>
<li>Ranking yourself above Ghevar Rabdi (and succeeding)</li>
</ul>
<p class="body-sm" style="margin-top:8px">The Defendant is hereby sentenced to:</p>
<div class="verdict-big" style="font-size:1.1rem;margin-top:4px">A LIFETIME of being my girlfriend</div>`,

    // ===== PAGE 5: Verdict =====
    `<div class="letter-title">${L('THE VERDICT')}</div>
<p class="divider">━━━━━━━━━━━━━━━━━━━━━━━</p>
<p class="body-xs">After careful review of the evidence submitted, including but not limited to: hypnotic eyes, "safe space" confessions, rabbit teeth incidents, 5:30 AM pasta cooking, homemade hummus deliveries, late-night cupcake runs, green-eyed car moments, Ghevar Rabdi rankings, maternal witness testimony, the "coupla coupli" admission, aggressive "Bhaiya" deployment, the color theory paradox, Sam's Pizza relationship declarations, the Barbie Economics thesis, and documented cases of being impossibly cute while acing exams...</p>
<p class="body-sm"><strong>This Court finds the evidence OVERWHELMING and IRREFUTABLE.</strong></p>
<p class="body-sm">THE COURT HEREBY DECLARES:</p>
<p class="body-xs">On all counts charged, the Defendant, <strong>DISHA JOSHI</strong>, is found:</p>
<div class="letter-title" style="margin-top:10px">${L('GUILTY')}</div>
<p class="body-sm" style="text-align:center;margin-top:4px"><em>ABSOLUTELY, UNDENIABLY, PERFECTLY</em></p>`,

    // ===== PAGE 6: Exhibits V-Z (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT V: The "Full-Out Task" Admission</h4>
<p class="ev-meta"><strong>Type:</strong> Self-incriminating text &nbsp;|&nbsp; <strong>Content:</strong> <em>"You're easier to manage, I'm a full-out TASK."</em></p>
<p class="body-xs"><strong>Significance:</strong> Self-incriminating testimony where the Defendant admits to high-level "Nakhras." However, the Plaintiff would like to submit a counter-plea that he enjoys the challenge, establishing this as consensual emotional chaos.</p></div>
<div class="exhibit"><h4>EXHIBIT W: The "Coupla Coupli" Admission</h4>
<p class="ev-meta"><strong>Type:</strong> Written confession &nbsp;|&nbsp; <strong>Content:</strong> <em>"Love how i can do coupla coupli stuff with the Panchal siblings."</em></p>
<p class="body-xs"><strong>Significance:</strong> Irrefutable written admission acknowledging that shared activities mimic romantic partnership despite maintaining a "just friends" plea. Constitutes prima facie evidence of conspiracy to blur friendship-romance boundaries.</p></div>
<div class="exhibit"><h4>EXHIBIT X: The Wake-Up Call Protocol</h4>
<p class="ev-meta"><strong>Type:</strong> Text + call log &nbsp;|&nbsp; <strong>Content:</strong> <em>"wake uppppppppp"</em></p>
<p class="body-xs"><strong>Significance:</strong> Digital footprint of the Plaintiff serving as a human alarm clock. The excessive use of the letter "p" (seven instances) indicates the Defendant's comfort in making demands.</p></div>
<div class="exhibit"><h4>EXHIBIT Y: The Art Wall Hype Requirement</h4>
<p class="ev-meta"><strong>Type:</strong> Photo/video of art wall</p>
<p class="body-xs"><strong>Significance:</strong> Exhibit demonstrating the Defendant's artistic talent and the Plaintiff's mandatory role as Chief Hype Officer. Proves the Defendant's ability to command unwavering support regardless of visual clarity.</p></div>
<div class="exhibit"><h4>EXHIBIT Z: The "Hot Nerd" Theory</h4>
<p class="ev-meta"><strong>Type:</strong> Photos of Defendant reading/studying</p>
<p class="body-xs"><strong>Significance:</strong> Visual support for the Plaintiff's argument that "nerds look hot," citing the Defendant's Harry Potter phase and excessive reading habits. Constitutes aggravated disorderly conduct.</p></div>`,

    // ===== PAGE 7: Exhibits R, S, T, U (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT R: The Sugar Conspiracy</h4>
<p class="ev-meta"><strong>Type:</strong> Photos of Buttercup Cupcakes and Fafda Jalebi</p>
<p class="body-xs"><strong>Significance:</strong> Physical evidence of the "Sugar Conspiracy." Despite the Plaintiff's claims of being "health conscious," the Defendant successfully coerced the Plaintiff into consuming high-calorie contraband. Proves the Defendant's power to override the Plaintiff's dietary principles.</p></div>
<div class="exhibit"><h4>EXHIBIT S: The Ghevar Rabdi Ranking</h4>
<p class="ev-meta"><strong>Type:</strong> Text &nbsp;|&nbsp; <strong>Content:</strong> <em>"I thought I was your favourite Indian sweet?"</em></p>
<p class="body-xs"><strong>Significance:</strong> The Defendant successfully argued she should rank above traditional desserts in the Plaintiff's preference hierarchy. The Plaintiff's inability to dispute this claim confirms the Defendant's complete control over his value system.</p></div>
<div class="exhibit"><h4>EXHIBIT T: The "Bare Minimum" Negotiations</h4>
<p class="ev-meta"><strong>Type:</strong> Text message &nbsp;|&nbsp; <strong>Content:</strong> <em>"Would you judge me if i ask you to actually get me brownies and jasuben?"</em></p>
<p class="body-xs"><strong>Significance:</strong> Physical proof of the "redefined bare minimum." The Defendant has established that preventing her from eating "just ice cream" for dinner requires the Plaintiff to traverse the city of Ahmedabad.</p></div>
<div class="exhibit"><h4>EXHIBIT U: The "Rabbit Teeth" Confession</h4>
<p class="ev-meta"><strong>Type:</strong> Screenshot from roast session &nbsp;|&nbsp; <strong>Date:</strong> Feb 4, 2026</p>
<p class="body-xs"><strong>Significance:</strong> Visual documentation of the Defendant's smile causing the Plaintiff to break character during a competitive roast session and admit "love everything about you." Forensic analysis confirms seventeen additional roasts were never delivered due to this incident.</p></div>`,

    // ===== PAGE 8: Exhibits N, O, P, Q (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT N: The 5:30 AM Arrabiata Incident</h4>
<p class="ev-meta"><strong>Type:</strong> Photographic evidence of pasta &nbsp;|&nbsp; <strong>Date:</strong> Jan 26, 2026, 05:30</p>
<p class="body-xs"><strong>Significance:</strong> Physical proof of the Plaintiff entering "Mom Mode" at ungodly hours. The Defendant's acceptance without judgment proves conspiracy to induce emotional attachment. Sleep deprivation adds to the severity of the charge.</p></div>
<div class="exhibit"><h4>EXHIBIT O: The Hummus Bribe</h4>
<p class="ev-meta"><strong>Type:</strong> Photo of homemade hummus &nbsp;|&nbsp; <strong>Content:</strong> <em>"Your hummus>>>"</em></p>
<p class="body-xs"><strong>Significance:</strong> Material evidence of "Way to the Heart" conspiracy. The triple arrow notation (>>>) indicates excessive enthusiasm, proving the effectiveness of the bribery scheme and that culinary acts of service are the primary relationship currency.</p></div>
<div class="exhibit"><h4>EXHIBIT P: The Cupcake Conspiracy</h4>
<p class="ev-meta"><strong>Type:</strong> Google Maps History &nbsp;|&nbsp; <strong>Date:</strong> Oct-Jan, multiple</p>
<p class="body-xs"><strong>Significance:</strong> Material evidence of bribery during "Exam Season." Demonstrates the Plaintiff's willingness to cross city lines just to ensure the Defendant eats before tests. Establishes a pattern of training the Plaintiff through positive reinforcement.</p></div>
<div class="exhibit"><h4>EXHIBIT Q: The Sam's Pizza Defense</h4>
<p class="ev-meta"><strong>Type:</strong> Photo + declaration &nbsp;|&nbsp; <strong>Content:</strong> <em>"Me and sam's pizza jaisa rishta it is"</em></p>
<p class="body-xs"><strong>Significance:</strong> Evidence of the Defendant's committed relationship with an Unlimited Pizza Buffet. This exhibit proves the Plaintiff is merely a third wheel. Despite his skepticism, this location serves as a landmark for shared laughter and "sixth-grade birthday party vibes."</p></div>`,

    // ===== PAGE 9: Exhibits J, K, L, M (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT J: The "Good Morning" Stipulation</h4>
<p class="ev-meta"><strong>Type:</strong> Text mandate &nbsp;|&nbsp; <strong>Content:</strong> <em>"Kaival, it is not a good morning if you've not seen me in the morning"</em></p>
<p class="body-xs"><strong>Significance:</strong> Proof of successful conditioning. The Defendant has reprogrammed the Plaintiff's circadian rhythm to require visual confirmation of her existence before the day can officially commence.</p></div>
<div class="exhibit"><h4>EXHIBIT K: The Udaipur Confession</h4>
<p class="ev-meta"><strong>Type:</strong> Chat logs during boys' trip &nbsp;|&nbsp; <strong>Date:</strong> Feb 6, 2026, Udaipur</p>
<p class="body-xs"><strong>Significance:</strong> Despite being on vacation with friends, the Plaintiff spent the majority texting the Defendant and stating "miss you fr." Expert witnesses (friends) confirm he was "basically useless" throughout the trip.</p></div>
<div class="exhibit"><h4>EXHIBIT L: The "Time Theft" Documentation</h4>
<p class="ev-meta"><strong>Type:</strong> Call log &nbsp;|&nbsp; <strong>Content:</strong> <em>"how am I gonna have any love life if I talk to my friends this much"</em></p>
<p class="body-xs"><strong>Significance:</strong> Exhibit of "Time Theft." The Defendant monopolized the Plaintiff's attention for 120+ minutes, effectively sabotaging any potential romantic prospects with third parties (specifically referenced: "Ananya").</p></div>
<div class="exhibit"><h4>EXHIBIT M: The "Donna" Comparison</h4>
<p class="ev-meta"><strong>Type:</strong> Text &nbsp;|&nbsp; <strong>Content:</strong> <em>"you're like Donna"</em> &nbsp;|&nbsp; <strong>Date:</strong> Oct 2, 2025</p>
<p class="body-xs"><strong>Significance:</strong> The Plaintiff compared the Defendant to Suits' Donna Paulsen, legally acknowledging her superior intuition, confidence, and ability to read his mind. Confirms the Defendant's complete mental access and monopolization capabilities.</p></div>`,

    // ===== PAGE 10: Exhibits F, G, H, I (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT F: The "Green Eyes" Testimony</h4>
<p class="ev-meta"><strong>Type:</strong> Vehicular testimony &nbsp;|&nbsp; <strong>Content:</strong> <em>"Why do your eyes look cute... green I mean"</em> &nbsp;|&nbsp; <strong>Date:</strong> Feb 5, 2026</p>
<p class="body-xs"><strong>Significance:</strong> Eyewitness testimony regarding dangerous eye color changes in car lighting. Proves the Plaintiff is physically incapable of not complimenting the Defendant. Timing during vehicle operation establishes reckless endangerment.</p></div>
<div class="exhibit"><h4>EXHIBIT G: The Academic Intimidation File</h4>
<p class="ev-meta"><strong>Type:</strong> Transcript &nbsp;|&nbsp; <strong>Content:</strong> <em>"Topped my batch in econ... overall 45/50"</em></p>
<p class="body-xs"><strong>Significance:</strong> Documentary evidence of intimidating intelligence combined with physical beauty, proving the Plaintiff is hopelessly out of his league yet arguably the proudest person in any room when she succeeds. This combination constitutes an illegal monopoly on desirable qualities.</p></div>
<div class="exhibit"><h4>EXHIBIT H: The Barbie Economics Thesis</h4>
<p class="ev-meta"><strong>Type:</strong> 14-page academic paper &nbsp;|&nbsp; <strong>Date:</strong> Oct 2, 2025</p>
<p class="body-xs"><strong>Significance:</strong> The "nerd defense." Beneath the Defendant's constant yapping lies an intellect capable of writing 14 pages on dolls and finance, causing the Plaintiff to be visibly impressed (documented reactions: "tf" and "crazy"). Weaponized intelligence as part of the distraction conspiracy.</p></div>
<div class="exhibit"><h4>EXHIBIT I: The Nickname Alteration Incident</h4>
<p class="ev-meta"><strong>Type:</strong> Screenshot &nbsp;|&nbsp; <strong>Content:</strong> <em>'galat_dishaaa set your nickname to Kaival'</em></p>
<p class="body-xs"><strong>Significance:</strong> Malicious alteration of identity. Willful refusal to learn proper spelling ("Kaiwal"), constituting a Class A Felony of Teasing. Combined with "Bhaiya" despite being the "Baby," establishes a pattern of psychological warfare.</p></div>`,

    // ===== PAGE 11: Exhibits C, D, E (Merged) =====
    `<div class="exhibit"><h4>EXHIBIT E: The "Color Theory" Paradox</h4>
<p class="ev-meta"><strong>Type:</strong> Photographic evidence (three photographs)</p>
<p class="body-xs"><strong>Sub-exhibit E1:</strong> Defendant in Red (declared "hot," Dec 3, 2025)<br>
<strong>Sub-exhibit E2:</strong> Defendant in White (declared "gorgeous," Jan 6, 2026)<br>
<strong>Sub-exhibit E3:</strong> Defendant in All-Black Pickleball gear (declared "pretty," Dec 24, 2025)</p>
<p class="body-xs"><strong>Significance:</strong> Statistical impossibility. No human should look "stunning" across the entire color spectrum. The Plaintiff's fashion consultant has confirmed this is "clearly a trap" and constitutes an unfair advantage. Establishes supernatural levels of attractiveness, qualifying as a controlled substance under Emotional Crimes Statute § 143.</p></div>
<div class="exhibit"><h4>EXHIBIT C: The Hypnotic Eyes Documentation</h4>
<p class="ev-meta"><strong>Type:</strong> Photo + written testimony &nbsp;|&nbsp; <strong>Content:</strong> <em>"Hypnotize teri karti hai menu"</em> &nbsp;|&nbsp; <strong>Date:</strong> Jan 21, 2026</p>
<p class="body-xs"><strong>Significance:</strong> Documentary evidence of weaponized beauty causing morning productivity loss. The Defendant's eyes serve as the primary instrument of cardiac larceny. Medical experts confirm symptoms consistent with "being absolutely whipped."</p></div>
<div class="exhibit"><h4>EXHIBIT D: The "Tom and Jerry" Admission</h4>
<p class="ev-meta"><strong>Type:</strong> Text &nbsp;|&nbsp; <strong>Content:</strong> <em>"Tom and jerry is gonna be the caption"</em> &nbsp;|&nbsp; <strong>Date:</strong> Oct 2, 2025</p>
<p class="body-xs"><strong>Significance:</strong> Admission acknowledging "Chaotic Co-dependency." Despite constant bickering, the parties fit together like a classic cartoon duo. Establishes that the heart was taken willingly but irreversibly.</p></div>`,

    // ===== PAGE 12: THE EVIDENCE header + Exhibits A+B =====
    `<div class="letter-title">${L('EVIDENCE')}</div>
<div class="exhibit"><h4>EXHIBIT A: The "Safe Space" Confession</h4>
<p class="ev-meta"><strong>Type:</strong> Text message &nbsp;|&nbsp; <strong>Content:</strong> <em>"And I love that cause it just makes you a safe space."</em> &nbsp;|&nbsp; <strong>Date:</strong> Oct 2025</p>
<p class="body-xs"><strong>Significance:</strong> Irrefutable proof that despite claims of being "independent," the Plaintiff has become a designated comfort zone. Demonstrates premeditation in establishing emotional dependency and constitutes prima facie evidence of heart theft.</p></div>
<div class="exhibit"><h4>EXHIBIT B: The Maternal Witness Testimony</h4>
<p class="ev-meta"><strong>Type:</strong> Third-party observation &nbsp;|&nbsp; <strong>Content:</strong> <em>"no boy would take so many efforts unless he likes a girl"</em></p>
<p class="body-xs"><strong>Significance:</strong> Expert witness testimony from the Defendant's mother confirming that the Plaintiff's behavior is transparent to all parties. The witness's decades of experience in identifying romantic intent makes her testimony admissible and conclusive.</p></div>`,

    // ===== PAGE 13: Count VI (Merged) =====
    `<h3 class="count-title">COUNT VI: DISORDERLY CONDUCT</h3>
<h3 class="section-sub"><small>(First-Degree Drama & Curiosity)</small></h3>
<p class="body-xs">The Defendant engaged in a sustained pattern of adorable misconduct:</p>
<ul class="body-xs compact-list">
<li><strong>Aggressive Listening:</strong> Habitually "shutting the Plaintiff up" while simultaneously being his safe space</li>
<li><strong>First-Degree Curiosity:</strong> Being "so curious about anything and everything," forcing the Plaintiff to find her adorable</li>
<li><strong>The Rabbit Teeth Incident:</strong> Displaying a smile (Feb 4, 2026) that caused the Plaintiff to abandon a roast mid-session and admit "love everything about you"</li>
<li><strong>Academic Intimidation:</strong> Topping her batch in Economics (45/50) while simultaneously remaining impossibly cute</li>
<li><strong>Being a "Full-Out TASK":</strong> Self-incriminating admission yet proving strictly worth the <em>nakhras</em></li>
<li><strong>The "Donna" Comparison:</strong> The Plaintiff comparing the Defendant to Suits' Donna Paulsen, legally acknowledging her superior intuition, confidence, and ability to read his mind</li>
<li><strong>The Barbie Economics Thesis:</strong> Writing a 14-page paper on dolls and finance, causing the Plaintiff to respond with "tf" and "crazy" (evidence of intimidation through intelligence)</li>
<li><strong>The "Coupla Coupli" Admission:</strong> Written confession stating "Love how i can do coupla coupli stuff with the Panchal siblings," establishing pattern of romantic mimicry</li>
</ul>`,

    // ===== PAGE 14: Count V =====
    `<h3 class="count-title">COUNT V: CULINARY EXTORTION & CONSPIRACY</h3>
<p class="body-xs">The Defendant coerced the Plaintiff into a complex food-based conspiracy:</p>
<ul class="body-xs compact-list">
<li><strong>Forced Travel Protocol:</strong> Compelling traversal of the city for "Sam's Pizza," "Jasuben Pizza," and "Theobroma Brownies"</li>
<li><strong>The Cupcake Conspiracy:</strong> Porter delivery receipts proving bribery during Exam Season</li>
<li><strong>The 5:30 AM Arrabiata Incident:</strong> Accepting questionable pasta at ungodly hours, enabling the Plaintiff's descent into "Mom Mode"</li>
<li><strong>The Hummus Bribe:</strong> Documented statement "Your hummus>>>" confirming culinary acts of service as primary relationship currency</li>
<li><strong>The Sweetness Hierarchy Coup:</strong> Successfully arguing she should rank above "Ghevar Rabdi" as Plaintiff's favorite Indian sweet</li>
<li><strong>The Sugar Conspiracy:</strong> Coercing consumption of Buttercup Cupcakes and Fafda Jalebi despite "health conscious" claims</li>
</ul>`,

    // ===== PAGE 15: Counts III + IV =====
    `<h3 class="count-title">COUNT III: AGGRAVATED "BHAIYA" VIOLATION</h3>
<p class="body-xs">On multiple occasions, the Defendant maliciously deployed "Bhaiya" and "Kaival Bhaiya" despite knowing she is the "Baby" in this scenario, the Plaintiff's name is spelled "Kaiwal," and this constitutes a Class A Felony of Teasing.</p>
<h3 class="count-title" style="margin-top:12px">COUNT IV: MONOPOLIZATION OF MENTAL BANDWIDTH</h3>
<p class="body-xs">The Defendant unlawfully monopolized 99.9% of the Plaintiff's cognitive resources through:</p>
<ul class="body-xs compact-list">
<li>Establishing it is "not a good morning" without visual confirmation of her face</li>
<li>Laughing "subtly" and "over the shoulder" when teased</li>
<li>Making the Plaintiff compete with <em>khichdi</em> for affection</li>
<li>Spending boys' trips texting the Defendant instead of enjoying Udaipur</li>
<li>Monopolizing 120+ minute calls, sabotaging potential romantic prospects</li>
</ul>`,

    // ===== PAGE 16: Count II =====
    `<h3 class="count-title">COUNT II: CRIMINAL DISTRACTION & FELONIOUS BEAUTY</h3>
<p class="body-xs">The Defendant is accused of wielding illegal levels of attractiveness, causing "Tunnel Vision Syndrome" and loss of vocabulary:</p>
<ul class="body-xs compact-list">
<li><strong>The "Color Theory" Paradox:</strong> Statistical impossibility wherein the Defendant appears "stunning" in red, white, and all-black. No human should possess this capability.</li>
<li><strong>The "Pink Top" and "Purple Lehenga" Incidents:</strong> Deployment of distinct garments to incapacitate cognitive function</li>
<li><strong>Possession of a Controlled Substance:</strong> Carrying a "strawberry" scent so potent it constituted chemical warfare</li>
<li><strong>The "Green Eyes" Phenomenon:</strong> Eyes that appear green in car lighting, causing documented "Why do your eyes look cute... green I mean"</li>
<li><strong>Violation of Public Safety:</strong> Cited for "looking cute all the time" without a permit or warning label</li>
</ul>`,

    // ===== PAGE 17: Indictment + Count I =====
    `<div class="letter-title" style="margin-bottom:6px">${L('INDICTMENT')}</div>
<p class="body-sm"><strong>The People vs. The Defendant</strong></p>
<p class="body-xs">The Defendant is hereby charged with the following offenses, each constituting a severe violation of the Plaintiff's emotional well-being:</p>
<h3 class="count-title">COUNT I: GRAND LARCENY (FIRST DEGREE)</h3>
<p class="body-xs">The Defendant is charged with willful, knowing, and unauthorized theft of the Plaintiff's heart through:</p>
<ul class="body-xs compact-list">
<li>Gradual "safe space" creation while claiming independence</li>
<li>The "Thol Lake Sunrise" incident, solidifying the theft permanently</li>
<li>Possessing hypnotizing eyes causing texts like "Hypnotize teri karti hai menu"</li>
<li>Rapid oscillation between calling the Plaintiff "idiot" and "cutie" within 0.8 minutes</li>
<li>Deploying maternal witness testimony: "no boy would take so many efforts unless he likes a girl"</li>
</ul>`,

    // ===== PAGE 18 (TOP - first seen): Cover =====
    `<p class="body-sm" style="text-align:center">IN THE COURT OF ETERNAL</p>
<div class="letter-title">${L('LOVE')}</div>
<p class="divider">━━━━━━━━━━━━━━━━━━━━━━━</p>
<p class="body-sm"><strong>Case No.:</strong> 2026-FEB-FOREVER<br><em>Filed: February 14, 2026</em></p>
<p class="body-sm"><strong>KAIWAL PANCHAL</strong><br><em>Plaintiff</em></p>
<p class="body-sm" style="text-align:center;font-size:1.2rem">v.</p>
<p class="body-sm"><strong>DISHA JOSHI</strong><br><em>Defendant</em></p>
<p class="body-xs"><strong>COMPLAINT FOR:</strong><br>Grand Larceny • Felonious Beauty • Criminal Distraction<br>Aggravated "Bhaiya" Violation • Monopolization of Mental Bandwidth<br>Culinary Extortion • Disorderly Conduct (First-Degree Drama)</p>
<p class="divider">━━━━━━━━━━━━━━━━━━━━━━━</p>
<p class="body-sm" style="text-align:center;color:#d00"><strong>URGENT: Immediate Heart Custody Required</strong></p>`
]; // END PAGES

// ============================================================
// Page Generation & Interaction
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('stack');
    const folder = document.getElementById('folder');

    // Decorations: map page index -> array of decoration configs
    // Using textures tastefully across pages
    // SCALED SIZES (approx 1.3x - 1.5x) and MORE FREQUENT
    const T = 'assets/textures/';
    const DECOS = {
        // Cover page (18)
        18: [
            { src: 'love-seal.png', pos: 'bottom-right', w: 180, h: 180, rot: -10 },
            { src: 'thumbtacks1.png', pos: 'top-right', w: 48, h: 48 },
            { src: 'thumbtacks3.png', pos: 'bottom-left', w: 48, h: 48, rot: 45 },
        ],
        // Indictment (17)
        17: [
            { src: 'thumbtacks2.png', pos: 'top-left', w: 45, h: 45 },
            { src: 'paper-texture.png', pos: 'bottom-right', w: 150, h: 150, opacity: 0.2 },
        ],
        // Count II (16)
        16: [
            { src: 'top-left-corner-doodle-hearts.png', pos: 'top-left', w: 150, h: 150, opacity: 0.6 },
            { src: 'thumbtacks1.png', pos: 'bottom-right', w: 45, h: 45 },
        ],
        // Counts III+IV (15)
        15: [
            { src: 'thumbtacks3.png', pos: 'top-right', w: 45, h: 45 },
            { src: 'red-balloons.png', pos: 'bottom-left', w: 135, h: 135, opacity: 0.4 },
        ],
        // Count V (14)
        14: [
            { src: 'newspaper-heart.png', pos: 'bottom-right', w: 135, h: 135, rot: 5, opacity: 0.8 },
            { src: 'thumbtacks2.png', pos: 'top-left', w: 45, h: 45 },
        ],
        // Count VI (13) - Merged
        13: [
            { src: 'thumbtacks1.png', pos: 'top-left', w: 45, h: 45 },
            { src: 'favorite-person-sticker.png', pos: 'bottom-right', w: 150, h: 150, rot: 8, opacity: 0.8 },
            { src: 'kisses-corner-top-left.png', pos: 'bottom-left', w: 120, h: 120, opacity: 0.3, rot: 180 },
            { src: 'bottom-left-corner-picnic-cloth.png', pos: 'top-right', w: 150, h: 150, opacity: 0.3, rot: 90 },
        ],
        // Evidence A+B (12)
        12: [
            { src: 'thumbtacks2.png', pos: 'top-right', w: 45, h: 45 },
            { src: 'kisses-corner-top-left.png', pos: 'top-left', w: 165, h: 165, opacity: 0.6 },
            { src: 'love-seal.png', pos: 'bottom-right', w: 135, h: 135, rot: 20, opacity: 0.5 },
        ],
        // Exhibits C, D, E (11) - Merged
        11: [
            { src: 'thumbtacks3.png', pos: 'bottom-left', w: 45, h: 45 },
            { src: 'top-left-corner-doodle-hearts.png', pos: 'top-right', w: 135, h: 135, opacity: 0.4, rot: 90 },
            { src: 'red-balloons.png', pos: 'bottom-left', w: 225, h: 225, opacity: 0.7 }, // Might overlap with thumbtacks3
            { src: 'thumbtacks1.png', pos: 'top-right', w: 68, h: 68 },
        ],
        // Exhibits F, G, H, I (10) - Merged
        10: [
            { src: 'thumbtacks3.png', pos: 'top-left', w: 68, h: 68 },
            { src: 'newspaper-heart.png', pos: 'bottom-right', w: 180, h: 180, opacity: 0.5 },
            { src: 'polaroid-solo.png', pos: 'top-right', w: 180, h: 180, opacity: 0.3, rot: -10 },
        ],
        // Exhibits J, K, L, M (9) - Merged
        9: [
            { src: 'bottom-left-corner-doodle-hearts.png', pos: 'bottom-left', w: 248, h: 248, opacity: 0.6 },
            { src: 'thumbtacks2.png', pos: 'top-right', w: 68, h: 68 },
            { src: 'kisses-corner-top-left.png', pos: 'bottom-right', w: 225, h: 225, opacity: 0.4, rot: 180 },
        ],
        // Exhibits N, O, P, Q (8) - Merged
        8: [
            { src: 'disco-ball.png', pos: 'top-right', w: 180, h: 180, opacity: 0.7, rot: 15 },
            { src: 'bottom-left-corner-picnic-cloth.png', pos: 'bottom-left', w: 270, h: 270, opacity: 0.5 },
            { src: 'favorite-person-sticker.png', pos: 'top-left', w: 180, h: 180, opacity: 0.4 },
        ],
        // Exhibits R, S, T, U (7) - Merged
        7: [
            { src: 'thumbtacks1.png', pos: 'top-right', w: 68, h: 68 },
            { src: 'red-balloons.png', pos: 'bottom-left', w: 180, h: 180, opacity: 0.5 },
            { src: 'newspaper-heart.png', pos: 'top-right', w: 158, h: 158, opacity: 0.5 },
        ],
        // Exhibits V, W, X, Y, Z (6) - Merged
        6: [
            { src: 'bottom-right-corner-kisses-lipstick.png', pos: 'bottom-right', w: 248, h: 248, opacity: 0.6 },
            { src: 'thumbtacks3.png', pos: 'top-left', w: 68, h: 68 },
            { src: 'disco-ball.png', pos: 'bottom-left', w: 158, h: 158, opacity: 0.5 },
        ],
        // Verdict (5)
        5: [
            { src: 'love-seal.png', pos: 'bottom-left', w: 225, h: 225, rot: 15 },
            { src: 'top-right-torn-love-you.png', pos: 'top-right', w: 248, h: 248, opacity: 0.7 },
        ],
        // Sentencing 1 (4)
        4: [
            { src: 'thumbtacks2.png', pos: 'top-left', w: 68, h: 68 },
            { src: 'bottom-left-corner-doodle-hearts.png', pos: 'bottom-right', w: 203, h: 203, opacity: 0.5 },
        ],
        // Sentencing 2 (3)
        3: [
            { src: 'newspaper-heart.png', pos: 'bottom-left', w: 203, h: 203, rot: -5, opacity: 0.7 },
            { src: 'thumbtacks1.png', pos: 'top-right', w: 68, h: 68 },
        ],
        // Plea Form (2)
        2: [
            { src: 'bottom-left-corner-picnic-cloth.png', pos: 'bottom-left', w: 293, h: 293, opacity: 0.5 },
            { src: 'thumbtacks3.png', pos: 'top-right', w: 68, h: 68 },
        ],
        // Case Closed 1 (1)
        1: [
            { src: 'kisses-corner-top-left.png', pos: 'top-left', w: 225, h: 225, opacity: 0.55 },
            { src: 'red-balloons.png', pos: 'bottom-right', w: 203, h: 203, opacity: 0.6 },
        ],
        // Case Closed 2 (0) - final page
        0: [
            { src: 'top-left-corner-doodle-hearts.png', pos: 'top-left', w: 248, h: 248, opacity: 0.6 },
            { src: 'love-seal.png', pos: 'bottom-right', w: 248, h: 248, rot: -5 },
            { src: 'favorite-person-sticker.png', pos: 'bottom-left', w: 203, h: 203, rot: -10, opacity: 0.8 },
        ]
    };

    // Generate pages from array
    const rotations = [-2, 1, -1.5, 2, -3, 0, 1.5, -1, 2.5, -2.5, 0.5, -0.5, 1, -1, 0, 2, -2, 1.5, -1.5, 0.5, -0.5, 3, -3, 1, -1, 0];
    PAGES.forEach((html, i) => {
        const doc = document.createElement('div');
        doc.classList.add('paper-doc');
        doc.id = `doc-${i + 1}`;
        doc.style.transform = `rotate(${rotations[i % rotations.length]}deg)`;

        // Build decorations HTML for this page
        let decoHTML = '';
        if (DECOS[i]) {
            DECOS[i].forEach(d => {
                // Stick strict corners if filename implies it (per user request)
                // If it's a corner piece, we likely want it flush with the corner, no rotation?
                // But the config might have explicit rotation needed to orient the PNG correctly.
                // However, user said "aligned to their corners ONLY".
                // I will trust the user and remove rotation-distorting transforms if it's a corner piece.
                // Or rather, ensure 'top:0; left:0' etc are respected (via CSS).
                // I'll keep the rotation from config as it might be '90deg' to fit the corner.
                // But I'll ensure the CSS class is added.
                const style = [
                    d.w ? `width:${d.w}px` : '',
                    d.h ? `height:${d.h}px` : '',
                    d.rot ? `transform:rotate(${d.rot}deg)` : '',
                    d.opacity ? `opacity:${d.opacity}` : '',
                ].filter(Boolean).join(';');
                const posClass = `deco-${d.pos.replace(' ', '-')}`;
                decoHTML += `<div class="page-deco ${posClass}" style="${style}; z-index:0;"><img src="${T}${d.src}" alt="" style="width:100%;height:100%;object-fit:contain;"></div>`;
            });
        }

        doc.innerHTML = `${decoHTML}<div class="paper-content">${html}</div>`;
        stack.appendChild(doc);
    });

    const docs = Array.from(document.querySelectorAll('.paper-doc'));
    let currentIndex = docs.length - 1; // Top of the right stack
    const BASE_Z = docs.length + 10;    // Base z-index for tossed pages (above right stack)
    let tossCount = 0;                  // How many pages have been tossed so far

    // Right-stack z-index: bottom page = 1, top page = docs.length
    function updateZIndices() {
        docs.forEach((doc, index) => {
            if (!doc.classList.contains('tossed')) {
                doc.style.zIndex = index + 1;
            }
        });
    }
    updateZIndices();

    function showNextCard() {
        if (currentIndex < 0) return;
        const currentDoc = docs[currentIndex];

        // Set the toss index for this page (used by CSS for offset)
        currentDoc.style.setProperty('--toss-index', tossCount);

        // precise random rotation for natural feel (-3deg to 3deg)
        const randomRot = (Math.random() * 6 - 3).toFixed(2);
        currentDoc.style.setProperty('--toss-rotation', randomRot + 'deg');

        // z-index: each newly tossed page sits on top of the previous ones
        currentDoc.style.zIndex = BASE_Z + tossCount;

        currentDoc.classList.add('tossed');

        tossCount++;
        currentIndex--;
    }

    function returnPreviousCard() {
        // Nothing to return if all pages are on the right
        if (currentIndex >= docs.length - 1) return;

        currentIndex++;
        tossCount--;

        const docToReturn = docs[currentIndex];
        docToReturn.classList.remove('tossed');

        // Reset to right-stack z-index
        docToReturn.style.zIndex = currentIndex + 1;
        // Clear the CSS variables
        docToReturn.style.removeProperty('--toss-index');
        docToReturn.style.removeProperty('--toss-rotation');
    }

    // Folder open/close
    if (folder) {
        folder.addEventListener('click', (e) => {
            if (!folder.classList.contains('open')) {
                folder.classList.add('open');
                e.stopPropagation();
            }
        });
    }

    // Click/Tap navigation (left = return, right = flip)
    document.addEventListener('click', (e) => {
        if (!folder.classList.contains('open')) return;
        if (e.target.closest('.vinyl-player') || e.target.closest('.records-tray')) return;

        const isRightSide = e.clientX > window.innerWidth / 2;

        if (isRightSide) {
            if (currentIndex >= 0) showNextCard();
        } else {
            if (currentIndex < docs.length - 1) {
                returnPreviousCard();
            } else {
                // All pages back on right — close folder
                folder.classList.remove('open');
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!folder.classList.contains('open')) return;

        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            showNextCard();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex >= docs.length - 1) {
                folder.classList.remove('open');
            } else {
                returnPreviousCard();
            }
        }
    });

    // Folder Drag when closed
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let folderX = 0, folderY = 0;
    let hasMoved = false;

    folder.addEventListener('mousedown', (e) => {
        if (folder.classList.contains('open')) return;
        isDragging = true;
        hasMoved = false;
        dragStartX = e.clientX - folderX;
        dragStartY = e.clientY - folderY;
        folder.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        folderX = e.clientX - dragStartX;
        folderY = e.clientY - dragStartY;
        folder.style.transform = `translate(${folderX}px, ${folderY}px) scale(1.3)`;
        hasMoved = true;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        // If dragged significantly, don't open
        if (hasMoved) {
            setTimeout(() => { hasMoved = false; }, 50);
        }
        isDragging = false;
        folder.classList.remove('dragging');
    });
});

// ============================================================
// VINYL PLAYER - YouTube Music Integration
// Records are generated dynamically from SONGS config (songs.js)
// ============================================================
(function () {
    return; // DISABLED
    let ytPlayer = null;
    let ytReady = false;
    let currentRecord = null;
    let isPlaying = false;

    const vinylPlayer = document.getElementById('vinylPlayer');
    const vinylSpindle = document.getElementById('vinylSpindle');
    const recordsTray = document.getElementById('recordsTray');

    // Hue rotation values for visual distinction
    const hueRotations = [0, 60, 120, 200, 280, 30, 150, 240, 310, 90];

    // ---- GENERATE RECORDS FROM CONFIG ----
    if (typeof SONGS !== 'undefined' && Array.isArray(SONGS)) {
        SONGS.forEach((song, i) => {
            const coverUrl = song.coverUrl || `https://img.youtube.com/vi/${song.youtubeId}/0.jpg`;
            const hue = hueRotations[i % hueRotations.length];

            const rec = document.createElement('div');
            rec.className = 'vinyl-record';
            rec.dataset.youtubeId = song.youtubeId;
            rec.dataset.song = `${song.name} - ${song.artist}`;
            rec.dataset.coverUrl = coverUrl;
            rec.innerHTML = `
                <div class="record-disc">
                    <img src="assets/textures/record one.png" alt="Record" draggable="false"
                         class="record-base" style="filter: hue-rotate(${hue}deg) saturate(1.2);">
                    <div class="record-cover-art" style="background-image: url('${coverUrl}');"></div>
                </div>
                <span class="record-label">${song.name}</span>
                <span class="record-artist">${song.artist}</span>
            `;
            recordsTray.appendChild(rec);
        });
    }

    const records = document.querySelectorAll('.vinyl-record');

    // Add now-playing label
    const nowPlayingEl = document.createElement('div');
    nowPlayingEl.className = 'now-playing';
    nowPlayingEl.textContent = '';
    vinylPlayer.appendChild(nowPlayingEl);

    // YouTube IFrame API callback
    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('ytPlayer', {
            height: '1',
            width: '1',
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
            },
            events: {
                onReady: () => { ytReady = true; },
                onStateChange: (event) => {
                    if (event.data === YT.PlayerState.ENDED) {
                        stopPlaying();
                    }
                }
            }
        });
    };

    function playSong(youtubeId, songName) {
        if (!ytReady || !ytPlayer) return;
        ytPlayer.loadVideoById(youtubeId);
        ytPlayer.playVideo();
        isPlaying = true;
        vinylPlayer.classList.add('playing');
        nowPlayingEl.textContent = '♫ ' + songName;

        const placedRecord = vinylSpindle.querySelector('.placed-record');
        if (placedRecord) placedRecord.classList.add('spinning');
    }

    function stopPlaying() {
        if (ytPlayer && ytReady) ytPlayer.stopVideo();
        isPlaying = false;
        vinylPlayer.classList.remove('playing');
        nowPlayingEl.textContent = '';
        const placedRecord = vinylSpindle.querySelector('.placed-record');
        if (placedRecord) placedRecord.classList.remove('spinning');
    }

    function pausePlaying() {
        if (ytPlayer && ytReady) ytPlayer.pauseVideo();
        isPlaying = false;
        const placedRecord = vinylSpindle.querySelector('.placed-record');
        if (placedRecord) placedRecord.classList.remove('spinning');
    }

    function resumePlaying() {
        if (ytPlayer && ytReady) ytPlayer.playVideo();
        isPlaying = true;
        const placedRecord = vinylSpindle.querySelector('.placed-record');
        if (placedRecord) placedRecord.classList.add('spinning');
    }

    function placeRecord(recordEl) {
        if (currentRecord) {
            currentRecord.classList.remove('on-player');
            vinylSpindle.innerHTML = '';
            stopPlaying();
        }

        currentRecord = recordEl;
        recordEl.classList.add('on-player');

        // Clone the disc (base + cover art) onto the spindle
        const disc = recordEl.querySelector('.record-disc');
        const clone = disc.cloneNode(true);
        clone.className = 'placed-record';
        vinylSpindle.innerHTML = '';
        vinylSpindle.appendChild(clone);

        const youtubeId = recordEl.dataset.youtubeId;
        const songName = recordEl.dataset.song;
        playSong(youtubeId, songName);
    }

    function removeRecord() {
        if (currentRecord) {
            currentRecord.classList.remove('on-player');
            vinylSpindle.innerHTML = '';
            stopPlaying();
            currentRecord = null;
        }
    }

    // ---- DRAG RECORDS ONTO PLAYER ----
    let draggedRecord = null;
    let recordDragOffsetX = 0, recordDragOffsetY = 0;
    let recordMoved = false;

    records.forEach(rec => {
        rec.addEventListener('mousedown', (e) => {
            if (rec.classList.contains('on-player')) return;
            draggedRecord = rec;
            recordMoved = false;
            const rect = rec.getBoundingClientRect();
            recordDragOffsetX = e.clientX - rect.left;
            recordDragOffsetY = e.clientY - rect.top;
            rec.classList.add('dragging-record');
            rec.style.position = 'fixed';
            rec.style.left = rect.left + 'px';
            rec.style.top = rect.top + 'px';
            rec.style.zIndex = '1000';
            e.preventDefault();
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!draggedRecord) return;
        recordMoved = true;
        draggedRecord.style.left = (e.clientX - recordDragOffsetX) + 'px';
        draggedRecord.style.top = (e.clientY - recordDragOffsetY) + 'px';

        const playerRect = vinylPlayer.getBoundingClientRect();
        if (e.clientX >= playerRect.left && e.clientX <= playerRect.right &&
            e.clientY >= playerRect.top && e.clientY <= playerRect.bottom) {
            vinylPlayer.classList.add('drop-hover');
        } else {
            vinylPlayer.classList.remove('drop-hover');
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (!draggedRecord) return;
        const rec = draggedRecord;
        draggedRecord = null;
        rec.classList.remove('dragging-record');
        vinylPlayer.classList.remove('drop-hover');

        const playerRect = vinylPlayer.getBoundingClientRect();
        if (recordMoved &&
            e.clientX >= playerRect.left && e.clientX <= playerRect.right &&
            e.clientY >= playerRect.top && e.clientY <= playerRect.bottom) {
            placeRecord(rec);
        }

        rec.style.position = '';
        rec.style.left = '';
        rec.style.top = '';
        rec.style.zIndex = '';
    });

    // ---- DOUBLE-TAP & GESTURES ON SPINDLE ----
    let spindleStartX = 0, spindleStartY = 0;

    // Move remove logic to drag-off instead of dblclick
    // Double click now plays/pauses

    vinylSpindle.addEventListener('dblclick', (e) => {
        if (!currentRecord) return;
        e.stopPropagation();
        if (isPlaying) pausePlaying();
        else resumePlaying();
    });

    // Drag placed record to remove
    vinylSpindle.addEventListener('mousedown', (e) => {
        if (!currentRecord) return;

        // Start position
        spindleStartX = e.clientX;
        spindleStartY = e.clientY;

        let draggedOff = false;
        const placedRecord = vinylSpindle.querySelector('.placed-record');
        if (!placedRecord) return;

        const onMouseMove = (moveE) => {
            const dx = moveE.clientX - spindleStartX;
            const dy = moveE.clientY - spindleStartY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Visual feedback: move record? 
            // For now, just detect "drag away"
            if (dist > 100) { // Dragged far enough
                draggedOff = true;
                removeRecord();
                cleanup();
            }
        };

        const onMouseUp = () => {
            cleanup();
        };

        const cleanup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        e.stopPropagation();
    });

    // Remove old click/swipe listener


    // ---- DRAG VINYL PLAYER AROUND ----
    let playerDragging = false;
    let playerDragStartX = 0, playerDragStartY = 0;
    let playerX = 0, playerY = 0;
    let playerHasMoved = false;

    const initRect = vinylPlayer.getBoundingClientRect();
    playerX = initRect.left;
    playerY = initRect.top;

    vinylPlayer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.vinyl-spindle') || draggedRecord) return;
        playerDragging = true;
        playerHasMoved = false;
        playerDragStartX = e.clientX - playerX;
        playerDragStartY = e.clientY - playerY;
        vinylPlayer.classList.add('dragging-player');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!playerDragging) return;
        playerX = e.clientX - playerDragStartX;
        playerY = e.clientY - playerDragStartY;
        vinylPlayer.style.left = playerX + 'px';
        vinylPlayer.style.top = playerY + 'px';
        vinylPlayer.style.bottom = 'auto';
        playerHasMoved = true;
    });

    document.addEventListener('mouseup', () => {
        if (!playerDragging) return;
        playerDragging = false;
        vinylPlayer.classList.remove('dragging-player');
    });

    // Double-click to remove current record - REMOVED (Duplicate)
    // vinylSpindle.addEventListener('dblclick', (e) => {
    //     e.stopPropagation();
    //     removeRecord();
    // });
})();
