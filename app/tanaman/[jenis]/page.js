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
      // 🧔 KARAKTER: Kakek tua raksasa pelindung, emosional, berat, berwibawa, dan cemas (Worried)
      voiceConfig: {
        rate: 0.72, // Diperlambat agar detak bicaranya terasa berat, letih, dan dramatis
        pitch: 0.4,  // Suara sangat tua, dalam, bariton, dan nge-bass 
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "It is autumn... Time to harvest. Look at what I have to offer! There, at your feet, they lie like little hedgehogs: sharp spines, rough husks, guarding something precious inside. Take a closer look at what I have been protecting all this time... my edible treasures. Oh, my child... would you like to try one? Please, tell me you are curious...",
          image: "/images/chestnut_intro.jpeg",
          choices: [
            { id: "to_culinary", text: "😋 Culinary: \"Oh yes, I am curious...\"", target: "culinary" },
            { id: "to_science", text: "🔬 Science: \"I want to know what you offer.\"", target: "science" },
            { id: "to_wisdom", text: "👁️ Wisdom: \"Are you really wise?\"", target: "wisdom" }
          ]
        },

        // ==========================================
        // MENU CULINARY (A1)
        // ==========================================
        culinary: {
          text: "Oh, my chestnuts... My beautiful, precious harvest. They are lying cold on the ground. Friends, listen to me... it is going to rain! Pick them up, roast them, bake them, turn them into delicious purée. But do not leave them here to rot! Nobody benefits from that. Soon they’ll become mouldy and inedible, and then it is all over... Seize the moment! Tell me, how will you save my gifts?",
          image: "/images/chestnut_culinary.jpeg",
          choices: [
            { id: "c1", text: "🔥 Roast over an open campfire?", target: "culinary_1" },
            { id: "c2", text: "🥣 Mash into a warm, velvety soup?", target: "culinary_2" },
            { id: "c3", text: "🌾 Grind into sweet gluten-free flour?", target: "culinary_3" },
            { id: "c4", text: "🦔 What if nobody picks them up?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "Yes... cut into my skin. Boil me in a splash of water, drain me, and throw a sprig of rosemary into the pan. Quickly, put the lid back on! After twelve minutes, I am ready. Serve me in a large bowl, peel my charred skin, and eat. The aromatic scent of rosemary combined with my gentle earthy sweetness is a celebration... a small comfort before the winter frost.",
          image: "/images/chestnut_c1.jpeg",
          choices: [
            { id: "to_science", text: "🔬 Learn how my roots survive the drought (Science)", target: "science" },
            { id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }
          ]
        },
        culinary_2: {
          text: "Do not let the autumn rain ruin what I spent a year making. Boil my starches, peel my protective inner skins, and mash me with warm milk into a velvety cream soup. In the bitter, freezing winter months, this soup restores human energy and stamina instantly. A true, shielding warmth from the old forest giant.",
          image: "/images/chestnut_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_3: {
          text: "Before the damp mould claims them, my dried nuts can be ground into a rich, sweet flour. For centuries, mountain communities survived harsh winters by baking traditional gluten-free breads from my flour. Food today, food tomorrow... I have always provided.",
          image: "/images/chestnut_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_4: {
          text: "If humans ignore me, a heavy sorrow fills my old heart... Soon my treasures will become black, mouldy, and completely inedible on the damp mud, and then everything I worked for is lost. Please, seize the moment before the storm arrives! Gather this free harvest!",
          image: "/images/chestnut_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },

        // ==========================================
        // MENU SCIENCE (A2)
        // ==========================================
        science: {
          text: "Look at what I have made with deep devotion! A harvest that can help your family and all your neighbours survive the long winter. No one has to go hungry in my neighborhood. My starch is beautiful, so much healthier than potatoes. Tell me, which part of my ancient, solid structure do you wish to examine?",
          image: "/images/chestnut_science.jpeg",
          choices: [
            { id: "s1", text: "🚰 No spade, no watering? (Roots)", target: "science_1" },
            { id: "s2", text: "🏗️ Building solid structures? (Wood)", target: "science_2" },
            { id: "s3", text: "⏳ Providing for a hundred years?", target: "science_3" },
            { id: "s4", text: "🪓 What if humans cut you down?", target: "science_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science_1: {
          text: "And it requires so little labor from you! No spade is needed, not a single weed has to be pulled. My roots reach so deep into the earth's secret reserves that I do not need watering at all. I absorb locked water, staying completely hydrated even in intense summer droughts. I am here... steady. You can truly rely on me.",
          image: "/images/chestnut_s1.jpeg",
          choices: [
            { id: "to_wisdom", text: "👁️ Walk into my deeper thoughts (Wisdom)", target: "wisdom" },
            { id: "back", text: "↩️ Back to Science Menu", target: "science" }
          ]
        },
        science_2: {
          text: "You can build your homes with me. Strong, permanent structures. My wood is exceptionally solid and infused with natural high-tannin compounds. This makes my timber highly durable, completely resistant to rot, water decay, or ravenous insects. Built for the long term, just like me.",
          image: "/images/chestnut_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_3: {
          text: "I can give you food today... and next year, and the year after... and in a hundred years too! With every year you leave me standing, my canopy expands and I will give you an even greater harvest. You can count on that. Reliable, stable, unchanging.",
          image: "/images/chestnut_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_4: {
          text: "I will keep providing for generations... At least, if you don’t cut me down! If you destroy me, the forest loses its powerhouse. It terrifies me to think of it... Come on, instead of destroying, seize your chance. Protect me, and gather this free harvest!",
          image: "/images/chestnut_s4.jpeg",
          choices: [
            { id: "to_die", text: "🪓 \"Or would you rather see me die?\"", target: "wisdom_4" },
            { id: "back", text: "↩ hoax Back to Science Menu", target: "science" }
          ]
        },

        // ==========================================
        // MENU WISDOM (A3)
        // ==========================================
        wisdom: {
          text: "The autumn storms are coming... The day after tomorrow it will rain and my harvest will perish. Where are the deer? Where are the people? Who comes to harvest? Who wants to taste what I offer? What is happening? Am I doing something wrong? Is there something I need to learn? I feel so terribly forgotten...",
          image: "/images/chestnut_wisdom.jpeg",
          choices: [
            { id: "w1", text: "💔 \"Should I stop giving to humans?\"", target: "wisdom_1" },
            { id: "w2", text: "🌬️ \"Who am I if nobody sees my value?\"", target: "wisdom_2" },
            { id: "w3", text: "🌱 \"Should I let go and fade away?\"", target: "wisdom_3" },
            { id: "w4", text: "🛡️ \"Should I prove my worth to you?\"", target: "wisdom_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom_1: {
          text: "Should I stop giving because it is not appreciated? Oh, but I cannot! It is simply not in my nature! I am here to be useful. I want to remain standing and show that you can rely on me, no matter how big the storm. I will keep providing if you just let me... Please, eat my chestnuts!",
          image: "/images/chestnut_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_2: {
          text: "Oh my… Who am I if nobody sees my value? What should I do? Perhaps... perhaps I have been asking myself that lonely, echoing question for a very long time, standing here in the cold silence of the forest while my fruits rot away into nothingness.",
          image: "/images/chestnut_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_3: {
          text: "Should I let go? Let my heavy branches fall and let the ecosystem consume me? A part of me wants to rest... but my roots are anchored too deep. I am bound to this soil, forever hoping that tomorrow, someone will finally look down and see my treasures.",
          image: "/images/chestnut_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_4: {
          text: "Whether you want to see me die or watch me stand, I will show you that I am built for the long term. No matter how violent the storm, you can build with me. Protect the soil beneath your feet today, and I will faithfully feed your grandchildren for the next hundred years. Let me prove my worth...",
          image: "/images/chestnut_w4.jpeg",
          choices: [
            { id: "to_science_node", text: "🔬 Let me prove my worth (Go to Science)", target: "science" },
            { id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }
          ]
        }
      }
    },
    strawberry: {
      nama: "Bosaardbei (Forest Strawberry)",
      umur: "Age: 1 Year Old (The Shy & Sweet Child)",
      emoji: "🍓",
      model3D: "/models/Strawberry.glb",
      // 👧 KARAKTER: Anak kecil yang imut, agak pemalu (shy), suka bersembunyi tapi suka menari, menggemaskan
      voiceConfig: {
        rate: 0.95, // Berbicara dengan ritme anak-anak yang ceria namun agak malu-malu
        pitch: 1.45, // Nada suara tinggi, imut, dan menggemaskan 
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "Hi, hello! *peaks from behind a big green leaf* Can you see me? I am small, and I like to hide a little bit! I cover the forest floor together with my siblings. We hold hands and just sing happy songs together. No, heehee, just kidding! But we do like to dance, yay! Some people think being small means you're not important... but that’s not true at all! Which of my secrets do you want to explore?",
          image: "/images/Strawberry.jpeg",
          choices: [
            { id: "to_science", text: "🌱 Science: \"I’m small. But I’m important too!\"", target: "science" },
            { id: "to_culinary", text: "😋 Culinary: \"Would you like a taste?\"", target: "culinary" },
            { id: "to_wisdom", text: "👁️ Wisdom: \"Hear another pearl of wisdom?\"", target: "wisdom" }
          ]
        },

        // ==========================================
        // MENU SCIENCE (B1)
        // ==========================================
        science: {
          text: "Oh! Hello… You nearly stepped on me, watch out! I am Forest Strawberry, and I stay close to the ground where it feels super safe. My roots don't go very deep at all. Instead, I send runners across the forest floor... little green legs that help me wander! What scientific trick do you want to see?",
          image: "/images/Strawberry_science.jpeg",
          choices: [
            { id: "s1", text: "🏃‍♂️ Tell me about your 'little green legs'?", target: "science_1" },
            { id: "s2", text: "🍃 How do you make a leafy blanket?", target: "science_2" },
            { id: "s3", text: "⛅ Why don't you like full sunshine?", target: "science_3" },
            { id: "s4", text: "🌳 How do the big trees feed you?", target: "science_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science_1: {
          text: "Look, look! Wherever my runners touch the earth, a brand new strawberry plant can grow! They are like little green legs that help me wander around. Because my stems are soft and bendy, I can crawl quickly without snapping like hard wood. Do you want to see how I spread across the floor?",
          image: "/images/Strawberry_s1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_2: {
          text: "Together, my sisters and I hold hands and make a lush, leafy blanket over the dirt! This keeps the soil super cool, moist, and happy. Not bad for a tiny plant, right? Hehe! We protect the floor from getting too hot.",
          image: "/images/Strawberry_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_3: {
          text: "Here's a big secret: Most fruits dream of standing in full sunshine. I don't! I like living under the cozy shadow of big plants. When fierce storms blow, the giant trees take the hit while I just safely hug the dirt, completely hidden!",
          image: "/images/Strawberry_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_4: {
          text: "Every autumn, the giant trees feed me with their beautiful fallen leaves. And while the tall plants reach for the sky, I stay close to the floor. Yet somehow… I still make some of the sweetest strawberries in the whole forest! Funny, isn't it? Sometimes the smallest plants hide the sweetest surprises.",
          image: "/images/Strawberry_s4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },

        // ==========================================
        // MENU CULINARY (B2)
        // ==========================================
        culinary: {
          text: "Would you like a taste? Oh! Then I know a special recipe. Close your eyes... Imagine a handful of tiny wild strawberries. Now sit in the sun, and eat them one by one. Very slowly. If you're lucky, a blackbird will sing. That is the secret ingredient! Do you want to hear more about my flavors?",
          image: "/images/Strawberry_culinary.jpeg",
          choices: [
            { id: "c1", text: "🐦 Tell me about the blackbird's song!", target: "culinary_1" },
            { id: "c2", text: "🍰 Can you be baked into sweets?", target: "culinary_2" },
            { id: "c3", text: "🦊 Who else loves eating you?", target: "culinary_3" },
            { id: "c4", text: "🍂 Do you prefer a sharp and bitter taste?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "The forest has so many flavors to offer! But my sweetness is incomplete without nature around you. Each little strawberry holds the crisp morning dew and the gentle breeze of the woods. Enjoying them in silence is the best way to connect with our home.",
          image: "/images/Strawberry_c1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_2: {
          text: "Bakeries love to gently tuck my berries inside sweet pastries, tarts, and summer juices! Or you can gently cook my strawberries with honey to make a warm compote. It makes the whole room smell like a little piece of paradise! Is there a way to preserve this flavor for winter?",
          image: "/images/Strawberry_c2.jpeg",
          choices: [
            { id: "to_preserve", text: "🍓 Yes! Tell me how to preserve it!", target: "culinary_2_preserve" },
            { id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }
          ]
        },
        culinary_2_preserve: {
          text: "Heehee! My berries can be turned into yummy jam, or frozen, dried, and preserved in sweet syrup! Each method captures a little piece of summer and stores it away for cold, snowy winter days. Abundance today becomes comfort tomorrow!",
          image: "/images/Strawberry_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_3: {
          text: "Mice, squirrels, and sneaky forest badgers absolutely love hunting for my little red dots! They eat me up when they are hungry, and in return, they help scatter my tiny seeds across new cozy spots in the woods! We are great team players!",
          image: "/images/Strawberry_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_4: {
          text: "Do you prefer a taste that is sharp and bitter instead? Bitter greens or sharp roots add complexity and contrast, helping humans appreciate my sweetness even more! A forest meal becomes interesting when different flavors work together, not against each other!",
          image: "/images/Strawberry_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },

        // ==========================================
        // MENU WISDOM (B3)
        // ==========================================
        wisdom: {
          text: "I am small, and it is easy to overlook me. But I have a talent that’s very special for plants... I learned how to walk! Do you see those little stems above the ground? Those are my legs, and they love to wander. I move towards the places where I feel at home . What little story do you want to hear?",
          image: "/images/Strawberry_wisdom.jpeg",
          choices: [
            { id: "w1", text: "⛺ Tell me about your blanket of cosiness!", target: "wisdom_1" },
            { id: "w2", text: "🤫 'Do you enjoy hiding a little too?'", target: "wisdom_2" },
            { id: "w3", text: "🎤 'Or would you rather sing a song?'", target: "wisdom_3" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom_1: {
          text: "By wandering around, I spread across the ground and create a whole blanket of cosiness for myself and my sisters. We protect each other. Most of all, I like to hide a little. But my strawberries? They are always the sweetest! Is it hard to keep producing sweetness when you are easily overlooked?",
          image: "/images/Strawberry_w1.jpeg",
          choices: [
            { id: "to_overlooked", text: "😢 Is it hard when people overlook you?", target: "wisdom_1_overlooked" },
            { id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }
          ]
        },
        wisdom_1_overlooked: {
          text: "Sometimes it is natural to wonder whether my efforts matter. Yet true sweetness comes from within, not from praise! Many of the most valuable things in nature work quietly without anyone noticing. Being overlooked does not make our gifts any less meaningful!",
          image: "/images/Strawberry_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_2: {
          text: "Do you enjoy hiding a little too? That's completely okay! There is comfort in quiet places where you can observe without being observed. You don't always have to stand in the bright spotlight to be special. The shade is a safe, peaceful place to gather strength.",
          image: "/images/Strawberry_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_3: {
          text: "Or would you rather step right into the center of the square and sing a happy song out loud? Why not! Singing is about expressing yourself openly and sharing your presence with the world. Even if your song is imperfect, there is so much courage in letting others hear it!",
          image: "/images/Strawberry_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        }
      }
    },

    mycelium: {
      nama: "Mycorrhiza Underground Network",
      umur: "Age: Infinite (The Wood Wide Web)",
      emoji: "🍄",
      model3D: "/models/Mycelium.glb",
      // 🤖 KARAKTER: Entitas kuno, magis, surealis, berbisik (whispering), dan sangat misterius
      voiceConfig: {
        rate: 0.75,  // Sedikit diperlambat agar jeda titik-titik (...) memberikan efek mistis yang pas
        pitch: 0.60,  // Nada suara rendah bawah tanah
        lang: 'en-US'
      },
      story: {
        intro: {
          text: "Listen.... We are here. Long before you saw us. Long before you searched. We are Mycorrhiza... Not trees. Not animals. Not plants. Fungi. Be still. A network. Humans call us the Wood Wide Web. Now… close your eyes. Feel your feet. Imagine you have roots. They touch something. Something touches them. You are connected. Even now. Especially now. Are you ready to go deeper?",
          image: "/images/Mycelium_intro.jpeg",
          choices: [
            { id: "to_culinary", text: "😋 Culinary: \"Are you edible?\"", target: "culinary" },
            { id: "to_science", text: "🔬 Science: \"What can you do?\"", target: "science" },
            { id: "to_wisdom", text: "👁️ Wisdom: \"Take me deeper.\"", target: "wisdom" }
          ]
        },

        // ==========================================
        // MENU CULINARY (C1)
        // ==========================================
        culinary: {
          text: "Are we edible? Hush now... Some of us are. Some of us are not. That is why you should never nibble strange mushrooms in the forest. But one of our oldest friends is called Reishi. For thousands of years, people have searched for her. Kings, healers, travellers... all hoping for more time, more strength, more life. Do you wish to understand her recipe?",
          image: "/images/Mycelium_culinary.jpeg",
          choices: [
            { id: "c1", text: "🍵 Tell me Reishi's ancient recipe!", target: "culinary_1" },
            { id: "c2", text: "🥣 What does Reishi share with water?", target: "culinary_2" },
            { id: "c3", text: "🍄 Why do humans keep coming back?", target: "culinary_3" },
            { id: "c4", text: "🐗 Who else hunts for us in the dark?", target: "culinary_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        culinary_1: {
          text: "Take a piece of Reishi. Add water. Then wait... Slowly, she shares her gifts with the water. Some say she brings resilience. Some say she supports a long life. Some say she helps people find calm in difficult times. Hear us... We fungi make no promises, but for thousands of years, humans have kept coming back for another cup.",
          image: "/images/Mycelium_c1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_2: {
          text: "We do not grow sweet crunchy fruits. Instead, we sprout umami fruiting bodies beneath the damp soil. When humans brew our dried Reishi threads, they unlock deep, bitter medicinal compounds that ground the human spirit, bringing a shield against cold winter sickness. Is there an exchange happening during this growth?",
          image: "/images/Mycelium_c2.jpeg",
          choices: [
            { id: "to_exchange", text: "🔄 Tell me about the nutrient exchange!", target: "culinary_2_exchange" },
            { id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }
          ]
        },
        culinary_2_exchange: {
          text: "Listen close... It is a quiet, sacred trade. We give the tall trees water and minerals locked deep within the rocks. In return, they give us carbon and liquid sugars made from sunlight. No greed. No imbalance. Pure cooperation beneath the soil.",
          image: "/images/Mycelium_c2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_3: {
          text: "Humans keep coming back because their bodies remember the soil. Long before laboratories existed, kings and ancient travellers knew that the darkness beneath their feet held the secret to endurance and calm in a world full of storms, connecting everything in silence.",
          image: "/images/Mycelium_c3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },
        culinary_4: {
          text: "While humans seek Reishi for long life, wild boars, slugs, and squirrels dig deep for our hidden truffles and mushrooms. They don't need recipes; they listen to the aroma of autumn and summers long digested. All creatures find their purpose in our dark embrace.",
          image: "/images/Mycelium_c4.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Culinary Menu", target: "culinary" }]
        },

        // ==========================================
        // MENU SCIENCE (C2)
        // ==========================================
        science: {
          text: "You want to know what we can do? Quiet now… That is a dangerous question. We help trees drink. We help plants talk. We move water, nutrients, and warnings. One tree is thirsty, another has plenty; sometimes we connect them. But that is only the beginning. Which of our magical tricks do you wish to analyze?",
          image: "/images/Mycelium_science.jpeg",
          choices: [
            { id: "s1", text: "🏗️ Building walls out of fungal threads?", target: "science_1" },
            { id: "s2", text: "🧪 Cleaning polluted soil and oil?", target: "science_2" },
            { id: "s3", text: "🍂 Turning dead things into life?", target: "science_3" },
            { id: "s4", text: "🕸️ How do we connect the forest?", target: "science_4" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        science_1: {
          text: "Humans are finally learning our tricks. They grow our threads into walls, packaging, and sound insulation! We have no rigid wood; our cells are woven with flexible chitin, creating structures lighter than bone but incredibly tough. We are the architecture of the quiet future.",
          image: "/images/Mycelium_s1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_2: {
          text: "Some humans use us to clean polluted soil and water. Oil, pesticides, even heavy medicines... we eat what others cannot. We digest the poison and shield the underground water tables from decaying. Not bad for something that spends its whole life in the dark, right?",
          image: "/images/Mycelium_s2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_3: {
          text: "We take dead things apart and turn them into life again. Softly now… Everything you leave behind here is not forgotten. Composted, reconsidered, and woven into fresh soil for a new life. We are the ultimate recyclers of the planet . What happens if the soil is too dry or damaged?",
          image: "/images/Mycelium_s3.jpeg",
          choices: [
            { id: "to_damaged_soil", text: "🍂 What happens when soil is damaged?", target: "science_3_damaged" },
            { id: "back", text: "↩️ Back to Science Menu", target: "science" }
          ]
        },
        science_3_damaged: {
          text: "When the ground is hard, barren, or broken by humans, we work double time. Our fine threads bridge the dry patches, binding the loose dust together so that roots don't lose their footing. We hold the world together when it tries to fall apart.",
          image: "/images/Mycelium_s3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Science Menu", target: "science" }]
        },
        science_4: {
          text: "We do not possess root systems like plants. We consist of billions of ultra-fine threads called hyphae. We tap into the deep roots of the forest, creating an organic internet that trades minerals for sugars instantly.",
          image: "/images/Mycelium_s4.jpeg",
          choices: [
            { id: "to_secret", text: "👁️ Tell me another secret from beneath the ground.", target: "wisdom" },
            { id: "back", text: "↩️ Back to Science Menu", target: "science" }
          ]
        },

        // ==========================================
        // MENU WISDOM (C3)
        // ==========================================
        wisdom: {
          text: "You wanted to go deeper? Very well... Close your eyes. Imagine you are a tree. No. Imagine you are a forest. Your roots stretch beneath the earth. You touch another root. And another. And another. Soon you can no longer tell where you end and where the others begin. Which secret of unity do you want to unlock?",
          image: "/images/Mycelium_wisdom.jpeg",
          choices: [
            { id: "w1", text: "🌌 'The forest floor is you...'", target: "wisdom_1" },
            { id: "w2", text: "🍃 'Nothing stays what it was...'", target: "wisdom_2" },
            { id: "w3", text: "🕯️ 'What am I becoming?'", target: "wisdom_3" },
            { id: "back", text: "↩️ Back to Intro", target: "intro" }
          ]
        },
        wisdom_1: {
          text: "The fungi are you. The birds. The worms. The rain. The fallen leaves. All of it. For a moment, you forget your human name... and nothing bad happens. Hear the wind… That is one of our oldest secrets. In our network, separation is an illusion. Is it lonely down here in the quiet shadows?",
          image: "/images/Mycelium_w1.jpeg",
          choices: [
            { id: "to_lonely", text: "👁️ Is it lonely in the dark?", target: "wisdom_1_lonely" },
            { id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }
          ]
        },
        wisdom_1_lonely: {
          text: "Breathe in... Loneliness is a word for those who think they are whole by themselves. In the deep dark, we are billions, yet we are one single heartbeat. We are never alone because we are everywhere. We are the silent comfort of the whole forest floor.",
          image: "/images/Mycelium_w1.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_2: {
          text: "Nothing stays what it was. Leaves become soil. Soil becomes roots. Roots become trees. You don't have to stay what you were, either. Everything can change, rewrite, and heal. The network allows you to transform completely.",
          image: "/images/Mycelium_w2.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
        },
        wisdom_3: {
          text: "You are becoming a part of something larger. Woven into a massive, beautiful tapestry of life. If you have weights or heavy thoughts you want to let go of... leave them here with us in the soil. We will safely turn them into beautiful fertilizer for tomorrow.",
          image: "/images/Mycelium_w3.jpeg",
          choices: [{ id: "back", text: "↩️ Back to Wisdom Menu", target: "wisdom" }]
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
        <h2 style={{ color: '#2e7d32', margin: '5px 0', fontSize: '20px', fontWeight: 'bold' }}>{currentPlant.emoji} {currentPlant.nama}</h2>
        <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #a5d6a7' }}>
          {currentPlant.umur}
        </span>
      </div>

      {/* SEGMENTED CONTROL / NAVIGASI TAB */}
      <div style={{ display: 'flex', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.08)', backdropFilter: 'blur(4px)', borderRadius: '10px', padding: '4px', marginBottom: '15px' }}>
        {['ar', 'story', 'asking'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === 'story') setCurrentNode('intro'); }}
            style={{
              flex: 1,
              padding: '10px 5px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '11px',
              cursor: 'pointer',
              // AKTIF: Hijau gelap kontras, MATI: Transparan dengan teks hijau tua agar tidak hilang/putih
              backgroundColor: activeTab === tab ? '#2e7d32' : 'transparent',
              color: activeTab === tab ? '#ffffff' : '#0a2a0a',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease'
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
          <div style={{ width: '100%', height: '320px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(8px)', borderRadius: '15px', border: '1px solid rgba(76, 175, 80, 0.2)', overflow: 'hidden', position: 'relative' }}>

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
              <button slot="ar-button" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: '#FF9800', border: 'none', borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                🚀 ACTIVATE AR MODE
              </button>
            </model-viewer>

          </div>
          <p style={{ fontSize: '12px', color: '#2e4d2e', marginTop: '12px', lineHeight: '1.4', fontWeight: '500' }}>
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
          <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', border: '1px solid rgba(76, 175, 80, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.5)', position: 'relative' }}>
            <img
              src={currentStoryNode.image}
              alt="Plant condition stage"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Aset+Gambar+Belum+Disalin"; }}
            />
          </div>

          {/* TEKS DIALOG NARASI */}
          <div style={{ backgroundColor: '#f1f8e9', borderRadius: '12px', padding: '15px', borderLeft: '4px solid #4caf50', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', margin: 0, color: '#0a2a0a', textAlign: 'justify', fontWeight: '500' }}>
              {currentStoryNode.text}
            </p>
          </div>

          {/* DAFTAR PILIHAN TOMBOL BERCABANG */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentStoryNode.choices?.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoiceClick(choice.target)}
                style={{ width: '100%', padding: '14px 12px', backgroundColor: '#ffffff', color: '#0a2a0a', border: '1px solid #c8e6c9', borderRadius: '10px', fontSize: '12.5px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                <span>{choice.text}</span>
                <span style={{ color: '#2e7d32' }}>➔</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB CONTENT 3: ASKING PLANT PANEL (KOTAK AI)
          ========================================== */}
      {activeTab === 'asking' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '360px', backgroundColor: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(10px)', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(76, 175, 80, 0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>

          {/* Area Riwayat Bubble Chat */}
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>

            {/* Pesan Sambutan Awal dari Bot Tanaman */}
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#e8f5e9', color: '#0a2a0a', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', fontSize: '12.5px', maxWidth: '85%', fontWeight: '500', border: '1px solid #c8e6c9', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              Hello human friend! Ask me anything about my roots, leaf functions, or ecosystem! 🌳
            </div>

            {/* Iterasi Chat Messages */}
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#2e7d32' : '#e8f5e9',
                  color: msg.role === 'user' ? '#ffffff' : '#0a2a0a',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  fontSize: '12.5px',
                  maxWidth: '85%',
                  fontWeight: '500',
                  border: msg.role === 'user' ? 'none' : '1px solid #c8e6c9',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                }}
              >
                {msg.text}
              </div>
            ))}

            {isAiTyping && <div style={{ fontSize: '11px', color: '#557a55', fontStyle: 'italic', paddingLeft: '5px' }}>Plant is thinking...</div>}
          </div>

          {/* Form Input Kirim Pesan di Bagian Bawah */}
          <form onSubmit={handleSendChatMessage} style={{ display: 'flex', padding: '10px', backgroundColor: '#ffffff', borderTop: '1px solid rgba(76, 175, 80, 0.15)' }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message to plant..."
              style={{ flex: 1, padding: '10px 14px', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#0a2a0a', fontSize: '12.5px', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ marginLeft: '8px', padding: '0 16px', backgroundColor: '#2e7d32', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '12.5px', cursor: 'pointer' }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* TOMBOL RETRIGGER SCAN BARU */}
      <button
        onClick={() => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); router.push('/'); }}
        style={{ width: '100%', padding: '14px', backgroundColor: '#f44336', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '25px', boxShadow: '0 4px 10px rgba(244,67,54,0.2)' }}
      >
        📷 Back to Scanner Station
      </button>

    </div>
  );
}