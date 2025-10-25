import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

type MobileNetPrediction = {
  className: string;
  probability: number;
};

// Define complaint categories and their corresponding keywords
const COMPLAINT_CATEGORIES = {
  INFRASTRUCTURE: {
    keywords: ['pothole', 'road', 'street', 'asphalt', 'concrete', 'damage', 'crack', 'hole', 'broken', 'repair'],
    department: 'Public Works Department',
    departmentDetails: {
      head: 'Mr. Rajesh Kumar',
      contact: '1800-XXX-XXXX',
      email: 'pwd@gnoaida.gov.in',
      workingHours: '9:00 AM - 5:00 PM',
      responseTime: '24 hours'
    },
    deadline: 7,
    priority: 'high',
    description: 'Road infrastructure, street maintenance, and public works'
  },
  SANITATION: {
    keywords: ['garbage', 'trash', 'waste', 'litter', 'dumpster', 'bin', 'dirt', 'clean', 'sweep', 'hygiene'],
    department: 'Sanitation Department',
    departmentDetails: {
      head: 'Mrs. Priya Sharma',
      contact: '1800-XXX-XXXX',
      email: 'sanitation@gnoaida.gov.in',
      workingHours: '6:00 AM - 2:00 PM',
      responseTime: '12 hours'
    },
    deadline: 3,
    priority: 'medium',
    description: 'Waste management, street cleaning, and public hygiene'
  },
  WATER: {
    keywords: ['water', 'leak', 'pipe', 'flood', 'drainage', 'sewage', 'overflow', 'blocked', 'drain', 'waterlogging'],
    department: 'Water Supply Department',
    departmentDetails: {
      head: 'Mr. Amit Singh',
      contact: '1800-XXX-XXXX',
      email: 'water@gnoaida.gov.in',
      workingHours: '8:00 AM - 4:00 PM',
      responseTime: '6 hours'
    },
    deadline: 5,
    priority: 'high',
    description: 'Water supply, drainage, and sewage management'
  },
  ELECTRICITY: {
    keywords: ['electricity', 'power', 'wire', 'cable', 'transformer', 'pole', 'outage', 'spark', 'short circuit', 'fault'],
    department: 'Electricity Department',
    departmentDetails: {
      head: 'Mr. Vikram Patel',
      contact: '1800-XXX-XXXX',
      email: 'power@gnoaida.gov.in',
      workingHours: '24/7',
      responseTime: '2 hours'
    },
    deadline: 4,
    priority: 'high',
    description: 'Power supply, street lighting, and electrical maintenance'
  },
  TRAFFIC: {
    keywords: ['traffic', 'signal', 'light', 'sign', 'road', 'vehicle', 'jam', 'congestion', 'accident', 'parking'],
    department: 'Traffic Department',
    departmentDetails: {
      head: 'Mr. Suresh Verma',
      contact: '1800-XXX-XXXX',
      email: 'traffic@gnoaida.gov.in',
      workingHours: '24/7',
      responseTime: '30 minutes'
    },
    deadline: 5,
    priority: 'medium',
    description: 'Traffic management, road safety, and parking'
  },
  PARKS: {
    keywords: ['park', 'garden', 'tree', 'plant', 'grass', 'playground', 'bench', 'fountain', 'path', 'maintenance'],
    department: 'Parks and Recreation',
    departmentDetails: {
      head: 'Mrs. Meera Gupta',
      contact: '1800-XXX-XXXX',
      email: 'parks@gnoaida.gov.in',
      workingHours: '7:00 AM - 7:00 PM',
      responseTime: '48 hours'
    },
    deadline: 10,
    priority: 'low',
    description: 'Public parks, gardens, and recreational facilities'
  },
  SECURITY: {
    keywords: ['security', 'crime', 'theft', 'vandalism', 'safety', 'police', 'cctv', 'lighting', 'patrol'],
    department: 'Security Department',
    departmentDetails: {
      head: 'Mr. Rakesh Sharma',
      contact: '1800-XXX-XXXX',
      email: 'security@gnoaida.gov.in',
      workingHours: '24/7',
      responseTime: '15 minutes'
    },
    deadline: 2,
    priority: 'high',
    description: 'Public safety, security, and law enforcement'
  },
  EDUCATION: {
    keywords: ['school', 'education', 'classroom', 'building', 'facility', 'playground', 'library', 'computer'],
    department: 'Education Department',
    departmentDetails: {
      head: 'Mrs. Anita Desai',
      contact: '1800-XXX-XXXX',
      email: 'education@gnoaida.gov.in',
      workingHours: '9:00 AM - 5:00 PM',
      responseTime: '72 hours'
    },
    deadline: 14,
    priority: 'medium',
    description: 'Educational facilities and infrastructure'
  },
  HEALTH: {
    keywords: ['hospital', 'clinic', 'medical', 'health', 'ambulance', 'emergency', 'doctor', 'nurse', 'medicine'],
    department: 'Health Department',
    departmentDetails: {
      head: 'Dr. Sunil Kumar',
      contact: '1800-XXX-XXXX',
      email: 'health@gnoaida.gov.in',
      workingHours: '24/7',
      responseTime: '1 hour'
    },
    deadline: 3,
    priority: 'high',
    description: 'Healthcare facilities and medical services'
  }
};

let model: mobilenet.MobileNet | null = null;

// Initialize the model
export async function initializeModel() {
  try {
    model = await mobilenet.load();
    console.log('AI model loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading AI model:', error);
    return false;
  }
}

// Analyze image and detect objects
export async function analyzeImage(imageElement: HTMLImageElement) {
  if (!model) {
    await initializeModel();
  }

  try {
    const predictions = await model!.classify(imageElement);
    return predictions;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return null;
  }
}

// Determine complaint category based on detected objects
export function determineComplaintCategory(predictions: MobileNetPrediction[]) {
  const detectedObjects = predictions.map(p => p.className.toLowerCase());
  const confidenceThreshold = 0.6; // Minimum confidence threshold
  
  // Find the best matching category
  let bestMatch = {
    category: 'GENERAL',
    confidence: 0,
    details: {
      department: 'General Administration',
      departmentDetails: {
        head: 'Mr. General Manager',
        contact: '1800-XXX-XXXX',
        email: 'general@gnoaida.gov.in',
        workingHours: '9:00 AM - 5:00 PM',
        responseTime: '72 hours'
      },
      deadline: 14,
      priority: 'low',
      description: 'General administrative issues'
    }
  };

  for (const [category, details] of Object.entries(COMPLAINT_CATEGORIES)) {
    const matchCount = details.keywords.filter(keyword => 
      detectedObjects.some(obj => obj.includes(keyword))
    ).length;

    // Calculate confidence based on number of matches and prediction confidence
    const confidence = matchCount / details.keywords.length;
    
    if (confidence > bestMatch.confidence && confidence >= confidenceThreshold) {
      bestMatch = {
        category,
        confidence,
        details
      };
    }
  }

  return bestMatch;
}

// Generate complaint details based on AI analysis
export async function generateComplaintDetails(imageFile: File): Promise<{
  category: string;
  department: string;
  departmentDetails: {
    head: string;
    contact: string;
    email: string;
    workingHours: string;
    responseTime: string;
  };
  deadline: number;
  priority: string;
  description: string;
  confidence: number;
  detectedObjects: string[];
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    
    img.onload = async () => {
      try {
        const predictions = await analyzeImage(img);
        if (!predictions) {
          throw new Error('Failed to analyze image');
        }

        const { category, confidence, details } = determineComplaintCategory(predictions);
        
        // Get top 3 detected objects with their confidence scores
        const detectedObjects = predictions
          .slice(0, 3)
          .map(p => `${p.className} (${Math.round(p.probability * 100)}%)`);

        resolve({
          category,
          department: details.department,
          departmentDetails: details.departmentDetails,
          deadline: details.deadline,
          priority: details.priority,
          description: `${details.description}. Detected: ${detectedObjects.join(', ')}`,
          confidence,
          detectedObjects
        });
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(img.src);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
} 