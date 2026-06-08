const fs = require('fs');
let siteData = fs.readFileSync('src/lib/siteData.js', 'utf8');

// 1. Translate cityData cities
const cityKoMap = {
  'Madrid': '마드리드',
  'Lisbon': '리스본',
  'Malaga': '말라가',
  'Barcelona': '바르셀로나',
  'Bilbao': '빌바오',
  'Badajoz': '바다호스'
};

const cityContentKoMap = {
  'Madrid': {
    intro: 'Standarte는 마드리드에서 기술 설계, 제작, 물류, 설치, 검증 및 현장 조정을 포함한 전체 과정을 통해 전시 부스를 개발합니다.',
    detail: '이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 위해 준비된 부스가 필요한 커뮤니케이션 대행사, 출품업체 및 브랜드를 위한 것입니다.'
  },
  'Lisbon': {
    intro: 'Standarte는 리스본에서 기술 설계, 제작, 물류, 설치, 검증 및 현장 조정을 포함한 전체 과정을 통해 전시 부스를 개발합니다.',
    detail: '이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 위해 준비된 부스가 필요한 커뮤니케이션 대행사, 출품업체 및 브랜드를 위한 것입니다.'
  },
  'Malaga': {
    intro: 'Standarte는 말라가에서 기술 설계, 제작, 물류, 설치, 검증 및 현장 조정을 포함한 전체 과정을 통해 전시 부스를 개발합니다.',
    detail: '이 서비스는 신뢰할 수 있는 실행, 세심한 마감 및 전문 방문객을 위해 준비된 부스가 필요한 커뮤니케이션 대행사, 출품업체 및 브랜드를 위한 것입니다.'
  },
  'Barcelona': {
    intro: 'Standarte는 바르셀로나에서 기술 설계, 고급 목공, 물류 및 현장 조립을 관리하며 영향력 있는 전시 부스를 개발합니다.',
    detail: '세계적인 주요 전시회 동안 최고의 시각적 마감, 신뢰성 및 결함 없는 실행이 필요한 국제 브랜드 및 커뮤니케이션 대행사를 대상으로 합니다.'
  },
  'Bilbao': {
    intro: 'Standarte는 빌바오에서 첨단 전시 부스를 설계 및 조립하여 건축적 견고함과 타의 추종을 불허하는 브랜드 존재감을 제공합니다.',
    detail: '기계, 산업 기술 및 고성능 제조 분야에서 두각을 나타내고자 하는 브랜드와 기업에 이상적입니다.'
  },
  'Badajoz': {
    intro: 'Standarte는 바다호스에서 스페인-포르투갈 국경의 전략적 이점을 활용하여 맞춤형 전시 부스를 설계하고 설치합니다.',
    detail: '이베리아 시장에 진출하고자 하는 기업에게 실용적이고 영향력 있는 전시 솔루션을 제공합니다.'
  }
};

siteData = siteData.replace(/city: \{(.*?en: '([^']+)',.*?it: '[^']+') \}/g, (match, p1, enName) => {
  return `city: {${p1}, ko: '${cityKoMap[enName]}' }`;
});

siteData = siteData.replace(/it: \{\s*intro: '([^']*)',\s*detail: '([^']*)'\s*\}/g, (match, intro, detail) => {
  // Infer city from English text if possible, but actually we can just match generically or replace the whole block
  return match; // fallback
});

const citiesRegex = /([a-z]+): \{\s*city: \{(.*?en: '([^']+)',.*?it: '[^']+') \},\s*content: \{([\s\S]*?)it: \{([\s\S]*?)\}\s*\}\s*\}/g;
siteData = siteData.replace(citiesRegex, (match, cityKey, cityP1, enName, contentBeforeIt, itContent) => {
  const koObj = cityContentKoMap[enName];
  if (!koObj) return match;
  
  const koBlock = `it: {${itContent}},\n      ko: {\n        intro: '${koObj.intro}',\n        detail: '${koObj.detail}'\n      }`;
  return `${cityKey}: {\n    city: {${cityP1}, ko: '${cityKoMap[enName]}' },\n    content: {${contentBeforeIt}${koBlock}\n    }\n  }`;
});


// 2. Translate project slugs
const slugMap = {
  "stand_para_empresa": "gongsi_bujeu",
  "construccion_stand": "bujeu_jejak",
  "stand_de_diseno": "dijain_bujeu",
  "carpinteria": "mokgong"
};
function generateKoSlug(enSlug) {
  if (!enSlug) return 'peurojekteu';
  return enSlug.split('_').slice(0, 5).join('_') + '_ko'; // Simple approximation that guarantees valid slug and prevents exact duplication
}

siteData = siteData.replace(/slugs: \{([\s\S]*?)it: "([^"]+)"\s*\}/g, (match, beforeIt, itSlug) => {
  const koSlug = generateKoSlug(itSlug);
  return `slugs: {${beforeIt}it: "${itSlug}",\n      ko: "${koSlug}"\n    }`;
});

fs.writeFileSync('src/lib/siteData.js', siteData, 'utf8');

console.log("siteData.js updated successfully.");
