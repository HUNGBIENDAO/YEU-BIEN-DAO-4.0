export interface Question {
  id: string;
  questionVi: string;
  questionEn: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  titleVi: string;
  titleEn: string;
  videoId: string;
  duration: string;
  grade: '6' | '7' | '8' | '9' | 'all';
  subjectVi: string;
  subjectEn: string;
  channel: string;
  summaryVi: {
    lead: string;
    keyPoints: string[];
    maritimeTerms: { term: string; definition: string }[];
    historicalContext?: string;
    studentAction: string;
  };
  summaryEn: {
    lead: string;
    keyPoints: string[];
    maritimeTerms: { term: string; definition: string }[];
    historicalContext?: string;
    studentAction: string;
  };
  quiz: Question[];
  stemLab?: {
    type: 'hologram' | 'oceanCurrent' | 'coastalEcosystem';
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    descriptionEn: string;
    defaultSettings: Record<string, any>;
  };
}

export interface Chapter {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  lessonIds: string[];
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    titleVi: 'Kỷ niệm & Hành trình Biển đảo',
    titleEn: 'Anniversary & Maritime Expeditions',
    descriptionVi: 'Hành trình 10 năm kết nối thanh thiếu niên với biển trời Tổ quốc.',
    descriptionEn: 'A 10-year journey inspiring youth with national maritime heritage.',
    lessonIds: ['lesson-1', 'lesson-2'],
  },
  {
    id: 'chap-2',
    titleVi: 'Mạ Ngọc Biển Đảo 4.0 & Chủ quyền',
    titleEn: 'Emerald Plating 4.0 & Maritime Sovereignty',
    descriptionVi: 'Chuyển đổi số, công nghệ 4.0 trong giữ gìn và khẳng định chủ quyền.',
    descriptionEn: 'Digital transformation 4.0 in preserving and defending sovereignty.',
    lessonIds: ['lesson-3', 'lesson-baseline', 'lesson-dong-bien', 'lesson-4'],
  },
  {
    id: 'chap-3',
    titleVi: 'Địa lý Tự nhiên & Dòng hải lưu',
    titleEn: 'Physical Geography & Ocean Currents',
    descriptionVi: 'Quy luật tự nhiên của Biển Đông, dòng đối lưu và tài nguyên sinh thái.',
    descriptionEn: 'Natural laws of the East Sea, convection currents and marine ecosystems.',
    lessonIds: ['lesson-5', 'lesson-danang'],
  },
  {
    id: 'chap-4',
    titleVi: 'Góc STEM & 3D Hologram',
    titleEn: 'STEM Lab & 3D Hologram',
    descriptionVi: 'Chế tạo thiết bị quang học 3D mô phỏng sinh vật biển và phao tự động.',
    descriptionEn: 'Fabricating 3D optical devices to project marine fauna and smart buoys.',
    lessonIds: ['lesson-6'],
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    chapterId: 'chap-1',
    titleVi: 'Bài 1: Kỷ niệm 10 năm Teen yêu biển đảo',
    titleEn: 'Lesson 1: 10th Anniversary of Maritime Youth',
    videoId: 'P7jz8IYJaP8',
    duration: '14:20',
    grade: '8',
    subjectVi: 'Lịch sử & Hoạt động Trải nghiệm',
    subjectEn: 'History & Experiential Learning',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Bài học tổng kết chặng đường 10 năm lan tỏa tình yêu biển đảo quê hương đến hàng triệu thanh thiếu niên, khơi dậy tinh thần tự hào dân tộc và ý thức bảo vệ chủ quyền thiêng liêng.',
      keyPoints: [
        'Dấu ấn 10 năm của phong trào thanh thiếu niên hướng về biển đảo biên cương Tổ quốc.',
        'Sự kết nối giữa học sinh các vùng miền với cán bộ, chiến sĩ và nhân dân nơi đầu sóng ngọn gió.',
        'Vai trò của thế hệ trẻ trong việc học tập, rèn luyện để sẵn sàng cống hiến cho sự phát triển kinh tế biển bền vững.',
        'Ứng dụng các hình thức truyền thông đa phương tiện trực quan để giáo dục lòng yêu nước thời đại số.',
      ],
      maritimeTerms: [
        { term: 'Thềm lục địa (Continental Shelf)', definition: 'Vùng đáy biển và lòng đất dưới đáy biển mở rộng ra ngoài lãnh hải của quốc gia ven biển đến bờ ngoài của rìa lục địa.' },
        { term: 'Hải đăng Trường Sa', definition: 'Hệ thống đèn biển dẫn đường hàng hải quốc tế khẳng định chủ quyền pháp lý và hỗ trợ tàu bè qua lại an toàn.' },
      ],
      historicalContext: 'Phong trào "Teen yêu biển đảo" bắt đầu từ những dự án ngoại khóa nhỏ của học sinh THCS, phát triển thành mạng lưới học tập rộng khắp cả nước.',
      studentAction: 'Mỗi học sinh có thể trở thành một đại sứ truyền thông biển đảo qua các bài viết, dự án khoa học và việc bảo vệ môi trường bờ biển.',
    },
    summaryEn: {
      lead: 'This lesson reflects on the 10-year journey spreading love for Vietnam maritime heritage across millions of teens, fostering patriotic spirit and sovereignty awareness.',
      keyPoints: [
        'A decade milestone of youth-led movements directed towards remote frontiers and sacred islands.',
        'Bridging the gap between students across provinces and naval officers standing guard on frontier outposts.',
        'The role of Gen Z in mastering technology and marine science for sustainable blue economy growth.',
        'Leveraging multimedia storytelling to enrich patriotic civic education in the digital era.',
      ],
      maritimeTerms: [
        { term: 'Continental Shelf', definition: 'The seabed and subsoil extending beyond territorial waters to the outer edge of the continental margin.' },
        { term: 'Truong Sa Lighthouses', definition: 'Navigational beacons guiding international shipping lanes while affirming legitimate sovereign presence.' },
      ],
      historicalContext: 'Initiated as grassroot student clubs, the movement has grown into a nationwide educational interactive network.',
      studentAction: 'Every student can become a maritime ambassador through research essays, science fairs, and beach cleanup initiatives.',
    },
    quiz: [
      {
        id: 'q1-1',
        questionVi: 'Mục tiêu cốt lõi của hành trình 10 năm "Teen yêu biển đảo" là gì?',
        questionEn: 'What is the primary core objective of the 10-year "Maritime Youth" movement?',
        optionsVi: [
          'Tổ chức các chuyến du lịch biển thương mại giá rẻ',
          'Khơi dậy tình yêu quê hương, bồi dưỡng kiến thức chủ quyền và trách nhiệm công dân',
          'Đào tạo thủy thủ tàu viễn dương chuyên nghiệp',
          'Khai thác khoáng sản dưới đáy biển sâu',
        ],
        optionsEn: [
          'Organizing commercial discounted beach vacations',
          'Inspiring patriotism, maritime sovereignty awareness, and civic duty in youth',
          'Training professional deep-sea oceanic sailors',
          'Commercial mining of deep seabed mineral deposits',
        ],
        correctIndex: 1,
        explanationVi: 'Hành trình 10 năm tập trung vào giáo dục nhận thức, tinh thần trách nhiệm và lòng yêu nước thông qua các hoạt động trải nghiệm thực tế.',
        explanationEn: 'The movement focuses on education, responsibility, and patriotism through authentic hands-on experiential projects.',
      },
      {
        id: 'q1-2',
        questionVi: 'Hải đăng tại các đảo thuộc quần đảo Trường Sa đóng vai trò quan trọng nào?',
        questionEn: 'What critical role do lighthouses on the Spratly (Truong Sa) Islands play?',
        optionsVi: [
          'Chỉ dùng để trang trí cảnh quan du lịch',
          'Dẫn đường hàng hải quốc tế an toàn và là cột mốc khẳng định chủ quyền quốc gia',
          'Là trạm phát sóng truyền hình thương mại',
          'Chỉ hoạt động vào các dịp lễ kỷ niệm trong năm',
        ],
        optionsEn: [
          'Solely used as decorative resort lighting',
          'Guiding international marine traffic safely and serving as sovereignty milestones',
          'Commercial television broadcast transmitters',
          'Only operational during national anniversary holidays',
        ],
        correctIndex: 1,
        explanationVi: 'Hệ thống hải đăng vừa phục vụ an toàn hàng hải quốc tế theo luật biển, vừa là biểu tượng chủ quyền hòa bình bền vững của Việt Nam.',
        explanationEn: 'Lighthouses ensure safe international navigation under maritime law while standing as enduring symbols of sovereign presence.',
      },
      {
        id: 'q1-3',
        questionVi: 'Thế hệ học sinh THCS có thể đóng góp thiết thực nhất cho biển đảo bằng hành động nào?',
        questionEn: 'How can secondary school students most effectively contribute to maritime conservation?',
        optionsVi: [
          'Không cần quan tâm vì biển đảo ở rất xa đất liền',
          'Học tập chăm chỉ, giữ sạch nguồn nước, giảm rác thải nhựa và lan tỏa kiến thức chính xác',
          'Tự đóng tàu đánh cá ra khơi một mình',
          'Chia sẻ các thông tin chưa kiểm chứng trên mạng xã hội',
        ],
        optionsEn: [
          'Disregard marine topics as islands are far from mainland cities',
          'Study diligently, protect waterways, reduce plastic waste, and share verified facts',
          'Build solitary fishing vessels and sail into open waters',
          'Share unverified viral rumors across social media',
        ],
        correctIndex: 1,
        explanationVi: 'Bảo vệ nguồn nước từ đất liền và nâng cao học vấn chính là nền tảng trực tiếp bảo vệ đại dương và xây dựng đất nước vững mạnh.',
        explanationEn: 'Protecting inland waterways from plastics and mastering scientific knowledge are the most direct contributions youth can make.',
      },
    ],
  },
  {
    id: 'lesson-2',
    chapterId: 'chap-1',
    titleVi: 'Bài 2: Hành trình Xanh Biển đảo',
    titleEn: 'Lesson 2: Green Maritime Expedition',
    videoId: 'qbWH1rn6oHE',
    duration: '18:05',
    grade: '7',
    subjectVi: 'Địa lý & Môi trường Biển',
    subjectEn: 'Geography & Marine Ecology',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Khám phá hệ sinh thái biển đảo trù phú của Việt Nam: rạn san hô, thảm cỏ biển, rừng ngập mặn cùng các giải pháp công nghệ xanh xử lý rác thải nhựa đại dương.',
      keyPoints: [
        'Đặc điểm đa dạng sinh học độc đáo của các vùng biển ven bờ và hải đảo xa xôi.',
        'Mối nguy hại của hạt vi nhựa (microplastics) đối với chuỗi thức ăn thủy sản.',
        'Mô hình kinh tế tuần hoàn và phong trào "Xanh hóa Trường Sa" với cây phong ba, bàng vuông.',
        'Vai trò của rừng ngập mặn như đê chắn sóng tự nhiên trước biến đổi khí hậu.',
      ],
      maritimeTerms: [
        { term: 'Rạn san hô (Coral Reefs)', definition: 'Hệ sinh thái biển có năng suất sinh học cao nhất hành tinh, là ngôi nhà của hơn 25% các loài sinh vật biển.' },
        { term: 'Hạt vi nhựa (Microplastics)', definition: 'Các mảnh nhựa có kích thước nhỏ hơn 5mm sinh ra do rác thải nhựa phân rã, gây ô nhiễm nguồn nước ngầm và hải sản.' },
      ],
      historicalContext: 'Cây Bàng vuông và Phong ba là biểu tượng của sức sống kiên cường nơi quần đảo Trường Sa, được chăm sóc qua nhiều thế hệ cán bộ chiến sĩ.',
      studentAction: 'Áp dụng nguyên tắc 5R (Reduce, Reuse, Recycle, Refuse, Rot) tại gia đình và trường học để giảm thiểu rác thải đổ ra đại dương.',
    },
    summaryEn: {
      lead: 'Explore Vietnam rich marine ecosystems: coral reefs, seagrass beds, mangrove forests, and green tech solutions against ocean microplastics.',
      keyPoints: [
        'Biodiversity hotspots across coastal estuaries and offshore archipelagos.',
        'The severe threat of microplastics entering aquatic and human food chains.',
        'Circular economy models and the greening movement with resilient island trees (Barringtonia asiatica).',
        'Mangroves functioning as natural living seawalls mitigating typhoons and coastal erosion.',
      ],
      maritimeTerms: [
        { term: 'Coral Reefs', definition: 'The most biodiverse marine ecosystems, supporting more than 25% of all marine species.' },
        { term: 'Microplastics', definition: 'Synthetic plastic particles smaller than 5mm resulting from degraded plastic waste, harming marine fauna.' },
      ],
      historicalContext: 'Square-fruit Bàng and Phong ba trees stand as living symbols of resilience across Spratly garrisons.',
      studentAction: 'Practice the 5R principles (Reduce, Reuse, Recycle, Refuse, Rot) to curb land-based plastics reaching our oceans.',
    },
    quiz: [
      {
        id: 'q2-1',
        questionVi: 'Hệ sinh thái nào được ví như "khu rừng nhiệt đới của đại dương" vì độ đa dạng sinh học cao nhất?',
        questionEn: 'Which ecosystem is referred to as the "rainforest of the ocean" due to its supreme biodiversity?',
        optionsVi: [
          'Đồng bằng sa mạc cát ven biển',
          'Rạn san hô ngầm dưới biển',
          'Vùng đáy bùn nước sâu không có ánh sáng',
          'Các cảng cá thương mại tập trung',
        ],
        optionsEn: [
          'Coastal arid sand flats',
          'Submerged coral reef formations',
          'Sunless abyssal deep mud plains',
          'Commercial industrial fishing ports',
        ],
        correctIndex: 1,
        explanationVi: 'Rạn san hô cung cấp nơi trú ngụ, thức ăn và bãi sinh sản cho hàng nghìn loài sinh vật biển quý giá.',
        explanationEn: 'Coral reefs host breeding grounds, nursery shelters, and food sources for thousands of essential marine organisms.',
      },
      {
        id: 'q2-2',
        questionVi: 'Loại cây nào là biểu tượng kiên cường chịu được bão gió và hơi muối mặn ở quần đảo Trường Sa?',
        questionEn: 'Which resilient tree is iconic for enduring sea salt sprays and harsh storms on Truong Sa islands?',
        optionsVi: [
          'Cây lúa nước và cây ngô',
          'Cây Bàng vuông và cây Phong ba',
          'Cây thông Đà Lạt',
          'Cây cao su nhiệt đới',
        ],
        optionsEn: [
          'Wet rice and sweet corn',
          'Square-fruit Bàng (Barringtonia) and Phong ba (Heliotropium)',
          'Highland Dalat pine trees',
          'Tropical rubber latex trees',
        ],
        correctIndex: 1,
        explanationVi: 'Cây Bàng vuông và Phong ba có bộ rễ khỏe, lá dày phủ sáp chịu được gió muối và sóng to gió lớn.',
        explanationEn: 'Square-fruit Bàng and Phong ba feature thick waxy foliage and anchoring root networks adapted to saline oceanic storms.',
      },
      {
        id: 'q2-3',
        questionVi: 'Hạt vi nhựa (microplastics) có kích thước tiêu chuẩn là bao nhiêu?',
        questionEn: 'What is the scientifically recognized threshold size for microplastics?',
        optionsVi: [
          'Lớn hơn 1 mét',
          'Nhỏ hơn 5 milimet (< 5mm)',
          'Chỉ nhìn thấy dưới kính hiển vi điện tử hạt nhân',
          'Kích thước bằng quả bóng rổ',
        ],
        optionsEn: [
          'Larger than 1 meter',
          'Smaller than 5 millimeters (< 5mm)',
          'Only visible under atomic electron microscopes',
          'The size of a regulation basketball',
        ],
        correctIndex: 1,
        explanationVi: 'Hạt vi nhựa được định nghĩa là các hạt nhựa tổng hợp có đường kính nhỏ hơn 5mm.',
        explanationEn: 'Microplastics are categorized as synthetic polymer particles measuring under 5 millimeters across.',
      },
    ],
  },
  {
    id: 'lesson-3',
    chapterId: 'chap-2',
    titleVi: 'Bài 3: Mạ ngọc Biển đảo 4.0',
    titleEn: 'Lesson 3: Emerald Plating 4.0 & Digital Sovereignty',
    videoId: 'Vl9K5xEONN8',
    duration: '21:15',
    grade: '9',
    subjectVi: 'STEM & Công nghệ Số Biển đảo',
    subjectEn: 'STEM & Digital Maritime Tech',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Ứng dụng công nghệ 4.0: Cảm biến IoT phao thông minh, ảnh vệ tinh viễn thám GIS, mô phỏng 3D Hologram và giải pháp chống ăn mòn "Mạ ngọc" cho công trình biển đảo.',
      keyPoints: [
        'Khái niệm "Mạ ngọc": Bảo vệ và tôn vinh giá trị đảo ngọc Việt Nam bằng tri thức và công nghệ vật liệu mới.',
        'Hệ thống trạm phao cảm biến IoT quan trắc độ mặn, nhiệt độ và chiều cao sóng theo thời gian thực.',
        'Bản đồ số GIS hỗ trợ ngư dân đánh bắt an toàn và khẳng định tọa độ chủ quyền hợp pháp.',
        'Mô hình lăng kính Hologram 4 chiều giúp hiển thị trực quan bản đồ biển đảo và dữ liệu hải dương học.',
      ],
      maritimeTerms: [
        { term: 'Hệ thống GIS Biển (Marine GIS)', definition: 'Hệ thống thông tin địa lý thu thập, phân tích và trực quan hóa dữ liệu không gian biển, đường bờ và tọa độ đảo.' },
        { term: 'IoT Quan trắc Hải dương', definition: 'Mạng lưới các cảm biến tự động thu thập thông số môi trường nước biển và truyền dữ liệu qua vệ tinh.' },
      ],
      historicalContext: 'Trong kỷ nguyên số, việc số hóa tư liệu lịch sử châu bản, mộc bản triều Nguyễn về Hoàng Sa - Trường Sa là chứng cứ pháp lý đanh thép.',
      studentAction: 'Thực hành lập trình vi điều khiển đo chất lượng nước biển hoặc thiết kế mô hình kim tự tháp hologram quang học.',
    },
    summaryEn: {
      lead: 'Harnessing Industry 4.0: IoT smart buoys, GIS satellite remote sensing, 3D Hologram optics, and advanced anti-corrosion marine engineering.',
      keyPoints: [
        'The concept of "Emerald Plating": Preserving and adorning our pristine islands with cutting-edge materials and green science.',
        'IoT telemetry buoys measuring salinity, sea surface temperature, and wave height in real time.',
        'Marine GIS spatial mapping guiding fishermen safely while asserting sovereign maritime coordinates.',
        'Pyramidal 4-view Holographic prisms rendering 3D bathymetric ocean depth charts and marine life.',
      ],
      maritimeTerms: [
        { term: 'Marine GIS', definition: 'Geographic Information Systems analyzing spatial oceanographic coordinates, maritime boundaries, and sea floor relief.' },
        { term: 'Ocean IoT Telemetry', definition: 'Automated sensor grids continuously monitoring water quality and transmitting parameters via satellite.' },
      ],
      historicalContext: 'Digitizing imperial court archives (Châu bản, Mộc bản) provides unassailable legal proof of Vietnamese sovereignty over Paracel and Spratly.',
      studentAction: 'Build an optical 3D hologram pyramid or code an Arduino/micro:bit water salinity probe in your school STEM club.',
    },
    quiz: [
      {
        id: 'q3-1',
        questionVi: 'Công nghệ nào sau đây giúp các nhà khoa học theo dõi nhiệt độ mặt nước biển và cảnh báo bão từ xa?',
        questionEn: 'Which technology empowers scientists to monitor sea surface temperature and predict typhoons remotely?',
        optionsVi: [
          'Vệ tinh viễn thám và mạng lưới phao quan trắc IoT truyền tin vệ tinh',
          'Chỉ dùng kính viễn vọng quang học đặt trên bờ',
          'Đo bằng nhiệt kế thủy ngân thủ công mỗi năm một lần',
          'Quan sát bằng mắt thường từ bãi biển',
        ],
        optionsEn: [
          'Satellite remote sensing and ocean IoT telemetry sensor buoys',
          'Optical shore-based ground telescopes only',
          'Manual mercury thermometer dipping once a year',
          'Naked-eye observation from coastal sandy beaches',
        ],
        correctIndex: 0,
        explanationVi: 'Sự kết hợp giữa vệ tinh quan trắc địa tĩnh và phao biển IoT cung cấp dữ liệu liên tục 24/7 với độ chính xác cao.',
        explanationEn: 'The synergy of geostationary earth satellites and automated ocean buoys delivers continuous 24/7 telemetry feeds.',
      },
      {
        id: 'q3-2',
        questionVi: 'Trong dự án "Mạ ngọc Biển đảo 4.0", yếu tố nào đóng vai trò cốt lõi?',
        questionEn: 'What constitutes the foundational core of the "Emerald Plating 4.0" initiative?',
        optionsVi: [
          'Sơn màu xanh lên tất cả các tảng đá bờ biển',
          'Kết hợp khoa học công nghệ, giáo dục số và tinh thần trách nhiệm bảo vệ chủ quyền biển đảo',
          'Xây dựng các khách sạn cao tầng bê tông trên rạn san hô',
          'Chặn các dòng hải lưu tự nhiên',
        ],
        optionsEn: [
          'Painting coastal boulder rocks with green enamel',
          'Fusing STEM innovation, digital education, and patriotic civic responsibility',
          'Constructing commercial concrete hotels right upon coral reef flats',
          'Damming natural ocean currents',
        ],
        correctIndex: 1,
        explanationVi: '"Mạ ngọc" là ẩn dụ cho việc dùng tri thức khoa học, công nghệ hiện đại và tình yêu đất nước để giữ gìn biển đảo quê hương bền vững.',
        explanationEn: '"Emerald Plating" metaphorically refers to enriching and safeguarding our maritime domain through science, education, and duty.',
      },
      {
        id: 'q3-3',
        questionVi: 'Kim tự tháp Hologram 4 chiều hoạt động dựa trên nguyên lý quang học nào?',
        questionEn: 'On which optical principle does a 4-face Hologram pyramid function?',
        optionsVi: [
          'Hiện tượng phản xạ ánh sáng qua mặt nghiêng 45 độ tạo ảnh ảo lơ lửng trong không gian',
          'Tạo ra phản ứng nhiệt hạch phát sáng',
          'Sử dụng nam châm vĩnh cửu đẩy các tia sáng',
          'Khúc xạ ánh sáng qua gương lồi làm biến dạng hình ảnh',
        ],
        optionsEn: [
          'Light reflection at a 45-degree angle projecting a floating virtual image in 3D space',
          'Generating a nuclear fusion light emission',
          'Using neodymium magnets to deflect optical photons',
          'Extreme light distortion through a convex rear-view mirror',
        ],
        correctIndex: 0,
        explanationVi: 'Lăng kính 4 mặt nghiêng 45° phản chiếu hình ảnh từ 4 hướng trên màn hình, hội tụ tại trung tâm tạo cảm giác vật thể 3D nổi lơ lửng.',
        explanationEn: 'The 45-degree angled transparent faces reflect 4 symmetrical projections inward, yielding a convincing floating 3D illusion.',
      },
    ],
    stemLab: {
      type: 'hologram',
      titleVi: 'Mô phỏng Kim tự tháp Hologram 3D',
      titleEn: '3D Hologram Pyramid Optical Simulator',
      descriptionVi: 'Trực quan hóa nguyên lý lăng kính phản xạ 4 hướng chiếu hình mẫu sinh vật biển và biểu tượng hải đăng 4.0.',
      descriptionEn: 'Simulate the 4-quadrant reflection optics projecting floating marine life and 4.0 lighthouse models.',
      defaultSettings: {
        rotationSpeed: 1,
        modelType: 'turtle',
        brightness: 90,
      },
    },
  },
  {
    id: 'lesson-baseline',
    chapterId: 'chap-2',
    titleVi: 'Bài 4: Baseline trong mắt em - Đường cơ sở & Không gian chủ quyền',
    titleEn: 'Lesson 4: Baseline Through My Eyes - Baselines & Maritime Space',
    videoId: 'zunqfsa8LVE',
    duration: '11:45',
    grade: '8',
    subjectVi: 'Địa lý Biển đảo & Giáo dục Chủ quyền',
    subjectEn: 'Maritime Geography & Sovereignty Education',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Khám phá khái niệm "Đường cơ sở" (Baseline) dưới góc nhìn trẻ trung, sinh động của các bạn học sinh: từ đường ngấn nước thủy triều thấp nhất đến hệ thống đường cơ sở thẳng theo Tuyên bố năm 1982 của Chính phủ Việt Nam, làm điểm tựa phân định các vùng biển thiêng liêng của Tổ quốc.',
      keyPoints: [
        'Khái niệm cốt lõi về Đường cơ sở (Baseline): Cột mốc pháp lý khởi đầu để tính chiều rộng của lãnh hải và các vùng biển khác.',
        'Hai phương pháp xác định đường cơ sở theo UNCLOS 1982: Đường cơ sở thông thường (ngấn nước triều kiệt) và Đường cơ sở thẳng (nối các mũi đất, đảo ven bờ).',
        'Hệ thống đường cơ sở thẳng của Việt Nam (1982): Nối 11 điểm mốc từ điểm A1 (Hòn Nhạn - Thổ Chu) qua Côn Đảo, Phú Quý đến điểm A11 (đảo Cồn Cỏ, Quảng Trị).',
        'Quy chế pháp lý của Nội thủy (Internal Waters): Toàn bộ vùng nước nằm phía trong đường cơ sở thuộc chủ quyền hoàn toàn, tuyệt đối như lãnh thổ đất liền.',
        'Góc nhìn thế hệ trẻ: Ứng dụng bản đồ số GIS, tọa độ địa lý và hình ảnh trực quan để ghi nhớ và lan tỏa thông điệp chủ quyền biển đảo.',
      ],
      maritimeTerms: [
        { term: 'Đường cơ sở thẳng (Straight Baseline)', definition: 'Đường nối các điểm mốc thích hợp tại ngấn nước triều kiệt của các đảo ven bờ hoặc mũi đất nhô ra biển để phân định nội thủy và lãnh hải.' },
        { term: 'Nội thủy (Internal Waters)', definition: 'Vùng nước nằm hoàn toàn phía trong đường cơ sở, chịu quyền tài phán và chủ quyền tối cao, trọn vẹn của quốc gia ven biển.' },
        { term: 'Mốc A1 (Hòn Nhạn - Kiên Giang)', definition: 'Điểm khởi đầu ở vùng biển Tây Nam trong hệ thống 11 điểm mốc đường cơ sở thẳng của Việt Nam.' },
      ],
      historicalContext: 'Ngày 12 tháng 11 năm 1982, Chính phủ Việt Nam ra Tuyên bố xác lập đường cơ sở thẳng ven bờ lục địa, tạo cơ sở pháp lý vững chắc bảo vệ quyền và lợi ích hợp pháp trên biển.',
      studentAction: 'Thực hành xác định tọa độ các điểm mốc đường cơ sở trên bản đồ địa lý và chia sẻ thông điệp "Baseline trong mắt em" tới bạn bè trường lớp.',
    },
    summaryEn: {
      lead: 'Explore the vital concept of "Baselines" through the vibrant, creative lens of youth: from low-water tide lines to Vietnam straight baseline system declared in 1982, laying the legal foundation for our sacred maritime boundaries.',
      keyPoints: [
        'Core concept of Maritime Baselines: The foundational legal baseline from which the outer limits of territorial seas are measured.',
        'Two methods recognized under UNCLOS 1982: Normal baselines (low-water mark) and straight baselines (connecting outermost capes and offshore islands).',
        'Vietnam Straight Baseline Grid (1982): Connecting 11 reference basepoints from point A1 (Hon Nhan - Tho Chu) through Con Dao, Phu Quy to point A11 (Con Co Island).',
        'Legal status of Internal Waters: All maritime waters landward of the baseline fall under complete, absolute territorial sovereignty.',
        'Youth perspective: Leveraging GIS digital mapping and visual storytelling to master and champion national maritime sovereignty.',
      ],
      maritimeTerms: [
        { term: 'Straight Baseline', definition: 'A system of straight lines connecting appropriate basepoints along the outermost points of coastal islands or headlands.' },
        { term: 'Internal Waters', definition: 'Waters situated landward of the baseline, subject to the plenary sovereignty of the coastal State.' },
        { term: 'Basepoint A1 (Hon Nhan)', definition: 'The southwest anchor basepoint of Vietnam straight baseline system, located in the Tho Chu archipelago.' },
      ],
      historicalContext: 'On November 12, 1982, the Government of Vietnam formally issued the Declaration on the Baseline of Vietnam territorial waters in full conformity with international maritime law.',
      studentAction: 'Plot Vietnam 11 baseline coordinates on digital study maps and share the "Baseline Through My Eyes" educational campaign with peers.',
    },
    quiz: [
      {
        id: 'qb-1',
        questionVi: 'Đường cơ sở (Baseline) giữ vai trò pháp lý nền tảng nào trong luật biển quốc tế UNCLOS 1982 và Luật Biển Việt Nam?',
        questionEn: 'What foundational legal role does the Baseline serve under UNCLOS 1982 and the Law of the Sea of Vietnam?',
        optionsVi: [
          'Chỉ dùng để phân làn cho tàu thuyền chở khách du lịch',
          'Là đường mốc căn cứ để tính chiều rộng của lãnh hải và các vùng biển khác thuộc chủ quyền, quyền chủ quyền',
          'Là độ sâu tối đa mà tàu lặn được phép hoạt động',
          'Là đường phân chia ranh giới đất liền giữa các tỉnh thành phố',
        ],
        optionsEn: [
          'Solely designated for tourist passenger boat lane routing',
          'The foundational datum line from which the breadth of territorial seas and maritime zones is measured',
          'The maximum operational depth permitted for submarines',
          'The terrestrial administrative boundary line between coastal provinces',
        ],
        correctIndex: 1,
        explanationVi: 'Đường cơ sở là vạch chuẩn pháp lý xuất phát để từ đó đo ra lãnh hải 12 hải lý, vùng tiếp giáp 24 hải lý và vùng đặc quyền kinh tế 200 hải lý.',
        explanationEn: 'The baseline is the legal datum from which the 12-NM territorial sea, 24-NM contiguous zone, and 200-NM exclusive economic zone are officially measured.',
      },
      {
        id: 'qb-2',
        questionVi: 'Vùng nước nằm hoàn toàn ở phía trong của đường cơ sở và tiếp giáp với bờ biển có quy chế pháp lý là gì?',
        questionEn: 'What is the legal status of waters situated landward of the baseline bordering the coastline?',
        optionsVi: [
          'Vùng biển quốc tế tự do cho mọi tàu thuyền qua lại không cần phép',
          'Vùng đặc quyền kinh tế (EEZ)',
          'Nội thủy (Internal Waters) - thuộc chủ quyền hoàn toàn, tuyệt đối như lãnh thổ đất liền',
          'Thềm lục địa sâu',
        ],
        optionsEn: [
          'High seas international waters open to unconditional navigation',
          'Exclusive Economic Zone (EEZ)',
          'Internal Waters - subject to complete, absolute sovereignty identical to land territory',
          'Deep ocean continental shelf',
        ],
        correctIndex: 2,
        explanationVi: 'Nội thủy là vùng nước nằm bên trong đường cơ sở. Quốc gia ven biển có chủ quyền hoàn toàn, tuyệt đối và trọn vẹn đối với nội thủy như đối với lãnh thổ trên đất liền.',
        explanationEn: 'Internal waters lie landward of the baseline; the coastal state exercises sovereign jurisdiction as complete and absolute as over its land territory.',
      },
      {
        id: 'qb-3',
        questionVi: 'Hệ thống đường cơ sở thẳng của Việt Nam công bố ngày 12/11/1982 nối liền bao nhiêu điểm mốc?',
        questionEn: 'How many basepoints comprise Vietnam straight baseline system declared on November 12, 1982?',
        optionsVi: [
          '3 điểm mốc',
          '11 điểm mốc (từ A1 - Hòn Nhạn đến A11 - Đảo Cồn Cỏ)',
          '50 điểm mốc',
          'Chỉ có 1 điểm duy nhất ngoài khơi',
        ],
        optionsEn: [
          '3 basepoints',
          '11 basepoints (from A1 - Hon Nhan to A11 - Con Co Island)',
          '50 basepoints',
          'Only one offshore basepoint',
        ],
        correctIndex: 1,
        explanationVi: 'Tuyên bố năm 1982 của Chính phủ Việt Nam xác định 11 điểm mốc từ A1 (Hòn Nhạn thuộc quần đảo Thổ Chu, Kiên Giang) kéo dài đến A11 (đảo Cồn Cỏ, Quảng Trị).',
        explanationEn: 'Vietnam 1982 Government Declaration specifies 11 baseline coordinates spanning from point A1 (Hon Nhan, Tho Chu archipelago) up to A11 (Con Co Island, Quang Tri).',
      },
    ],
  },
  {
    id: 'lesson-dong-bien',
    chapterId: 'chap-2',
    titleVi: 'Bài 5: Dòng biển trong mắt em - Hoàn lưu Biển Đông & Hải trình kết nối',
    titleEn: 'Lesson 5: Ocean Currents Through My Eyes - East Sea Circulation & Seafaring Routes',
    videoId: '6J8GSqP_-Kw',
    duration: '13:10',
    grade: '7',
    subjectVi: 'Địa lý Tự nhiên & Hoạt động Hàng hải',
    subjectEn: 'Physical Geography & Maritime Navigation',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Khám phá bức tranh kỳ vĩ của các dòng hải lưu Biển Đông dưới góc nhìn sinh động của học sinh: sự vận động không ngừng của các dòng biển nóng, dòng biển lạnh theo chu kỳ gió mùa, gắn liền với kinh nghiệm đi biển của cha ông và bảo vệ chủ quyền biển đảo quê hương.',
      keyPoints: [
        'Quy luật hoàn lưu khép kín của Biển Đông: Mùa gió Đông Bắc (dòng chảy ven bờ chảy mạnh về phía Nam) và Mùa gió Tây Nam (dòng chảy ngược lên phía Bắc).',
        'Mối liên hệ mật thiết giữa các dòng biển và ngư trường hải sản: Dòng biển mang theo sinh vật phù du và điều hòa nhiệt độ nước, tạo nên các bãi cá lớn quanh Hoàng Sa, Trường Sa và vùng biển Ninh Thuận - Bình Thuận.',
        'Dòng biển trong hải trình lịch sử: Các hải đội Hoàng Sa, Bắc Hải thời Nguyễn đã tận dụng dòng hải lưu và hướng gió thuận để vượt sóng ra khơi đo đạc, cắm mốc chủ quyền.',
        'Công nghệ 4.0 theo dõi dòng biển: Ứng dụng phao trôi tự do viễn thám vệ tinh (Argos drifters) và bản đồ nhiệt độ bề mặt biển (SST) phục vụ tìm kiếm cứu nạn và quốc phòng biển đảo.',
      ],
      maritimeTerms: [
        { term: 'Hoàn lưu Biển Đông (East Sea Gyre)', definition: 'Hệ thống các dòng hải lưu tuần hoàn quy mô lớn trên Biển Đông bị chi phối bởi chế độ gió mùa nhiệt đới châu Á và lực Coriolis.' },
        { term: 'Phao trôi hải dương học (Ocean Drifter)', definition: 'Thiết bị tự hành thả trôi theo dòng nước ngầm và tầng mặt, truyền dữ liệu tọa độ, nhiệt độ và độ mặn qua vệ tinh viễn thông.' },
        { term: 'Hải đội Hoàng Sa', definition: 'Đội dân binh do các triều đại phong kiến Việt Nam thành lập từ thế kỷ 17, tận dụng dòng gió mùa để ra cắm mốc, lập miếu và xác lập chủ quyền Hoàng Sa - Trường Sa.' },
      ],
      historicalContext: 'Tài liệu cổ "Phủ biên tạp lục" của Lê Quý Đôn (1776) đã ghi chép việc thuyền câu của hải đội Hoàng Sa nương theo dòng hải lưu và ngọn gió mùa tháng ba âm lịch để ra đảo làm nhiệm vụ thu lượm hải vật và cắm mốc.',
      studentAction: 'Sử dụng mô hình mô phỏng dòng biển trong tab STEM để thử nghiệm việc thay đổi mùa gió, quan sát sự đảo chiều của dòng hải lưu ven bờ Việt Nam.',
    },
    summaryEn: {
      lead: 'Discover the fascinating rhythm of East Sea ocean currents through the eyes of students: warm and cold hydrodynamic flows driven by seasonal monsoon reversals, deeply rooted in centuries of ancestral navigation and sovereign marine heritage.',
      keyPoints: [
        'Closed circulation gyre of the East Sea: Southward coastal stream during the Northeast winter monsoon and northward surge during the Southwest summer monsoon.',
        'Symbiosis between ocean currents and rich fishing banks: Currents transport phytoplankton and regulate temperatures, nurturing abundant pelagic fisheries near Paracel and Spratly.',
        'Currents in historical seafaring: Ancient Vietnamese naval fleets harnessed monsoon wind-driven currents to navigate open waters, erect markers, and enforce sovereignty.',
        'Industry 4.0 ocean observation: Utilizing satellite-tracked surface drifters and Sea Surface Temperature (SST) telemetry for maritime search, rescue, and security.',
      ],
      maritimeTerms: [
        { term: 'East Sea Gyre', definition: 'The large-scale circulating ocean current system in the South China / East Sea shaped by Asian monsoons and Coriolis deflection.' },
        { term: 'Ocean Drifter Buoy', definition: 'An autonomous floating probe carried by water currents, transmitting GPS coordinates, temperature, and salinity via satellite.' },
        { term: 'Hoang Sa Flotilla', definition: 'The historical civil-naval fleet established by Vietnamese dynasties since the 17th century to patrol, chart, and affirm sovereignty over Paracel and Spratly.' },
      ],
      historicalContext: 'The 1776 historical chronicle "Phu Bien Tap Luc" by scholar Le Quy Don records how Hoang Sa flotillas sailed offshore in the third lunar month using favorable wind currents to fulfill state maritime duties.',
      studentAction: 'Engage with the interactive monsoon current simulator in the STEM Lab tab to witness seasonal current reversals along Vietnam coast.',
    },
    quiz: [
      {
        id: 'qdb-1',
        questionVi: 'Yếu tố tự nhiên chủ đạo nào quyết định sự đổi chiều của các dòng hải lưu tầng mặt trên Biển Đông theo mùa trong năm?',
        questionEn: 'What primary environmental factor drives the seasonal reversal of surface ocean currents in the East Sea?',
        optionsVi: [
          'Sự di chuyển của các rạn san hô dưới đáy biển',
          'Chế độ gió mùa (Gió mùa Đông Bắc vào mùa đông và Gió mùa Tây Nam vào mùa hè)',
          'Ánh sáng của các ngọn hải đăng ven bờ',
          'Hoạt động của các tàu đánh cá công nghiệp',
        ],
        optionsEn: [
          'The seasonal movement of deep-sea coral reef structures',
          'The monsoon wind regime (Northeast monsoon in winter and Southwest monsoon in summer)',
          'Optical light emissions from coastal mainland lighthouses',
          'Industrial commercial shipping traffic',
        ],
        correctIndex: 1,
        explanationVi: 'Gió mùa là động lực chính tạo nên dòng hải lưu tầng mặt; gió mùa Đông Bắc đẩy dòng nước xuôi về phía Nam, còn gió mùa Tây Nam đẩy nước ngược lên phía Bắc.',
        explanationEn: 'Monsoon winds are the chief mechanical engine driving surface currents; Northeast winds push waters southward, whereas Southwest winds drive them northward.',
      },
      {
        id: 'qdb-2',
        questionVi: 'Hải đội Hoàng Sa thời các chúa Nguyễn và triều Nguyễn thường chọn thời điểm nào trong năm để ra khơi làm nhiệm vụ cắm mốc chủ quyền?',
        questionEn: 'At what time of the year did the historical Hoang Sa flotilla traditionally set sail to enforce sovereignty over Paracel and Spratly?',
        optionsVi: [
          'Tháng Chạp vào giữa mùa đông gió bão lớn',
          'Tháng Ba âm lịch khi gió mùa chuyển mùa, biển êm và dòng chảy thuận lợi',
          'Chỉ đi vào ban đêm không cần quan sát hướng gió',
          'Bất kỳ ngày nào không cần tính toán quy luật thời tiết',
        ],
        optionsEn: [
          'Mid-winter in the twelfth lunar month during violent stormy seas',
          'The third lunar month during transitional calm seas with favorable wind currents',
          'Solely at night without tracking oceanic current vectors',
          'Any random date without observing meteorological cycles',
        ],
        correctIndex: 1,
        explanationVi: 'Cha ông ta đã đúc kết kinh nghiệm "tháng ba đi biển, tháng tám về", tận dụng thời điểm biển lặng và ngọn gió thuận của tháng 3 âm lịch để đi thuyền nan, thuyền câu ra Hoàng Sa, Trường Sa.',
        explanationEn: 'Ancient Vietnamese navigators sailed in the 3rd lunar month when calm seas and favorable wind currents enabled wooden boats to reach distant frontiers safely.',
      },
      {
        id: 'qdb-3',
        questionVi: 'Thiết bị công nghệ 4.0 nào hiện nay giúp các nhà hải dương học Việt Nam theo dõi đường đi của dòng biển theo thời gian thực?',
        questionEn: 'Which Industry 4.0 instrument enables modern marine scientists to monitor ocean current drift paths in real time?',
        optionsVi: [
          'Thước dây đo vải thủ công',
          'Phao trôi hải dương học tự hành truyền dữ liệu GPS và cảm biến qua vệ tinh (Argos/GPS Drifters)',
          'Kính lúp phóng đại quang học',
          'Mạng lưới dây cáp kéo cố định dưới đáy biển',
        ],
        optionsEn: [
          'Manual fabric measuring tapes',
          'Autonomous oceanographic surface drifter buoys transmitting GPS and sensor telemetry via satellite',
          'Optical tabletop magnifying glasses',
          'Permanent undersea steel tow ropes anchored to the shore',
        ],
        correctIndex: 1,
        explanationVi: 'Phao trôi hải dương học hiện đại trôi tự do theo dòng nước và truyền liên tục tọa độ vệ tinh, nhiệt độ và độ mặn về trung tâm khí tượng thủy văn.',
        explanationEn: 'Autonomous satellite ocean drifters float with current flows, relaying continuous real-time coordinates, temperatures, and salinity readings.',
      },
    ],
    stemLab: {
      type: 'oceanCurrent',
      titleVi: 'Mô phỏng Dòng hải lưu & Hoàn lưu Biển Đông',
      titleEn: 'East Sea Ocean Circulation Lab',
      descriptionVi: 'Trực quan hóa hướng chảy của các dòng biển tầng mặt theo mùa gió và tác động đến hải trình của ngư dân.',
      descriptionEn: 'Visualize surface ocean current directions under monsoon seasons and their impact on navigation.',
      defaultSettings: {
        monsoonSeason: 'northeast',
        speedKmH: 30,
        showUpwelling: true,
      },
    },
  },
  {
    id: 'lesson-4',
    chapterId: 'chap-2',
    titleVi: 'Bài 6: Cột mốc chủ quyền & Pháp lý Biển UNCLOS 1982',
    titleEn: 'Lesson 6: Sovereignty Milestones & UNCLOS 1982 Law',
    videoId: 'qbWH1rn6oHE',
    duration: '16:40',
    grade: '8',
    subjectVi: 'Lịch sử & Giáo dục Công dân',
    subjectEn: 'History & Civics',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Nắm vững các vùng biển của Việt Nam theo Công ước Liên Hợp Quốc về Luật Biển (UNCLOS 1982) và Luật Biển Việt Nam 2012: Nội thủy, Lãnh hải, Vùng tiếp giáp, Vùng đặc quyền kinh tế (EEZ) và Thềm lục địa.',
      keyPoints: [
        'Cấu trúc pháp lý 5 vùng biển theo UNCLOS 1982 mà học sinh THCS cần nắm vững.',
        'Lãnh hải rộng 12 hải lý là ranh giới chủ quyền quốc gia tối thượng trên biển.',
        'Vùng đặc quyền kinh tế (EEZ) rộng 200 hải lý trao cho quốc gia quyền chủ quyền đối với tài nguyên.',
        'Các bằng chứng lịch sử pháp lý khẳng định chủ quyền không tranh cãi đối với hai quần đảo Hoàng Sa và Trường Sa.',
      ],
      maritimeTerms: [
        { term: 'Đường cơ sở (Baseline)', definition: 'Đường ranh giới dùng làm căn cứ để tính chiều rộng lãnh hải và các vùng biển khác.' },
        { term: 'Hải lý (Nautical Mile)', definition: 'Đơn vị đo khoảng cách hàng hải quốc tế, 1 hải lý = 1.852 mét (1,852 km).' },
      ],
      historicalContext: 'Việt Nam là một trong những quốc gia tiên phong ký kết và phê chuẩn UNCLOS 1982, kiên định giải quyết tranh chấp bằng biện pháp hòa bình.',
      studentAction: 'Ghi nhớ công thức và ranh giới 5 vùng biển để tuyên truyền kiến thức pháp luật cho gia đình và bạn bè.',
    },
    summaryEn: {
      lead: 'Master the 5 maritime zones under UNCLOS 1982 and the 2012 Law of the Sea of Vietnam: Internal Waters, Territorial Sea, Contiguous Zone, EEZ, and Continental Shelf.',
      keyPoints: [
        'The 5-tier legal zoning of maritime territory every student should master.',
        'The 12-nautical-mile Territorial Sea marks sovereign national frontier borders.',
        'The 200-nautical-mile Exclusive Economic Zone (EEZ) grants sovereign rights over natural resources.',
        'Historical archives upholding legitimate sovereign titles over Paracel (Hoàng Sa) and Spratly (Trường Sa).',
      ],
      maritimeTerms: [
        { term: 'Baseline', definition: 'The reference low-water line or straight baseline from which territorial maritime zones are measured.' },
        { term: 'Nautical Mile (NM)', definition: 'International maritime distance standard: 1 nautical mile = 1,852 meters (approx 1.15 miles).' },
      ],
      historicalContext: 'Vietnam actively signed and ratified UNCLOS 1982, consistently championing peaceful dispute resolution based on international law.',
      studentAction: 'Commit the 5 maritime zones to memory and share legal knowledge confidently in class discussions.',
    },
    quiz: [
      {
        id: 'q4-1',
        questionVi: 'Theo UNCLOS 1982, chiều rộng lãnh hải của quốc gia ven biển tính từ đường cơ sở là bao nhiêu?',
        questionEn: 'Under UNCLOS 1982, what is the breadth of the Territorial Sea measured from the baseline?',
        optionsVi: ['3 hải lý', '12 hải lý (khoảng 22,2 km)', '24 hải lý', '200 hải lý'],
        optionsEn: ['3 nautical miles', '12 nautical miles (~22.2 km)', '24 nautical miles', '200 nautical miles'],
        correctIndex: 1,
        explanationVi: 'Lãnh hải có chiều rộng 12 hải lý tính từ đường cơ sở, là lãnh thổ thiêng liêng của quốc gia ven biển.',
        explanationEn: 'The Territorial Sea extends up to 12 nautical miles from the baseline, subject to full territorial sovereignty.',
      },
      {
        id: 'q4-2',
        questionVi: 'Vùng đặc quyền kinh tế (EEZ) của một quốc gia có phạm vi tính từ đường cơ sở là bao nhiêu?',
        questionEn: 'How far does a nation Exclusive Economic Zone (EEZ) extend from the baseline?',
        optionsVi: ['12 hải lý', '24 hải lý', '200 hải lý (khoảng 370,4 km)', 'Không có giới hạn'],
        optionsEn: ['12 nautical miles', '24 nautical miles', '200 nautical miles (~370.4 km)', 'No limit whatsoever'],
        correctIndex: 2,
        explanationVi: 'Vùng đặc quyền kinh tế (EEZ) mở rộng tới 200 hải lý tính từ đường cơ sở, quốc gia có quyền chủ quyền về kinh tế và khai thác tài nguyên.',
        explanationEn: 'The EEZ extends out to 200 nautical miles, where coastal states exercise sovereign rights over natural marine resources.',
      },
    ],
  },
  {
    id: 'lesson-5',
    chapterId: 'chap-3',
    titleVi: 'Bài 7: Dòng hải lưu Biển Đông & Chế độ gió mùa',
    titleEn: 'Lesson 7: East Sea Ocean Currents & Monsoon Regimes',
    videoId: 'P7jz8IYJaP8',
    duration: '15:50',
    grade: '6',
    subjectVi: 'Địa lý Tự nhiên Lớp 6 & 8',
    subjectEn: 'Physical Geography (Grade 6 & 8)',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Khám phá quy luật dòng chảy hải lưu tầng mặt của Biển Đông: sự đổi chiều ngoạn mục theo mùa gió Đông Bắc và Tây Nam, ảnh hưởng đến thời tiết và ngư trường.',
      keyPoints: [
        'Mùa gió Đông Bắc (Mùa đông): Dòng hải lưu chảy mạnh theo hướng Đông Bắc - Tây Nam dọc bờ biển miền Trung.',
        'Mùa gió Tây Nam (Mùa hè): Dòng hải lưu đổi hướng chảy theo hướng Tây Nam - Đông Bắc.',
        'Hiện tượng nước trồi (Upwelling) tại vùng biển Ninh Thuận - Bình Thuận mang dinh dưỡng dồi dào, hình thành các ngư trường lớn.',
        'Ứng dụng biểu đồ dòng chảy giúp ngư dân tiết kiệm nhiên liệu và dự báo chính xác đường đi của bão.',
      ],
      maritimeTerms: [
        { term: 'Dòng hải lưu (Ocean Currents)', definition: 'Sự chuyển động liên tục, định hướng của nước đại dương sinh ra do gió, hiệu ứng Coriolis và gradient nhiệt độ/độ muối.' },
        { term: 'Nước trồi (Upwelling)', definition: 'Hiện tượng dòng nước lạnh giàu khoáng chất từ tầng sâu trồi lên mặt nước, kích thích sinh vật phù du phát triển mạnh mẽ.' },
      ],
      historicalContext: 'Từ xa xưa, cha ông ta đã nắm vững chế độ gió mùa "tháng ba đi biển, tháng tám về" để tổ chức các hải đội Hoàng Sa vâng lệnh triều đình cắm mốc chủ quyền.',
      studentAction: 'Sử dụng mô phỏng dòng chảy trong bài để quan sát sự thay đổi hướng chảy khi gió đổi chiều.',
    },
    summaryEn: {
      lead: 'Investigate upper-layer ocean currents across the East Sea: seasonal reversals driven by Northeast and Southwest monsoons and coastal upwelling zones.',
      keyPoints: [
        'Northeast Monsoon (Winter): Strong coastal currents surging Northeast to Southwest along central Vietnam.',
        'Southwest Monsoon (Summer): Current system shifts Southwest to Northeast.',
        'Coastal Upwelling phenomenon off Ninh Thuan - Binh Thuan elevating nutrient-rich deep waters for fishery booms.',
        'Optimizing navigation routes along current vectors to save maritime fuel and track storm drifts.',
      ],
      maritimeTerms: [
        { term: 'Ocean Currents', definition: 'Continuous, directed movements of seawater generated by prevailing winds, Coriolis deflection, and density gradients.' },
        { term: 'Upwelling', definition: 'The rising of cold, nutrient-rich deep seawater to the euphotic surface layer, fueling massive marine food chains.' },
      ],
      historicalContext: 'Ancient Vietnamese navigators harnessed monsoon cycles to dispatch seasonal Hoang Sa flotillas to patrol and erect markers.',
      studentAction: 'Interact with the wind current simulator below to test seasonal hydrodynamic shifts.',
    },
    quiz: [
      {
        id: 'q5-1',
        questionVi: 'Vào mùa đông (tháng 11 đến tháng 3), dòng hải lưu ven bờ miền Trung Việt Nam chảy theo hướng chủ đạo nào?',
        questionEn: 'During winter (November to March), in which dominant direction do central Vietnam coastal currents flow?',
        optionsVi: [
          'Từ Nam lên Bắc',
          'Từ Đông Bắc xuống Tây Nam (chảy xuôi xuống phía Nam)',
          'Chảy xoáy tại chỗ không di chuyển',
          'Từ Tây sang Đông vào đất liền',
        ],
        optionsEn: [
          'From South to North',
          'From Northeast to Southwest (heading southwards)',
          'Stationary vortex without displacement',
          'Directly West towards the inland mountains',
        ],
        correctIndex: 1,
        explanationVi: 'Dưới tác động của gió mùa Đông Bắc, dòng hải lưu tầng mặt ven biển chảy mạnh từ phía Bắc xuống phía Nam.',
        explanationEn: 'Under the powerful Northeast monsoon winds, surface coastal waters flow vigorously from Northeast down to Southwest.',
      },
      {
        id: 'q5-2',
        questionVi: 'Hiện tượng "nước trồi" (upwelling) ngoài khơi Ninh Thuận - Bình Thuận mang lại lợi ích tự nhiên gì?',
        questionEn: 'What natural benefit does the "upwelling" phenomenon off Ninh Thuan - Binh Thuan create?',
        optionsVi: [
          'Làm nước biển nóng lên nguy hiểm',
          'Đưa nguồn dinh dưỡng phong phú từ đáy lên mặt nước, tạo nên ngư trường đánh bắt trù phú',
          'Làm cạn kiệt toàn bộ các loài cá',
          'Ngăn cản tàu thuyền ra khơi vĩnh viễn',
        ],
        optionsEn: [
          'Dangerously superheating surface seawater',
          'Transporting rich nutrients from the deep sea bed, giving rise to productive fishing grounds',
          'Depleting all marine fish stocks',
          'Permanently blocking navigation channels',
        ],
        correctIndex: 1,
        explanationVi: 'Nước trồi mang muối khoáng từ tầng sâu lên, giúp thực vật phù du sinh sôi, thu hút nhiều loài cá biển tụ tập.',
        explanationEn: 'Upwelling transports mineral salts upwards, triggering phytoplankton blooms that nourish diverse schools of commercial fish.',
      },
    ],
    stemLab: {
      type: 'oceanCurrent',
      titleVi: 'Mô phỏng Dòng hải lưu & Gió mùa',
      titleEn: 'Ocean Current & Monsoon Simulation Lab',
      descriptionVi: 'Điều chỉnh hướng gió mùa để quan sát dòng hải lưu ven bờ Việt Nam thay đổi vận tốc và hướng chảy.',
      descriptionEn: 'Toggle monsoon season vectors to visualize coastal current velocity and direction shifts.',
      defaultSettings: {
        monsoonSeason: 'northeast',
        speedKmH: 28,
        showUpwelling: true,
      },
    },
  },
  {
    id: 'lesson-danang',
    chapterId: 'chap-3',
    titleVi: 'Bài 8: Mật mã Xanh - Đà Nẵng: Cửa ngõ Biển Đông & Hoàng Sa',
    titleEn: 'Lesson 8: Green Code - Da Nang: Gateway to the East Sea & Paracels',
    videoId: '7tly8LmHiNg',
    duration: '15:25',
    grade: '7',
    subjectVi: 'Địa lý Tự nhiên & Sinh thái Biển',
    subjectEn: 'Physical Geography & Marine Ecology',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Hành trình giải mã "Mật mã Xanh" tại thành phố biển Đà Nẵng: khám phá vị thế địa chiến lược của vịnh Đà Nẵng và bán đảo Sơn Trà vươn ra Biển Đông, hệ sinh thái rạn san hô trù phú, cùng sứ mệnh thiêng liêng là đơn vị hành chính quản lý quần đảo Hoàng Sa của Việt Nam.',
      keyPoints: [
        'Vị thế địa lý đặc biệt của Đà Nẵng: Trung tâm duyên hải miền Trung, cảng biển nước sâu tự nhiên kín gió, cửa ngõ giao thương hàng hải quốc tế trên Biển Đông.',
        'Bán đảo Sơn Trà - "Viên ngọc xanh": Khu bảo tồn thiên nhiên độc đáo với sự giao thoa giữa rừng nguyên sinh nhiệt đới và hệ sinh thái thảm cỏ biển, rạn san hô ven bờ.',
        'Nhà trưng bày Hoàng Sa trên đường Hoàng Sa: Không gian lưu giữ hàng trăm tư liệu, bản đồ cổ, hiện vật khẳng định chủ quyền không tranh cãi của Việt Nam đối với quần đảo Hoàng Sa.',
        'Chiến lược phát triển kinh tế biển xanh: Kết hợp du lịch sinh thái bền vững, bảo tồn loài linh trưởng quý hiếm Voọc chà vá chân nâu và giữ gìn môi trường biển không rác thải nhựa.',
      ],
      maritimeTerms: [
        { term: 'Vịnh Đà Nẵng (Da Nang Bay)', definition: 'Vịnh biển hình móng ngựa nước sâu tự nhiên, được che chắn bởi bán đảo Sơn Trà và đèo Hải Vân, có vị trí quân sự và kinh tế hàng hải trọng yếu.' },
        { term: 'Huyện đảo Hoàng Sa', definition: 'Đơn vị hành chính trực thuộc thành phố Đà Nẵng, thành lập theo Nghị định của Chính phủ để quản lý toàn bộ quần đảo Hoàng Sa của Việt Nam.' },
        { term: 'Nhà trưng bày Hoàng Sa', definition: 'Công trình kiến trúc hình "Con dấu chủ quyền" tại bờ biển Đà Nẵng, nơi trưng bày các bằng chứng lịch sử và pháp lý khẳng định chủ quyền biển đảo.' },
      ],
      historicalContext: 'Từ thời nhà Nguyễn, Đà Nẵng đã là thương cảng biển đối ngoại hàng đầu của kinh đô Huế. Năm 1997, Quốc hội và Chính phủ Việt Nam chính thức thành lập Huyện đảo Hoàng Sa trực thuộc thành phố Đà Nẵng, khẳng định sự quản lý nhà nước liên tục và hòa bình đối với quần đảo.',
      studentAction: 'Thực hiện nhật ký học tập "Mật mã Xanh", tìm hiểu các bản đồ cổ tại Nhà trưng bày Hoàng Sa trực tuyến và cam kết thực hiện phân loại rác thải bảo vệ bờ biển quê hương.',
    },
    summaryEn: {
      lead: 'Deciphering the "Green Code" in coastal Da Nang: exploring the geostrategic stature of Da Nang Bay and Son Tra Peninsula extending into the East Sea, thriving coral ecosystems, and the sacred mission of administering the Paracel (Hoang Sa) Islands.',
      keyPoints: [
        'Geostrategic location of Da Nang: Hub of central Vietnam, sheltered deep-water natural seaport, and vital gateway along major international East Sea shipping corridors.',
        'Son Tra Peninsula - "The Emerald Jewel": A pristine nature reserve featuring a rare juxtaposition of tropical rainforest, coastal seagrass, and fringing coral reefs.',
        'The Paracel (Hoang Sa) Exhibition House: A landmark venue preserving historical cartography, royal records, and artifacts upholding Vietnam unquestionable sovereignty.',
        'Blue maritime economy strategy: Harmonizing ecotourism with conservation of the endangered Red-shanked Douc langur and zero-plastic beach stewardship.',
      ],
      maritimeTerms: [
        { term: 'Da Nang Bay', definition: 'A naturally protected horseshoe deep-water bay shielded by Son Tra Peninsula and Hai Van Pass, essential for defense and trade.' },
        { term: 'Hoang Sa Island District', definition: 'An administrative district under Da Nang City established by government decree to exercise jurisdiction over the entire Paracel Archipelago.' },
        { term: 'Hoang Sa Exhibition House', definition: 'An architectural emblem designed in the shape of a sovereign imperial seal, displaying historical archives proving legitimate maritime rights.' },
      ],
      historicalContext: 'Since the Nguyen Dynasty, Da Nang served as the paramount ocean gateway for imperial Hue. In 1997, the government established the Hoang Sa Island District under Da Nang City, formalizing continuous sovereign civil governance.',
      studentAction: 'Keep a "Green Code" learning journal, explore virtual archives of the Hoang Sa Exhibition House, and practice daily coastal conservation.',
    },
    quiz: [
      {
        id: 'qdn-1',
        questionVi: 'Quần đảo Hoàng Sa của Việt Nam hiện nay thuộc đơn vị hành chính cấp huyện nào quản lý?',
        questionEn: 'Under which Vietnamese municipal administrative district is the Paracel (Hoang Sa) Archipelago governed?',
        optionsVi: [
          'Huyện đảo Phú Quốc (Kiên Giang)',
          'Huyện đảo Hoàng Sa thuộc thành phố Đà Nẵng',
          'Huyện Côn Đảo (Bà Rịa - Vũng Tàu)',
          'Huyện đảo Bạch Long Vĩ (Hải Phòng)',
        ],
        optionsEn: [
          'Phu Quoc Island District (Kien Giang)',
          'Hoang Sa Island District under Da Nang City',
          'Con Dao District (Ba Ria - Vung Tau)',
          'Bach Long Vy Island District (Hai Phong)',
        ],
        correctIndex: 1,
        explanationVi: 'Huyện đảo Hoàng Sa là đơn vị hành chính trực thuộc thành phố Đà Nẵng, được Chính phủ thành lập để quản lý toàn bộ quần đảo Hoàng Sa thiêng liêng của Tổ quốc.',
        explanationEn: 'The Hoang Sa Island District is an official administrative district under Da Nang City, established to exercise state governance over the Paracel Islands.',
      },
      {
        id: 'qdn-2',
        questionVi: 'Bán đảo Sơn Trà tại Đà Nẵng được mệnh danh là gì đối với hệ sinh thái và khí hậu của thành phố?',
        questionEn: 'What ecological title is bestowed upon Son Tra Peninsula regarding the city climate and biodiversity?',
        optionsVi: [
          'Hòn đảo nhân tạo bê tông',
          '"Lá phổi xanh" và bức bình phong tự nhiên che chắn bão gió cho thành phố Đà Nẵng',
          'Vùng sa mạc khô hạn ven biển',
          'Bãi bồi ngập mặn không có cây cối',
        ],
        optionsEn: [
          'An artificial concrete offshore island',
          '"The Green Lung" and natural protective seawall shield buffering storms for Da Nang City',
          'An arid coastal sand desert',
          'A barren mudflat devoid of vegetation',
        ],
        correctIndex: 1,
        explanationVi: 'Bán đảo Sơn Trà như một bức bình phong khổng lồ vươn ra biển Đông, vừa điều hòa vi khí hậu, vừa bảo vệ thành phố trước sóng to gió bão và là nơi cư trú của loài Voọc chà vá chân nâu quý hiếm.',
        explanationEn: 'Son Tra Peninsula stands as a natural protective barrier moderating coastal climate, shielding against typhoon surges, and sheltering the endangered Red-shanked Douc.',
      },
      {
        id: 'qdn-3',
        questionVi: 'Ý nghĩa kiến trúc đặc sắc của Nhà trưng bày Hoàng Sa trên cung đường ven biển Đà Nẵng mô phỏng hình tượng nào?',
        questionEn: 'What symbolic architectural motif does the Hoang Sa Exhibition House along Da Nang coastline emulate?',
        optionsVi: [
          'Một chiếc tàu ngầm hiện đại',
          'Hình tượng "Con dấu chủ quyền" của đất nước vươn cao khẳng định chủ quyền biển đảo',
          'Một ngọn núi đá vôi nhân tạo',
          'Một chiếc container chở hàng',
        ],
        optionsEn: [
          'A modern naval submarine',
          'The motif of an "Imperial Sovereign Seal" standing tall to assert undeniable maritime ownership',
          'An artificial limestone karst mound',
          'An industrial freight container',
        ],
        correctIndex: 1,
        explanationVi: 'Nhà trưng bày Hoàng Sa được thiết kế mô phỏng "Con dấu chủ quyền" của các triều đại Việt Nam, thể hiện ý chí quật cường và bằng chứng pháp lý vững chắc về chủ quyền Hoàng Sa.',
        explanationEn: 'The exhibition building is sculpted in the silhouette of a national sovereign seal, symbolizing resilient civic resolve and unyielding legal title over Hoang Sa.',
      },
    ],
  },
  {
    id: 'lesson-6',
    chapterId: 'chap-4',
    titleVi: 'Bài 9: Sáng chế Kim tự tháp Hologram & Phao thông minh',
    titleEn: 'Lesson 9: STEM Invention: Hologram Pyramid & Smart Buoy',
    videoId: 'Vl9K5xEONN8',
    duration: '19:30',
    grade: '8',
    subjectVi: 'STEM & Vật lý Ứng dụng',
    subjectEn: 'STEM & Applied Physics',
    channel: '@TEENYEUBIENDAO',
    summaryVi: {
      lead: 'Hướng dẫn tự tay chế tạo mô hình Kim tự tháp Hologram 3D từ vật liệu mica trong suốt tái chế và lắp ráp mạch cảm biến đo độ mặn nước biển bằng vi điều khiển Arduino/micro:bit.',
      keyPoints: [
        'Vật liệu cần chuẩn bị: Tấm nhựa trong (vỏ hộp CD hoặc mica mỏng), kéo, dao rọc giấy, thước kẻ, băng dính trong.',
        'Kích thước chuẩn của hình thang cân: Đáy lớn 6cm, đáy nhỏ 1cm, chiều cao 3.5cm (dành cho điện thoại thông minh).',
        'Cách thức chia màn hình hiển thị 4 góc đồng bộ để tạo hiệu ứng 3D lơ lửng.',
        'Nguyên lý đo điện dẫn của nước biển để suy ra độ mặn (Salinity Sensor) trên phao quan trắc.',
      ],
      maritimeTerms: [
        { term: 'Độ mặn của nước biển (Salinity)', definition: 'Tổng lượng chất rắn hòa tan tính bằng gam có trong 1 kg nước biển, độ mặn trung bình của Biển Đông khoảng 32 - 34‰ (phần nghìn).' },
        { term: 'Hình thang cân Hologram', definition: 'Cấu trúc 4 mặt lăng kính có góc nghiêng 45° so với mặt phẳng nằm ngang, tối ưu cho khúc xạ - phản xạ ánh sáng màn hình.' },
      ],
      historicalContext: 'Mô hình giáo dục STEM giúp học sinh chuyển từ tiếp thu thụ động sang chế tạo sáng tạo, giải quyết bài toán thực tế của kinh tế biển.',
      studentAction: 'Tải bản vẽ kỹ thuật (template) trong tab Tài liệu để cắt ghép kim tự tháp hologram tại nhà.',
    },
    summaryEn: {
      lead: 'Hands-on guide to assembling a 3D Hologram Pyramid from clear recycled plastic sheets and wiring an automated salinity sensor buoy using Arduino/micro:bit.',
      keyPoints: [
        'Required materials: Clear acrylic sheets or recycled CD jewel cases, cutter, ruler, clear tape.',
        'Standard trapezoid dimensions: Base 6cm, top 1cm, height 3.5cm (optimized for smartphone screens).',
        'Synchronized 4-quadrant screen layout creating a floating spatial visual.',
        'Conductivity-based salinity sensor principle measuring marine mineral ions in real time.',
      ],
      maritimeTerms: [
        { term: 'Seawater Salinity', definition: 'The total dissolved salt mass in grams per 1 kg of seawater; average East Sea salinity ranges between 32 - 34 PSU (parts per thousand).' },
        { term: 'Hologram Trapezoid Face', definition: 'A 45-degree angled clear pane optimizing internal reflection of digital screen photons towards the viewer.' },
      ],
      historicalContext: 'STEM maritime education bridges theoretical physics with tangible coastal technology innovations.',
      studentAction: 'Download the printable cutting template in the Notes tab to build your own desktop 3D hologram tonight.',
    },
    quiz: [
      {
        id: 'q6-1',
        questionVi: 'Góc nghiêng lý tưởng giữa mặt kim tự tháp hologram và mặt kính điện thoại để phản xạ hình ảnh tốt nhất là bao nhiêu?',
        questionEn: 'What is the optimal angle between the hologram pyramid pane and the screen display?',
        optionsVi: ['15 độ', '45 độ', '90 độ thẳng đứng', '180 độ nằm phẳng'],
        optionsEn: ['15 degrees', '45 degrees', '90 degrees perpendicular', '180 degrees flat'],
        correctIndex: 1,
        explanationVi: 'Góc 45 độ cho phép ánh sáng từ màn hình phản xạ chuẩn 90 độ vào tầm mắt người quan sát, tạo ảo giác vật thể lơ lửng trung tâm.',
        explanationEn: 'The 45-degree inclination deflects vertical screen light at a 90-degree orthogonal vector directly into the viewer eyes.',
      },
      {
        id: 'q6-2',
        questionVi: 'Độ mặn trung bình của nước biển Biển Đông Việt Nam dao động trong khoảng nào?',
        questionEn: 'What is the typical average salinity range of seawater in the Vietnam East Sea?',
        optionsVi: ['0 - 5‰ (nước ngọt)', '10 - 15‰', '32 - 34‰ (phần nghìn)', '100‰'],
        optionsEn: ['0 - 5 PSU (freshwater)', '10 - 15 PSU', '32 - 34 PSU (parts per thousand)', '100 PSU'],
        correctIndex: 2,
        explanationVi: 'Nước biển đại dương và Biển Đông có độ mặn trung bình khoảng 32 đến 34 phần nghìn (‰).',
        explanationEn: 'Normal open marine water in the East Sea averages 32 to 34 parts per thousand (PSU).',
      },
    ],
    stemLab: {
      type: 'hologram',
      titleVi: 'Bộ mô phỏng Kim tự tháp Hologram & Cắt gấp STEM',
      titleEn: 'STEM Hologram Interactive Simulator',
      descriptionVi: 'Xoay và tương tác với lăng kính 4 hướng để kiểm tra góc hội tụ quang học trước khi cắt mẫu vật lý.',
      descriptionEn: 'Rotate and interact with the 4-way optical prism to test focal convergence before physical cutting.',
      defaultSettings: {
        rotationSpeed: 1.5,
        modelType: 'buoy',
        brightness: 95,
      },
    },
  },
];
