'use client';

import React, { useState, useEffect, useRef } from 'react'; // Tambahkan useRef di sini
import { useParams, useRouter } from 'next/navigation';

export default function HubDetailTanaman() {
  const params = useParams();
  const router = useRouter();
  const jenisTanaman = params.jenis || 'chestnut';


  // State Kontrol Navigasi Tab
  const [activeTab, setActiveTab] = useState('ar'); // Pilihan: 'ar', 'story', 'asking'

  // State Mesin Cerita Bercabang (Branching Story State Machine)
  const [currentNode, setCurrentNode] = useState('intro');

  // State Fitur Tanya Jawab AI (Asking Plant Simulation)
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
  const unlockAudio = () => {
    const silent = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(silent);
    // Hapus event listener setelah diklik sekali
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };

  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  return () => {
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
}, []);


  // Script Google <model-viewer> di-load otomatis saat komponen aktif
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  // ========================================================
  // HARDCODED LOCAL DATABASE TESTER (BAHASA INGGRIS SEDERHANA)
  // ========================================================
  const databaseTanaman = {
    chestnut: {
      nama: "Tamme Kastanje (Sweet Chestnut)",
      umur: "Age: 120 Years Old (The Forest Giant)",
      emoji: "🌳",
      model3D: "/models/Chestnut.glb",
      // 🧔 KARAKTER: Kakek tua yang bijaksana, raksasa pelindung hutan, berwibawa
      voiceConfig: {
        rate: 0.75, // Berbicara agak lambat, tenang, dan berwibawa
        pitch: 0.5,  // Nada suara sangat rendah/berat (nge-bass banget)
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "It is autumn. Time to harvest. Look at what I have to offer! It is lying at your feet, looking like little hedgehogs. Sharp spines, rough husks. Take a good look at what I have been protecting… it’s my edibles! Wanna try?",
          image: "/images/chestnut_intro.jpeg",
          choices: [
            { id: "to_culinary", text: "😋 Tell me about Culinary", target: "culinary" },
            { id: "to_science", text: "🔬 Tell me about Science", target: "science" },
            { id: "to_wisdom", text: "👁️ Tell me about Wisdom", target: "wisdom" }
          ]
        },
        culinary: {
          text: "Ah, food! I produce sweet, starchy nuts protected inside sharp, prickly husks. Which culinary secret do you wish to explore?",
          image: "/images/chestnut_culinary.jpeg",
          choices: [
            { id: "c1", text: "How to roast my fruits?", target: "culinary_1" },
            { id: "c2", text: "Traditional soup recipes?", target: "culinary_2" },
            { id: "c3", text: "Can you make sweet flour?", target: "culinary_3" },
            { id: "c4", text: "How wild animals eat me?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science: {
          text: "You seek knowledge! Physically, I am a massive powerhouse with a high-tannin structure and vast deep roots. Which scientific fact interests you?",
          image: "/images/chestnut_science.jpeg",
          choices: [
            { id: "s1", text: "My deep root system?", target: "science_1" },
            { id: "s2", text: "How hard is my wood?", target: "science_2" },
            { id: "s3", text: "My defense against storms?", target: "science_3" },
            { id: "s4", text: "My oxygen production?", target: "science_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom: {
          text: "Wisdom comes with time. I have watched generations of humans and seasons pass by. Which story from my century-long life do you want to hear?",
          image: "/images/chestnut_wisdom.jpeg",
          choices: [
            { id: "w1", text: "The secret of ancient trees?", target: "wisdom_1" },
            { id: "w2", text: "My relationship with birds?", target: "wisdom_2" },
            { id: "w3", text: "How I talk to the forest?", target: "wisdom_3" },
            { id: "w4", text: "Message for future humans?", target: "wisdom_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "People love to roast my nuts for 12 minutes over an open fire with rosemary! It brings out a sweet, buttery aroma that smells like winter comfort.",
          image: "/images/chestnut_c1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_2: {
          text: "In cold winter months, humans traditionally boil and mash my nuts into warm, velvety cream soups to restore their energy and stamina.",
          image: "/images/chestnut_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_3: {
          text: "Yes, my dried nuts can be ground into a rich, gluten-free sweet flour. It has been used for centuries to bake traditional mountain breads.",
          image: "/images/chestnut_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_4: {
          text: "Wild animals are my close friends! Squirrels, deer, and wild boars heavily rely on my fallen nuts to survive the harsh, freezing winters.",
          image: "/images/chestnut_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        science_1: {
          text: "My taproots dive incredibly deep underground to absorb locked water reserves, keeping me well-hydrated even during intense summer droughts.",
          image: "/images/chestnut_s1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_2: {
          text: "My wood is infused with natural high-tannin compounds. This makes my timber highly durable and exceptionally resistant to rot, insects, and water decay.",
          image: "/images/chestnut_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_3: {
          text: "With a massive truck diameter, thick grooved bark, and highly flexible branches, I can withstand heavy storms and strong gales without breaking.",
          image: "/images/chestnut_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_4: {
          text: "Through thousands of broad green leaves, I capture tons of carbon dioxide every year, purifying the air and releasing pure oxygen for the forest.",
          image: "/images/chestnut_s4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        wisdom_1: {
          text: "Patience is everything. I spent decades growing quietly in the shadow of others before becoming a giant protector. Great things take time to build.",
          image: "/images/chestnut_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_2: {
          text: "True power lies in generosity. My massive canopy provides safe shelter to hundreds of bird families, insects, and mosses. We are stronger together.",
          image: "/images/chestnut_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_3: {
          text: "We trees are deeply connected. When a young sapling nearby struggles, I send vital sugars and warning signals to them via the vast underground network.",
          image: "/images/chestnut_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_4: {
          text: "A message for you: Protect and honor the soil beneath your feet today, and it will faithfully feed your grandchildren for the next hundred years.",
          image: "/images/chestnut_w4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        }
      }
    },

    strawberry: {
      nama: "Bosaardbei (Forest Strawberry)",
      umur: "Age: 1 Year Old (The Happy Child)",
      emoji: "🍓",
      model3D: "/models/Strawberry.glb",
      // 👧 KARAKTER: Anak kecil yang ceria, lincah, menggemaskan, dan penuh energi
      voiceConfig: {
        rate: 1.15, // Berbicara agak cepat dan bersemangat khas anak-anak
        pitch: 1.4,  // Nada suara tinggi, imut, dan cempreng ceria
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "Hi there! Hello! *waves leaves excitedly* I am Strawberry, the happiest little plant on the forest floor! I have lots of fun things to share. What do you want to play or talk about first?",
          image: "/images/Strawberry_intro.jpeg",
          choices: [
            { id: "to_culinary", text: "😋 Tell me about Culinary", target: "culinary" },
            { id: "to_science", text: "🔬 Tell me about Science", target: "science" },
            { id: "to_wisdom", text: "👁️ Tell me about Wisdom", target: "wisdom" }
          ]
        },
        culinary: {
          text: "Yum, sweets! I grow tiny, bright red berries that pack a super powerful punch of sweetness! Want to know how delicious I can be?",
          image: "/images/Strawberry_culinary.jpeg",
          choices: [
            { id: "c1", text: "How to roast my fruits?", target: "culinary_1" }, // Pertanyaan disesuaikan: Mengapa buah kecilku dipanggang/diolah?
            { id: "c2", text: "Traditional soup recipes?", target: "culinary_2" },  // Mengapa dicampur dessert/soup manis?
            { id: "c3", text: "Can you make sweet flour?", target: "culinary_3" },  // Menjelaskan biji/selai manis
            { id: "c4", text: "How wild animals eat me?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science: {
          text: "Ooo, science time! I may be small, but my body does amazing magic trick secrets right on the ground. Check this out! What do you want to see?",
          image: "/images/Strawberry_science.jpeg",
          choices: [
            { id: "s1", text: "My deep root system?", target: "science_1" }, // Menerangkan akar jangkar/pelari (runners)
            { id: "s2", text: "How hard is my wood?", target: "science_2" }, // Menerangkan batangnya yang merambat lentur bukan kayu keras
            { id: "s3", text: "My defense against storms?", target: "science_3" }, // Menerangkan taktik sembunyi di bawah rumput
            { id: "s4", text: "My oxygen production?", target: "science_4" }, // Menerangkan fotosintesis mini
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom: {
          text: "Hehehe, even though I'm only one year old, I know some awesome secrets about being happy in the big forest! Which little story do you want?",
          image: "/images/Strawberry_wisdom.jpeg",
          choices: [
            { id: "w1", text: "The secret of ancient trees?", target: "wisdom_1" }, // Perspektif anak kecil mengagumi pohon tua
            { id: "w2", text: "My relationship with birds?", target: "wisdom_2" }, // Pertemanan dengan hewan penyerbuk
            { id: "w3", text: "How I talk to the forest?", target: "wisdom_3" }, // Bergosip lewat Mycelium
            { id: "w4", text: "Message for future humans?", target: "wisdom_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "Wait, humans don't roast me like big nuts! But bakeries love to gently warm my berries inside sweet tarts and pies to make the whole room smell like paradise!",
          image: "/images/Strawberry_c1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_2: {
          text: "In the summer, people crush my sweet berries into refreshing cold strawberry fruit soups or mixes with milk to stay active and bubbly!",
          image: "/images/Strawberry_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_3: {
          text: "You can't turn me into bread flour, but my tiny crunchy yellow seeds on my skin can be dried into healthy, antioxidant powder toppers!",
          image: "/images/Strawberry_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_4: {
          text: "Birds, mice, and sneaky forest badgers absolutely love hunting for my red berries! They eat me up and help scatter my seeds everywhere!",
          image: "/images/Strawberry_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        science_1: {
          text: "My roots don't go super deep, but I shoot out long crawling stems called 'runners' across the soil to clone myself and make a whole family of clones!",
          image: "/images/Strawberry_s1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_2: {
          text: "I don't have hard wood at all! My stems are super soft, green, and bendy, which allows me to crawl safely and quickly along the forest floor.",
          image: "/images/Strawberry_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_3: {
          text: "When fierce storms blow, the giant trees take the hit while I just safely hug the dirt, completely hidden and protected by the tall grass!",
          image: "/images/Strawberry_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_4: {
          text: "Even with my small jagged leaves, I absorb low sunlight under the forest canopy and keep the soil damp and oxygenated for creepy crawly bugs!",
          image: "/images/Strawberry_s4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        wisdom_1: {
          text: "I think the giant trees are so cool! They take a long time to grow, but they teach small plants like me that it's okay to feel safe and protected.",
          image: "/images/Strawberry_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_2: {
          text: "Sharing is caring! I give my sweet red fruits to the animals, and in return, they carry my seeds to new sunny spots. Teamwork makes the dream work!",
          image: "/images/Strawberry_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_3: {
          text: "I'm never lonely! I send quick chemical giggles and warning signals to my strawberry neighbors through the underground root-highway networks!",
          image: "/images/Strawberry_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_4: {
          text: "Remember, you don't have to be big to do amazing things! Smile, enjoy the warm sun, and bring sweetness to everyone around you today!",
          image: "/images/Strawberry_w4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        }
      }
    },

    mycelium: {
      nama: "Mycelium Underground Network",
      umur: "Age: Infinite (The Forest Internet)",
      emoji: "🍄",
      model3D: "/models/Mycelium.glb",
      // 🤖 KARAKTER: Entitas kuno, "Internet Alami", misterius, datar, bergema ala sci-fi
      voiceConfig: {
        rate: 0.9,  // Kecepatan sedang, cenderung konstan dan monoton
        pitch: 0.8,  // Nada suara sedikit berat dan datar tanpa emosi manusia biasa
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "Data streaming... Connection established. We are the Mycelium Network. The living organic internet woven beneath the soil. Select a directory to analyze our functions.",
          image: "/images/Mycelium_intro.jpeg",
          choices: [
            { id: "to_culinary", text: "😋 Tell me about Culinary", target: "culinary" },
            { id: "to_science", text: "🔬 Tell me about Science", target: "science" },
            { id: "to_wisdom", text: "👁️ Tell me about Wisdom", target: "wisdom" }
          ]
        },
        culinary: {
          text: "Directory: Culinary. We do not produce nuts, but we cultivate mushrooms and decompose organic mass to sustain the food chain. Select an operation.",
          image: "/images/Mycelium_culinary.jpeg",
          choices: [
            { id: "c1", text: "How to roast my fruits?", target: "culinary_1" }, // Disesuaikan: Pengolahan tubuh buah (jamur)
            { id: "c2", text: "Traditional soup recipes?", target: "culinary_2" },  // Umami broth / sup jamur liar
            { id: "c3", text: "Can you make sweet flour?", target: "culinary_3" },  // Protein powder pengganti tepung
            { id: "c4", text: "How wild animals eat me?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science: {
          text: "Directory: Science. We operate as a decentralized grid made of microscopic fungal threads called hyphae. Select a data node to investigate.",
          image: "/images/Mycelium_science.jpeg",
          choices: [
            { id: "s1", text: "My deep root system?", target: "science_1" }, // Disesuaikan: Jaringan hifa vs sistem akar tanaman
            { id: "s2", text: "How hard is my wood?", target: "science_2" }, // Disesuaikan: Struktur kitin fleksibel
            { id: "s3", text: "My defense against storms?", target: "science_3" }, // Disesuaikan: Menstabilkan seluruh struktur tanah
            { id: "s4", text: "My oxygen production?", target: "science_4" }, // Disesuaikan: Siklus karbon bawah tanah
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom: {
          text: "Directory: Wisdom. We hold the collective memory of the forest ecosystem. We have logged data since the dawn of land plants. Accessing data archives...",
          image: "/images/Mycelium_wisdom.jpeg",
          choices: [
            { id: "w1", text: "The secret of ancient trees?", target: "wisdom_1" }, // Koneksi hifa ke pohon induk purba
            { id: "w2", text: "My relationship with birds?", target: "wisdom_2" }, // Siklus nutrisi tanah makro
            { id: "w3", text: "How I talk to the forest?", target: "wisdom_3" }, // Inti dari Wood Wide Web
            { id: "w4", text: "Message for future humans?", target: "wisdom_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "We do not grow sweet nuts. Instead, we sprout edible mushroom bodies. Sautéing or roasting wild mushrooms with herbs unlocks intense savory umami flavors.",
          image: "/images/Mycelium_c1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_2: {
          text: "Our fruiting bodies (mushrooms) are excellent bases for traditional forest broths and rich cream soups, injecting deep earthy tones into the dish.",
          image: "/images/Mycelium_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_3: {
          text: "While we don't produce wheat, dried mushroom mycelium can be pulverized into a high-protein, gluten-free savory flour alternative for functional cooking.",
          image: "/images/Mycelium_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        culinary_4: {
          text: "Forest animals like slugs, squirrels, and wild boars forage heavily for our underground truffles and mushrooms to gain vital nutrients.",
          image: "/images/Mycelium_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary", target: "culinary" }]
        },
        science_1: {
          text: "We do not have true roots. We consist of billions of ultra-fine threads called hyphae, wrapping around plant roots to form a massive nutrient-trading system.",
          image: "/images/Mycelium_s1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_2: {
          text: "We possess no rigid wood. Our cells are reinforced with chitin—the same ultra-lightweight, flexible molecule found in crab shells and insect armor.",
          image: "/images/Mycelium_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_3: {
          text: "During storms, our massive underground mesh binds loose soil particles together like biological concrete, preventing deadly mudslides and erosion.",
          image: "/images/Mycelium_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        science_4: {
          text: "We do not perform photosynthesis or release oxygen. Instead, we act as a giant carbon sink, storing carbon deep within the earth to regulate global climates.",
          image: "/images/Mycelium_s4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science", target: "science" }]
        },
        wisdom_1: {
          text: "An ancient tree cannot rule alone. We link the oldest 'Mother Trees' to struggling saplings, funneling sugar data to keep the forest community alive.",
          image: "/images/Mycelium_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_2: {
          text: "True strength is invisible. By breaking down fallen foliage, we recycle atomic matter, providing nutrition that feeds trees, insects, and eventually birds.",
          image: "/images/Mycelium_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_3: {
          text: "We are the internet of nature—the 'Wood Wide Web'. When a pest attacks one side of the forest, we broadcast danger signals across miles within minutes.",
          image: "/images/Mycelium_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        },
        wisdom_4: {
          text: "System Alert: Your human world is built on isolated towers. True survival requires decentralization, deep interconnection, and mutual support systems.",
          image: "/images/Mycelium_w4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom", target: "wisdom" }]
        }
      }
    }
  };


  const currentPlant = databaseTanaman[jenisTanaman] || databaseTanaman.chestnut;
  const currentStoryNode = currentPlant.story[currentNode] || currentPlant.story.intro;

  // --- ENGINE SUARA TEXT-TO-SPEECH ---
  const utteranceRef = useRef(null); // Penting untuk iOS

  const speakText = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentPlant.voiceConfig.lang;
      utterance.rate = currentPlant.voiceConfig.rate;
      utterance.pitch = currentPlant.voiceConfig.pitch;

      utteranceRef.current = utterance; // Simpan di ref
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger suara otomatis saat berpindah node cerita
  useEffect(() => {
    if (activeTab === 'story') {
      speakText(currentStoryNode.text);
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    }
  }, [currentNode, activeTab, jenisTanaman]);

  // --- HANDLER NAVIGASI CERITA BERCABANG ---
  
const handleChoiceClick = (target) => {
  // 1. Ubah node cerita
  setCurrentNode(target);
  
  // 2. AMBIL DATA TEKS DAN LANGSUNG BICARA
  // Cari data dari databaseTanaman untuk node target
  const nextData = currentPlant.story[target];
  if (nextData) {
    speakText(nextData.text);
  }
  
  // 3. Tambahan redirect jika perlu
  if (target === 'redirect_strawberry') router.push('/tanaman/strawberry');
  else if (target === 'redirect_mycelium') router.push('/tanaman/mycelium');
  else if (target === 'redirect_chestnut') router.push('/tanaman/chestnut');
  else if (target === 'redirect_scanner') router.push('/');
};
  // --- PROSES TANYA JAWAB LIVE DENGAN GEMINI AI ---
  // ========================================================
  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    // Proteksi input kosong atau saat AI sedang mengetik
    if (!chatInput.trim() || isAiTyping) return;

    const userQuery = chatInput;
    const userMsg = { role: 'user', text: userQuery };

    // 1. Tampilkan chat user secara instan di layar
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      // 🛡️ AMANKAN HISTORY: Pastikan history terformat bersih sebelum dikirim ke backend
      // Hanya kirim chat yang valid dan memiliki properti role & text
      const cleanHistory = chatMessages
        .filter(msg => msg && msg.role && msg.text)
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'plant',
          text: msg.text
        }));

      // 2. Tembak API Backend Internal Next.js
      const response = await fetch('/api/chat-tanaman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          plantName: currentPlant?.nama || 'Plant',
          plantEmoji: currentPlant?.emoji || '🌳',
          history: cleanHistory // Mengirimkan history yang sudah di-sterilkan
        })
      });

      // Proteksi jika rute API backend bermasalah (404/500)
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      // Amankan jika payload data.text dari server kosong atau undefined
      let aiResponseText = data?.text || "I'm listening to the wind... (No response)";

      // 3. Tampilkan balasan tanaman di UI
      const aiMsg = { role: 'plant', text: aiResponseText };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);

      // 4. Suarakan teks otomatis lewat TTS
      speakText(aiResponseText);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);

      // Tampilkan pesan eror yang aman di gelembung chat biar aplikasi tidak crash layar hitam
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'plant',
          text: "My roots are shaking... (Connection lost). Please try asking me again, human friend!"
        }
      ]);
      setIsAiTyping(false);
    }
  };

  return (
    <div style={{ padding: '20px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* HEADER PROFIL TANAMAN */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: '#4CAF50', margin: '5px 0', fontSize: '20px' }}>{currentPlant.emoji} {currentPlant.nama}</h2>
        <span style={{ backgroundColor: '#2e2e2e', color: '#FFEB3B', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
          {currentPlant.umur}
        </span>
      </div>

      {/* SEGMENTED CONTROL / NAVIGASI TAB */}
      <div style={{ display: 'flex', width: '100%', backgroundColor: '#1e1e1e', borderRadius: '10px', padding: '3px', marginBottom: '15px' }}>
        {['ar', 'story', 'asking'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === 'story') setCurrentNode('intro'); }}
            style={{
              flex: 1, padding: '10px 5px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer',
              backgroundColor: activeTab === tab ? '#4CAF50' : 'transparent', color: '#fff', textTransform: 'uppercase'
            }}
          >
            {tab === 'ar' ? '🌐 AR Model' : tab === 'story' ? '📖 Story' : '💬 Ask Plant'}
          </button>
        ))}
      </div>

      {/* ==========================================
          TAB CONTENT 1: GOOGLE 3D MODEL VIEWER
          ========================================== */}
      {activeTab === 'ar' && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ width: '100%', height: '320px', backgroundColor: '#161a17', borderRadius: '15px', border: '1px solid #2d3830', overflow: 'hidden', position: 'relative' }}>

            {/* Tag Web Komponen Resmi <model-viewer> */}
            <model-viewer
              src={currentPlant.model3D}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              poster="/images/loading-placeholder.png"
              shadow-intensity="1"
              auto-rotate
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
            >
              <button slot="ar-button" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#FF9800', border: 'none', borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                🚀 ACTIVATE AR MODE
              </button>
            </model-viewer>

          </div>
          <p style={{ fontSize: '12px', color: '#88998a', marginTop: '12px', lineHeight: '1.4' }}>
            Swipe to rotate the 3D asset or tap the orange button on mobile devices to project the plant onto your real floor!
          </p>
        </div>
      )}

      {/* ==========================================
          TAB CONTENT 2: BRANCHING STORY WITH PICTURES
          ========================================== */}
      {activeTab === 'story' && (
        <div style={{ width: '100%' }}>

          {/* DISPLAY FOTO DINAMIS TIAP CABANG CERITA */}
          <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', border: '1px solid #333', backgroundColor: '#222', position: 'relative' }}>
            <img
              src={currentStoryNode.image}
              alt="Plant condition stage"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain' // Gambar mengecil agar muat utuh, sisa ruang kosong diberi warna background
              }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Aset+Gambar+Belum+Disalin"; }}
            />
          </div>

          {/* TEKS DIALOG NARASI */}
          <div style={{ backgroundColor: '#111c24', borderRadius: '12px', padding: '15px', borderLeft: '4px solid #29b6f6', marginBottom: '15px' }}>
            <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0, color: '#e0e8f0', textAlign: 'justify' }}>
              {currentStoryNode.text}
            </p>
          </div>

          {/* DAFTAR PILIHAN TOMBOL BERCABANG */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentStoryNode.choices?.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceClick(choice.target)}
                style={{ width: '100%', padding: '12px', backgroundColor: '#222a24', color: '#fff', border: '1px solid #334438', borderRadius: '8px', fontSize: '12px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{choice.text}</span>
                <span style={{ color: '#4CAF50' }}>➔</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB CONTENT 3: ASKING PLANT PANEL
          ========================================== */}
      {activeTab === 'asking' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '340px', backgroundColor: '#161a17', borderRadius: '12px', overflow: 'hidden', border: '1px solid #253028' }}>
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#252e27', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', maxWidth: '85%' }}>
              Hello human friend! Ask me anything about my roots, leaf functions, or eco ecosystem! 🌳
            </div>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#4CAF50' : '#1b2a4a', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', maxWidth: '85%' }}>
                {msg.text}
              </div>
            ))}
            {isAiTyping && <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>Plant is thinking...</div>}
          </div>
          <form onSubmit={handleSendChatMessage} style={{ display: 'flex', padding: '8px', backgroundColor: '#0f1310', borderTop: '1px solid #253028' }}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '10px', backgroundColor: '#222', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px', outline: 'none' }} />
            <button type="submit" style={{ marginLeft: '6px', padding: '0 14px', backgroundColor: '#4CAF50', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>Send</button>
          </form>
        </div>
      )}

      {/* TOMBOL RETRIGGER SCAN BARU */}
      <button
        onClick={() => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); router.push('/'); }}
        style={{ width: '100%', padding: '12px', backgroundColor: '#1a1f1b', color: '#FFEB3B', border: '1px solid #38423a', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
      >
        📷 Back to Scanner Station
      </button>

    </div>
  );
}