/**
 * Mock Data for Notices & Announcements Module
 */
export const initialNotices = [
  {
    id: 'NOTIF-2026-001',
    title: 'End-Semester Examination Timetable - Winter 2026',
    category: 'Examination',
    priority: 'Urgent',
    targetAudience: 'all',
    department: 'Examination Cell',
    publishedBy: 'Dr. Vikram Seth (Controller of Examinations)',
    publishedDate: '2026-10-22',
    isPinned: true,
    content:
      'The comprehensive examination schedule for Odd Semester 2026 theory and laboratory assessments has been published. Theory papers will commence on 18th November 2026 in two shifts (Morning: 10:00 AM - 01:00 PM, Afternoon: 02:00 PM - 05:00 PM). Digital Hall Tickets can be downloaded from the student portal starting 5th November 2026. Note that 75% minimum attendance is strictly mandatory for hall ticket validation.',
    attachments: [
      { name: 'Odd_Sem_2026_Final_DateSheet.pdf', size: '2.4 MB' },
      { name: 'Exam_Guidelines_Instructions.pdf', size: '840 KB' },
    ],
  },
  {
    id: 'NOTIF-2026-002',
    title: 'Semester Fee Payment Deadline Notice & Fine Waiver Window',
    category: 'Fees',
    priority: 'High',
    targetAudience: 'student',
    department: 'Accounts & Finance',
    publishedBy: 'Finance Officer',
    publishedDate: '2026-10-20',
    isPinned: true,
    content:
      'All registered undergraduate and postgraduate students who have pending tuition or hostel dues are requested to settle their balances before 10th November 2026. The late penalty fine waiver is applicable for all payments completed online through the student portal before 31st October. Unsettled dues after the final deadline will result in an automated hold on semester hall tickets and grade access.',
    attachments: [
      { name: 'Fee_Payment_Schedule_2026.pdf', size: '420 KB' },
    ],
  },
  {
    id: 'NOTIF-2026-003',
    title: 'Campus Hackathon 2026: InnovateX 36-Hour Challenge',
    category: 'Event',
    priority: 'Normal',
    targetAudience: 'student',
    department: 'CSE Dept & Innovation Club',
    publishedBy: 'Dr. Sarah Patel',
    publishedDate: '2026-10-18',
    isPinned: false,
    content:
      'The Department of Computer Science & Engineering in association with top tech industry partners invites registrations for InnovateX 2026. Tracks include Generative AI, Sustainable Campus IoT, Decentralized FinTech, and Smart Healthcare. Prize pool of ₹ 2,50,000 + fast-track interview passes for finalists. Teams of 2 to 4 members can register via the portal before 1st November.',
    attachments: [
      { name: 'InnovateX_Brochure_Rules.pdf', size: '5.1 MB' },
    ],
  },
  {
    id: 'NOTIF-2026-004',
    title: 'Central Library Extended 24x7 Reading Room Hours',
    category: 'Academic',
    priority: 'Normal',
    targetAudience: 'all',
    department: 'Library Services',
    publishedBy: 'Chief Librarian',
    publishedDate: '2026-10-15',
    isPinned: false,
    content:
      'In view of the upcoming preparatory leave and final examinations, the Central Library air-conditioned reading halls (Wings A & B) will remain operational 24/7 starting 1st November 2026. High-speed campus Wi-Fi, power sockets, and cafeteria tea/coffee dispensers will be maintained round the clock. Students must display campus ID cards upon entry after 09:00 PM.',
    attachments: [],
  },
  {
    id: 'NOTIF-2026-005',
    title: 'AI & Robotics Seed Research Grant Call for Faculty 2026-27',
    category: 'Academic',
    priority: 'Normal',
    targetAudience: 'teacher',
    department: 'Dean Research & Consultancy',
    publishedBy: 'Prof. Rajesh Sharma',
    publishedDate: '2026-10-12',
    isPinned: false,
    content:
      'Proposals are invited from regular faculty members for institutional seed research grants up to ₹ 10,00,000 per project under the "AI-Driven Smart Infrastructures" initiative. Inter-departmental collaborations with Student co-investigators are encouraged. Deadline for initial abstract submission is 30th November 2026.',
    attachments: [
      { name: 'Research_Grant_Template_2026.docx', size: '1.1 MB' },
    ],
  },
  {
    id: 'NOTIF-2026-006',
    title: 'Diwali Festive Break & Campus Facility Schedule',
    category: 'General',
    priority: 'Normal',
    targetAudience: 'all',
    department: 'Registrar Office',
    publishedBy: 'Registrar',
    publishedDate: '2026-10-10',
    isPinned: false,
    content:
      'The university will observe Diwali holidays from 31st October to 4th November 2026. Academic classes and administrative offices will remain closed. Essential services including campus health center, hostel security, and emergency maintenance will operate on standard holiday rosters.',
    attachments: [],
  },
];
