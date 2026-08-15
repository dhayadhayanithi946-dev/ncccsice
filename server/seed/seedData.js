const bcrypt = require('bcryptjs');
const { getIsMongo, localStore } = require('../config/db');
const User = require('../models/User');
const Stats = require('../models/Stats');
const Ano = require('../models/Ano');
const Cadet = require('../models/Cadet');
const Event = require('../models/Event');
const Gallery = require('../models/Gallery');
const Achievement = require('../models/Achievement');
const Announcement = require('../models/Announcement');

const seedInitialData = async () => {
  try {
    console.log('🌱 Seeding initial sample data for 31 (TN) INDEP COY NCC...');

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('NccCsice2026!', salt);

    const defaultUser = {
      username: 'ncc_admin',
      email: 'admin@csice.edu.in',
      password: defaultPasswordHash,
      role: 'admin'
    };

    const defaultStats = {
      totalCadets: 104,
      nccEvents: 42,
      achievements: 28,
      campsParticipated: 16
    };

    const defaultAno = {
      name: 'Lt. Dr. Manoj Prabhakar B.S.',
      designation: 'Associate NCC Officer (ANO)',
      unit: '31 (TN) INDEP COY NCC',
      college: 'CSI College of Engineering, Ketti, Ooty',
      photoUrl: '/assets/ano_portrait.jpg',
      biography: 'Lt. Dr. Manoj Prabhakar B.S. leads the 31 (TN) INDEP COY NCC unit at CSI College of Engineering with distinction. He holds a Doctorate in Engineering and has been commissioning cadet training, camp organization, and national integration drives since 2018.',
      responsibilities: [
        'Overall command and administration of 31 (TN) INDEP COY NCC unit at CSI College of Engineering.',
        'Coordinating annual training camps, Republic Day Camp (RDC), and Thal Sainik Camp (TSC) selections.',
        'Mentoring cadets in drill, leadership, weapon training, and outdoor survival skills.',
        'Organizing social service initiatives including blood donation camps, tree plantation, and clean energy drives.'
      ],
      phone: '9345099378',
      email: 'office@csice.edu.in'
    };

    const defaultCadets = [
      {
        name: 'Cadet A. Vignesh',
        rank: 'JUO',
        department: 'Computer Science',
        year: 'IV Year',
        enrollmentNo: 'TN/2023/SD/54801',
        bloodGroup: 'O+',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        achievements: ['Republic Day Camp (RDC 2025) Delhi Contingent', 'Gold Medal in Firing Competition'],
        certificates: ['NCC B-Certificate (Grade A)', 'NCC C-Certificate (Grade A)'],
        phone: '9842100112',
        email: 'vignesh.cse@csice.edu.in'
      },
      {
        name: 'Cadet K. Priya',
        rank: 'CQMS',
        department: 'Electronics & Comm.',
        year: 'III Year',
        enrollmentNo: 'TN/2024/SW/54802',
        bloodGroup: 'B+',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        achievements: ['Best Cadet Award 2025 - Kovai Group', 'Ek Bharat Shreshtha Bharat (EBSB) Camp'],
        certificates: ['NCC B-Certificate (Grade A)'],
        phone: '9842100113',
        email: 'priya.ece@csice.edu.in'
      },
      {
        name: 'Cadet R. Gokul',
        rank: 'SGT',
        department: 'Mechanical Engg.',
        year: 'III Year',
        enrollmentNo: 'TN/2024/SD/54803',
        bloodGroup: 'A+',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        achievements: ['Thal Sainik Camp (TSC 2024) Obstacle Course Winner'],
        certificates: ['NCC B-Certificate (Grade A)'],
        phone: '9842100114',
        email: 'gokul.mech@csice.edu.in'
      },
      {
        name: 'Cadet S. Anitha',
        rank: 'CPL',
        department: 'Information Tech.',
        year: 'II Year',
        enrollmentNo: 'TN/2025/SW/54804',
        bloodGroup: 'AB+',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        achievements: ['Best Cultural Performance - Combined Annual Training Camp'],
        certificates: ['CATC Completion Certificate'],
        phone: '9842100115',
        email: 'anitha.it@csice.edu.in'
      },
      {
        name: 'Cadet M. Dinesh',
        rank: 'LCPL',
        department: 'Electrical & Electronics',
        year: 'II Year',
        enrollmentNo: 'TN/2025/SD/54805',
        bloodGroup: 'O-',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        achievements: ['Voluntary Blood Donation Drive Coordinator'],
        certificates: ['CATC Completion Certificate'],
        phone: '9842100116',
        email: 'dinesh.eee@csice.edu.in'
      },
      {
        name: 'Cadet B. Kavitha',
        rank: 'CDT',
        department: 'Civil Engg.',
        year: 'I Year',
        enrollmentNo: 'TN/2026/SW/54806',
        bloodGroup: 'A1+',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        achievements: ['First Place in Drill Competition - Institutional Level'],
        certificates: ['Enrolment Merit Badge'],
        phone: '9842100117',
        email: 'kavitha.civil@csice.edu.in'
      }
    ];

    const defaultEvents = [
      {
        title: '77th Independence Day Parade & Ceremonial Flag Hoisting',
        date: '2025-08-15',
        location: 'CSI College Ground, Ketti, Ooty',
        description: 'The 31 (TN) INDEP COY NCC unit of CSI College of Engineering organized a grand ceremonial parade on the 77th Independence Day. Cadets demonstrated precision drill, guard of honour, and cultural performances reflecting National Integration.',
        category: 'Independence Day',
        organizer: '31 (TN) INDEP COY NCC',
        photos: [
          '/assets/ncc_hero_bg.jpg',
          'https://images.unsplash.com/photo-1579952318503-31398ca70a57?auto=format&fit=crop&w=800&q=80'
        ],
        reportPdfUrl: '',
        participatingCadets: ['JUO A. Vignesh', 'CQMS K. Priya', 'SGT R. Gokul', 'CPL S. Anitha'],
        achievements: ['Best Parade Contingent Trophy', 'Special Commendation from Principal'],
        youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        isUpcoming: false,
        isPublished: true
      },
      {
        title: 'Combined Annual Training Camp (CATC 2025)',
        date: '2025-09-10',
        location: 'NCC Training Academy, Coimbatore',
        description: 'A 10-day intensive residential camp featuring military drill, small arms firing training, obstacle courses, map reading, fieldcraft, and sports competitions.',
        category: 'NCC Camp',
        organizer: '31 (TN) INDEP COY NCC & Kovai Group HQ',
        photos: [
          'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
        ],
        reportPdfUrl: '',
        participatingCadets: ['JUO A. Vignesh', 'CQMS K. Priya', 'SGT R. Gokul', 'LCPL M. Dinesh'],
        achievements: ['Overall Championship Trophy in Obstacle Drill'],
        youtubeLink: '',
        isUpcoming: false,
        isPublished: true
      },
      {
        title: 'Mega Blood Donation Drive in Nilgiris District',
        date: '2025-11-20',
        location: 'College Auditorium, CSICE Ketti',
        description: 'In collaboration with Government Hospital Ooty Blood Bank, NCC cadets organized a voluntary blood donation drive collecting over 150 units of blood.',
        category: 'Blood Donation',
        organizer: '31 (TN) INDEP COY NCC in association with Rotary Club Ooty',
        photos: [
          'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80'
        ],
        reportPdfUrl: '',
        participatingCadets: ['LCPL M. Dinesh', 'CDT B. Kavitha', 'CPL S. Anitha'],
        achievements: ['District Blood Collector Certificate of Appreciation'],
        youtubeLink: '',
        isUpcoming: false,
        isPublished: true
      },
      {
        title: 'Republic Day Parade 2026 Preparatory Camp',
        date: '2026-01-20',
        location: 'CSICE Parade Ground, Ketti',
        description: 'Rigorous 5-day parade rehearsal and weapons drill demonstration scheduled ahead of 77th Republic Day celebrations in Nilgiris district.',
        category: 'Republic Day',
        organizer: '31 (TN) INDEP COY NCC',
        photos: [
          '/assets/ncc_hero_bg.jpg'
        ],
        reportPdfUrl: '',
        participatingCadets: ['All Active Cadets'],
        achievements: [],
        youtubeLink: '',
        isUpcoming: false,
        isPublished: true
      },
      {
        title: 'Clean India & Plantation Drive in Ketti Valley',
        date: '2026-09-05',
        location: 'Ketti Valley Bio-Reserve',
        description: 'Upcoming environmental preservation drive by 31 (TN) INDEP COY NCC to plant 500 indigenous pine saplings and plastic waste collection campaign.',
        category: 'Tree Plantation',
        organizer: '31 (TN) INDEP COY NCC & Forest Dept Nilgiris',
        photos: [
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
        ],
        reportPdfUrl: '',
        participatingCadets: ['Enrolled Cadets'],
        achievements: [],
        youtubeLink: '',
        isUpcoming: true,
        isPublished: true
      }
    ];

    const defaultGallery = [
      {
        title: 'Independence Day Parade Drill',
        category: 'Parade',
        imageUrl: '/assets/ncc_hero_bg.jpg',
        description: 'Cadets executing sync march past during Independence Day celebrations.',
        date: '2025-08-15'
      },
      {
        title: 'Firing Practice at Firing Range',
        category: 'Training',
        imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        description: '.22 Deluxe Rifle target practice during Combined Annual Training Camp.',
        date: '2025-09-12'
      },
      {
        title: 'Obstacle Course Drill',
        category: 'Camp',
        imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
        description: 'Cadets crossing high wall obstacles in timed military drill competition.',
        date: '2025-09-14'
      },
      {
        title: 'Blood Donation Drive Camp',
        category: 'Community Service',
        imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
        description: 'Cadets assisting blood donors and medical officers at Ooty District Hospital drive.',
        date: '2025-11-20'
      },
      {
        title: 'Best Cadet Award Presentation',
        category: 'Award Ceremony',
        imageUrl: 'https://images.unsplash.com/photo-1579952318503-31398ca70a57?auto=format&fit=crop&w=800&q=80',
        description: 'Lt. Dr. Manoj Prabhakar presenting trophy to JUO A. Vignesh.',
        date: '2025-12-10'
      }
    ];

    const defaultAchievements = [
      {
        title: 'Republic Day Camp (RDC) Selection - New Delhi',
        cadetName: 'JUO A. Vignesh',
        date: '2025-01-26',
        event: 'Republic Day Parade 2025, Rajpath New Delhi',
        category: 'National Level Selection',
        description: 'JUO A. Vignesh represented Kovai Group and Tamil Nadu Directorate at the prestigious Republic Day Camp in New Delhi, participating in the Prime Minister Rally.',
        imageUrl: '/assets/ncc_crest.png'
      },
      {
        title: 'Thal Sainik Camp Gold Medalist in Obstacle Course',
        cadetName: 'SGT R. Gokul',
        date: '2024-10-18',
        event: 'All India Thal Sainik Camp (TSC 2024)',
        category: 'Best Cadet Award',
        description: 'SGT R. Gokul secured First Position Gold Medal in the timed 10-obstacle military drill course at All India Thal Sainik Camp.',
        imageUrl: '/assets/csice_logo.png'
      },
      {
        title: 'Best Cadet Award - Kovai Group NCC',
        cadetName: 'CQMS K. Priya',
        date: '2025-03-05',
        event: 'Annual Group Commanders Conference',
        category: 'Best Senior Wing Cadet',
        description: 'CQMS K. Priya was awarded the Best Senior Wing (SW) Cadet Trophy by Group Commander Kovai Group for outstanding leadership and academics.',
        imageUrl: '/assets/ano_portrait.jpg'
      }
    ];

    const defaultAnnouncements = [
      {
        title: 'Parade & Drill Training Schedule - Academic Term II',
        content: 'All enrolled NCC Cadets are instructed to attend mandatory weekly drill parades starting Saturday, 22nd August 2026 at 06:30 AM at the College Parade Ground in full uniform.',
        date: '2026-08-16',
        category: 'Parade Notice',
        isPinned: true
      },
      {
        title: 'Enrolment Drive for 1st Year Students (Batch 2026-2029)',
        content: 'Physical efficiency test (PET), height check, and personal interview for fresh 1st year engineering students seeking enrolment in 31 (TN) INDEP COY NCC will take place on 30th August 2026.',
        date: '2026-08-14',
        category: 'Selection Notice',
        isPinned: true
      },
      {
        title: 'Document Verification for B & C Certificate Exams',
        content: '3rd and 4th year cadets appearing for B and C Certificate examinations must submit their camp completion certificates and attendance logs to Lt. Dr. Manoj Prabhakar by 5th September.',
        date: '2026-08-10',
        category: 'General Notice',
        isPinned: false
      }
    ];

    if (getIsMongo()) {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        await User.create(defaultUser);
        console.log('Seeded Mongo User.');
      }
      const statsCount = await Stats.countDocuments();
      if (statsCount === 0) {
        await Stats.create(defaultStats);
      }
      const anoCount = await Ano.countDocuments();
      if (anoCount === 0) {
        await Ano.create(defaultAno);
      }
      const cadetCount = await Cadet.countDocuments();
      if (cadetCount === 0) {
        await Cadet.insertMany(defaultCadets);
      }
      const eventCount = await Event.countDocuments();
      if (eventCount === 0) {
        await Event.insertMany(defaultEvents);
      }
      const galleryCount = await Gallery.countDocuments();
      if (galleryCount === 0) {
        await Gallery.insertMany(defaultGallery);
      }
      const achievementCount = await Achievement.countDocuments();
      if (achievementCount === 0) {
        await Achievement.insertMany(defaultAchievements);
      }
      const announcementCount = await Announcement.countDocuments();
      if (announcementCount === 0) {
        await Announcement.insertMany(defaultAnnouncements);
      }
    } else {
      if (!localStore.data.users || localStore.data.users.length === 0) {
        localStore.data.users = [{ _id: 'user-1', ...defaultUser }];
      }
      if (!localStore.data.stats || !localStore.data.stats.totalCadets) {
        localStore.data.stats = defaultStats;
      }
      if (!localStore.data.ano || !localStore.data.ano.name) {
        localStore.data.ano = { _id: 'ano-1', ...defaultAno };
      }
      if (!localStore.data.cadets || localStore.data.cadets.length === 0) {
        localStore.data.cadets = defaultCadets.map((c, i) => ({ _id: `cadet-${i+1}`, ...c }));
      }
      if (!localStore.data.events || localStore.data.events.length === 0) {
        localStore.data.events = defaultEvents.map((e, i) => ({ _id: `event-${i+1}`, ...e }));
      }
      if (!localStore.data.gallery || localStore.data.gallery.length === 0) {
        localStore.data.gallery = defaultGallery.map((g, i) => ({ _id: `gallery-${i+1}`, ...g }));
      }
      if (!localStore.data.achievements || localStore.data.achievements.length === 0) {
        localStore.data.achievements = defaultAchievements.map((a, i) => ({ _id: `achievement-${i+1}`, ...a }));
      }
      if (!localStore.data.announcements || localStore.data.announcements.length === 0) {
        localStore.data.announcements = defaultAnnouncements.map((an, i) => ({ _id: `announcement-${i+1}`, ...an }));
      }
      localStore.save();
      console.log('Seeded Local JSON Database successfully.');
    }
  } catch (err) {
    console.error('Error during data seeding:', err);
  }
};

module.exports = seedInitialData;
