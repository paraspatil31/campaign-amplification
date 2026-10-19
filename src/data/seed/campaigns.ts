import { Campaign } from '../../types';
import { estimateReachAtGoal } from '../../lib/reach';

export const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-001',
    creatorId: 'usr-001',
    status: 'available_for_funding',
    title: 'Clean River Initiative: Restoring Watershed Ecosystems',
    category: 'Environment',
    creatorName: 'Watershed Alliance Coalition',
    creatorType: 'Non-Profit / NGO',
    summary:
      'Funding targeted public awareness ads to mobilize 50,000 residents around chemical runoff prevention and stream restoration.',
    coverUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Why Our River Needs a Voice',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Over 60% of our regional drinking water originates from the Upper Clear River basin. However, recent industrial agricultural runoff has triggered unprecedented algal blooms, threatening local biodiversity and residential tap safety.',
      },
      {
        id: 'b-3',
        type: 'statistic',
        content: 'Regional drinking water source quality degradation',
        statValue: '42%',
        statLabel: 'increase in nitrogen runoff since 2022',
      },
      {
        id: 'b-4',
        type: 'paragraph',
        content:
          'Our coalition is deploying regional digital and social advertisements directing households to local watershed council hearings and practical buffer-planting guidelines. Your backing directly funds the ad delivery.',
      },
      {
        id: 'b-5',
        type: 'action_call',
        content:
          'Back this campaign to amplify this urgent warning to 120,000+ local families across streaming and local news portals.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'State Environmental Protection Water Quality Report 2025',
        url: 'https://example.org/reports/epa-water-2025',
        position: 1,
      },
      {
        id: 'src-2',
        title: 'Riverkeeper Basin Biodiversity Assessment',
        url: 'https://example.org/studies/basin-biodiversity',
        position: 2,
      },
    ],
    adHeadline: 'Protect Clear River: Clean Water Action',
    adDescription:
      'Learn how agricultural runoff affects our drinking water and what you can do at next Tuesday’s public hearing.',
    ctaText: 'View Watershed Guide',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        type: 'image',
        caption: 'Clear River Watershed zone',
      },
    ],
    target: {
      locations: ['Pacific Northwest', 'Columbia River Basin'],
      interests: ['Clean Water', 'Local Conservation', 'Gardening & Ecology'],
      channels: ['Social Feed', 'Local News Display', 'Search Ads'],
      channelAllocations: { 'Social Feed': 50, 'Local News Display': 30, 'Search Ads': 20 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 250000, // $2,500.00
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(250000).low,
    estReachHigh: estimateReachAtGoal(250000).high,
    raisedCents: 185000, // $1,850.00 (74%)
    backerCount: 42,
    publishedAt: '2026-03-01T10:00:00Z',
    fundingEndsAt: '2026-04-01T23:59:59Z',
    createdAt: '2026-02-20T12:00:00Z',
    updatedAt: '2026-03-10T15:30:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-002',
    creatorId: 'usr-002',
    status: 'available_for_funding',
    title: 'Rare Disease Outreach: Connecting Patients to Trials',
    category: 'Health',
    creatorName: 'The CDKL5 Research Alliance',
    creatorType: 'Researcher',
    summary:
      'Amplify breakthrough clinical trial enrollment opportunities to families affected by rare genetic neurodevelopmental disorders.',
    coverUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Closing the Clinical Trial Enrollment Gap',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Phase II gene therapy trials for CDKL5 deficiency disorder are now active in 8 medical centers nationwide, but over 70% of eligible pediatric patients have not been identified or referred in time.',
      },
      {
        id: 'b-3',
        type: 'statistic',
        content: 'Average delay before rare disease diagnosis',
        statValue: '4.8 yrs',
        statLabel: 'average search time for specialized trials',
      },
      {
        id: 'b-4',
        type: 'paragraph',
        content:
          'Your contribution funds high-precision informative campaigns on medical platforms, neurology journals, and parent caregiver networks so no child misses this therapeutic window.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'National Institutes of Health ClinicalTrials.gov Record NCT0498721',
        url: 'https://clinicaltrials.gov/study/NCT0498721',
        position: 1,
      },
    ],
    adHeadline: 'CDKL5 Gene Therapy Trial Now Enrolling',
    adDescription:
      'Find out if your child qualifies for open enrollment in 8 leading pediatric research hospitals.',
    ctaText: 'Check Eligibility',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['United States Nationwide', 'Canada'],
      interests: ['Pediatric Neurology', 'Rare Genetic Disorders', 'Clinical Research'],
      channels: ['Search Ads', 'Medical Display', 'Caregiver Groups'],
      channelAllocations: { 'Search Ads': 40, 'Medical Display': 30, 'Caregiver Groups': 30 },
      durationDays: 45,
    },
    durationDays: 45,
    fundingGoalCents: 400000, // $4,000.00
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(400000).low,
    estReachHigh: estimateReachAtGoal(400000).high,
    raisedCents: 320000, // $3,200.00 (80%)
    backerCount: 88,
    publishedAt: '2026-03-05T08:00:00Z',
    fundingEndsAt: '2026-04-19T23:59:59Z',
    createdAt: '2026-02-25T14:15:00Z',
    updatedAt: '2026-03-12T09:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-003',
    creatorId: 'usr-003',
    status: 'available_for_funding',
    title: 'Urban Microplastics: Public Citizen Science Lab',
    category: 'Science',
    creatorName: 'Open Science Collective',
    creatorType: 'Community Group',
    summary:
      'Funding ads to recruit 1,000 everyday citizens to sample tap water for airborne microplastic particles.',
    coverUrl:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Democratizing Environmental Chemistry',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Using low-cost microscope adapters and smartphone fluorometers, we are mapping particulate distribution block-by-block across major metro areas.',
      },
      {
        id: 'b-3',
        type: 'statistic',
        content: 'Target citizen sensor sample points',
        statValue: '2,500+',
        statLabel: 'neighborhood collection kits distributed',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Journal of Environmental Sciences: Airborne Polymer Deposition',
        url: 'https://example.org/studies/microplastics-air-2025',
        position: 1,
      },
    ],
    adHeadline: 'Become a Microplastic Citizen Scientist',
    adDescription: 'Request a free water testing kit and help map your neighborhood water.',
    ctaText: 'Claim Your Kit',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Midwest Urban Centers'],
      interests: ['Science Education', 'Home Filtration', 'Environmental Health'],
      channels: ['Social Feed', 'Podcasts'],
      channelAllocations: { 'Social Feed': 70, Podcasts: 30 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 150000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(150000).low,
    estReachHigh: estimateReachAtGoal(150000).high,
    raisedCents: 65000,
    backerCount: 23,
    publishedAt: '2026-03-08T12:00:00Z',
    fundingEndsAt: '2026-04-08T23:59:59Z',
    createdAt: '2026-03-01T11:00:00Z',
    updatedAt: '2026-03-11T16:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-004',
    creatorId: 'usr-004',
    status: 'available_for_funding',
    title: 'Rural STEM Access: Mobile Robotics Labs for Schools',
    category: 'Education',
    creatorName: 'Appalachian Tech Horizon',
    creatorType: 'Non-Profit / NGO',
    summary:
      'Advertising to connect underfunded rural school districts with free mobile computer science and robotics workshops.',
    coverUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Bringing Modern Coding to Rural Classrooms',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Over 40 school districts in our state lack dedicated computer science teachers. Our mobile lab brings hardware kits directly to middle and high school students.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'State Board of Education STEM Equity Audit',
        url: 'https://example.org/stem-equity-audit',
        position: 1,
      },
    ],
    adHeadline: 'Free Robotics Workshops for Rural Schools',
    adDescription: 'Book our traveling tech trailer for your district at zero cost.',
    ctaText: 'Book School Visit',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Appalachia', 'Rural Ohio', 'West Virginia'],
      interests: ['Education Reform', 'Robotics', 'Teachers'],
      channels: ['Social Feed', 'Local Radio Streaming'],
      channelAllocations: { 'Social Feed': 60, 'Local Radio Streaming': 40 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 200000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(200000).low,
    estReachHigh: estimateReachAtGoal(200000).high,
    raisedCents: 140000,
    backerCount: 35,
    publishedAt: '2026-03-02T10:00:00Z',
    fundingEndsAt: '2026-04-02T23:59:59Z',
    createdAt: '2026-02-28T09:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-005',
    creatorId: 'usr-005',
    status: 'available_for_funding',
    title: 'Municipal Transit Reform: Rapid Bus Lanes for East District',
    category: 'Public Policy',
    creatorName: 'Transit For All Citizens',
    creatorType: 'Coalition',
    summary:
      'Distributing educational ads before the city council budget vote to demonstrate economic and climate benefits of dedicated bus lanes.',
    coverUrl:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Cutting Commute Times by 45 Minutes Daily',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'East District workers spend up to 2 hours a day trapped in congested traffic. Dedicated bus rapid transit (BRT) lanes can cut that in half with zero disruption to residential streets.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Department of Transportation Urban Corridor Study',
        url: 'https://example.org/dot-study-2025',
        position: 1,
      },
    ],
    adHeadline: 'Faster Commutes: Support East Bus Lanes',
    adDescription: 'See how dedicated lanes save 12,000 riders 45 minutes every day.',
    ctaText: 'See The Route Plan',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Metropolitan East District'],
      interests: ['Public Transportation', 'Urban Planning', 'Local Government'],
      channels: ['Geo-Targeted Social', 'Commuter Mobile Apps'],
      channelAllocations: { 'Geo-Targeted Social': 60, 'Commuter Mobile Apps': 40 },
      durationDays: 21,
    },
    durationDays: 21,
    fundingGoalCents: 180000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(180000).low,
    estReachHigh: estimateReachAtGoal(180000).high,
    raisedCents: 110000,
    backerCount: 45,
    publishedAt: '2026-03-06T15:00:00Z',
    fundingEndsAt: '2026-03-27T23:59:59Z',
    createdAt: '2026-03-01T14:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-006',
    creatorId: 'usr-006',
    status: 'available_for_funding',
    title: 'Small Business Fair Rent Coalition: Protecting Local Shops',
    category: 'Economic Policy',
    creatorName: 'Main Street Merchants Alliance',
    creatorType: 'Community Group',
    summary:
      'Amplifying legal resources and lease transparency guides for independent retailers facing predatory 300% rent spikes.',
    coverUrl:
      'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Protecting Our Neighborhood Fabric',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Over 40 beloved independent bakeries, bookstores, and hardware shops were displaced last year alone. Our ads connect store owners to commercial tenant advocacy clinics.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'City Chamber of Commerce Independent Retail Survey',
        url: 'https://example.org/retail-survey-2025',
        position: 1,
      },
    ],
    adHeadline: 'Commercial Tenant Protections Guide',
    adDescription: 'Know your rights before renegotiating your small business lease.',
    ctaText: 'Get Free Tenant Guide',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Downtown Core', 'Commercial Arts District'],
      interests: ['Small Business', 'Local Economy', 'Community Events'],
      channels: ['Business Networks', 'Search Ads'],
      channelAllocations: { 'Business Networks': 70, 'Search Ads': 30 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 120000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(120000).low,
    estReachHigh: estimateReachAtGoal(120000).high,
    raisedCents: 45000,
    backerCount: 19,
    publishedAt: '2026-03-09T08:00:00Z',
    fundingEndsAt: '2026-04-09T23:59:59Z',
    createdAt: '2026-03-05T16:00:00Z',
    updatedAt: '2026-03-11T14:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-007',
    creatorId: 'usr-007',
    status: 'available_for_funding',
    title: 'Community Food Forest: Urban Agroforestry in Ward 4',
    category: 'Community',
    creatorName: 'Green Spaces Cooperative',
    creatorType: 'Individual',
    summary:
      'Advertising free weekend planting workshops and fruit-gleaning events to turn vacant city lots into perennial public orchards.',
    coverUrl:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Free Fresh Food for Everyone',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Ward 4 has been classified as a high-priority fresh food desert. By planting 250 native apple, plum, and berry bushes, we produce tons of free organic fruit each harvest season.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Municipal Public Health Food Access Atlas',
        url: 'https://example.org/food-atlas',
        position: 1,
      },
    ],
    adHeadline: 'Plant Free Food in Your Neighborhood',
    adDescription: 'Join our Saturday tree planting day and learn urban agroforestry.',
    ctaText: 'Sign Up for Workshop',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Ward 4', 'South End Neighborhoods'],
      interests: ['Gardening', 'Urban Farming', 'Food Security'],
      channels: ['Local Social Feeds', 'Community Bulletins'],
      channelAllocations: { 'Local Social Feeds': 80, 'Community Bulletins': 20 },
      durationDays: 14,
    },
    durationDays: 14,
    fundingGoalCents: 90000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(90000).low,
    estReachHigh: estimateReachAtGoal(90000).high,
    raisedCents: 85000,
    backerCount: 31,
    publishedAt: '2026-03-10T09:00:00Z',
    fundingEndsAt: '2026-03-24T23:59:59Z',
    createdAt: '2026-03-08T10:00:00Z',
    updatedAt: '2026-03-12T11:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-008',
    creatorId: 'usr-008',
    status: 'available_for_funding',
    title: 'Preserving Indigenous Oral Histories: Audio Archive',
    category: 'Arts & Culture',
    creatorName: 'Elder Voices Storytelling Guild',
    creatorType: 'Coalition',
    summary:
      'Reaching indigenous youth and cultural educators with interactive recordings of endangered tribal dialects and legends.',
    coverUrl:
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Languages on the Brink of Silence',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Fewer than 40 fluent speakers of the Kootenai dialect remain. We have recorded 200 hours of unwritten stories and songs, now formatted into free digital classroom modules.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'UNESCO Atlas of the World’s Languages in Danger',
        url: 'https://en.unesco.org/languages-atlas',
        position: 1,
      },
    ],
    adHeadline: 'Listen to 200 Hours of Native Stories',
    adDescription: 'Free streaming language archive for schools, families, and historians.',
    ctaText: 'Listen to Archive',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Pacific Northwest', 'Montana', 'Idaho'],
      interests: ['Linguistics', 'Indigenous Heritage', 'Oral History'],
      channels: ['Podcast Pre-Rolls', 'Educational Social'],
      channelAllocations: { 'Podcast Pre-Rolls': 50, 'Educational Social': 50 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 220000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(220000).low,
    estReachHigh: estimateReachAtGoal(220000).high,
    raisedCents: 160000,
    backerCount: 52,
    publishedAt: '2026-03-04T12:00:00Z',
    fundingEndsAt: '2026-04-04T23:59:59Z',
    createdAt: '2026-03-01T15:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-009',
    creatorId: 'usr-009',
    status: 'available_for_funding',
    title: 'Fair Trade Coffee Supply Chain: Direct Farm Transparency',
    category: 'Business',
    creatorName: 'Origin Trace Initiative',
    creatorType: 'Independent Journalist',
    summary:
      'Publishing verifiable farmgate price data to expose coffee supply chain markups and promote living-wage roasters.',
    coverUrl:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Where Does Your $6 Latte Actually Go?',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Smallholder coffee producers in Central America receive less than 4% of retail shelf price. Our investigative series highlights certified direct-trade roasters paying 300% above market minimums.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Specialty Coffee Association Economic Sustainability Report',
        url: 'https://example.org/sca-economic-report',
        position: 1,
      },
    ],
    adHeadline: 'See Who Really Grew Your Coffee',
    adDescription: 'Check our public farmgate price index before your next morning cup.',
    ctaText: 'Search Coffee Brands',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['Major Metro Areas', 'West Coast'],
      interests: ['Coffee Culture', 'Ethical Consumerism', 'Sustainability'],
      channels: ['Food & Lifestyle Blogs', 'Social Feeds'],
      channelAllocations: { 'Food & Lifestyle Blogs': 40, 'Social Feeds': 60 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 175000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(175000).low,
    estReachHigh: estimateReachAtGoal(175000).high,
    raisedCents: 95000,
    backerCount: 38,
    publishedAt: '2026-03-07T11:00:00Z',
    fundingEndsAt: '2026-04-07T23:59:59Z',
    createdAt: '2026-03-03T11:00:00Z',
    updatedAt: '2026-03-11T13:00:00Z',
    isDemoData: true,
  },
  {
    id: 'camp-010',
    creatorId: 'usr-010',
    status: 'available_for_funding',
    title: 'Open Internet Privacy: Free Toolkits for Everyday Citizens',
    category: 'Other',
    creatorName: 'Digital Rights Defenders',
    creatorType: 'Non-Profit / NGO',
    summary:
      'Educating parents, seniors, and students on simple, non-technical steps to block behavioral ad tracking and data brokers.',
    coverUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Your Privacy Is Not For Sale',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Data brokers collect over 1,500 data points on every connected citizen. We provide simple, step-by-step guides for DNS ad-blocking, privacy browsers, and consumer opt-out tools.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Electronic Frontier Foundation Privacy Primer',
        url: 'https://eff.org/privacy-primer',
        position: 1,
      },
    ],
    adHeadline: 'Stop Companies From Tracking Your Family',
    adDescription: 'Download our 5-minute privacy checklist. Free and open source.',
    ctaText: 'Get Privacy Checklist',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['National'],
      interests: ['Technology News', 'Online Security', 'Consumer Protection'],
      channels: ['Tech Forums', 'Social Feeds', 'Search Ads'],
      channelAllocations: { 'Tech Forums': 30, 'Social Feeds': 40, 'Search Ads': 30 },
      durationDays: 30,
    },
    durationDays: 30,
    fundingGoalCents: 150000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(150000).low,
    estReachHigh: estimateReachAtGoal(150000).high,
    raisedCents: 135000,
    backerCount: 64,
    publishedAt: '2026-03-03T10:00:00Z',
    fundingEndsAt: '2026-04-03T23:59:59Z',
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-12T09:00:00Z',
    isDemoData: true,
  },
  // Active Promoting campaign
  {
    id: 'camp-011',
    creatorId: 'usr-002',
    status: 'promoting',
    title: 'Pediatric Asthma Alert: Clean Air Action Week',
    category: 'Health',
    creatorName: 'Clean Air Kids Campaign',
    creatorType: 'Non-Profit / NGO',
    summary:
      'Live ad distribution campaign delivering air quality spike notifications directly to parents in industrial school zones.',
    coverUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Protecting Young Lungs in Real Time',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'When particulate matter PM2.5 exceeds healthy thresholds, school athletics should move indoors. Our automated digital display ads fire within 15 minutes of an official EPA sensor alert.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'CDC Pediatric Asthma & Airborne Particulate Study',
        url: 'https://cdc.gov/asthma-particulate',
        position: 1,
      },
    ],
    adHeadline: 'Air Quality Alert: Keep Asthmatic Kids Indoors',
    adDescription: 'Current PM2.5 reading in South Industrial Zone is elevated.',
    ctaText: 'Check Sensor Map',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['South Metro Industrial Corridor'],
      interests: ['Parenting', 'Pediatrics', 'Asthma & Allergy'],
      channels: ['Mobile Geo-Push', 'Weather Displays'],
      channelAllocations: { 'Mobile Geo-Push': 60, 'Weather Displays': 40 },
      durationDays: 14,
    },
    durationDays: 14,
    fundingGoalCents: 300000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(300000).low,
    estReachHigh: estimateReachAtGoal(300000).high,
    raisedCents: 300000, // 100% funded
    backerCount: 112,
    publishedAt: '2026-02-15T09:00:00Z',
    fundingEndsAt: '2026-03-01T23:59:59Z',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-03-10T12:00:00Z',
    isDemoData: true,
  },
  // Completed campaign with full distribution report
  {
    id: 'camp-012',
    creatorId: 'usr-001',
    status: 'completed',
    title: 'Solar Schools Initiative: Clean Power for 50 Classrooms',
    category: 'Environment',
    creatorName: 'Solar Transition Trust',
    creatorType: 'Non-Profit / NGO',
    summary:
      'Completed campaign that successfully ran targeted ads to pass the district green bond referendum with 68% voter approval.',
    coverUrl:
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'The Campaign Succeeded: Proposition 4 Passed!',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Thanks to community backers, our targeted informational ads reached 48,200 registered district voters over 2 weeks leading up to the election. The measure passed with decisive 68% support.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'County Board of Elections Official Results Certification',
        url: 'https://example.org/elections-certified-results',
        position: 1,
      },
    ],
    adHeadline: 'Vote Yes on Measure 4: Rooftop Solar for Kids',
    adDescription: 'Save our school district $300k every year in utility bills.',
    ctaText: 'See The Math',
    adAssets: [
      {
        id: 'ad-1',
        uri: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=800&q=80',
        type: 'image',
      },
    ],
    target: {
      locations: ['School District 42'],
      interests: ['Renewable Energy', 'Local Schools', 'Civic Voting'],
      channels: ['Local Social Feeds', 'Local News Sites'],
      channelAllocations: { 'Local Social Feeds': 60, 'Local News Sites': 40 },
      durationDays: 14,
    },
    durationDays: 14,
    fundingGoalCents: 200000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(200000).low,
    estReachHigh: estimateReachAtGoal(200000).high,
    raisedCents: 200000,
    backerCount: 78,
    publishedAt: '2026-01-15T09:00:00Z',
    fundingEndsAt: '2026-01-29T23:59:59Z',
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-02-05T12:00:00Z',
    isDemoData: true,
  },
  // Under review campaign
  {
    id: 'camp-013',
    creatorId: 'usr-005',
    status: 'submitted',
    title: 'Pedestrian Safety Overhaul: Zero Vision Crossings',
    category: 'Public Policy',
    creatorName: 'Safer Streets Now',
    creatorType: 'Community Group',
    summary:
      'Submitting public awareness campaign to install raised pedestrian crosswalks on dangerous arterial boulevards.',
    coverUrl:
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
    storyBlocks: [
      {
        id: 'b-1',
        type: 'heading',
        content: 'Zero Traffic Fatalities Is Achievable',
      },
      {
        id: 'b-2',
        type: 'paragraph',
        content:
          'Raised crosswalks and daylighting intersections reduce pedestrian injury rates by up to 50% according to urban transport studies.',
      },
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Federal Highway Administration Pedestrian Safety Countermeasures',
        url: 'https://highways.dot.gov/pedestrian-countermeasures',
        position: 1,
      },
    ],
    adHeadline: 'Make Our School Crossings Safe',
    adDescription: 'Support raised crosswalks at 5 critical intersections.',
    ctaText: 'Sign Citizen Petition',
    adAssets: [],
    target: {
      locations: ['Metro North Corridor'],
      interests: ['Pedestrian Safety', 'Bicycle Advocacy'],
      channels: ['Social Feed'],
      channelAllocations: { 'Social Feed': 100 },
      durationDays: 20,
    },
    durationDays: 20,
    fundingGoalCents: 100000,
    goalSetBy: 'creator',
    estReachLow: estimateReachAtGoal(100000).low,
    estReachHigh: estimateReachAtGoal(100000).high,
    raisedCents: 0,
    backerCount: 0,
    createdAt: '2026-03-11T14:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z',
    isDemoData: true,
  },
];
