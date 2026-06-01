const CURATED_IMAGES = {
  japan: [
    {
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
      title: 'Kyoto Pagoda',
      description: 'The iconic traditional pagoda of Yasaka Shrine nestled in Kyoto.'
    },
    {
      url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      title: 'Tokyo Neon Lights',
      description: 'The buzzing futuristic energy of Shinjuku, Tokyo at night.'
    },
    {
      url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200&auto=format&fit=crop',
      title: 'Mount Fuji',
      description: 'The snow-capped peak of Mt. Fuji framed by pink cherry blossoms.'
    },
    {
      url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop',
      title: 'Shibuya Crossing',
      description: 'The famous organized chaos of the world\'s busiest pedestrian intersection.'
    }
  ],
  ghana: [
    {
      url: 'https://images.unsplash.com/photo-1588667540292-628d098e98fc?q=80&w=1200&auto=format&fit=crop',
      title: 'Cape Coast Castle',
      description: 'A historical fortress along the beautiful Gold Coast shoreline.'
    },
    {
      url: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=1200&auto=format&fit=crop',
      title: 'Kakum Canopy Walk',
      description: 'The exhilarating suspension bridges high above the lush rainforest canopy.'
    },
    {
      url: 'https://images.unsplash.com/photo-1598372671043-b6736be5b842?q=80&w=1200&auto=format&fit=crop',
      title: 'Accra Beaches',
      description: 'Relaxing palm-fringed sands along the Gulf of Guinea.'
    },
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop',
      title: 'Traditional Kente Weaving',
      description: 'Intricately patterned woven threads representing rich heritage.'
    }
  ],
  canada: [
    {
      url: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=1200&auto=format&fit=crop',
      title: 'Moraine Lake',
      description: 'The turquoise glacier-fed waters of Valley of the Ten Peaks in Banff.'
    },
    {
      url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1200&auto=format&fit=crop',
      title: 'Toronto Skyline',
      description: 'The impressive city skyline framing the iconic CN Tower at sunset.'
    },
    {
      url: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1200&auto=format&fit=crop',
      title: 'Laurentian Autumn',
      description: 'Brilliant crimson and golden forests of Quebec in peak autumn.'
    },
    {
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
      title: 'Niagara Falls',
      description: 'The jaw-dropping power of the Horseshoe Falls on the border.'
    }
  ],
  brazil: [
    {
      url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop',
      title: 'Christ the Redeemer',
      description: 'The monumental statue overlooking the dynamic bay of Rio de Janeiro.'
    },
    {
      url: 'https://images.unsplash.com/photo-1518638150341-f706e86654de?q=80&w=1200&auto=format&fit=crop',
      title: 'Copacabana Beach',
      description: 'The curved sweep of white sand packed with Rio\'s vibrant sun-seekers.'
    },
    {
      url: 'https://images.unsplash.com/photo-1527824404775-dce34a977228?q=80&w=1200&auto=format&fit=crop',
      title: 'Amazon Rainforest',
      description: 'The winding waterways and dense green heart of the Amazon river basin.'
    },
    {
      url: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200&auto=format&fit=crop',
      title: 'Iguazu Falls',
      description: 'A spectacular semi-circle of cascading waterfalls on the border.'
    }
  ],
  france: [
    {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      title: 'Eiffel Tower',
      description: 'Paris\'s iconic iron spire towering beautifully over the Seine.'
    },
    {
      url: 'https://images.unsplash.com/photo-1543349689-9a4d426bee87?q=80&w=1200&auto=format&fit=crop',
      title: 'Louvre Pyramid',
      description: 'The striking glass pyramid reflecting Parisian history.'
    },
    {
      url: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?q=80&w=1200&auto=format&fit=crop',
      title: 'French Riviera',
      description: 'The luxurious blue shores of Nice along the Côte d\'Azur.'
    },
    {
      url: 'https://images.unsplash.com/photo-1527838832702-5958852f0147?q=80&w=1200&auto=format&fit=crop',
      title: 'Provence Lavender Fields',
      description: 'Rolling violet fields smelling sweet under the summer sun.'
    }
  ],
  'south africa': [
    {
      url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop',
      title: 'Table Mountain',
      description: 'The flat-topped peak rising majestically over Cape Town harbor.'
    },
    {
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
      title: 'Kruger Safari',
      description: 'Unforgettable encounters with the Big Five in their natural habitats.'
    },
    {
      url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop',
      title: 'Boulders Beach Penguins',
      description: 'The cute colony of African penguins nestled on the Cape Peninsula.'
    },
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      title: 'Stellenbosch Vineyards',
      description: 'Lush green vineyards framed by grand historic mountain ranges.'
    }
  ],
  usa: [
    {
      url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
      title: 'New York Times Square',
      description: 'The flashing billboards and high-speed energy of Manhattan\'s heart.'
    },
    {
      url: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&w=1200&auto=format&fit=crop',
      title: 'Grand Canyon',
      description: 'The layer-cake bands of red rock sculpted over millions of years.'
    },
    {
      url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop',
      title: 'Golden Gate Bridge',
      description: 'San Francisco\'s magnificent art deco bridge shrouded in morning fog.'
    },
    {
      url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200&auto=format&fit=crop',
      title: 'Yosemite Valley',
      description: 'The dramatic granite monolith of El Capitan in Yosemite National Park.'
    }
  ]
};

// Generic country tags to construct dynamic high quality travel image arrays
const FALLBACK_TOPICS = ['landmark', 'landscape', 'culture', 'nature'];

function getCountryImages(countryName) {
  const normalized = countryName.toLowerCase().trim();

  // Curated lists
  if (CURATED_IMAGES[normalized]) {
    return CURATED_IMAGES[normalized];
  }

  // Fallbacks mapping
  if (normalized === 'united states' || normalized === 'united states of america' || normalized === 'us') {
    return CURATED_IMAGES.usa;
  }
  if (normalized === 'united kingdom' || normalized === 'uk' || normalized === 'great britain') {
    return [
      {
        url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
        title: 'Big Ben & Westminster',
        description: 'The timeless gothic architecture overlooking the River Thames in London.'
      },
      {
        url: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=1200&auto=format&fit=crop',
        title: 'Scottish Highlands',
        description: 'The misty summits and rugged beauty of mountain valleys.'
      },
      {
        url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop',
        title: 'Tower Bridge',
        description: 'The famous bascule bridge crossing the active London shipping lanes.'
      },
      {
        url: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1200&auto=format&fit=crop',
        title: 'Historic Castles',
        description: 'Old defensive ramparts keeping watch over beautiful countryside.'
      }
    ];
  }
  if (normalized === 'italy') {
    return [
      {
        url: 'https://images.unsplash.com/photo-1529260830199-44552e02202e?q=80&w=1200&auto=format&fit=crop',
        title: 'Rome Colosseum',
        description: 'The legendary stone amphitheater standing tall in the heart of Rome.'
      },
      {
        url: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=1200&auto=format&fit=crop',
        title: 'Venice Canals',
        description: 'A romantic gondola gliding through historic brick waterways.'
      },
      {
        url: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1200&auto=format&fit=crop',
        title: 'Amalfi Coast',
        description: 'Pastel-colored cliffside villages cascading down to the Mediterranean.'
      },
      {
        url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
        title: 'Tuscany Countryside',
        description: 'Sun-drenched vineyards and cypress trees lining gravel paths.'
      }
    ];
  }
  if (normalized === 'india') {
    return [
      {
        url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
        title: 'Taj Mahal',
        description: 'The marble masterpiece of love glowing soft in the morning mist of Agra.'
      },
      {
        url: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?q=80&w=1200&auto=format&fit=crop',
        title: 'Jaipur Palaces',
        description: 'The terracotta facade of Hawa Mahal rising in Rajasthan.'
      },
      {
        url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
        title: 'Kerala Backwaters',
        description: 'Peaceful houseboats floating down rows of tall green palm trees.'
      },
      {
        url: 'https://images.unsplash.com/photo-1561361531-7d4c64e1d958?q=80&w=1200&auto=format&fit=crop',
        title: 'Varanasi Ghats',
        description: 'Sacred rituals taking place on the banks of the mighty Ganges River.'
      }
    ];
  }

  // Generate dynamic, search-targeted unsplash URLs that are 100% stable
  // We use high-quality Unsplash editorial selections that match travel themes
  const queryEncoded = encodeURIComponent(countryName);
  return [
    {
      url: `https://images.unsplash.com/featured/?${queryEncoded},landscape,nature&q=80&w=1200&auto=format&fit=crop`,
      title: `Scenic ${countryName}`,
      description: `Breathtaking landscapes showing the geographical soul of ${countryName}.`
    },
    {
      url: `https://images.unsplash.com/featured/?${queryEncoded},landmark,architecture&q=80&w=1200&auto=format&fit=crop`,
      title: `Iconic Landmark`,
      description: `Historic architecture and cultural sites defining ${countryName}.`
    },
    {
      url: `https://images.unsplash.com/featured/?${queryEncoded},city,street&q=80&w=1200&auto=format&fit=crop`,
      title: `Metropolitan Life`,
      description: `The energetic city scenes and local streets of ${countryName}.`
    },
    {
      url: `https://images.unsplash.com/featured/?${queryEncoded},culture,people&q=80&w=1200&auto=format&fit=crop`,
      title: `Local Heritage`,
      description: `Rich cultural traditions, local festivals, and heritage of ${countryName}.`
    }
  ];
}

module.exports = {
  getCountryImages,
  curatedDestinations: [
    {
      slug: 'ghana',
      name: 'Ghana',
      tagline: 'Gateway to West Africa',
      image: 'https://images.unsplash.com/photo-1588667540292-628d098e98fc?q=80&w=600&auto=format&fit=crop',
      desc: 'Discover castles, canopy walks, golden sands, and legendary hospitality.'
    },
    {
      slug: 'japan',
      name: 'Japan',
      tagline: 'Land of the Rising Sun',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
      desc: 'Experience neon skyscrapers, ancient shrines, bullet trains, and cherry blossoms.'
    },
    {
      slug: 'canada',
      name: 'Canada',
      tagline: 'The Great White North',
      image: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=600&auto=format&fit=crop',
      desc: 'Explore emerald glacial lakes, autumn forests, and vibrant cultural centers.'
    },
    {
      slug: 'brazil',
      name: 'Brazil',
      tagline: 'Rhythm of the Rainforest',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop',
      desc: 'Immerse in carnival beats, deep Amazon wild rivers, and Copacabana sands.'
    },
    {
      slug: 'france',
      name: 'France',
      tagline: 'Epitome of Romance & Art',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
      desc: 'Wander along Parisian lanes, fields of lavender, and royal Riviera châteaux.'
    },
    {
      slug: 'south africa',
      name: 'South Africa',
      tagline: 'A Rainbow Nation Adventure',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop',
      desc: 'Witness Table Mountain coastlines, thrilling safaris, and stunning winelands.'
    }
  ]
};
