// ====== Projects Data ======
// This file contains all project information
// Each project can have multiple images and videos that will cycle in a carousel
//
// HOW TO ADD A NEW PROJECT:
// 1. Copy one of the existing project objects below
// 2. Update the following fields:
//    - id: unique identifier (lowercase, no spaces, e.g., 'my-project')
//    - title: project title
//    - tags: array of technology/topic tags
//    - shortDescription: brief description for project cards
//    - media: array of images/videos (see examples below)
//    - thumbnail: main image for project card (usually first image)
//    - description: detailed HTML description with your work/contributions
// 3. Add images/videos to the media array:
//    - For images: { type: 'image', url: './Images/image.jpg', alt: 'Description' }
//    - For videos: { type: 'video', url: './Images/video.mp4', alt: 'Description', thumbnail: './Images/thumbnail.jpg' }
//    - NOTE: Use relative paths starting with './Images/' for files in the Images folder
//    - NOTE: PDFs cannot be displayed in the carousel - convert to JPG/PNG images first
// 4. Fill in the "What I Did" section in the description with your specific contributions
//
// TIP: You can add as many images/videos as you want - they will cycle automatically in a carousel
// TIP: To use local images, place them in the Images/ folder and use: './Images/your-image.jpg'

const PROJECTS = [
  {
    id: 'foghacks',
    title: 'FogHacks — Adaptive Imaging Through Fog',
    tags: ['Computational Optics', 'Neural Networks', 'Image Correction'],
    shortDescription: 'Computational imaging pipeline using phase modulation and PSF deconvolution; GPU-accelerated diffraction sims.',
    // Multiple images/videos that will cycle in carousel
    // Use relative paths: './Images/filename.jpg' or './Images/filename.png'
    // NOTE: PDFs don't work - convert to JPG/PNG images first, or add image files to Images folder
    media: [
      {
        type: 'image',
        url: './Images/foghacks.jpg', // Replace with your actual image file
        alt: 'FogHacks Render'
      },
      // Add more images by uncommenting and updating these:
      {
        type: 'image',
        url: './Images/foghacks_imageplane.png',
        alt: 'FogHacks Scattering and unscattering'
      },
      {
        type: 'image',
        url: './Images/foghacks_SLM_to_DMD.png',
        alt: 'FogHacks SLM to DMD Conversion using Lee Hologram Technique'
      }
      // For videos:
      // {
      //   type: 'video',
      //   url: './Images/foghacks-video.mp4',
      //   alt: 'Project video',
      //   thumbnail: './Images/foghacks-thumbnail.jpg' // Optional thumbnail
      // }
    ],
    // Thumbnail for project cards (first image or specific thumbnail)
    thumbnail: './Images/foghacks.jpg', // Replace with your actual image file
    // Description section - you can add your detailed description here
    description: `
    <h3>Overview</h3>
    <p>Computational imaging pipeline using phase modulation and PSF deconvolution; GPU-accelerated diffraction simulations.</p>
    
    <h3>What I Did</h3>
    <p><!-- Add your detailed description here about what you've done in this project -->
    Describe your specific contributions, methods, and achievements here.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Computational Optics</li>
      <li>Neural Networks</li>
      <li>Image Correction</li>
      <li>GPU Acceleration</li>
    </ul>
    
    <h3>Results</h3>
    <p><!-- Add results, metrics, or outcomes here --></p>`
  },
  {
    id: 'hbn-quantum',
    title: 'Quantum Emitters in hBN',
    tags: ['Nanophotonics', 'material science', 'FDTD'],
    shortDescription: 'Gold nanorods + alumina spacer cavity to boost Purcell factor and control polarization for spin-defect readout.',
    media: [
      {
        type: 'image',
        url: './Images/QUROP_POSTER_FINAL.png',
        alt: 'PL spectroscopy set up'
      },
      {
        type: 'image',
        url: './Images/pl_data.png',
        alt: 'hBN Quantum Emitters project image 2'
      },
      {
        type: 'image',
        url: './Images/gnr_data.png',
        alt: 'hBN Quantum Emitters project image 2'
      }
    ],
    thumbnail: './Images/pl.jpg',
    description: `
    <h3>Overview</h3>
    <p>Gold nanorods + alumina spacer cavity to boost Purcell factor and control polarization for spin-defect readout.</p>
    
    <h3>What I Did</h3>
    <p><!-- Add your detailed description here about what you've done in this project -->
    Describe your specific contributions, methods, and achievements here.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Nanophotonics</li>
      <li>hBN (hexagonal Boron Nitride)</li>
      <li>FDTD Simulations</li>
      <li>Quantum Emitters</li>
    </ul>
    
    <h3>Results</h3>
    <p><!-- Add results, metrics, or outcomes here --></p>`
  },


  {
    id: 'rushbot',
    title: 'RushBot — Autonomous Recruitment Rover',
    tags: ['Robotics', 'SLAM', 'Embedded Systems', 'Power Electronics'],
    shortDescription: 'Interactive rover with SLAM navigation, manipulator arm, and on-device voice/chat interface for event engagement.',
    media: [
      {
        type: 'image',
        url: './Images/rushbot_render.png',
        alt: 'RushBot CAD Render'
      },
      {
        type: 'image',
        url: './Images/rushbot_slam.png',
        alt: 'RushBot Electrical Schematic'
      },
      {
        type: 'image',
        url: './Images/rushbot_battery.png',
        alt: 'RushBot High Voltage Battery with integrated BMS'
      },
      {
        type: 'image',
        url: './Images/rushbot_present.png',
        alt: 'RushBot Presentaion at a conference'
      }
    ],
    thumbnail: './Images/rushbot_render.png',
    description: `
    <h3>Overview</h3>
    <p>Interactive rover with SLAM navigation, manipulator arm, and on-device voice/chat interface for event engagement.</p>
    
    <h3>What I Did</h3>
    <p><!-- Add your detailed description here about what you've done in this project -->
    Describe your specific contributions, methods, and achievements here.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Robotics</li>
      <li>SLAM (Simultaneous Localization and Mapping)</li>
      <li>Embedded Systems</li>
      <li>Manipulator Arm Control</li>
    </ul>
    
    <h3>Results</h3>
    <p><!-- Add results, metrics, or outcomes here --></p>`
  },


  {
    id: 'mag-lev-device',
    title: 'Electrodynamic Suspension (EDS) Mag-Lev System',
    tags: ['Magnetic Levitation', 'COMSOL', 'Electrodynamics', 'Hardware Design'],
    shortDescription: 'Pioneered magnetic levitation sub-team and developed EDS prototypes using linear Halbach arrays, achieving 50% increase in lift-to-drag ratio.',
    media: [
      {
        type: 'image',
        url: './Images/maglev.jpg',
        alt: 'Magnetic levitation system'
      },
      {
        type: 'image',
        url: './Images/maglev_presentation.jpg',
        alt: 'Mag-Lev Presentation at a conference'
      }
    ],
    thumbnail: './Images/maglev.jpg',
    description: `
    <h3>Overview</h3>
    <p>Developed Electrodynamic Suspension (EDS) prototypes utilizing linear Halbach arrays of permanent magnets for magnetic levitation applications at HyperXite, UCI's high-speed transportation team.</p>
    
    <h3>What I Did</h3>
    <p>Pioneered the formation of a magnetic levitation sub-team and initiated development of the first EDS prototypes. I conducted comprehensive COMSOL Multiphysics simulations to evaluate and optimize permanent magnet configurations, analyzing lift and drag forces to achieve a 50% increase in the lift-to-drag ratio. Designed and built an experimental test rig and scaled prototype to validate simulations with onboard distance sensors, achieving a maximum levitation height of 25 mm.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>COMSOL Multiphysics (Finite Element Analysis)</li>
      <li>Electrodynamic Suspension (EDS) Systems</li>
      <li>Halbach Array Design</li>
      <li>Experimental Test Rig Design</li>
      <li>Distance Sensors Integration</li>
      <li>Magnetic Field Simulation</li>
    </ul>
    
    <h3>Results</h3>
    <p>Achieved a 50% increase in lift-to-drag ratio through optimized magnet configurations. Successfully demonstrated magnetic levitation with a maximum height of 25 mm in the experimental prototype.</p>`
  },


  {
    id: 'control-pcb-board',
    title: '4-Layer Control Board PCB Design',
    tags: ['PCB Design', 'Altium', 'LTspice', 'Hardware Integration', 'BMS'],
    shortDescription: 'Designed a 4-layer control board PCB interfacing multiple sensors and systems, with comprehensive circuit simulation and power system integration.',
    media: [
      {
        type: 'image',
        url: './Images/control_board_schematic.png',
        alt: 'PCB design and layout'
      },
      {
        type: 'image',
        url: './Images/control_board.png',
        alt: 'Circuit board assembly'
      }
    ],
    thumbnail: './Images/control_board_cover.png',
    description: `
    <h3>Overview</h3>
    <p>Designed and developed a comprehensive 4-layer control board PCB that interfaces multiple sensor systems and control components to an onboard Raspberry Pi for a high-speed transportation pod.</p>
    
    <h3>What I Did</h3>
    <p>Utilized Altium to design a 4-layer control board PCB that interfaces multiple temperature, pressure, and motion sensors, along with the pneumatic braking system, to the onboard Raspberry Pi. Leveraged LTspice to simulate and analyze idealized circuit designs, verifying signal integrity, power distribution, and operational stability to meet control board specifications. Integrated a complete low-voltage and high-voltage system consisting of a battery management system (BMS), control board, power converters, and batteries onto the pod.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Altium Designer (PCB Layout)</li>
      <li>LTspice (Circuit Simulation)</li>
      <li>4-Layer PCB Design</li>
      <li>Battery Management System (BMS)</li>
      <li>Raspberry Pi Integration</li>
      <li>Sensor Interface Design</li>
      <li>Power Distribution Systems</li>
      <li>Signal Integrity Analysis</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully designed and integrated a complete control system meeting all specifications for signal integrity, power distribution, and operational stability. The board interfaces multiple sensor types and control systems seamlessly with the onboard computing platform.</p>`
  },


  {
    id: 'quantum-error-correction',
    title: 'Quantum Error Correction Codes',
    tags: ['Quantum Computing', 'Qiskit', 'Error Correction'],
    shortDescription: 'Developed and implemented 9-qubit and 13-qubit Shor error-correcting codes on IBM Quantum hardware for multi-error detection and correction.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Quantum computing visualization'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a6b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Quantum circuit diagram'
      }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
    description: `
    <h3>Overview</h3>
    <p>Developed and implemented quantum error correction codes using Qiskit on IBM Quantum hardware, focusing on the Shor error-correcting code for detecting and correcting quantum errors.</p>
    
    <h3>What I Did</h3>
    <p>Developed and implemented the 9-qubit Shor error-correcting code using Qiskit on IBM Quantum hardware, designing and optimizing quantum circuits to encode, decode, and correct arbitrary single-qubit errors. Extended the 9-qubit Shor error correction to a multi-error implementation using 13 qubits in Qiskit, enabling sequential detection and correction of bit-flip (X) and phase-flip (Z) errors within a single circuit.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Qiskit (Quantum Computing Framework)</li>
      <li>IBM Quantum Hardware</li>
      <li>Shor Error Correction Code</li>
      <li>Quantum Circuit Design</li>
      <li>Quantum Error Correction Theory</li>
      <li>Bit-flip (X) and Phase-flip (Z) Error Correction</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully implemented both 9-qubit and 13-qubit Shor error correction codes, enabling detection and correction of arbitrary single-qubit errors and multi-error scenarios on real quantum hardware.</p>`
  },
  {
    id: 'esp',
    title: 'Emotional Support Pet (ESP)',
    tags: ['ESP32', 'Computer Vision', 'Embedded Systems'],
    shortDescription: 'Developed and implemented 9-qubit and 13-qubit Shor error-correcting codes on IBM Quantum hardware for multi-error detection and correction.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Quantum computing visualization'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a6b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Quantum circuit diagram'
      }
    ],
    thumbnail: './Images/esp_color.jpg',
    description: `
    <h3>Overview</h3>
    <p>Developed and implemented quantum error correction codes using Qiskit on IBM Quantum hardware, focusing on the Shor error-correcting code for detecting and correcting quantum errors.</p>
    
    <h3>What I Did</h3>
    <p>Developed and implemented the 9-qubit Shor error-correcting code using Qiskit on IBM Quantum hardware, designing and optimizing quantum circuits to encode, decode, and correct arbitrary single-qubit errors. Extended the 9-qubit Shor error correction to a multi-error implementation using 13 qubits in Qiskit, enabling sequential detection and correction of bit-flip (X) and phase-flip (Z) errors within a single circuit.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Qiskit (Quantum Computing Framework)</li>
      <li>IBM Quantum Hardware</li>
      <li>Shor Error Correction Code</li>
      <li>Quantum Circuit Design</li>
      <li>Quantum Error Correction Theory</li>
      <li>Bit-flip (X) and Phase-flip (Z) Error Correction</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully implemented both 9-qubit and 13-qubit Shor error correction codes, enabling detection and correction of arbitrary single-qubit errors and multi-error scenarios on real quantum hardware.</p>`
  },

  {
    id: 'guidance-glasses',
    title: 'Guidance Glasses',
    tags: ['Embedded Systems', 'Machine Learning', 'Arduino', 'Computer Vision'],
    shortDescription: 'Developed and implemented 9-qubit and 13-qubit Shor error-correcting codes on IBM Quantum hardware for multi-error detection and correction.',
    media: [
      {
        type: 'image',
        url: './Images/guidanceglasses.png',
        alt: 'Solidworks model of Guidance Glasses'
      },
      {
        type: 'image',
        url: './Images/guidanceglasses_electrical.png',
        alt: 'Electrical schematic of Guidance Glasses'
      }
    ],
    thumbnail: './Images/guidanceglasses.png',
    description: `
    <h3>Overview</h3>
    <p>Co-developed a pair of glasses that can assist the visually impaired by providing information about their surroundings via haptic feedback.</p>
    
    <h3>What I Did</h3>
    <p>Developed and implemented the 9-qubit Shor error-correcting code using Qiskit on IBM Quantum hardware, designing and optimizing quantum circuits to encode, decode, and correct arbitrary single-qubit errors. Extended the 9-qubit Shor error correction to a multi-error implementation using 13 qubits in Qiskit, enabling sequential detection and correction of bit-flip (X) and phase-flip (Z) errors within a single circuit.</p>
    
    <h3>Technologies & Tools</h3>
    <ul>
      <li>Qiskit (Quantum Computing Framework)</li>
      <li>IBM Quantum Hardware</li>
      <li>Shor Error Correction Code</li>
      <li>Quantum Circuit Design</li>
      <li>Quantum Error Correction Theory</li>
      <li>Bit-flip (X) and Phase-flip (Z) Error Correction</li>
    </ul>
    
    <h3>Results</h3>
    <p>Successfully implemented both 9-qubit and 13-qubit Shor error correction codes, enabling detection and correction of arbitrary single-qubit errors and multi-error scenarios on real quantum hardware.</p>`
  }
];

